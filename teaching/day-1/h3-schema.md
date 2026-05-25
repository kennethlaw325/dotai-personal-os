# Day 1 H3 — 我想加 reading list 入我個 OS（60 min）

## 目標

學員 follow 完一個完整 demo：「我想加 reading list 入 personal OS」由 0 行到完。學員睇完之後識自己加任何 entity（habit / project / contact / decision...）。

呢小時用一個 **concrete example** 教，唔講抽象嘅 layer / coupling 等架構名。

---

## 範例：加 reading list

老師整 hour 跟住做 4 件事：

1. 喺 vault 開 `reading/` folder + 寫 3 本書 sample
2. 喺 dashboard 加新 view 顯示
3. Codex 配合每一步
4. 學員 mirror 自己加另一個 entity（自選）

---

## Step 1 — 喺 vault 開 reading/ folder（10 min）

學員喺 Obsidian app：

1. 揀位（例：自己 vault root）→ create new folder「reading」
2. 喺 reading folder 入面 create 3 本書嘅 markdown：

`reading/r-001.md`：
```
---
id: r-001
title: 《Building a Second Brain》
author: Tiago Forte
status: reading
started_at: 2026-04-15
finished_at: null
rating: null
---

Tiago 嘅 CODE framework: Capture / Organize / Distill / Express。
```

`reading/r-002.md`：
```
---
id: r-002
title: 《The Manager's Path》
author: Camille Fournier
status: finished
started_at: 2026-02-01
finished_at: 2026-03-20
rating: 5
---
```

`reading/r-003.md`：
```
---
id: r-003
title: 《Designing Data-Intensive Applications》
author: Martin Kleppmann
status: not-started
started_at: null
finished_at: null
rating: null
---
```

**老師 commentary**：
- Frontmatter 入面嘅 field 係你**自己 design** — 你想 capture 咩 info，自己決定
- 重點唔係 follow 我啲 field 名，係**揀適合你嘅 metadata**

---

## Step 2 — 改 sync-vault.mjs 加新 entity（15 min）

Vault 有咗 file，要將 frontmatter 食出嚟做 JSON。

學員開 Codex Desktop chat：

```
@cwd dotai-personal-os

我嘅 vault `reading/` folder 入面每個 markdown 有 frontmatter：
- id (string)
- title (string)
- author (string)
- status: "not-started" | "reading" | "finished"
- started_at (date 或 null)
- finished_at (date 或 null)
- rating: 1-5 或 null

跟 scripts/sync-vault.mjs 入面 syncTasks() 嘅 pattern，
加一個 syncReadingList() function：
- 讀 reading/*.md
- 食 frontmatter
- 寫去 public/data/reading.json
- main() 入面 await + console.log summary

唔好 rewrite 其他 function，淨係加新 function + main() 入面加 await。
```

Codex 會：
1. 讀 sync-vault.mjs 已有嘅 syncTasks pattern
2. Mirror 出 syncReadingList()
3. 寫入新 code（學員 review + accept）

學員跑 verification：
```bash
npm run sync:vault
# Console 應該見到「reading.json ← 3 books」
cat public/data/reading.json
# 見到 3 本書嘅 JSON
```

**老師 commentary**：
- 呢度教學重點：**reuse 已有 pattern 比由零起寫快好多**
- Codex 跟 syncTasks pattern 出 syncReadingList = consistent style，將來易維護
- 落手寫 code 之前先問 Codex 「mirror 邊個 pattern」係 best practice

---

## Step 3 — 加新 view 顯示 reading list（20 min）

JSON 有咗，要 frontend render 出嚟。

學員 Codex prompt：

```
@cwd dotai-personal-os

我想加新 view ReadingListView：
- 讀 /data/reading.json (array of { id, title, author, status, rating })
- 按 status 分 3 個 group：reading / not-started / finished
- 每 group 一個 card，入面 list books
- 每本書顯示 title + author + rating (★ × rating，0/null 顯示 "—")

跟 src/views/TasksView.tsx 嘅 5 步 pattern：
1. import + types
2. function 名 + export default
3. useState 揾 data
4. useEffect 拎 data
5. render（包 loading + empty state）

寫入 src/views/ReadingListView.tsx。
記得喺 src/lib/types.ts 加 Reading interface。
唔好改其他 view。
```

Codex 出 code → 學員 review → save。

老師 narrate Codex 寫 嘅 code 每一段做咩（唔需要學員逐行 type，但要明白）。

跟住 wire 入 App.tsx：

```
@cwd dotai-personal-os

src/App.tsx 加多一個 view 「reading」：
- 加 import { BookMarked } from 'lucide-react'
- 加 import ReadingListView from './views/ReadingListView'
- View type 加 'reading'
- NAV array 加 { id: "reading", label: "Reading", icon: BookMarked }
- 條件 render 加 {view === "reading" && <ReadingListView />}

只 diff 改動，唔 rewrite 成個 App.tsx。
```

學員跑：
```bash
npm run sync:vault  # 確認 reading.json 喺度
npm run dev          # localhost:5173 應該見多咗 Reading 入 sidebar
```

切去 Reading view → 3 本書按 status 分 3 個 group render。

**Wow moment**：30 分鐘前 vault 入面 0 reading list data，而家 dashboard 已 render。

---

## 補充：學員 vault 用 Obsidian Tasks plugin checkbox syntax 嘅情況

有啲學員自己 vault 用緊 **Obsidian Tasks plugin** 嘅 `- [ ] task title` checkbox 格式，唔係我哋樣板嘅 `tasks/*.md` frontmatter 格式。

兩種 sync-vault.mjs 都食得：

- **Frontmatter task** (`tasks/*.md` file)：精細 — 有 id / created_at / 完整 description body
- **Checkbox task** (任何 .md 入面嘅 `- [ ]` line)：輕量 — 只有 title + status，ID 自動 generate (cb:<path>:<line>)

Checkbox 嘅 status mapping：
- `- [ ]` → todo
- `- [/]` 或 `- [-]` → doing
- `- [x]` 或 `- [X]` → done

學員用邊種都得，dashboard 一齊 render（Tasks view 入面唔分 source）。

範例 sample-vault 嘅 `40 - Daily/2026-05-25.md` 入面有 4 個 checkbox task，sync 後同 frontmatter tasks 一齊出。

---

## Step 4 — 學員 mirror 自己加 entity（15 min）

每位學員提一個自己想加嘅 entity（限制 1 個）：

範例選項：
- habits（id / name / streak / last_done_at）
- projects（id / name / status / last_active_at）
- contacts（id / name / company / last_contacted_at）
- decisions（id / question / decision / decided_at / reason）

每位學員：
1. 喺自己 vault 開 folder + 寫 2-3 個 sample
2. Codex 配合改 sync-vault.mjs + 加 view + wire 入 App
3. 跑 verify

老師 + TA 1:5 onsite handle TS error / type mismatch。

---

## Codex prompt 範例（H3）

```
@cwd dotai-personal-os

vault frontmatter 加多一個 `tags: [...]` field 比 task。
列出要改邊幾個 file + 每個 file 改邊 part：
（注：唔好寫 code，先列出 plan）
```

```
@cwd dotai-personal-os/scripts/sync-vault.mjs

我跑 npm run sync:vault 之後 reading.json 係空 array []，
但我 vault 入面 reading/ folder 真係有 3 個 file。

幫我 debug：
1. 邊一行 code 有 bug
2. 點 fix
3. fix 之後點 verify
```

## 完成標準

- [ ] 每位學員加咗自己嘅 entity 入 vault
- [ ] sync-vault.mjs 加咗對應 syncXxx() function
- [ ] dashboard 加咗新 view 顯示自己嘅 entity
- [ ] 學員可以自己揀新 entity（唔需要 follow 樣板 list）
- [ ] 學員理解 reuse 已有 pattern 嘅 power（mirror pattern > 由零起寫）
