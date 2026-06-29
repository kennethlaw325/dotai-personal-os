# 逐個 Skill 詳細教學（10 員工 + reviewer）

課程 A2 附錄畀你每個員工嘅 4 行 spec card；呢度係**完整版**。每份都有同一結構：

1. **完整 Skill.md** — 真範本，copy 落你 agent 嘅 skill 位，改 `<...>` 就用得。
2. **Demo run** — 用 `sample-vault/` 真 input 跑一次，畀你睇 input → output 實際長乜樣。
3. **點改成你自己版本** — 4 個旋鈕：改觸發句 / 改讀邊個 folder / 改 output schema / 改自查規則。
4. **常見伏** — 邊度最易撞板。

## 點用呢個 folder

- 課堂手把手砌其中 **3-4 個**（建議 content-creator + meeting-organizer + client-crm + reviewer），其餘照呢度自己填。
- 每個員工都係**同一形狀**：`input → 讀記憶 → 處理 → output → 寫返 vault`。睇熟一個，其餘係換 folder + 換規則。
- 全部統一 template 喺 `../prompts/`（如有）同課程附錄 A。

## 10 員工 + reviewer

| 員工 | 難度 | 教學 | 讀 | demo input |
|---|---|---|---|---|
| ✍️ content-creator | L1 | [content-creator.md](content-creator.md) | sop/ · 30-Notes/ · _drafts/ | `sop/content-voice.md` + `30 - Notes/2026-05-21 小紅書種草 vs IG 種草.md` |
| 🗒 meeting-organizer | L1 | [meeting-organizer.md](meeting-organizer.md) | 00-Inbox/ | `00 - Inbox/meeting-2026-05-26-glowlab.md` |
| 📄 doc-processor | L1 | [doc-processor.md](doc-processor.md) | 指定文件 | `00 - Inbox/clipped-article.md` |
| 🤝 client-crm | L2 | [client-crm.md](client-crm.md) | clients/ · 40-Daily/ | `clients/*.md`（kaito-ramen 故意冷） |
| 📋 project-manager | L2 | [project-manager.md](project-manager.md) | tasks/ · 40-Daily/ | `tasks/*.md` |
| 💰 finance | L2 | [finance.md](finance.md) | finance/ | `finance/2026-05.md`（埋咗重複扣費） |
| 📊 excel-analyst | L3 | [excel-analyst.md](excel-analyst.md) | CSV / Excel | `data/platform-engagement-2026-05.csv` |
| 🔭 trend-research | L3 | [trend-research.md](trend-research.md) | niche + 來源 | `sop/trend-niche.md` |
| 🧩 data-consolidation | L3 | [data-consolidation.md](data-consolidation.md) | 多來源 | `sources/contacts-*.csv`（欄位大細階唔同） |
| 💬 whatsapp-secretary | L3 | [whatsapp-secretary.md](whatsapp-secretary.md) | Hermes 原生 | （Hermes demo / 訊息 export） |
| 🔁 reviewer | — | [reviewer.md](reviewer.md) | 30-Notes/ · tasks/ · clients/ | 故意埋咗矛盾 + orphan + 過時 |

## 安全（每個都一樣）

- mutating 操作先喺假 data 試；改 file 前 show diff。
- 機密 folder（`finance/` · 私人訊息）唔好寫入 `public/data/` / 唔好 commit。
- deploy 前跑 `npm run security:audit`。
- reviewer 同所有員工：**propose 唔 silent-edit**，等你批。

> demo 地雷（畀 reviewer 揾）：`30 - Notes/2026-05-18 Velora launch 維持 5 月底.md` 同 `2026-05-22 Velora launch 改期到 6 月.md` 矛盾 + 前者 orphan；`tasks/t-001.md` doing 過耐。

## dashboard：你 build 功能版，靚版係老師 demo

呢 11 個 skill 嘅「寫返 dashboard」step 接到**你 Part 2 親手 build 嘅功能版 AI Office view**：

- 接口 = `public/data/agents.json`（run-log：id / lastRun / outputCount / status）
- 每個 skill 收尾：`node scripts/log-agent.mjs <id> done <n>` → dashboard 該員工著燈
- reviewer 係自我進化引擎，**唔計入 10 員工** headcount

> 老師會喺堂上 localhost demo 一個好睇版「AI 辦公室總覽」（純前端、Obsidian 做 database、glassmorphic）show 你睇個天花板有幾高——**唔派 repo**。你帶得走嘅係呢個功能版 base，想靚就自己喺上面 style。

### 10 員工 = 10 skill（功能版 roster）

| # | role | skill id（= 呢度教學檔名） | trigger |
|---|---|---|---|
| 01 ✍️ | 內容創作 | content-creator | draft 一篇 [平台] 帖，主題 X |
| 02 🔎 | 調研 | trend-research | 我 niche 今日有咩值得睇 |
| 03 📊 | 數據分析 | excel-analyst | 分析呢個 CSV／Excel |
| 04 📝 | 會議摘要 | meeting-organizer | 整理今次會議 |
| 05 🤝 | 客戶關係 | client-crm | 跟進客戶 |
| 06 🧭 | 專案管理 | project-manager | 今日 plan |
| 07 💰 | 財務 | finance | 整理今個月數 |
| 08 📄 | 文件處理 | doc-processor | 處理呢份文件（摘要／改寫／翻譯／格式化） |
| 09 🗂️ | 資料整合 | data-consolidation | 合併呢幾個來源 |
| 10 🤖 | 個人助理 | whatsapp-secretary | 睇下啲訊息 |
