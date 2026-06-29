# Day 1 H4 — 學員自己 ship 一個 component（60 min）

## 目標

每位學員 propose 一個自己想要嘅 component spec，Codex 出 code，學員 wire 入 view，render 自己 vault data。

H3 已經 demo 過完整流程（reading list）。H4 = 學員自己再做一次，揀自己想要嘅 component。

---

## 流程

### Step 1 — Component 嘅 5 步 pattern recap（10 min）

老師喺 Codex Desktop output window 開 `src/views/TasksView.tsx`，walk through 5 步：

```typescript
// 1. import + types
import { useEffect, useState } from "react";
import { fetchJson } from "../lib/fetchJson";
import type { Task } from "../lib/types";

// 2. component function
export default function TasksView() {
  // 3. state
  const [tasks, setTasks] = useState<Task[] | null>(null);

  // 4. effect — fetch on mount
  useEffect(() => {
    fetchJson<Task[]>("/data/tasks.json", []).then(setTasks);
  }, []);

  // 5. render — handle loading / empty / data
  if (tasks === null) return <div>Loading…</div>;
  if (tasks.length === 0) return <div>No tasks</div>;
  return <ul>{tasks.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
}
```

5 步 = 90% React component。學員今後寫任何新 view 都 mirror 呢個結構。

### Step 2 — 學員 propose 自己 component（10 min）

每位學員寫一句 spec：「我想要 component 顯示 <X>，by <Y>」。

範例：
- 「render 本週嘅 daily notes，highlight 今日」
- 「render Content drafts，by platform 分 group」
- 「render task by category，每個 category 一個 card」
- 「render Reading list 但只 show status = reading 嘅」

老師 1:5 sanity check spec 範圍適中。太大 → 拆細。

**好嘅 spec**：1 個 data source，1 個 transformation，1 個 visual pattern。
**唔好嘅 spec**：multi data source / 多 state / drag-drop interaction（呢啲 Day 2 H3 hands-on 再加）。

### Step 3 — Codex 出 code（25 min）

每位學員寫自己 prompt（参考下面 template），跟住 paste 入 Codex Desktop。

老師建議學員用呢個 prompt template：

```
@cwd dotai-personal-os

我想要新 component `<ComponentName>View.tsx`：

**Data source**：讀 `/data/<file>.json`
**Type**：<把 type 描述出嚟，例：Array<{ id, title, category, dueDate }>>
**Transform**：<點 group / filter / sort>
**Visual**：<點顯示，例「每個 group 一個 card，card 入面 list items」>

跟 src/views/TasksView.tsx 嘅 5 步 pattern：
1. import + types
2. function + export default
3. useState 揾 data
4. useEffect 拎 data
5. render（包 loading + empty state）

寫 strict TypeScript。
記得喺 src/lib/types.ts 加新 interface 如果需要。
唔好改 App.tsx，wire-up 我自己做。
```

學員 paste Codex output → save → check Codex Desktop output window 有冇紅線 / error。

**如果 Codex 出嘅 code 直接 work**：✅ 落 wire-up
**如果 Codex 出嘅 code 有問題**：用 follow-up prompt 解（範例見下）

### Step 4 — Wire 入 App.tsx（10 min）

學員 Codex prompt：

```
@cwd dotai-personal-os/src/App.tsx

加多一個 view『<reading | habits | ...>』入 sidebar：
- 加 import 對應 component
- 加適合嘅 lucide-react icon
- View type union 加新 view name
- NAV array 加 entry
- 條件 render 加

只 diff 改動，唔 rewrite 成個 file。
```

學員 paste → save → 跑 `npm run dev` → 切去新 view → render 出自己 data。

### Step 5 — Checkpoint + demo（5 min）

每學員 30 秒 demo 自己新 view，老師 + 同學鼓掌。

**Wow moment**：學員第一次自己 ship view，read 自己 vault data。

---

## 如果撞 error 點算（contingency）

Codex 寫嘅 code 多數會 work，但有時會撞：
- **Type error**（紅線）— Codex 寫嘅 type 同 sync 出嚟嘅 JSON shape 唔 match
- **Runtime error**（console error）— 例：嘗試 read undefined property
- **Render 唔出**（白屏）— 通常 fetch 失敗 / data 唔啱 shape

學員撞到嘅話用呢個 follow-up prompt template：

```
@cwd dotai-personal-os

我啱啱 ship 你寫嘅 <ComponentName>View.tsx，
跑 npm run dev 出咗以下 error：
<paste error>

幫我：
1. 解釋呢個 error 嘅 root cause（唔好 dump code 住）
2. 提議最 minimal 嘅 fix
3. 點 verify fix work
```

**教學重點**：撞 error 唔係 fail，係正常 dev workflow 嘅一 part。Codex 識自己解釋自己嘅 code，可以做 debug partner。

---

## Codex prompt 範例（H4）

```
@cwd dotai-personal-os

我想要 component render reading list 但只 show status = "reading" 嘅書，
sorted by started_at desc（最新開始排頭）。
參考 src/views/TasksView.tsx 嘅 5 步 pattern 寫 strict TS。
```

```
@cwd dotai-personal-os/src/views/ReadingListView.tsx

我想加一個 「Mark as finished」button 喺每本「reading」status 嘅書側邊。
（暫時 click 之後唔需要 write 返 vault，console.log 個 id 就得）

只 diff 改動，唔 rewrite 成個 component。
```

## 完成標準

- [ ] 每位學員 ship 1 個自己嘅 component
- [ ] component 讀自己 vault 嘅 real data
- [ ] component wire 入 App.tsx，sidebar 見到新 entry，切過去 render
- [ ] 學員理解 5 步 pattern 嘅 reuse value
- [ ] 學員試過至少一次 Codex follow-up prompt（debug 或 enhance）
