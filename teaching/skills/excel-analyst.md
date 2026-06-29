# 📊 excel-analyst — Excel 數據分析員工（L3）

> 讀指定 CSV / Excel → 清洗 → 分析 → 摘要 + 圖表 spec → 寫返 `30 - Notes/`。L3 = 用真工具（SheetJS）讀 binary，唔係餵 LLM 估。

---

## 1. 完整 Skill.md

```markdown
# Skill: excel-analyst（數據分析）

## 觸發
當我講「分析呢個 CSV / Excel：<path>」

## 讀（記憶來源）
- 我指定嘅 .csv / .xlsx

## 做（步驟）
1. 讀檔：
   - .csv → 直接 parse
   - .xlsx → 用 node lib `xlsx`(SheetJS)，唔好將 binary 餵 LLM
     `const wb = XLSX.readFile(p); const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])`
2. 清洗：去空行 / 統一格式 / 轉數字 type
3. 算統計：總 / 平均 / 分佈 / top-N
4. 抽 insight（2-3 句人睇得明嘅）
5. 出圖表 spec：類型 + x/y + 標題（畀人或前端照住畫）

## 寫返（output）
- 30 - Notes/<date> <主題>分析.md — 統計 + insight + 圖表 spec

## 安全
- 大檔先 sample 頭幾行確認 schema，唔好盲跑
- 數字由 script 算，唔好叫 LLM「心算」
```

---

## 2. Demo run（用 sample-vault 真 input）

**Input**：`sample-vault/data/platform-engagement-2026-05.csv`（5 平台 × 互動數據）

**你打**：`分析呢個 CSV：data/platform-engagement-2026-05.csv，睇邊個平台互動最好`

**員工做**：用 SheetJS 讀 → 按平台 group 加總 impressions → 排序 → 出 bar chart spec（= 課程圖 16）。

**Output** → `30 - Notes/2026-05-31 各平台互動分析.md`：

```markdown
---
date: 2026-05-31
type: note
---

# 各平台本月互動分析

## 統計（本月總 impressions）
- IG 14,200 · XHS 12,300 · FB 11,800 · Threads 11,500 · X 8,600

## Insight
- IG 雖然 post 少但單條爆（5/12 9,100）。
- X 互動最低，要諗下值唔值得繼續同等力度。

## 圖表 spec
- 類型：bar
- x：平台 · y：本月總 impressions
- 標題：各平台本月互動量
```

> 跑數字嗰段建議寫成細 script（`scripts/analyze.mjs`），員工 call script 攞數，唔好叫 LLM 逐行加。

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句** — 「分析呢個 CSV」改「睇下盤數」「拆個 report」。
2. **改讀邊個 folder** — 固定每月一份就寫死 path pattern（`data/*-engagement-*.csv` 攞最新）。
3. **改 output schema** — 想直接出 dashboard 食得嘅 JSON？`## 寫返` 改寫 `public/data/analysis.json`，前端畫圖。
4. **改自查規則** — 加「row < N 就唔出結論」「缺欄位要報唔好靜雞雞當 0」。

---

## 4. 常見伏

- **LLM 幻覺數字** = 最大伏。一定要 SheetJS / script 算，LLM 只負責解讀。（image-OCR / 數據都係呢個原則。）
- **.xlsx 直餵爆 token** = binary 唔好餵，一定先 `sheet_to_json`。
