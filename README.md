# Personal OS — Level 2 Skeleton

> Codex 網課 Level 2 教材 base codebase。Workflow-first，concept-only on 全端 detail。

## 一句講晒

呢個係 Jimmy 客戶 Codex 網課 **Level 2 (7 月頭，8hr × 2 day)** 嘅教學 base。學生 fork 呢個 repo，跟 `teaching/` folder 入面嘅 step-by-step workflow，build 自己嘅個人 OS。

**唔係**：production app，唔係 Jimmy 個 monolithic 5478-line dashboard 嘅 fork。

**係**：deliberately minimal scaffold + Obsidian-as-DB + 5 個 view，俾學生實際操作 + 自己加 feature。

## 架構

```
Obsidian vault  →  sync-vault.mjs (Node)  →  public/data/*.json  →  React app (Vite)
                          OR
                   Obsidian MCP via Codex Desktop  →  public/data/*.json
```

- **Database** = Obsidian markdown 文件（vault folder + frontmatter）
- **Sync layer** = Node script 食 `gray-matter` + `fast-glob`（或 Codex Desktop + Obsidian MCP）
- **Frontend** = Vite + React 18 + TypeScript + Tailwind v3
- **"Deploy"** = `npm run build` + `npm run preview` localhost:4173（per 5/24 client align「localhost only」）
- **Version control** = GitHub repo, 學生由 fork 開始操作

## 5 個 view

| View | 功能 | Vault source |
|------|------|------|
| **Today** | 今日 plan，task ID 順序 | `40 - Daily/<today>.md` frontmatter `task_ids` 或 body `## Today's Plan` section |
| **Tasks** | Task list with status (todo/doing/done) | `tasks/*.md` frontmatter |
| **Daily Note** | 過往 daily reflection | `40 - Daily/*.md` body |
| **Vault Health** | Inbox count + orphan count + recent atom notes | `00 - Inbox/` + `30 - Notes/` + wikilink graph |
| **Content Pipeline** | Cross-platform drafts kanban | `_drafts/*.md` frontmatter |

呢 5 個 view = 3 base (Capture / Plan / Reflect closed loop) + 2 on-top tailored to Kenneth workflow (vault maintenance + content production)。

## 點跑

```bash
# 1. 裝 dependencies
npm install

# 2. Sync sample vault → JSON
npm run sync:vault

# 3. Dev server
npm run dev
# 開 http://localhost:5173

# 4. Production build
npm run build

# 5. Preview production
npm run preview
# 開 http://localhost:4173
```

## 用自己嘅 vault

```bash
# Windows PowerShell:
$env:VAULT_DIR = "C:/Users/Kenneth/Desktop/Obsidian"; npm run sync:vault

# Mac / Linux:
VAULT_DIR=/path/to/your/vault npm run sync:vault
```

需要 vault 入面有：
- `tasks/*.md` 每個 task 一個 file，frontmatter 有 `id` + `title` + `status` + `created_at`
- `40 - Daily/<YYYY-MM-DD>.md` daily notes，frontmatter optional `task_ids: [...]`
- `_drafts/*.md` content drafts，frontmatter 有 `title` + `platform` + `status` + `updated_at`
- `00 - Inbox/` + `30 - Notes/` folders（俾 vault health 統計）

## 教學 path

睇 `teaching/` folder：

- `teaching/day-1/` — Day 1 (4hr) 4-hour workflow
- `teaching/day-2/` — Day 2 (4hr) 4-hour workflow
- `teaching/prompts/` — 每 hour 對應嘅 Codex prompt 庫
- `teaching/github-basics.md` — clone / branch / commit / push / PR 入門
- `teaching/pre-class-checklist.md` — 開課前 5min video script

## 設計原則

1. **Vault 係 source of truth**。Frontend 唔擁有 data，只係 vault 嘅 render layer。
2. **Workflow > feature**。Level 2 教 「點砌一個 personal OS」，唔教 「Express + SQLite 點 wire」。
3. **Minimum that closes the loop**。Capture / Plan / Reflect 3 base 已 cover GTD / Building a Second Brain core。其他都係 syntactic sugar。
4. **Codex 係 build partner，唔係 code generator**。學生用 Codex 拆 component / 解 type error / refactor，唔係 dump prompt 出 5000-line app。

## 對應 Jimmy 個 monolithic repo

| Aspect | Jimmy repo | Level 2 skeleton |
|--------|------------|------------------|
| Single-file size | App.jsx 5478 lines | 每 view < 200 lines |
| Tests | 0 | 0 (Day 2 H3 學員加) |
| TS | No | Yes (strict) |
| Backend | Express + SQLite | None (static JSON + sync script) |
| Database | SQLite `data/app.db` | Obsidian vault |
| Deploy | Railway / Vercel / Docker | localhost preview |
| Views | 5 (Tasks / Plan / Calendar / Knowledge / Review) | 5 (Today / Tasks / Daily Note / Vault Health / Content Pipeline) |
| AI | 內建 Anthropic / Gemini / OpenAI | Out (Day 2 H2 教 Codex CLI 點 wire) |

學生由 Level 2 skeleton 起步，理解 closed loop → 跟 teaching workflow 加 feature → 自己 evolve 去類似 Jimmy 個 maximum design 嘅方向（或者揀唔同方向）。

## 開放式問題（implementation-notes.html 全載）

睇 `implementation-notes.html`：4 sub-section per phase（設計決策 / 偏離情況 / 價值取捨 / 開放式問題），由 Phase 0 scope lock 到 Phase 4 verification 全程 trace。

## License

教學用途。學生 fork 隨意 modify。
