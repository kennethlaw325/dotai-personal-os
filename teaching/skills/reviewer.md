# 🔁 reviewer — 記憶庫審查員（自我進化引擎）

> 讀 `30 - Notes/ tasks/ clients/` → 跑四個 check（矛盾 / 過時 / orphan / 重複）→ 寫返 `00 - Inbox/_corrections/` 逐條建議（**唔改原筆記，等你批**）。

呢個係成套 OS 嘅「自我進化」關鍵：員工幫你做嘢，reviewer 幫你顧記憶庫質素。**永遠 propose，唔 silent-edit。**

---

## 1. 完整 Skill.md

```markdown
# Skill: reviewer（記憶庫審查員）

## 觸發
每週一次 / Hermes 排程（或我講「審查記憶庫」）

## 讀（記憶來源）
- 30 - Notes/ · tasks/ · clients/

## 做（四個 check）
1. 矛盾：兩篇講同一件事但結論相反（例：一篇話 paused、一篇話 resume）
2. 過時：status: doing 嘅 task 超過 N 日冇郁 / last_contact 太舊
3. Orphan：30 - Notes/ 入面冇任何 inbound [[wikilink]] 嘅 note
4. 重複：兩篇講緊同一個 atom，應該合併

## 寫返（output）
- 00 - Inbox/_corrections/<date>-review.md — 逐條建議（type / 證據 / 建議動作）
- 唔改原筆記
- （功能版 AI Office view）`node scripts/log-agent.mjs reviewer done <條數>` 令 dashboard 都見到引擎跑過（reviewer 係自我進化引擎，**唔計入 10 員工** headcount）

## 安全
- 只 propose，唔 auto-fix
- 每條建議要附「邊兩篇 / 邊個 task」證據，等我自己 judge
```

---

## 2. Demo run（用 sample-vault 真 input）

sample-vault 我哋**故意埋咗幾個地雷**畀 reviewer 揾：

- **矛盾**：`30 - Notes/2026-05-22 Velora launch 改期到 6 月.md`（改 6 月）vs `2026-05-18 Velora launch 維持 5 月底.md`（維持 5 月底）
- **Orphan**：`2026-05-18 Velora launch 維持 5 月底.md` 冇人 link 入嚟
- **過時**：`tasks/t-001.md` status: doing，由 5/23 到而家未郁

**你打**：`審查記憶庫`

**Output** → `00 - Inbox/_corrections/2026-05-31-review.md`：

```markdown
---
date: 2026-05-31
type: correction-suggestion
---

# 記憶庫審查（4 check）

## ⚠️ 矛盾（1）
- [[2026-05-22 Velora launch 改期到 6 月]] 話順延，[[2026-05-18 Velora launch 維持 5 月底]] 話維持 5 月底。
  建議：確認最新狀態，過時嗰篇加 `superseded` 或合併。

## 🔗 Orphan（1）
- [[2026-05-18 Velora launch 維持 5 月底]] 冇 inbound link。
  建議：link 入 Velora MOC，或 archive。

## ⏳ 過時（1）
- t-001「GlowLab IG carousel」doing 由 2026-05-23，8 日未郁。
  建議：拆細 / 改 todo / close。

## 🔁 重複（0）
```

> 留意：reviewer **只寫入 `_corrections/`**，原本嗰幾篇筆記原封不動 — 等你 daily-review 時逐條批。

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句 / 頻率** — 每日太煩就每週；交 Hermes 排程自動跑（morning routine）。
2. **改讀邊個 folder** — 加 `_drafts/`（揾未完成 draft）/ `finance/`（揾未對賬月份）。
3. **改 output 位** — `_corrections/` 改你 daily-review 會睇嘅位；想分流可加 `_gaps/`（盲點）vs `_corrections/`（錯）。
4. **改 check 規則** — 「過時」門檻（doing 過 7 定 14 日）；加你自己 check（例：標題有 `+`/`、` = 多主題要拆）。

---

## 4. 常見伏

- **reviewer 擅自改筆記** = 最嚴重違規。死守「只 propose、寫 `_corrections/`」。（呢個就係「AI 審計、你批准」嘅閉環，唔好 silent-edit。）
- **建議冇證據** = 冇用。每條要指明邊兩篇 / 邊個 task，你先 judge 得。
- **orphan 誤報** = wikilink 寫錯（`[[t-001]]` vs 真檔名）。check 前先確認 link target 真係存在。
