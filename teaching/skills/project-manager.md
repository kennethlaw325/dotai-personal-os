# 📋 project-manager — PM 員工（L2）

> 讀 `tasks/ 40 - Daily/` → 統計 todo/doing/done + flag overdue + 揀今日 top 3 + 出本週 plan → 寫返 `40 - Daily/` 嘅 plan section。

---

## 1. 完整 Skill.md

```markdown
# Skill: project-manager（PM）

## 觸發
當我講「今日 plan」/「我而家應該做乜」（或每朝 Hermes 自動跑）

## 讀（記憶來源）
- tasks/*.md — 全部 task（id / title / status / created_at / due?）
- 40 - Daily/<today>.md — 今日 daily（如已有）

## 做（步驟）
1. 統計：todo / doing / done 各幾多
2. Flag overdue：有 due 且過咗期但未 done
3. 揀今日 top 3：doing 優先，其次 overdue，再其次最舊嘅 todo
4. 出本週 plan：剩底 task 分到禮拜幾（粗略）

## 寫返（output）
- 40 - Daily/<today>.md 嘅「## Today's Plan」section（top 3 + 一句 rationale）
- 唔覆蓋 Reflection / 其他 section

## 安全
- 唔好改 task 本身 status（淨係讀 + 出 plan）
- 揀唔到就照列，唔好作 task
```

---

## 2. Demo run（用 sample-vault 真 input）

**Input**：`sample-vault/tasks/`（t-001 doing / t-002 / t-003 / t-004 todo / t-005）+ daily checkbox tasks

**你打**：`今日 plan`

**員工做**：t-001「GlowLab IG carousel」係 doing → top 1；其餘按舊到新揀夠 3 條。

**Output** → `40 - Daily/2026-05-27.md` 嘅 plan section：

```markdown
## Today's Plan

今日 top 3（doing 優先）：
1. [[t-001]] 寫 GlowLab IG carousel — 已 doing，今日收尾
2. [[t-002]] ContentDeck zero-post alert verify — 卡住最耐
3. [[t-004]] Day 4 月度互動報告 — Week 2 起手

統計：1 doing / 4 todo / 0 overdue。
```

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句** — 「今日 plan」改「standup」「今日做咩好」。
2. **改讀邊個 folder** — task 散喺各 project folder？改 `## 讀` 做 `**/*.md` 掃所有 checkbox（sync script 已經咁做，員工跟同一邏輯）。
3. **改 output schema** — 想要週 plan 表（禮拜一到五）就喺 `## 寫返` 加 `## Week Plan` section，員工填。
4. **改自查規則** — top N 改你想要嘅數（top 1 極簡 / top 5）。overdue 定義改：用 `created_at` 超過 X 日都當 stale。

---

## 4. 常見伏

- **每日重覆同樣 top 3** = 員工改咗 task status 先得（但 PM 唔應該改 status）。靠你做完 task 自己 mark done，PM 下次就唔再揀。
- **overdue 永遠 0** = task 冇 `due` 欄位。要 flag overdue 就喺 task frontmatter 加 `due`。
