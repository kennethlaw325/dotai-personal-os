# Day 2 H2 — LLM 統整 raw → insight (60 min)

## 目標

學員寫一個 aggregation script，用 Codex 配 LLM 將 vault 嘅 raw data（task / daily / draft）統整做 daily insight：
- 今日 top 3 priority task（by overdue + status）
- 本周 daily notes top topic
- 過 14 日未 touch 嘅 stale project
- Content pipeline bottleneck（drafting > 7 日 嘅 draft）

呢小時係 personal OS 嘅「智能層」— 由 raw display 升 actionable insight。

## 流程

### Step 1 — Insight 嘅 design pattern (10 min)

老師白板：

```
Raw data       Transform        Insight
---------      ---------        -------
tasks.json  →  filter + sort →  "今日要做：t-001 / t-003 / t-002"
daily-*.md  →  word freq    →  "本周 top topic: 'GlowLab campaign'"
projects/*  →  last_touched →  "Velora launch 已 4 日無 update"
drafts/*    →  age > 7 days →  "d-fb-001 卡 8 日 drafting"
```

Pattern：read JSON → transform → output structured insight string。

### Step 2 — 純 JS aggregation (15 min)

學員寫 `scripts/insights.mjs`：

```javascript
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "public", "data");

async function loadJson(name) {
  return JSON.parse(await readFile(join(DATA_DIR, `${name}.json`), "utf8"));
}

function topPriorityTasks(tasks) {
  return tasks
    .filter(t => t.status !== "done")
    .slice(0, 3)
    .map(t => `${t.id} ${t.title}`);
}

function stuckDrafts(drafts) {
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return drafts
    .filter(d => d.status === "drafting" && new Date(d.updatedAt).getTime() < sevenDaysAgo)
    .map(d => `${d.id} (${d.platform}) 卡 ${Math.floor((Date.now() - new Date(d.updatedAt).getTime()) / 86400000)} 日`);
}

async function main() {
  const tasks = await loadJson("tasks");
  const drafts = await loadJson("content-drafts");

  const insight = {
    today: new Date().toISOString().slice(0, 10),
    topPriority: topPriorityTasks(tasks),
    stuckDrafts: stuckDrafts(drafts)
  };

  await writeFile(join(DATA_DIR, "insights.json"), JSON.stringify(insight, null, 2));
  console.log(insight);
}

main();
```

跑 `node scripts/insights.mjs` → 見 output。

### Step 3 — LLM-augmented summary (20 min)

純 JS 只可以做 stats；要 narrative summary 用 LLM。

老師示範 Codex prompt：

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

呢個就係 Kenneth `vault-lint-daily.ps1` Morning Brief 嘅 simplified 版。

### Step 4 — Wire 入 dashboard (10 min)

學員寫一個 `src/views/InsightsView.tsx` 讀 `insights.json` render：

```typescript
import { useEffect, useState } from "react";
import { fetchJson } from "../lib/fetchJson";

interface Insights {
  today: string;
  topPriority: string[];
  stuckDrafts: string[];
}

export default function InsightsView() {
  const [data, setData] = useState<Insights | null>(null);
  useEffect(() => {
    fetchJson<Insights | null>("/data/insights.json", null).then(setData);
  }, []);

  if (!data) return <div>跑 `node scripts/insights.mjs` 先 generate insights。</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Insights</h1>
      <p className="text-muted text-sm mb-6">{data.today}</p>
      <section className="mb-6">
        <h2 className="font-bold mb-2">Top priority</h2>
        <ul>{data.topPriority.map(t => <li key={t}>{t}</li>)}</ul>
      </section>
      <section>
        <h2 className="font-bold mb-2">Stuck drafts</h2>
        <ul>{data.stuckDrafts.map(d => <li key={d}>{d}</li>)}</ul>
      </section>
    </div>
  );
}
```

### Step 5 — 討論 (5 min)

老師問：
- 純 JS stats vs LLM narrative — 邊個 cheaper？邊個 actionable？
- LLM call quota / cost concern — 學員應該 daily run 一次定 every dev session？

引導學員：**stats first, LLM second**。LLM 只係 raw stats 唔夠表達 nuance 嗰陣先用。

## Codex prompt 範例（H2）

```
我 scripts/insights.mjs 入面 stuckDrafts() 想加：
按卡 day 數 desc 排序。

只改 stuckDrafts 部分，唔 rewrite 成個 script。
```

```
比較 nightly cron 跑 LLM brief vs on-demand button click run，
trade-off 寫一段比較表（cost / latency / freshness）。
```

## 完成標準

- [ ] 學員 ship `scripts/insights.mjs` 出 insights.json
- [ ] 學員 ship `InsightsView.tsx` 讀 insights render
- [ ] 學員理解 stats-first / LLM-second 嘅 cost trade-off
- [ ] 學員試過至少一次 Codex LLM summary prompt
