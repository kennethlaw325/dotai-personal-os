# 💰 finance — 財務員工（L2）

> 讀 `finance/` 收支記錄 → 分類 + 加總 + flag 異常 → 寫返 `finance/<month>-report.md` 月報。

---

## 1. 完整 Skill.md

```markdown
# Skill: finance（財務整理）

## 觸發
當我講「整理今個月數」/「出月報」

## 讀（記憶來源）
- finance/<month>.md — 該月收支記錄（每行：日期 | 類別 | 收/支 | 金額 | 備註）

## 做（步驟）
1. 逐行 parse：分收入 / 支出
2. 按類別加總（教學 / 顧問 / 訂閱 / 工具…）
3. 算淨額（收 − 支）
4. Flag 異常：同類重複扣費、突然大額、負現金流
5. 出簡單月報（總收 / 總支 / 淨額 / 按類 / 異常清單）

## 寫返（output）
- finance/<month>-report.md
- frontmatter: month / net / flagged_count

## 安全
- 只讀只報，唔好改原始記錄
- flag 係 propose，金額對唔上要我自己核
```

---

## 2. Demo run（用 sample-vault 真 input）

**Input**：`sample-vault/finance/2026-05.md`（3 收 + 5 支，故意留咗 5/8 同 5/19 兩筆 Canva Pro）

**你打**：`整理今個月數`

**員工做**：加總 → 發現 5/8 同 5/19 都係 Canva Pro -160 → **flag 疑似重複扣費**。

**Output** → `finance/2026-05-report.md`：

```markdown
---
month: 2026-05
net: 15302
flagged_count: 1
---

# 2026-05 月報

- 總收入：21,500（客戶 GlowLab 12,000 / Velora 8,000 / Kaito Ramen 1,500）
- 總支出：6,198（訂閱 1,920 / 工具 78 / 雜項 4,200）
- 淨額：+15,302

## ⚠️ 異常
- Canva Pro -160 出現兩次（5/8 + 5/19）— 疑似重複扣費，請核對。
```

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句** — 「整理今個月數」改「埋數」「對賬」。
2. **改讀邊個 folder** — 用銀行 CSV？放 `finance/` 由員工 parse（或先轉統一格式）。每季出就讀三個月 file。
3. **改 output schema** — 想要 budget vs actual？喺記錄加 `budget/` 預算 file，月報加「超支幾多 %」。
4. **改自查規則** — 異常定義改你自己（大額門檻、邊啲類別唔准超）。可加「淨額連續兩個月負 → 大 flag」。

---

## 4. 常見伏

- **加錯數** = 記錄格式唔一致（有 `+`/有冇）。`## 做` 要明寫「`+` = 收、`-` = 支」。
- **員工改咗原始記錄** = 嚴禁。`## 安全` 明寫只讀只報。
- **私隱** = `finance/` 係機密 folder，AGENTS.md「資料邊界」要列明永不外洩，deploy 前 `npm run security:audit` 掃一次。
