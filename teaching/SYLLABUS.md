# Level 2 Syllabus — 點砌個人 OS

## 目標

學員兩日完之後可以：

1. 由零起 deploy 一個跑得起嘅 personal OS frontend（localhost prod build）
2. 用 Obsidian vault 做 database，整 schema + sync 入 frontend
3. 用 Codex CLI 拆 component / 寫新 view / debug type error
4. 跟 Git workflow 管理 vault + dashboard 兩條 repo
5. 識用 LLM 將 raw vault data 統整做 insight

## Format

- **時間**：2 日 × 4 hr = 8 hr 總共
- **班制**：1 老師 + 1 TA / 5 學員
- **環境**：學員機（自帶 laptop）+ 預裝 Node 22.x + Git + Codex Desktop（全程做 IDE，有內建 file output window + terminal，唔需要另外 VS Code）
- **架構**：localhost only（per 5/24 client align「Cloud Codex 都唔用」）

## Day 1 — Foundation (4hr)

| Hour | 主題 | Deliverable |
|------|------|------|
| H1 | Base dashboard 第一次跑起 | `npm install` + `npm run dev` localhost:5173 render 4 個 view，sample vault data |
| H2 | Obsidian MCP setup + Codex Desktop 第一次讀 vault | Codex 用 MCP 列出 vault folder + 一條 sample task |
| H3 | Schema design + 自己 vault import | 學員揀自己 vault folder，跑 sync → 自己 task / daily / draft render |
| H4 | Codex 寫新 component 讀 JSON | 學員提 spec → Codex 出 component → wire 入 view |

詳情：`day-1/h1-base.md` / `day-1/h2-mcp.md` / `day-1/h3-schema.md` / `day-1/h4-codex-component.md`

## Day 2 — Production (4hr)

| Hour | 主題 | Deliverable |
|------|------|------|
| H1 | Git workflow + Codex 配 Git | 學員 fork → branch → commit (Codex 寫 message) → push → PR |
| H2 | LLM 統整 raw → insight | weekly top topic / overdue task / stale project alert，Codex 寫 aggregation script |
| H3 | Hands-on：學員加自己 feature live coding | 每學員 propose 1 feature，老師 + Codex 配合 ship |
| H4 | Polish + 展示 + (可選) Deploy 示範 + Q&A + teaser | 學員 demo 自己 OS；可選 deploy walkthrough（reference `deploy-your-own.md`）；teaser Level 3（multi-device sync + 2-way write back + mobile） |

詳情：`day-2/h1-git.md` / `day-2/h2-llm-aggregation.md` / `day-2/h3-handson.md` / `day-2/h4-polish.md`

## Bonus / Post-class material

- `deploy-your-own.md` — 學員自己 deploy 上 Vercel 嘅完整教學（私隱 control / Basic Auth / noindex）。Day 2 H4 可選示範 30 min，或者課後 self-paced。

## Pre-class (學員開課前一週做)

- **裝環境**：Node 22 / Git / Codex Desktop / Obsidian (free vault)
- **讀 pre-class checklist**：`pre-class-checklist.md`（裝環境 + Norton SSL workaround + Git mental model + Codex Desktop 5 動作）
- **fork 呢個 repo**：跟 `github-basics.md` Step 1-4

## Risk + mitigation

| Risk | Mitigation |
|------|------|
| 學員 vault 太亂 sync 唔到 | 派樣板 vault；學員可以選擇用樣板 OR 自己 vault |
| Obsidian MCP setup buffer | H2 預 60 min（30 setup + 30 demo），TA 1:5 onsite 幫手 |
| 拖時 | 每 hour checkpoint：H1 跑起未？跑唔起跳去 H2 demo |
| 學員 Git 完全唔識 | 預一週前 share `pre-class-checklist.md` 內含 Git mental model |
| Live coding chaos | 1 老師 1 TA 1:5 ratio |
| 學員想要 feature 超能力（example：dual-direction sync 即時 push 返 vault） | 預 3 個 backup reasonable scope feature 樣板，引導學員 redirect |

## 教學原則

1. **Workflow 為主，唔教 framework detail**。React hooks 細節學員自學，課堂 focus 喺 vault → JSON → render 條 pipeline。
2. **Codex 係 partner 唔係 magic**。每次提 prompt 都要學員理解 Codex 寫嘅 code 做緊咩。
3. **每 hour 一個 wow moment**。學員「立即見到嘢」嘅 reward loop 維持 momentum。
4. **錯咗都 OK**。Live coding 出 type error / build fail 係 best teaching moment — 示範 Codex 點 debug。
