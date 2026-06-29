# 🔭 trend-research — 趨勢研究員工（L3）

> 讀 niche 設定 + 已讀來源 log → 上網搵料 + 事實查核 + 評分 → 寫返 `30 - Notes/` brief。同內容排程系統嘅趨勢雷達同一 pattern：搵料 → 查核 → 評分 → 摘要。

L3 重點：要**外部能力（上網）**。

---

## 1. 完整 Skill.md

```markdown
# Skill: trend-research（趨勢研究）

## 觸發
當我講「我 niche 今日有咩值得睇」

## 讀（記憶來源）
- sop/trend-niche.md — 我 watch 嘅 niche + 信得過來源 + 已讀 log（避重複）

## 上網用乜（外部能力）
- Codex：加 web-search MCP（Exa / Tavily），config.toml 寫法同 Obsidian MCP 一樣
- Hermes：內置 Tavily / Firecrawl，~/.hermes/.env 填 key 即用

## 做（步驟）
1. 按 niche 多來源搵料（過去 7 日優先）
2. 事實查核：人名 / 數字 / 公司關係交叉驗證（一手 > 二手）
3. 按相關性 + 新鮮度 + 可信度評分（跳過 trend-niche 已讀 log 入面嘅）
4. 寫 brief：每條一句 what + 一句 so-what

## 寫返（output）
- 30 - Notes/<date> <niche> brief.md
- 同時將今次用嘅來源加返入 sop/trend-niche.md 已讀 log

## 安全
- 查唔到出處嘅 claim 標「[未證]」，唔好當真
- 只摘要 + 連結，唔好整段抄
```

---

## 2. Demo run（用 sample-vault 真 input）

**Input**：`sample-vault/sop/trend-niche.md`（niche = 美妝 / 時裝 / 餐飲社交營銷；已讀 log 有 3 條）

**你打**：`我 niche 今日有咩值得睇`

**員工做**：搵美妝 / 時裝 / 餐飲社交營銷過去 7 日趨勢 → 跳過已讀嗰 3 條 → 查核數字 → 評分 → 出 brief。

**Output** → `30 - Notes/2026-05-27 社交營銷趨勢 brief.md`：

```markdown
---
date: 2026-05-27
type: note
---

# 社交營銷趨勢 — 本週 brief

## 值得睇（評分 ≥4）
1. <某平台種草新玩法> — what：… / so-what：GlowLab 6 月 campaign 可以試呢個格式。[來源]
2. <某時裝品牌 launch 復盤> — what：… / so-what：… [來源]

## 跳過（已讀）
- 小紅書美妝種草新規（log 已有）
```

> 跑之前確認上網能力裝咗：`hermes status` 見到 Tavily/Firecrawl key slot，或 Codex `config.toml` 有 web-search MCP。

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句** — 「我 niche 今日有咩睇」改「掃下行情」「今日有咩新嘢」。
2. **改讀邊個 folder** — 多個 niche？開幾個 `sop/trend-*.md`，觸發時指明邊個。
3. **改 output schema** — 想評分入 frontmatter（`top_score: 5`）方便 dashboard 排序就加。
4. **改自查/來源** — 換你信嘅來源清單；查核嚴格度按 niche 調（投資 / 醫療要更嚴）。

---

## 4. 常見伏

- **冇上網能力就靜雞雞作** = 最危險。`## 做` 要求「查唔到 → 標 [未證]」，唔好當 LLM 記憶係新聞。
- **每次出返同樣嘢** = 冇更新已讀 log。`## 寫返` 一定要寫返 log。
- **Sub-agent 講「假 / 查無此事」唔可盡信** = 近期產品 / 事件，cutoff 之後嘅，要 web 再核先落判斷。
