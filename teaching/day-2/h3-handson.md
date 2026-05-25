# Day 2 H3 — Hands-on: 學員加自己 feature live coding (60 min)

## 目標

每位學員 ship 1 個自己嘅 feature。老師 + Codex partner 配合。

## Format

- 5 學員 × 12 min/位 = 60 min
- 老師 + TA 1:5 ratio
- 每位學員：5 min spec → 5 min Codex 出 code + wire → 2 min demo

## 學員 feature 候選（pre-prepared backup）

如果學員想唔到，老師 propose 揀一個：

1. **Task tag filter** — `tasks/*.md` frontmatter 加 `tags: [code, content, admin]`，TasksView 加 tag chip filter
2. **Daily streak counter** — Vault Health 加「連續寫咗 N 日 daily note」stat
3. **Weekly review summary** — Insights 加「上週 ship 咗 N 個 task / N 條 draft」
4. **Quick capture form** — App header 加 input box，輸入 task title + Enter，寫一個 new task md file 入 vault（需要本機 backend，老師 demo Path A：直接 vault file system write via Codex MCP）
5. **Project status view** — `projects/*.md` frontmatter `last_active_at`，新 view list project sorted by stale-ness

每個 scope 細到 ≤ 60 min 學員 ship 到。

## 流程 (each 學員)

### Min 0-5 — Spec

學員講 + 老師 1 句確認 scope。

範例：
- 想要：tasks 加 tags filter
- 影響 file：`tasks/*.md` (加 frontmatter tag) / `src/lib/types.ts` (Task interface) / `src/views/TasksView.tsx` (tag chip + filter state) / `scripts/sync-vault.mjs` (parse tags)
- 完成標準：tag chip 可以 click filter，refresh 後 filter state lost OK

### Min 5-10 — Codex 出 code

學員 prompt Codex（投影屏 share）：

```
@cwd dotai-personal-os

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

Codex 出 code → 學員 paste → save。

### Min 10-12 — Verify

```bash
npm run sync:vault
# dev server 已開 — hot reload
```

學員切 TasksView 見 tag chip + filter work — 鼓掌。

如果 fail：
- TS error → Codex「解釋呢個 error + propose fix」
- runtime error → Codex「呢個 stack trace 邊一行 root cause？」
- 老師 escalate handle

## 講解原則

- 學員出 feature spec **必須** 老師 1 min review scope，太大就斬細
- Codex 出 code 學員 **必須** 睇一次 + 講解一句「呢段 code 做咩」先 paste
- 失敗係 teaching moment — 老師 narrate「呢個 fail mode 點 diagnose」

## 完成標準

- [ ] 每位學員 ship 1 個自己嘅 feature
- [ ] feature 喺 localhost dev server 跑得起
- [ ] 學員理解 spec → Codex → verify 三步 loop
- [ ] 至少 1 個學員 hit Codex output error 然後 fix — teaching highlight
