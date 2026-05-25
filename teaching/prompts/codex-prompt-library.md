# Codex Prompt 庫（每 hour 對應）

教學期間老師同學員照用。Pattern：`@cwd <folder>` + 具體 instruction + 約束。

## Day 1 H1 — Base dashboard

```
@cwd dotai-personal-os
我跑 npm run dev 出咗以下 error：
<paste error>

唔好寫 code 住，先解釋呢個 error 嘅 root cause + 邊個 file 邊一行有問題。
```

```
@cwd dotai-personal-os
src/App.tsx 入面 useState<View>('today') 嘅 generic <View> 係做咩用？
為咩唔可以直接 useState('today')?
```

```
@cwd dotai-personal-os
src/views/TasksView.tsx 入面 useEffect 第 2 個 argument [] 係做咩用？
如果 remove 咗會點？
```

## Day 1 H2 — MCP

```
我 Codex Desktop 已 wire Obsidian MCP。
列出 `tasks/` folder 入面所有 markdown file，每個 output 一行：filename + status frontmatter。
```

```
讀我 vault 嘅 `tasks/*.md`，將每個 frontmatter (id / title / status / created_at) 整合做 JSON array，
然後寫入 `dotai-personal-os/public/data/tasks.json`。

要求：
- valid JSON
- 排序 by created_at desc
- 顯示 sync summary (幾多 file → 幾多 task)
```

```
比較 sync-vault.mjs (Node) vs Codex Desktop + Obsidian MCP 一句 prompt 嘅 trade-off。
邊個 production 用？邊個 prototype 用？點解？
```

## Day 1 H3 — Schema

```
@cwd dotai-personal-os/scripts
參考 sync-vault.mjs 入面 syncTasks() 嘅 pattern，
幫我加一個 syncHabits() function — 我 vault 入面 `habits/*.md` 每個 file 嘅 frontmatter 有 id / name / streak / last_done_at。
記得喺 main() 入面 await 同 console.log summary。
```

```
@cwd dotai-personal-os
我想 frontmatter 加一個 `tags: [...]` field 俾 task。
要點改：
1. tasks/*.md sample file
2. src/lib/types.ts Task interface
3. scripts/sync-vault.mjs syncTasks function
4. src/views/TasksView.tsx 點 render tags chip

逐步 walk through，唔好一次 dump 4 file。
```

## Day 1 H4 — Component

```
@cwd dotai-personal-os

要求：
喺 `src/views/ReadingListView.tsx` 寫一個 component：
- 讀 `/data/reading.json`，返 Array<{ id, title, author, status, rating }>
- Group by status: not-started / reading / finished
- 每個 group 一個 card，入面 list books
- "rating" 顯示 ★ × rating，0/null 顯示 "—"

跟 src/views/TasksView.tsx 嘅 5 步 pattern：import + types / function / state / effect / render。
寫 strict TS。
```

```
@cwd dotai-personal-os
我啱啱 paste Codex 寫嘅 ReadingListView.tsx，Codex Desktop output window 紅線：
"Property 'rating' is possibly 'null' but is treated as number on line 23"

幫我解釋呢個 error，同提議 2 個 fix（type narrow / default value），講邊個 idiomatic。
```

## Day 2 H1 — Git

```
@cwd dotai-personal-os

我 stage 咗以下改動：
<paste git diff --staged>

幫我寫一句 commit message：
- conventional commits format
- 一行 ≤ 60 char
- focus 喺 WHY 唔係 WHAT
```

```
我啱啱 git push 出 error：
"Updates were rejected because the remote contains work that you do not have locally."

幫我 diagnose + propose 安全 fix（唔好建議 force push）。
```

## Day 2 H2 — LLM aggregation

```
@cwd dotai-personal-os

讀以下 vault data：
- public/data/tasks.json
- public/data/daily-notes.json (近 7 日)

寫一段 ≤ 100 字粵語 morning brief：
- 今日 3 件要做
- 本週做最多嘅範疇
- 任何 risk signal（task overdue / draft 卡）

直接 output 段 text，唔好寫 code。
```

```
@cwd dotai-personal-os/scripts/insights.mjs
我嘅 stuckDrafts() 想加：
按卡 day 數 desc 排序。

只改 stuckDrafts 部分，唔 rewrite 成個 script。
```

## Day 2 H3 — Hands-on

```
@cwd dotai-personal-os

我要 ship 以下 feature：tasks 加 tag filter。

要求：
1. src/lib/types.ts Task interface 加 `tags: string[]` field
2. scripts/sync-vault.mjs syncTasks() parse frontmatter tags array
3. src/views/TasksView.tsx：
   - 喺 list 上方加 tag chip row，每個 tag click toggle filter
   - 用 useState<string | null> filter state
   - 顯示 filtered tasks count
4. sample-vault/tasks/t-001.md 加 sample tags ["content", "deadline"]

唔好寫 test，唔好 rewrite 唔關事嘅 file。
逐個 file diff 形式 output。
```

## Day 2 H4 — Polish

```
@cwd dotai-personal-os

我想 dashboard 改 dark mode default。你建議：
1. Tailwind dark mode strategy: 'class' 定 'media'?
2. 點改 index.html / App.tsx / index.css 最少改動 ship?
3. Trade-off 寫返一段。
```

## General debug pattern

```
@cwd dotai-personal-os

我 npm run build 出咗：
<paste full output>

幫我 diagnose：
1. 邊個 file 邊一行 root cause
2. 點 fix
3. 點 verify fix work（具體 command）
```

```
@cwd dotai-personal-os

我以下 component 跑唔起，揀以下 console.log 都唔 fire：
<paste component code>

逐步 debug：
1. component 有冇 mount？（提議 useEffect log）
2. data 拎到無？（fetchJson 有冇 error）
3. render 有冇 hit？（render 入面 log）
```
