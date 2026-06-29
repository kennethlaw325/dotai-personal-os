# 💬 whatsapp-secretary — WhatsApp 私人秘書員工（L3）

> 讀訊息（Hermes 原生連接）→ 分類 + 起草回覆 + 提你跟進 → 寫返 `tasks/` 跟進 + draft 回覆。

L3 重點：用 **Hermes 原生**收發，唔使自己砌橋接。

---

## 1. 完整 Skill.md

```markdown
# Skill: whatsapp-secretary（私人秘書）

## 觸發
當我講「睇下啲訊息」/ 每朝 Hermes 排程

## 讀（記憶來源）
- hermes whatsapp（個人帳號）或 hermes whatsapp-cloud（Business Cloud API）
- 或 hermes gateway 接 Telegram / Discord
- （冇 Hermes：用訊息 export 檔代替）

## 做（步驟）
1. 攞未讀訊息
2. 分類：要回 / 要跟進 / 可略
3. 「要回」→ 跟 sop/content-voice.md 語氣起草回覆（唔自動發）
4. 「要跟進」→ 開 task

## 寫返（output）
- tasks/t-<id>.md — 每個「要跟進」一個
- 30 - Notes/<date> 訊息草稿.md — 「要回」嘅 draft 回覆（等我過目先發）

## 安全
- 絕不自動發送 — 一律 draft 等我撳掣
- 私人對話內容唔好寫入會 deploy 嘅 public 區
```

---

## 2. Demo run

> 呢個員工要真 Hermes 連接先跑到。課堂用 Hermes demo 帳號，或者用一份匿名訊息 export（`sources/messages-sample.txt`）代替，pattern 一模一樣。

**你打**：`睇下啲訊息`

**員工做**（示意）：
- 「GlowLab Karen Lai：confirm 出帖數量」→ 要跟進 → 開 task「更新 GlowLab 出帖數量 + lock 拍攝場地」
- 「朋友問食飯」→ 要回 → 起草「得呀，禮拜五點？」
- 「promo 訊息」→ 可略

**Output**：`tasks/` 開 1 條跟進 + `30 - Notes/` 一段 draft 回覆（等你發）。

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句** — 「睇下啲訊息」改「今日有咩 message」「秘書 update」。
2. **改讀邊個 channel** — WhatsApp 改 Telegram / Discord：`hermes gateway` 一行改，skill 唔使動。
3. **改 output schema** — 想分人 / 分群組統計？draft frontmatter 加 `from` / `priority`。
4. **改自查規則** — 邊類自動歸「可略」（promo / 群組 @all）由你定；「要回」可加白名單（老闆 / 客戶優先）。

---

## 4. 常見伏

- **自動發送出事** = 最大紅線。一律 draft，永不 auto-send。
- **私隱外洩** = 訊息內容唔好入 `public/data/` / 唔好 commit。deploy 前 `npm run security:audit`。
- **冇 Hermes 就卡死** = 課堂先用 export 檔示範同一 pattern，學員裝好 Hermes 再駁原生。
