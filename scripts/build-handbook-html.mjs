#!/usr/bin/env node
/**
 * Convert STUDENT-HANDBOOK.md → handbook.html with styled wrapper.
 *
 * Usage:
 *   node scripts/build-handbook-html.mjs
 *
 * Output: handbook.html at repo root.
 */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const markdown = await readFile(join(ROOT, "STUDENT-HANDBOOK.md"), "utf8");

marked.setOptions({
  gfm: true,
  breaks: false
});

const body = marked.parse(markdown);

const html = `<!doctype html>
<html lang="zh-HK">
<head>
<meta charset="utf-8">
<title>DotAI Codex 網課 Level 2 — Student Handbook</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
:root {
  --canvas: #f6f8fb;
  --panel: #ffffff;
  --line: #e6edf5;
  --ink: #11243a;
  --muted: #66758a;
  --brand: #3b82f6;
  --navy: #003153;
  --code-bg: #e6edf5;
  --code-block-bg: #11243a;
  --code-block-text: #f6f8fb;
  --quote-bg: #fff7e6;
  --quote-border: #f59e0b;
}
* { box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang HK", "Noto Sans HK", system-ui, sans-serif;
  max-width: 920px;
  margin: 2rem auto;
  padding: 0 1.2rem 4rem;
  line-height: 1.65;
  color: var(--ink);
  background: var(--canvas);
}
h1 {
  border-bottom: 2px solid var(--navy);
  padding-bottom: 0.5rem;
  margin-top: 2rem;
}
h2 {
  color: var(--navy);
  margin-top: 2.5rem;
  border-left: 4px solid var(--brand);
  padding-left: 0.7rem;
}
h3 {
  color: var(--ink);
  margin-top: 1.6rem;
}
h4 {
  color: var(--muted);
  margin-top: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.92rem;
}
p, li { line-height: 1.7; }
code {
  background: var(--code-bg);
  padding: 0.12rem 0.4rem;
  border-radius: 4px;
  font-size: 0.88em;
  font-family: "SF Mono", Consolas, Monaco, monospace;
}
pre {
  background: var(--code-block-bg);
  color: var(--code-block-text);
  padding: 1rem 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.85em;
  line-height: 1.55;
}
pre code {
  background: transparent;
  color: inherit;
  padding: 0;
  font-size: inherit;
}
blockquote {
  border-left: 3px solid var(--quote-border);
  padding: 0.5rem 1rem;
  background: var(--quote-bg);
  margin: 1rem 0;
  color: var(--ink);
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
  background: var(--panel);
  border-radius: 8px;
  overflow: hidden;
}
th, td {
  border: 1px solid var(--line);
  padding: 0.55rem 0.8rem;
  text-align: left;
  font-size: 0.92rem;
  vertical-align: top;
}
th {
  background: var(--line);
  font-weight: 650;
}
a {
  color: var(--brand);
  text-decoration: none;
}
a:hover { text-decoration: underline; }
ul, ol { padding-left: 1.5rem; }
li { margin: 0.25rem 0; }
hr {
  border: none;
  border-top: 1px solid var(--line);
  margin: 2rem 0;
}
img { max-width: 100%; height: auto; }
.toc-jump {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 0.6rem 1rem;
  margin: 1rem 0;
  font-size: 0.9rem;
}
@media print {
  body { background: white; max-width: none; padding: 1rem; }
  h1, h2 { page-break-after: avoid; }
  pre, table { page-break-inside: avoid; }
}
</style>
</head>
<body>
${body}
<hr>
<p style="color: var(--muted); font-size: 0.85rem; text-align: center;">
DotAI Codex 網課 Level 2 — Student Handbook · 由 STUDENT-HANDBOOK.md 自動生成 · ${new Date().toISOString().slice(0, 10)}
</p>
</body>
</html>
`;

const outPath = join(ROOT, "handbook.html");
await writeFile(outPath, html);

const stats = {
  markdown_lines: markdown.split("\n").length,
  html_bytes: html.length
};

console.log(`✅ handbook.html generated`);
console.log(`   source: STUDENT-HANDBOOK.md (${stats.markdown_lines} lines)`);
console.log(`   output: handbook.html (${(stats.html_bytes / 1024).toFixed(1)} KB)`);
