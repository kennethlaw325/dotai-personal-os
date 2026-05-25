# DotAI Codex 網課 Level 2 — Student Handbook

> 你嘅完整課程指南。由開課前裝環境，到課堂兩日 8 小時嘅每一步，到課後自己 deploy + 維護，全部喺呢一份。

**課程**：DotAI Codex 網課 Level 2 — 用 Codex 砌自己嘅個人 OS
**Repo**：[`kennethlaw325/dotai-personal-os`](https://github.com/kennethlaw325/dotai-personal-os)
**時長**：2 日 × 4 小時 = 8 小時
**Prerequisites**：完成過 Level 1（識用 Codex Desktop 基本操作）

---

## 📋 目錄

- [呢個課程教你做咩](#呢個課程教你做咩)
- [課程前一週要做嘅 pre-class checklist](#課程前一週要做嘅-pre-class-checklist)
- [Day 1：Foundation（4 小時）](#day-1foundation4-小時)
- [Day 2：Production（4 小時）](#day-2production4-小時)
- [課後：自己 deploy + 維護](#課後自己-deploy--維護)
- [Reference Cheatsheet](#reference-cheatsheet)

---

## 呢個課程教你做咩

你會 build 一個**自己嘅 personal OS dashboard** — 用 Obsidian vault 做 database，用 Codex 寫 frontend，跑喺自己 laptop 上面。

**完課之後你會有**：

1. 一個跑得起嘅 personal OS dashboard（5 個 view + 自己加嘅 1-2 個）
2. 配自己 Obsidian vault 嘅 schema（task / daily note / drafts / 自己想要嘅 entity）
3. 識用 Codex 寫新 component / debug type error / refactor code
4. 識用 Git 管理自己 dashboard repo
5. 識將自己 OS deploy 上 Vercel + 密碼保護
6. 個 OS 你今晚就用得返 — 唔係玩完課程就放低

**核心 mental model**：

```
[Obsidian vault]
   ↓ npm run sync:vault
[public/data/*.json]
   ↓ Vite dev server
[localhost:5173 — 你個 dashboard]
```

Vault 係 truth，dashboard 係 render layer。你改 vault → 跑 sync → dashboard update。

---

## 課程前一週要做嘅 pre-class checklist

開課當日唔好先發現裝唔到嘢。呢段一週前做齊。

### 要裝嘅 5 樣

#### 1. Node.js 22.x

去 https://nodejs.org/ 揀 **LTS 版本**（標 v22.x）下載 + 裝。

裝完喺 terminal verify：
```bash
node --version    # 應該 v22.x.x
npm --version     # 應該 10.x.x 或以上
```

#### 2. Git

- Windows：https://git-scm.com/download/win 揀 installer
- Mac：已 pre-install，`git --version` 確認。如冇就 `xcode-select --install`
- Linux：`sudo apt install git`

```bash
git --version    # 應該 git version 2.x.x
```

#### 3. Codex Desktop

去 https://codex.openai.com（或者 OpenAI 嘅最新 desktop app 入口）download Mac / Windows version，裝完 login。

**呢個係課程嘅主要 IDE**。**唔需要另外裝 VS Code**，Codex Desktop 有齊 chat / file output window / 內建 terminal。

#### 4. Obsidian

去 https://obsidian.md 下載 + 裝。揀「Create new vault」整一個空白 vault，或者開你自己已有嘅 vault。

#### 5. GitHub account

如果未有，去 https://github.com/signup 註冊。用你常用 email。

### ⚠️ Windows 學員特別注意（Norton / Symantec SSL）

如果你部 Windows 機裝咗 **Norton Antivirus** 或者 **Symantec Endpoint Protection**（公司機常裝），第一次跑 `npm install` 可能撞 SSL error：

```
npm error UNABLE_TO_VERIFY_LEAF_SIGNATURE
npm error Exit handler never called!
```

**原因**：Norton 攔截 HTTPS connection 做 cert scanning，npm 唔識認 Norton 自簽 cert。

**Fix**：跑 npm 嘅時候加 `NODE_OPTIONS=--use-system-ca` prefix：

```powershell
$env:NODE_OPTIONS = "--use-system-ca"
npm install
```

呢個 flag 叫 Node 用 Windows 系統嘅 cert store（入面已裝 Norton root）。

Mac / Linux 學員唔需要呢個 workaround。

### Git mental model（30 秒記住呢張圖）

```
[你電腦 file]
   ↕ git add / git restore
[Staging area]
   ↕ git commit / git reset
[Local repo (.git/)]
   ↕ git push / git pull
[Remote repo (GitHub)]
```

3 個 state、4 條 transition。Day 2 H1 會詳細教。

### Codex Desktop 5 個基本動作

1. **New chat** — Cmd/Ctrl+N 開新對話
2. **Switch model** — 揀 Claude / GPT model（按老師推薦）
3. **`@cwd <folder>`** — set working directory 比 Codex 識讀你 project
4. **Drag-drop file** — 直接拖 file 入 chat 做 context
5. **Settings → MCP** — 入面睇 connected MCP server 列表

### 開課前 self-verify checklist

開課前一日跑過呢條 list：

- [ ] `node --version` 出 v22.x
- [ ] `npm --version` 出 10.x+
- [ ] `git --version` 出 git version 2.x
- [ ] Codex Desktop 開到，已 login，見到 chat + terminal + file panel
- [ ] Obsidian 開到，有起碼一個 vault
- [ ] github.com login 入到自己 dashboard
- [ ] （Windows + Norton 用戶）已記住 `NODE_OPTIONS=--use-system-ca` workaround
- [ ] 已睇過 Git mental model + Codex Desktop 5 動作

撞 problem 開課前 3 日內 message 老師。

---

## Day 1：Foundation（4 小時）

兩日總共 8 小時。Day 1 你會：
1. 由 0 setup project + 第一次跑起 dashboard
2. 教 Codex 識讀你 vault
3. 加自己想要嘅 entity（reading list / habits / ...）
4. 用 Codex 寫新 component

---

### Day 1 H1（60 min）— 由 0 setup workspace + 第一次跑起

**目標**：你由 0 開始，60 分鐘後瀏覽器開 localhost:5173 見到 5 個 view render sample data。

**今 hour 唔深入拆 codebase**，先 ship 跑得起再講。

#### Step 0 — 環境 sanity check（5 min）

喺 Codex Desktop 嘅內建 terminal 跑：

```bash
node --version    # 期望 v22.x
npm --version     # 期望 10.x+
git --version
```

3 條任何一條 fail，叫 TA 即場救。

#### Step 1 — Codex Desktop setup workspace（10 min）

1. **打開 Codex Desktop**
2. **揀位放 project folder**：
   - Windows：`C:\Users\<你>\Desktop\dotai-personal-os`
   - Mac：`/Users/<你>/Desktop/dotai-personal-os`
   - Linux：`/home/<你>/dotai-personal-os`
3. **喺 Codex Desktop 內開 file panel**（會見到揀咗嘅 folder 入面 file）
4. **喺 Codex Desktop 內開 terminal**（內建嘅）
5. **set `@cwd` 比 Codex 識個 working directory**

#### Step 2 — Clone skeleton repo（5 min）

```bash
gh repo clone kennethlaw325/dotai-personal-os .
# 或者：git clone https://github.com/kennethlaw325/dotai-personal-os.git .
```

`.` 嘅意思 = clone 落而家 cwd 呢個 folder，唔開新 sub-folder。

#### Step 3 — npm install（10 min）

```bash
npm install
```

如果撞 SSL error（Norton / 公司 firewall）：
```bash
NODE_OPTIONS=--use-system-ca npm install
```

第一次 install 1-2 分鐘。期間老師會講「npm install 喺做緊咩」mental model。

#### Step 4 — Sync sample vault（5 min）

```bash
npm run sync:vault
```

呢句食 `sample-vault/` folder 入面嘅 markdown 嘅 frontmatter → 出 JSON 落 `public/data/`。

睇 console output 應該見：
```
tasks.json ← 9 tasks (5 frontmatter + 4 checkbox)
today.json ← 3 task refs
daily-notes.json ← 3 notes
vault-health.json ← inbox 2 / orphan 3 / recent 3
content-drafts.json ← 5 drafts
✅ sync done
```

#### Step 5 — Dev server（5 min）

```bash
npm run dev
```

瀏覽器開 http://localhost:5173 — 應該見到：
- Sidebar 5 個 button：Today / Tasks / Daily Note / Vault Health / Content Pipeline
- Default Today view render 樣板 plan
- 切其他 view 都見到 sample data

**🎉 Wow moment #1**：5 個 view 已 work，你未寫過一行 code。

#### Step 6 — Production build（10 min）

```bash
# 停咗 dev server (Ctrl+C)
npm run build
npm run preview
```

開 http://localhost:4173 — 同 dev server 一樣 work。

兩種跑法嘅差別：
- `npm run dev` = **開發版**（hot reload，dev tool 多）
- `npm run preview` = **production 版**（已壓縮，模擬真實 deploy 環境）

#### Step 7 — Checkpoint（10 min）

你應該見到 localhost:5173 同 localhost:4173 都 render 到 5 view。

常見 fail mode：
- Node version 唔啱 → 升 22
- npm install SSL fail → 加 `NODE_OPTIONS=--use-system-ca`
- Port 5173 / 4173 已被佔 → Vite 自動跳到下一個 port，留意 terminal print 嘅 URL

**今日唔拆 codebase**。H3 / H4 自然會 touch code，到時自然見到 file structure，學得實在。

---

### Day 1 H2（60 min）— Codex 第一次讀你 vault

**目標**：體驗「Codex 已經識我 vault」嘅 wow moment。

呢小時介紹 **3 條路** 俾 Codex 讀你 vault：

| 路 | 點 setup | 何時用 |
|----|------|--------|
| 1. 直接讀 vault folder | 0 setup，`@cwd <vault>` 即可 | 課堂主軸，95% 用 case 嘅 default |
| 2. Obsidian MCP server | 裝 plugin + npm install + Codex config | 想 live 同 Obsidian 同步 / search / link 操作 |
| 3. Obsidian CLI | 裝 npm 套件，叫 command | Power user / 進階 scripting |

#### Step 1 — 路 1：直接讀 vault folder（30 min）

最簡單。Codex Desktop 本身就識讀 markdown / text file，你只需要話佢知 vault 喺邊。

**做法**：

1. 喺 Codex Desktop 開 chat 加一句 `@cwd <vault path>`：
   - Windows：`@cwd C:\Users\<你>\Desktop\Obsidian`
   - Mac：`@cwd /Users/<你>/Desktop/Obsidian`
   - Linux：`@cwd /home/<你>/Obsidian`
2. 問 Codex：

```
列出 `40 - Daily/` folder 入面所有 .md 文件，
每個 output 一行：file name + frontmatter 入面嘅 date。
```

Codex 用 file system tool 行 vault folder → 讀 frontmatter → 出 list。

**🎉 Wow moment**：Codex 真係可以讀你 vault 任何 file，唔係 hallucinate。

繼續試呢幾條：
- 「揾我 vault 入面最後 3 個改動嘅 file」
- 「我 inbox folder 有幾多個 unsorted note？」
- 「我 tasks/ folder 入面 status 係 doing 嘅 task 有邊個？」

#### Step 2 — 路 2：Obsidian MCP server（20 min）

MCP = Model Context Protocol。Obsidian MCP server = 將 vault expose 做 Codex tool，比直接 read 更深層整合。

**做法**：

1. **Obsidian app**：Settings → Community plugins → Browse → 搜「Local REST API」→ Install + Enable
2. **拎 API key**：Settings → Local REST API → Copy API key + 記住 port (default `127.0.0.1:27124`)
3. **裝 obsidian-mcp-server**（terminal）：
   ```bash
   npx obsidian-mcp-server --help
   ```
4. **Wire 入 Codex Desktop**：Settings → MCP servers → Add：
   ```json
   {
     "obsidian": {
       "command": "npx",
       "args": ["obsidian-mcp-server"],
       "env": {
         "OBSIDIAN_API_KEY": "<step 2 拎嘅 key>",
         "OBSIDIAN_HOST": "127.0.0.1:27124"
       }
     }
   }
   ```
5. **Restart Codex Desktop**
6. **試 prompt**：
   ```
   用 obsidian MCP 工具，列出我 vault 嘅所有 folder 名 + 每個 folder 有幾多 file。
   ```

Codex 應該 call MCP tool 出 list。

#### Step 3 — 路 3：Obsidian CLI teaser（10 min）

第三方 npm 套件 `obsidian-cli`，唔由 Obsidian 官方維護。

```bash
npx obsidian-cli --help
npx obsidian-cli open "30 - Notes/2026-05-25.md"
# 直接喺 Obsidian app 開呢個 note
```

適合自動化 script。課堂唔深入，你之後自己研究。

#### 3 條路 trade-off 總結

- **路 1**（直接讀） = **95% 用 case 嘅 default**。0 setup，最 portable
- **路 2** (MCP) = 需要 Codex 同 Obsidian 雙向互動嘅 advanced setup
- **路 3** (CLI) = 寫 script 自動化嘅 power user 工具

---

### Day 1 H3（60 min）— 我想加 reading list 入我個 OS

**目標**：跟一個 concrete example，「我想加 reading list」由 0 行到完。你之後識自己加任何 entity。

#### Step 1 — 喺 vault 開 reading/ folder（10 min）

喺 Obsidian app：

1. 揀位 → create new folder「reading」
2. 入面 create 3 本書嘅 markdown：

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

仿照寫多 2 本書（其中一本 status 用 `finished` + rating；另一本 `not-started`）。

**重點**：Frontmatter 入面嘅 field 係你**自己 design**。

#### Step 2 — 改 sync-vault.mjs 加新 entity（15 min）

Codex Desktop chat：

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

Codex 會 mirror syncTasks pattern 出新 function。你 review + accept。

跑 verification：
```bash
npm run sync:vault
cat public/data/reading.json
```

#### Step 3 — 加新 view 顯示 reading list（20 min）

Codex prompt：

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
```

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

跑 `npm run dev` → sidebar 見多咗 Reading → 切過去 → 3 本書按 status 分組 render。

**🎉 Wow moment**：30 分鐘前 vault 無 reading list data，而家 dashboard 已 render。

#### 補充：學員 vault 用 Obsidian Tasks plugin checkbox 嘅情況

有啲學員 vault 用緊 **Obsidian Tasks plugin** 嘅 `- [ ] task title` 格式，唔係 frontmatter。

兩種 sync-vault.mjs 都食得：
- **Frontmatter task** (`tasks/*.md` file)：精細，有 id / created_at / 完整 description
- **Checkbox task** (任何 .md 入面嘅 `- [ ]` line)：輕量，ID 自動 generate

Checkbox status mapping：
- `- [ ]` → todo
- `- [/]` 或 `- [-]` → doing
- `- [x]` 或 `- [X]` → done

你 vault 用邊種都得。

#### Step 4 — 自己加另一個 entity（15 min）

揀一個自己想加嘅 entity（**1 個**）：

- habits（id / name / streak / last_done_at）
- projects（id / name / status / last_active_at）
- contacts（id / name / company / last_contacted_at）
- decisions（id / question / decision / decided_at / reason）

跟 H3 Step 1-3 流程做：vault 寫 sample → Codex 加 syncXxx() → 加 view → wire App → verify。

---

### Day 1 H4（60 min）— 自己 ship 一個 component

**目標**：你自己 propose 一個 component spec，Codex 出 code，你 wire 入 view，render 自己 vault data。

#### Step 1 — Component 嘅 5 步 pattern recap（10 min）

Codex Desktop output window 開 `src/views/TasksView.tsx`，每個 view 都係呢個結構：

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

5 步 = 90% React component。

#### Step 2 — 寫自己 component spec（10 min）

寫一句 spec：「我想要 component 顯示 <X>，by <Y>」。

範例：
- 「render 本週嘅 daily notes，highlight 今日」
- 「render Content drafts，by platform 分 group」
- 「render task by category，每個 category 一個 card」

**好嘅 spec**：1 個 data source，1 個 transformation，1 個 visual pattern。

#### Step 3 — Codex 出 code（25 min）

Codex prompt template：

```
@cwd dotai-personal-os

我想要新 component `<ComponentName>View.tsx`：

**Data source**：讀 `/data/<file>.json`
**Type**：<把 type 描述出嚟，例：Array<{ id, title, category, dueDate }>>
**Transform**：<點 group / filter / sort>
**Visual**：<點顯示，例「每個 group 一個 card，card 入面 list items」>

跟 src/views/TasksView.tsx 嘅 5 步 pattern。
寫 strict TypeScript。
記得喺 src/lib/types.ts 加新 interface 如果需要。
唔好改 App.tsx，wire-up 我自己做。
```

Paste Codex output → save → 睇 Codex Desktop output window 有冇紅線。

#### Step 4 — Wire 入 App.tsx（10 min）

```
@cwd dotai-personal-os/src/App.tsx

加多一個 view『<name>』入 sidebar：
- 加 import 對應 component
- 加適合嘅 lucide-react icon
- View type union 加新 view name
- NAV array 加 entry
- 條件 render 加

只 diff 改動，唔 rewrite 成個 file。
```

跑 `npm run dev` → 切去新 view → render 出你 data。

#### 如果撞 error（contingency）

Codex 寫嘅 code 多數會 work。撞到嘅話用呢個 follow-up prompt：

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

**重點**：撞 error 唔係 fail，係正常 dev workflow 嘅一 part。Codex 識自己解釋自己嘅 code，可以做 debug partner。

---

## Day 2：Production（4 小時）

Day 1 你 ship 咗跑得起嘅 dashboard。Day 2 你會：
1. 學 Git workflow + 配合 Codex 寫 commit message
2. 用 LLM 將 raw vault data 統整做 insight
3. 自己再 ship 一個更大嘅 feature
4. Polish + (optional) deploy 上 Vercel

---

### Day 2 H1（60 min）— Git workflow + Codex 配 Git

**目標**：行完完整 Git workflow（fork → branch → commit → push → PR → merge → pull upstream），識用 Codex 寫 commit message。

#### Step 1 — Git mental model recap（15 min）

```
[你電腦 file]
       ↕ git add / git restore
[Staging area]
       ↕ git commit / git reset
[Local repo (.git/)]
       ↕ git push / git pull
[Remote repo (GitHub)]
```

3 個 state、4 條 transition。

#### Step 2 — 8 條 essential command（15 min）

```bash
# 1. Status — 永遠先睇
git status

# 2. 開 branch
git switch -c feat/<feature-name>

# 3. Stage 改動
git add <file1> <file2>
# 或者全部
git add -A

# 4. Commit
git commit -m "feat: short description"

# 5. Push branch
git push -u origin feat/<feature-name>

# 6. 開 PR
gh pr create --title "feat: short description" --body "longer explanation"

# 7. Merge + cleanup
gh pr merge --squash --delete-branch
git switch main && git pull

# 8. 拎 upstream update
git fetch upstream
git merge upstream/main
```

**永遠 branch 做新嘢**，唔好直接 commit main。

**Commit message format**：`<type>: <≤ 60 char summary>`
- `feat`: 新功能
- `fix`: 修 bug
- `docs`: 改 README / doc
- `refactor`: 改 code 但唔改行為
- `chore`: dependencies / config

#### Step 3 — Codex 寫 commit message（10 min）

```
@cwd dotai-personal-os

我 stage 咗以下改動：
<paste `git diff --staged` 結果>

幫我寫一句 commit message：
- conventional commits format
- ≤ 60 char
- focus 喺 WHY 唔係 WHAT
```

Codex 識讀 diff 推 commit message。

#### Step 4 — 開 PR + merge + pull upstream（20 min）

學員 PR 開咗之後，喺 GitHub web UI：
1. Reviewers 自選一個同學
2. 同學 review code → approve
3. `gh pr merge --squash --delete-branch`
4. 本機 `git switch main && git pull origin main`

拎 upstream update：
```bash
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

**三個 remote 概念**：
- `origin` = 你嘅 fork
- `upstream` = 原 repo（fork 自動設）
- 永遠唔好 push 去 `upstream`，你冇權限

---

### Day 2 H2（60 min）— LLM 統整 raw → insight

**目標**：唔再淨係 display data，而係自動 summarize — 今日 top 3 priority / 本週 top topic / 卡 7 日嘅 draft / morning brief。

#### Step 1 — Insight pattern（10 min）

3 種 pattern：

```
Raw data       Transform        Insight
---------      ---------        -------
tasks.json  →  filter + sort →  "今日要做：t-001 / t-003 / t-002"
drafts/*    →  age > 7 days →  "d-techpulse-001 卡 8 日 drafting"
daily-*.md  →  word freq    →  "本周 top topic: 'Codex 網課'"
```

#### Step 2 — 純 JS stats（15 min）

`scripts/insights.mjs`：

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

#### Step 3 — LLM-augmented narrative summary（20 min）

純 JS 只可以做 stats，narrative summary 要用 LLM。

Codex prompt：

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

#### Step 4 — Wire 入 dashboard（10 min）

寫 `src/views/InsightsView.tsx` 讀 `insights.json`：

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
      <h1>Insights</h1>
      <p>{data.today}</p>
      <section>
        <h2>Top priority</h2>
        <ul>{data.topPriority.map(t => <li key={t}>{t}</li>)}</ul>
      </section>
      <section>
        <h2>Stuck drafts</h2>
        <ul>{data.stuckDrafts.map(d => <li key={d}>{d}</li>)}</ul>
      </section>
    </div>
  );
}
```

#### 教學重點

**Stats first, LLM second** — 純 stats cheap + deterministic，LLM 只用嚟 narrative，唔係每個 data point 都 push 去 LLM。

---

### Day 2 H3（60 min）— 自己 ship 一個更大 feature

**目標**：每位學員 ship 1 個自己嘅 feature。

每位 5 min spec → 5 min Codex 出 code → 2 min demo（共 12 min/位 × 5 學員 = 60 min）。

#### Feature 候選

如果你想唔到，揀一個：

1. **Task tag filter** — tasks frontmatter 加 `tags: []`，TasksView 加 tag chip filter
2. **Daily streak counter** — Vault Health 加「連續寫咗 N 日 daily note」stat
3. **Weekly review summary** — Insights 加「上週 ship N 個 task / N 條 draft」
4. **Quick capture form** — App header 加 input box + Enter 寫新 task md file
5. **Project status view** — `projects/*.md` frontmatter `last_active_at`，新 view list project sorted by stale-ness

#### 流程

**Min 0-5 — Spec**：講比老師聽，老師 1 min 確認 scope。

**Min 5-10 — Codex 出 code**：

```
@cwd dotai-personal-os

我要 ship 以下 feature：<簡單講你個 feature>。

要求：
1. <第 1 個 file 要改 + 點改>
2. <第 2 個 file 要改 + 點改>
3. <...>

唔好寫 test，唔好 rewrite 唔關事嘅 file。
逐個 file diff 形式 output。
```

**Min 10-12 — Verify**：

```bash
npm run sync:vault
# dev server 已開 — hot reload
```

切去新 feature 見 work — 鼓掌。

如 fail：用 Codex「解釋呢個 error + propose fix」debug prompt。

---

### Day 2 H4（60 min）— Polish + Demo + (Optional) Deploy + Q&A

**目標**：你 polish 自己 OS、demo 比同學睇、optional deploy 上 Vercel、Q&A。

#### Step 1 — Polish（20 min）

- `npm run build` verify production bundle 跑得起
- 改 `index.html` title 做自己名
- 改 `src/App.tsx` sidebar header 「Personal OS」做自己 OS 名
- 揀一個 Tailwind 顏色 customize `tailwind.config.js` brand color

```
@cwd dotai-personal-os

我想 dashboard 改 dark mode default — 你建議：
1. Tailwind dark mode strategy: 'class' 定 'media'?
2. 點改 index.html / App.tsx / index.css 最少改動 ship?
3. Trade-off 寫返一段。
```

#### Step 2 — Demo carousel（25 min）

每位學員 5 min demo：
- 開 own localhost:4173
- Walkthrough：sidebar / 5+ view / 自己加嘅 feature / 自己 vault data
- 1 個 wow moment（你揀）
- 1 個 fail moment（坦白講撞咗咩問題、Codex 點幫）

#### Step 3 — Q&A（10 min）

常見問題：

- **點 sync 我兩部機嘅 vault？** Git 推 vault 做 repo / iCloud / Syncthing。Personal OS 唔擁有 sync，vault 同步邊個 tool 都得。
- **想要 mobile app 點？** Level 3 teaser — React Native + 同一 sync 層
- **學員 vault 上傳 GitHub safe 唔 safe？** Private repo OR vault folder 入 `.gitignore` 揀 export
- **點搞 production deploy？** 睇下面「課後：自己 deploy + 維護」section
- **LLM cost 點 control？** Codex CLI per-prompt 計、insight script 一日跑一次 cron

#### Step 3.5 — Deploy 示範（30 min，optional bonus）

如果時間夠，老師示範一次「自己 deploy」流程。詳細步驟睇下一 section「課後：自己 deploy + 維護」。

#### Step 4 — Level 3 teaser + 收尾（5 min）

**Level 3 預告**：
- Multi-device sync (vault Git push + cron sync)
- 2-way sync (frontend edit 寫返 vault file via REST API)
- Mobile (React Native 配同一 sync layer)
- Agent loop (Codex 每朝 scan vault 自動 propose insight)

**真正 take-away**：你而家有一個跑得起 + 自己 schema 嘅 personal OS，由今晚開始用。

**下一步**：每日 5 min 用 → 一週後 evaluate 邊個 view 真係用、邊個唔用 → 自己 evolve。

---

## 課後：自己 deploy + 維護

你完課後可以將自己 OS 推上 cloud，攞返一條 URL 任何地方打開都用得到。

### 整個 deploy 嘅 mental model

```
[你電腦嘅 Obsidian vault]
       ↓ 跑 npm run sync:vault
[dashboard repo 入面 public/data/*.json]
       ↓ git add + git commit + git push
[GitHub private repo]
       ↓ Vercel webhook 收到 push
[Vercel build: npm install + npm run build]
       ↓ 出 dist/ static bundle
[Vercel CDN serve URL]
       ↓ 訪客打開 URL
[Vercel Edge Middleware 攔截 → 要密碼]
       ↓ 輸入啱嘅密碼
[Dashboard render，你睇到自己 OS]
```

**4 層私隱保護**：
1. GitHub repo private（vault JSON 唔公開）
2. Vercel project private（dashboard URL random hash）
3. Edge Middleware Basic Auth（要密碼先入到）
4. noindex meta（Google 唔 index）

### ⚠️ 開始之前必讀

**Vercel 唔識讀你部機上嘅 vault**。Vercel build machine 喺 cloud，只睇到你 GitHub repo 入面嘅 file。

所以工作流程係：
1. 喺**自己機**用 `npm run sync:vault` 將 vault → JSON
2. 將 JSON `git commit` 入 repo
3. `git push` 上 GitHub
4. Vercel 從 GitHub 拎已 build 好嘅 JSON，serve 出去

**呢個 = vault JSON 真係會去到 GitHub 同 Vercel**。所以：
- GitHub repo 必須 `--private`
- Vercel URL 必須有密碼 gate

呢 2 樣係 **mandatory**，唔係 optional。

### Step 1 — Repo 設 Private

如果你 fork 自老師 repo，先改 private：
1. GitHub repo settings → 拉到底「Danger Zone」
2. 撳「Change repository visibility」→ Private
3. 確認：repo 名側邊有🔒 icon

如果由零起：
```bash
gh repo create <你嘅 username>/dotai-personal-os --private --source=. --push
```

### Step 2 — 開 Vercel account

1. 去 https://vercel.com/signup
2. 揀「Continue with GitHub」
3. Authorize Vercel access 你 GitHub
4. 揀 Hobby plan（免費）

### Step 3 — Import GitHub repo

Vercel dashboard：
1. 撳「Add New」→「Project」
2. 揀「Import Git Repository」
3. 揀「dotai-personal-os」
4. 撳「Import」

### Step 4 — 配置 build

Vercel auto-detect Vite：
- **Framework Preset**: Vite
- **Build Command**: `npm run build`（**default OK，唔好加 sync:vault**）
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**重要：唔好將 build command 改做 `npm run sync:vault && npm run build`**。Vercel build machine 冇你 vault file，sync 跑出嚟係空會 overwrite 已 commit 嘅 JSON。

正確流程：**本機 sync → commit JSON → Vercel build 已 commit 嘅 JSON**。

### Step 5 — 加密碼保護（Edge Middleware）

呢步係**整個 deploy 嘅核心安全層**。

#### 5.1 — 加 `middleware.ts` 喺 project root

```typescript
// middleware.ts at project root

export const config = {
  matcher: ['/((?!_static|favicon|robots\\.txt).*)']
};

export default function middleware(request: Request) {
  const auth = request.headers.get('authorization');

  if (auth) {
    const encoded = auth.split(' ')[1];
    const decoded = atob(encoded);
    const [, password] = decoded.split(':');
    if (password === process.env.SITE_PASSWORD) {
      return; // pass through
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Personal OS"',
      'Content-Type': 'text/plain'
    }
  });
}
```

#### 5.2 — Vercel env var

Vercel project → Settings → Environment Variables：
- **Name**: `SITE_PASSWORD`
- **Value**: 你揀嘅密碼（建議 12+ 字符）
- **Environments**: 揀 Production + Preview + Development 全部

撳「Save」。

### Step 6 — 第一次 Deploy

Vercel dashboard 撳「Deploy」。2-3 分鐘後出條 URL：`https://dotai-personal-os-<hash>.vercel.app`

打開 URL → browser 彈密碼框：

```
Sign in
https://dotai-personal-os-xxx.vercel.app
Username: (隨便填)
Password: ********
```

輸入啱密碼 → 入到 dashboard 🎉
輸入錯 → 彈框再彈 / 401 error。

### Step 7 — 防 Google 索引

`public/robots.txt` 已 ship：
```
User-agent: *
Disallow: /
```

`index.html` `<head>` 已加：
```html
<meta name="robots" content="noindex, nofollow">
```

雙重保險。

### 之後嘅日常工作流程

**每次 vault 有 update**：

```bash
# 1. 改 Obsidian vault file（喺 Obsidian app）

# 2. 喺 dashboard repo 跑 sync
VAULT_DIR="<你 vault path>" npm run sync:vault

# 3. Commit + push
git add public/data/
git commit -m "sync vault $(date +%F)"
git push

# 4. Vercel auto-deploy 2 min 後 URL 更新
```

**Windows PowerShell**：
```powershell
$env:VAULT_DIR = "C:\Users\你\Desktop\Obsidian"
npm run sync:vault
git add public/data/
git commit -m "sync vault"
git push
```

**Rotate 密碼**：
1. Vercel → Settings → Env Vars → 改 `SITE_PASSWORD`
2. Vercel → Deployments → 揀最新一條 → Redeploy
3. 舊密碼即時失效

### FAQ

**Q：免費 Hobby plan 夠嗎？**
A：100 GB bandwidth / 月 + 6000 build minute / 月。Personal OS 用法 < 1% quota。

**Q：每次 push 都會 deploy 嗎？**
A：Push 去 `main` branch = auto-deploy production。其他 branch = preview deployment。

**Q：可以 share URL 比朋友睇？**
A：得，但仲要 share 密碼。課程完之後想收返 access，rotate 密碼即可。

**Q：點睇 deploy log / error？**
A：Vercel dashboard → Deployments → 撳邊個 deploy → 睇 build log。99% bug 喺 log 入面有 hint。

**Q：middleware.ts 第一次 deploy 撞 error 點算？**
A：跟 Vercel error message 提示安裝對應 package（最常見 `@vercel/edge`）。Update import + redeploy。

---

## Reference Cheatsheet

### Codex prompt 模板（4 種最常用）

**1. 解 error**：
```
@cwd dotai-personal-os
我跑 <command> 出咗以下 error：
<paste error>

幫我：
1. 解釋 root cause（唔好 dump code 住）
2. 提議最 minimal 嘅 fix
3. 點 verify fix work
```

**2. 加 entity**：
```
@cwd dotai-personal-os

我嘅 vault `<folder>/` 入面每個 markdown 有 frontmatter：
- <field 1>
- <field 2>
- ...

跟 scripts/sync-vault.mjs 入面 syncTasks() 嘅 pattern，
加一個 sync<XXX>() function：
- 讀 <folder>/*.md
- 食 frontmatter
- 寫去 public/data/<x>.json
- main() 入面 await + console.log summary

唔好 rewrite 其他 function。
```

**3. 寫新 component**：
```
@cwd dotai-personal-os

我想要新 component `<ComponentName>View.tsx`：

**Data source**：讀 `/data/<file>.json`
**Type**：<把 type 描述出嚟>
**Transform**：<點 group / filter / sort>
**Visual**：<點顯示>

跟 src/views/TasksView.tsx 嘅 5 步 pattern。
寫 strict TypeScript。
記得喺 src/lib/types.ts 加 interface。
```

**4. Wire 入 App.tsx**：
```
@cwd dotai-personal-os/src/App.tsx

加多一個 view『<name>』入 sidebar：
- 加 import 對應 component
- 加適合嘅 lucide-react icon
- View type union 加新 view name
- NAV array 加 entry
- 條件 render 加

只 diff 改動，唔 rewrite 成個 file。
```

### Git 8 條 essential command

```bash
git status                                          # 永遠先睇
git switch -c feat/<name>                          # 開 branch
git add <file>                                      # stage
git commit -m "type: summary"                       # commit
git push -u origin feat/<name>                      # push
gh pr create --title "..." --body "..."             # 開 PR
gh pr merge --squash --delete-branch                # merge + cleanup
git fetch upstream && git merge upstream/main       # pull upstream
```

### 撞 problem 點搵答案

1. **先 `git status`** — 50% 嘅 Git 問題答案喺度
2. **睇 terminal 嘅 full output**（唔好淨係睇最後一行）
3. **Codex prompt template「解 error」**（上面有）
4. **Google 完整 error message**（多數 Stack Overflow 有答案）
5. **問 TA / 同學**

### 你之後想加嘅 feature 嘅 mental model

```
1. 喺 vault 寫 raw data（markdown + frontmatter）
2. 改 scripts/sync-vault.mjs 加 syncXxx() 食 frontmatter → JSON
3. 加 src/lib/types.ts 嘅 TypeScript interface
4. 寫 src/views/XxxView.tsx 跟 5 步 pattern
5. Wire 入 src/App.tsx (sidebar + conditional render)
6. npm run sync:vault + npm run dev verify
7. git commit + push
```

每加一個 feature 就重複呢 7 步。慣咗就快。

---

**Good luck. 課程結束之後，你個 personal OS 由今晚開始用 — 唔好放低。**
