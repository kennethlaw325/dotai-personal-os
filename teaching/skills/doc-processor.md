# 📄 doc-processor — 文書處理員工（L1）

> 指定一份長文件 / 筆記 → 格式化 / 摘要 / 改寫 / 翻譯 → 寫返原 folder 或 `30 - Notes/`。

---

## 1. 完整 Skill.md

```markdown
# Skill: doc-processor（文書處理）

## 觸發
當我講「處理呢份文件：[摘要 / 改寫 / 翻譯 / 格式化]」

## 讀（記憶來源）
- 我指定嘅 file（path 或 [[wikilink]]）

## 做（步驟）
1. 判斷我要邊種處理（摘要 / 改寫 / 翻譯 / 格式化）— 唔講就問
2. 執行：
   - 摘要：抽重點 + 一句 takeaway
   - 改寫：跟 sop/content-voice.md 語氣
   - 翻譯：保留專有名詞，唔意譯地名 / 人名
   - 格式化：加標題 / bullet / frontmatter
3. 保留原文 link 做 source，方便日後追

## 寫返（output）
- 原 folder（in-place 改）或 30 - Notes/<原名>-<處理類型>.md
- frontmatter 加 source: [[原 file]]

## 安全
- in-place 改之前 show diff
- 翻譯 / 改寫唔好刪內容，唔肯定保留原句
```

---

## 2. Demo run（用 sample-vault 真 input）

**Input**：`sample-vault/00 - Inbox/clipped-article.md`（一篇 web clipper 剪落嚟嘅長文）

**你打**：`處理呢份文件：摘要`

**員工做**：讀長文 → 抽 3 個重點 → 一句 takeaway → 保留原文 link。

**Output** → `30 - Notes/clipped-article-摘要.md`：

```markdown
---
date: 2026-05-27
type: note
source: [[clipped-article]]
---

# <原文題> — 摘要

## 三個重點
1. …
2. …
3. …

## 一句 takeaway
…

> 原文：[[clipped-article]]
```

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句** — 你成日做翻譯就寫死「翻譯呢份」做獨立觸發，唔使每次揀。
2. **改讀邊個 folder** — 接收 PDF / Word？先用工具轉 markdown（MarkItDown / pandoc）入 `00 - Inbox/`，再叫呢個員工處理。
3. **改 output schema** — 想分開放（翻譯入 `translations/`、摘要入 `30 - Notes/`）？喺 `## 寫返` 按處理類型分流。
4. **改自查規則** — 翻譯加「術語表」：讀 `sop/glossary.md` 統一譯名，禁意譯。

---

## 4. 常見伏

- **唔知做邊種處理就亂做** = `## 做` 第 1 步要「唔講就問」，唔好自己估。
- **覆蓋原文** = in-place 改冇 show diff。長文一定要 diff 先。
