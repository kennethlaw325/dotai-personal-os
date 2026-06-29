# ✍️ content-creator — 內容創作員工（L1）

> 抽論點 → 跟你嘅語氣寫跨平台 draft → 自查 AI 味。讀 `sop/ 30 - Notes/ _drafts/`，寫返 `_drafts/`。

呢份係「逐個 skill 詳細教學」之一。睇完你應該識：(1) 完整 Skill.md 點寫，(2) 用 sample-vault 真 input 跑一次，(3) 改 4 個旋鈕變成你自己版本。

---

## 1. 完整 Skill.md

> Copy 落你 agent 嘅 skill 位（Codex：`~/.codex/skills/content-creator/SKILL.md`；或你 AGENTS.md 指向嘅 skill folder）。`<...>` 係要你改嘅位。

```markdown
# Skill: content-creator（內容創作）

## 觸發
當我講「draft 一篇 [平台] 帖，主題 X」/「幫我寫 [平台] post」

## 讀（記憶來源）
- sop/content-voice.md — 我把聲（語氣、禁用字、listicle 規矩）
- 30 - Notes/ — 同主題相關嘅論點 / 已寫過嘅角度
- _drafts/ — 近期 draft，避免撞題

## 做（步驟）
1. 由 30 - Notes/ 抽 2-3 個同主題相關論點，揀一個最 sharp 嘅做主軸
2. 讀 sop/content-voice.md，跟返「目標平台」嗰段格式 + 語氣寫
3. 自我檢查：
   - 有冇用禁用字眼（laihao / 讓我們 / 首先 / 此外…）
   - listicle 有冇至少一句明確立場
   - 每個數字 / 百分比有冇出處，冇就改質化或刪
   - 有冇撞返 _drafts/ 近期題目

## 寫返（output）
- _drafts/<platform>-<YYYY-MM-DD>.md
- frontmatter：id / title / platform / status: idea / updated_at
- （功能版 AI Office view，Part 2 你親手 build）收尾跑 `node scripts/log-agent.mjs content-creator done <draft數>` → 更新 `public/data/agents.json`，dashboard 個員工就著燈

## 安全
- 唔好作數字 / 出處；唔肯定就標「[需查證]」等我覆
- 寫 draft 唔改原 note
```

---

## 2. Demo run（用 sample-vault 真 input）

**Input 喺度**：
- `sample-vault/sop/content-voice.md`（語氣）
- `sample-vault/30 - Notes/2026-05-21 小紅書種草 vs IG 種草.md`（論點）
- `sample-vault/_drafts/d-threads-001.md`（近期 draft，避撞題）

**你打**：`draft 一篇 IG 帖，主題：GlowLab 淺色調護膚`

**員工做**：
1. 由 `2026-05-21 小紅書種草 vs IG 種草` 抽到主軸「IG 第一張圖要靚到停得低、caption 短、hook 第一行」
2. 跟 `content-voice.md` IG 段：廣東話書面語、hook 第一行、唔用 em-dash
3. 自查：冇禁用字、有立場句、冇撞 `d-threads-001`（嗰篇講工作室回顧，唔同題）

**Output** → `_drafts/ig-2026-05-27.md`：

```markdown
---
id: ig-2026-05-27
title: GlowLab 淺色調護膚日常
platform: ig
status: idea
updated_at: 2026-05-27
---

護膚唔使複雜，3 步就夠。

早晚跟住做：
潔面要溫和，唔好搓到面紅。
精華薄薄一層，等佢吸收先疊下一支。
最後鎖水，日頭記得防曬。

淺色調影出嚟好乾淨，產品擺位留多啲白，個樽自己會講嘢。
```

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句** — `## 觸發` 改成你慣講嘅，例如「出個文」「幫我諗條 caption」。觸發句越貼你平時點開口，員工越易撈到。
2. **改讀邊個 folder** — 冇 `sop/`？指去你放語氣 / 風格指引嘅 file（甚至直接喺 skill 入面寫死三條語氣 rule）。多咗 `clippings/` 想參考靈感就加一行 `- clippings/ — 靈感參考`。
3. **改 output schema** — 你 frontmatter 想要 `tags` / `target_audience` / `hook_type`？喺 `## 寫返` 列出，員工就會跟住填。output 去邊都係呢度改。
4. **改自查規則** — 你個 platform 唔同（例如 LinkedIn 要正式）？改 `## 做` 第 3 步嘅 check list：加「字數 < 300」「結尾一條問題」等你自己嘅硬規矩。

---

## 4. 常見伏

- **語氣飄** = `sop/content-voice.md` 太空泛。寫具體啲（畀正面 + 反面例句），員工就學得似。
- **作數字** = 自查冇 enforce 出處。`## 做` 明寫「冇出處 → 標 [需查證]」。
- **撞題** = 冇讀 `_drafts/`。確保 `## 讀` 有列 `_drafts/`。
