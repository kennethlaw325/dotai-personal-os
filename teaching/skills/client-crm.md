# 🤝 client-crm — 客戶 CRM 跟進員工（L2）

> 讀 `clients/ 40 - Daily/` → 算每個客戶幾耐冇 touch + 排序 + 對最耐嗰幾個出下一步 → 寫返 `clients/`（更新 last_contact）+ `tasks/` 開跟進。

L2 = 唔止總結，仲要**比較 + 排序 + 出建議**。

---

## 1. 完整 Skill.md

```markdown
# Skill: client-crm（客戶 CRM 跟進）

## 觸發
當我講「跟進客戶」/「邊個客好耐冇覆」

## 讀（記憶來源）
- clients/*.md — 每個客戶一個 file（frontmatter: name / status / last_contact）
- 40 - Daily/ 近 14 日 — 補返最近有冇提過邊個客

## 做（步驟）
1. 讀晒 clients/，攞每個嘅 last_contact
2. 對 daily 近 14 日掃一次：有提到某客 → 更新佢 last_contact
3. 算「距今幾多日冇 touch」= 今日 − last_contact
4. 由耐到近排序，flag 超過 30 日 + status: active/cold 嘅
5. 對最耐嗰 2-3 個，各出一條具體下一步建議

## 寫返（output）
- clients/<name>.md — 更新 last_contact（如 daily 有新 touch）
- tasks/t-<id>.md — 對 flag 咗嘅客各開一個「re-engage」task

## 安全
- 改 clients/ frontmatter 前 show diff
- 唔好亂改 status（active↔cold 要我確認）
```

---

## 2. Demo run（用 sample-vault 真 input）

**Input**：`sample-vault/clients/`（glowlab 5/24 / velora 5/21 / kaito-ramen 4/15）+ `40 - Daily/2026-05-26.md`（提到三個客）

**你打**：`跟進客戶`（假設今日 2026-05-27）

**員工做**：
- glowlab：last_contact 5/24 → 3 日，OK
- velora：5/21 → 6 日，OK
- kaito-ramen：4/15 → **42 日，flag** ⚠️

**Output 1** → `tasks/t-009.md`：

```markdown
---
id: t-009
title: Re-engage Kaito Ramen（42 日冇 touch）
status: todo
created_at: 2026-05-27T09:00:00+08:00
---

下一步建議：佢 4 月話「再諗開幕日期」之後斷咗。send 一條輕 touch，附最近一個餐飲開幕 campaign case，問開幕日期定咗未。
```

**Output 2**：`clients/glowlab.md` 嘅 `last_contact` 由 daily 確認更新（如有新 touch）。

---

## 3. 點改成你自己版本（4 個旋鈕）

1. **改觸發句** — 「跟進客戶」改「睇下個 pipeline」「邊單要 chase」。
2. **改讀邊個 folder** — 唔用 `clients/`？指去你 CRM export 嘅 folder。daily 唔記低客戶 touch 就刪第 2 步。
3. **改 output schema** — `clients/` 想加 `deal_value` / `stage`（lead→proposal→won）？加咗員工排序時可以「按金額 × 冷度」加權。
4. **改自查規則** — 30 日門檻改你自己節奏（高頻客 14 日、長線客 60 日）。可以喺每個 client frontmatter 加 `cadence_days` 各自設定。

---

## 4. 常見伏

- **日期計錯** = 確保 last_contact 係 ISO 格式（`2026-04-15`），唔好寫「上個月」。
- **flag 晒所有客** = 門檻太緊 + 冇睇 status。明寫淨係 flag `active`/`cold`、跳過 `won`/`archived`。
- **改 status 亂咁改** = 一定要人確認，員工只可以 propose。
