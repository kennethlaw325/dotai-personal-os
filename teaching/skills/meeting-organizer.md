# 🗒 meeting-organizer — 會議整理員工（L1）

> 讀 `00 - Inbox/` 原始會議筆記 → 摘要 + 抽 action items（標 owner / 限期）→ 寫返 `30 - Notes/` 摘要 + `tasks/` 每個 action 一個 task。

---

## 1. 完整 Skill.md

```markdown
# Skill: meeting-organizer（會議整理）

## 觸發
當我講「整理今次會議」/「執返呢個 meeting note」

## 讀（記憶來源）
- 00 - Inbox/ — 最新嗰份 type: meeting-raw 嘅原始筆記

## 做（步驟）
1. 讀原始筆記，抽出：決議 / 討論重點 / 未解問題
2. 寫一段 60-100 字摘要（人睇得明，唔係逐句抄）
3. 抽 action items：每個一行，標 owner（我 / 對方）+ 限期（有就寫，冇就標「待定」）
4. 我方 action → 每個開一個 task；對方 action → 摘要入面列住等跟

## 寫返（output）
- 30 - Notes/<YYYY-MM-DD> <會議題>.md — 摘要 + action 清單
- tasks/t-<id>.md — 每個「我方」action 一個（frontmatter: id/title/status: todo/created_at）

## 安全
- 唔肯定 owner / 限期 → 標「待定」，唔好作
- 原始筆記保留，唔覆蓋
```

---

## 2. Demo run（用 sample-vault 真 input）

**Input**：`sample-vault/00 - Inbox/meeting-2026-05-26-glowlab.md`（一段亂 jot 嘅 raw notes）

**你打**：`整理今次會議`

**員工做**：由 raw note 抽到 — 6 月淺色調主題、第一波 focus「IG carousel + XHS 種草」、我答應 3 件事、對方畀出帖數量 + PO。

**Output 1** → `30 - Notes/2026-05-26 GlowLab campaign kickoff 對接.md`：

```markdown
---
date: 2026-05-26
type: note
---

# GlowLab campaign kickoff 對接

## 摘要
GlowLab 6 月主題「淺色調夏日護膚」，內容可能分兩波出。第一波（暫定 6/30 拍攝）focus IG carousel + XHS 種草，未拍片。拍攝場地對方出，需我 confirm 燈光 + 背景。報價 range OK，等對方 PO。

## 我方 action
- Send pre-shoot checklist + 燈光/背景需求 → 見 tasks/
- 出正式 invoice → 見 tasks/
- Draft 第一波 content calendar（下星期一前）→ 見 tasks/

## 對方 action（跟）
- Confirm 實際出帖數量
- 畀 PO number（下星期）
```

**Output 2** → `tasks/t-006.md`（同樣開 t-007 / t-008）：

```markdown
---
id: t-006
title: Send GlowLab pre-shoot checklist + 燈光/背景需求
status: todo
created_at: 2026-05-26T18:00:00+08:00
---
```

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句** — 「整理會議」改你慣用嘅，例如「執 meeting」「跟進今日 call」。
2. **改讀邊個 folder** — 唔放 Inbox？指去你錄音轉文字嘅 folder（`transcripts/`）。一次過幾個會議就改成「讀今日所有 meeting-raw」。
3. **改 output schema** — 想 task 多個 `due` / `client` 欄位？喺 `## 寫返` 加，員工跟住填（`due: 2026-06-02`、`client: glowlab`）。
4. **改自查規則** — 加「每個 action 一定要有 owner」做硬 gate；或者「摘要唔准超過 120 字」。

---

## 4. 常見伏

- **抽漏 action** = raw note 太亂。提示員工「逐段掃，凡係『我答應 / 我會 / 跟進』都當 action」。
- **task 爆量** = 連對方 action 都開 task。`## 做` 講清楚淨係「我方」開 task。
