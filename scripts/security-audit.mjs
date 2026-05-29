#!/usr/bin/env node
// Personal OS — security audit
// 掃 public/data/*.json + sample-vault/ (or 學員 vault) 入面：
//   1) API key pattern (sk-, hf_, ANTHROPIC_KEY=, OPENAI_KEY=, AWS_ access keys ...)
//   2) PII pattern (email, HK 8-digit phone, HKID format)
//   3) Outbound URL (markdown image / link to https://... non-whitelisted)
//
// Exit 1 if any P0 hit. Exit 0 if clean.
//
// Usage:
//   npm run security:audit
//   node scripts/security-audit.mjs                  # default: ./public/data + ./sample-vault
//   node scripts/security-audit.mjs <path> [<path>]  # custom scan paths

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const SCAN_PATHS = args.length > 0 ? args : ['public/data', 'sample-vault'];

const ALLOWED_OUTBOUND_HOSTS = new Set([
  // 加入學員信嘅 CDN domain（e.g. own vault assets, school-issued URLs）
  // 'cdn.jsdelivr.net',
]);

const PATTERNS = {
  // P0 — secret / key
  'openai-key': /sk-[A-Za-z0-9]{20,}/g,
  'anthropic-key': /sk-ant-[A-Za-z0-9_-]{20,}/g,
  'huggingface-token': /\bhf_[A-Za-z0-9]{20,}/g,
  'aws-access-key': /\bAKIA[0-9A-Z]{16}\b/g,
  'generic-secret-assign': /\b(OPENAI_KEY|ANTHROPIC_KEY|API_KEY|SECRET|TOKEN|PASSWORD)\s*=\s*['"]?[A-Za-z0-9_\-]{12,}/gi,
  'private-key-block': /-----BEGIN (?:RSA |EC |OPENSSH |DSA |)PRIVATE KEY-----/g,

  // P1 — PII
  'email': /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
  'hk-phone': /\b[5-9]\d{3}[\s-]?\d{4}\b/g,
  'hkid': /\b[A-Z]{1,2}\d{6}\(?[A0-9]\)?/g,

  // P0 — outbound URL in markdown (image or link)
  'markdown-outbound-image': /!\[[^\]]*\]\((https?:\/\/[^)]+)\)/g,
  'markdown-outbound-link': /(?<!!)\[[^\]]*\]\((https?:\/\/[^)]+)\)/g,
};

const SEVERITY = {
  'openai-key': 'P0',
  'anthropic-key': 'P0',
  'huggingface-token': 'P0',
  'aws-access-key': 'P0',
  'generic-secret-assign': 'P0',
  'private-key-block': 'P0',
  'email': 'P1',
  'hk-phone': 'P1',
  'hkid': 'P0',
  'markdown-outbound-image': 'P0',
  'markdown-outbound-link': 'P1',
};

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (e) {
    if (e.code === 'ENOENT') return out;
    throw e;
  }
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (['node_modules', '.git', 'dist', '.vite'].includes(ent.name)) continue;
      out.push(...await walk(full));
    } else if (ent.isFile()) {
      if (/\.(md|json|txt|env)$/i.test(ent.name) || ent.name === '.env') {
        out.push(full);
      }
    }
  }
  return out;
}

function extractHost(url) {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

function scanText(text, file) {
  const findings = [];
  const lines = text.split('\n');

  for (const [name, regex] of Object.entries(PATTERNS)) {
    regex.lastIndex = 0;
    let m;
    while ((m = regex.exec(text)) !== null) {
      // Outbound URL — whitelist check
      if (name.startsWith('markdown-outbound')) {
        const host = extractHost(m[1]);
        if (host && ALLOWED_OUTBOUND_HOSTS.has(host)) continue;
      }

      // Find line number
      const before = text.slice(0, m.index);
      const lineNum = before.split('\n').length;
      const lineContent = lines[lineNum - 1] ?? '';

      findings.push({
        file: path.relative(ROOT, file),
        line: lineNum,
        severity: SEVERITY[name],
        pattern: name,
        match: m[0].slice(0, 80),
        context: lineContent.trim().slice(0, 120),
      });
    }
  }
  return findings;
}

async function main() {
  console.log('🔒 Personal OS — security audit\n');
  console.log(`Scanning: ${SCAN_PATHS.join(', ')}\n`);

  let allFindings = [];
  for (const p of SCAN_PATHS) {
    const abs = path.resolve(ROOT, p);
    const files = await walk(abs);
    for (const f of files) {
      const text = await fs.readFile(f, 'utf8');
      allFindings.push(...scanText(text, f));
    }
  }

  if (allFindings.length === 0) {
    console.log('✅ 0 hit — vault + JSON 全部 clean\n');
    process.exit(0);
  }

  // Group by severity
  const bySev = { P0: [], P1: [], P2: [] };
  for (const f of allFindings) bySev[f.severity ?? 'P2'].push(f);

  for (const sev of ['P0', 'P1']) {
    if (bySev[sev].length === 0) continue;
    console.log(`\n${sev === 'P0' ? '🚨' : '⚠️ '} ${sev} — ${bySev[sev].length} hit\n`);
    for (const f of bySev[sev]) {
      console.log(`  ${f.file}:${f.line}  [${f.pattern}]`);
      console.log(`    match: ${f.match}`);
      console.log(`    line : ${f.context}`);
      console.log('');
    }
  }

  const p0 = bySev.P0.length;
  const p1 = bySev.P1.length;
  console.log(`\nSummary: ${p0} P0 / ${p1} P1\n`);

  if (p0 > 0) {
    console.log('❌ P0 hit — block ship. 修咗再跑.\n');
    process.exit(1);
  }
  console.log('⚠️  P1 hit — review 過再 ship.\n');
  process.exit(0);
}

main().catch((e) => {
  console.error('Audit script error:', e);
  process.exit(2);
});
