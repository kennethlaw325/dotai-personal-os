# 🧩 data-consolidation — 資料整合員工（L3）

> 讀多來源檔案 / folder → 統一 schema + 去重 → 寫返指定統一 folder。重點：去重用 deterministic script，唔好叫 AI 逐行重打。

---

## 1. 完整 Skill.md

```markdown
# Skill: data-consolidation（資料整合）

## 觸發
當我講「合併呢幾個來源：<paths>」

## 讀（記憶來源）
- 我指定嘅多個 file / folder（CSV / md / JSON）

## 做（步驟）
1. 統一 schema：睇晒各源欄位，決定共同欄位（同義詞 map，例如 Email/email/e-mail → email）
2. 逐源 map 入統一 schema
3. 去重：揀一個 key（email / id），用 script 合併（唔好叫 LLM 逐行）
4. 衝突（同 key 不同值）→ 標出嚟等人裁，唔好擅自揀

## 寫返（output）
- 指定統一 folder / file（CSV 或 md table）
- 附一句報告：幾多源 / 合併前後 row 數 / 幾多衝突待裁

## 安全
- 去重用 deterministic code，輸出可重現
- 衝突一定要人 review，唔好靜雞雞覆蓋
```

**去重骨架**（員工 call 呢段，唔好心算）：

```js
// 以 email 做 key，先到欄位優先，衝突留低等人裁
const seen = new Map();
for (const r of allRows) {
  const k = (r.email || '').toLowerCase().trim();
  if (!k) continue;
  if (!seen.has(k)) seen.set(k, { ...r });
  else seen.set(k, { ...seen.get(k), ...stripEmpty(r) }); // 先到優先
}
const merged = [...seen.values()];
```

---

## 2. Demo run（用 sample-vault 真 input）

**Input**：`sample-vault/sources/contacts-newsletter.csv`（欄位 name/email）+ `contacts-webinar.csv`（欄位 full_name/Email — 大細階唔同！）

**你打**：`合併呢兩個聯絡人來源，去重`

**員工做**：
1. Schema map：`full_name → name`、`Email → email`
2. 合併 10 row
3. 去重 by email（lowercase）：Karen / Peter / Sam 兩邊都有 → 合併剩 7 個 unique
4. 衝突：Karen 嘅 email 一邊大階一邊細階 → lowercase 後同一人，無真衝突

**Output** → `sources/contacts-merged.csv` + 報告：

```
2 源 → 合併前 10 row → 去重後 7 unique（重複 3：Karen / Peter / Sam）。0 衝突待裁。
```

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句** — 「合併呢幾個來源」改「夾埋呢幾份」「砌個 master list」。
2. **改讀邊個 folder** — 固定每月 export？寫死 `sources/*.csv` 全掃。
3. **改 output schema / key** — 去重 key 改 `phone` 或 `id`；輸出想要 md table 而非 CSV 就改。
4. **改自查規則** — 衝突策略：「最新 `joined` 優先」定「人手裁」？喺 `## 做` 第 4 步講死。

---

## 4. 常見伏

- **欄位名唔一致漏 map** = `Email` vs `email`。第 1 步一定要做同義詞 map + key lowercase。
- **叫 LLM 逐行去重** = 慢 + 唔可重現 + 會漏。一定要 script。
