# Day 1 H1 — 由 0 setup 到 dashboard 第一次跑起 (60 min)

## 目標

學員由 0 開始：開 Codex Desktop → 揀位放 project → clone 老師 skeleton repo → npm install → sync vault → dev server → 瀏覽器開 localhost:5173 見到 5 view render sample data。**今 hour 唔深入拆 codebase**，先 ship 跑得起再講。

## 流程

### Step 0 — 環境 sanity check (5 min)

老師喺投影屏跑：
```bash
node --version    # 期望 22.x
npm --version     # 期望 10.x+
git --version
```

學員喺自己 Codex Desktop 嘅 terminal 跑同一 3 句，sanity check pre-class 裝環境啱唔啱。

如果三條任何一條 fail，TA 1:5 即場救。

### Step 1 — Codex Desktop setup workspace (10 min)

每位學員：

1. **打開 Codex Desktop**（已 login codex.openai.com account）
2. **揀位放 project folder** — 建議 Desktop 或者 Documents 揀一個 clean 位（例：`C:\Users\<你>\Desktop\dotai-personal-os` / `/Users/<你>/Desktop/dotai-personal-os`）
3. **喺 Codex Desktop 內開 file panel**（會見到揀咗嘅 folder 入面所有 file）
4. **喺 Codex Desktop 內開 terminal**（內建嘅，唔需要另開 PowerShell / Mac Terminal）
5. **set `@cwd` 比 Codex 識個 working directory** — 跟住 Codex 對 prompt 有 context

老師 commentary：
- Codex Desktop = file output window + terminal + AI chat 一齊嘅 IDE，全程一個 app 搞掂
- `@cwd` 係之後每條 Codex prompt 必加，等 Codex 知你問緊邊個 project

### Step 2 — Clone skeleton repo (5 min)

喺 Codex Desktop 內 terminal：

```bash
gh repo clone kennethlaw325/dotai-personal-os .
# 或者：git clone https://github.com/kennethlaw325/dotai-personal-os.git .
```

`.` 嘅意思 = clone 落「而家 cwd」呢個 folder，唔開新 sub-folder。

老師 commentary：
- 課程後學員應該將呢個 repo fork 上自己 GitHub（Day 2 H1 教）
- 而家 clone 老師 repo 只係要快快地拎 code

### Step 3 — npm install (10 min)

```bash
npm install
```

如果撞 SSL error（Norton / 公司 firewall）：
```bash
NODE_OPTIONS=--use-system-ca npm install
```

老師 commentary：
- node_modules 大概 200MB，第一次 install 1-2 min
- 學員 install 期間講「npm install 喺做緊咩」mental model — 由 `package.json` 拎 dependency list → 落 registry 拎 → 解開到 `node_modules/`
- 詳細 React / Vite / Tailwind 點 work 唔今日教，先 ship

### Step 4 — Sync sample vault (5 min)

```bash
npm run sync:vault
```

老師喺投影屏 cat `public/data/tasks.json`：「呢個就係 frontend 真實讀嘅 data，由 sample vault markdown 嘅 frontmatter 食出嚟」— 一句話帶過，唔深入。

### Step 5 — Dev server (5 min)

```bash
npm run dev
```

學員瀏覽器開 http://localhost:5173：
- Sidebar 5 個 button：Today / Tasks / Daily Note / Vault Health / Content Pipeline
- Default Today view render 樣板 plan (3 件 task)
- 切去其他 view 都見到 sample data

**Wow moment #1**：5 個 view 已 work，我哋未寫過一行 code。

### Step 6 — Production build (10 min)

```bash
# 停咗 dev server (Ctrl+C)
npm run build
npm run preview
```

開 http://localhost:4173 — 同 dev server 一樣 work。

老師 commentary：
- `npm run build` 出 `dist/` folder = static HTML/JS/CSS bundle，呢度就係之後 deploy 上 cloud 嘅嘢
- `npm run dev` vs `npm run preview` 兩種跑法：dev = 開發版（hot reload），preview = production 版（壓縮咗）
- 課程主軸 localhost，Day 2 H4 教點 push 上 Vercel

### Step 7 — Checkpoint (10 min)

學員 demo 自己 localhost:4173，老師 1:5 確認每位都 work。

常見 fail mode：
- Node version 唔啱 → 升 22
- npm install SSL fail → 加 `NODE_OPTIONS=--use-system-ca`
- Port 5173 / 4173 已被佔 → Vite 自動跳到下一個 port，留意 terminal print 嘅 URL
- 跑 `npm run dev` 後瀏覽器 blank → check terminal 有冇 error

**我哋唔今日拆 codebase**。學員 H3 自己加 entity / H4 Codex 寫 component 時自然會 touch code，到時自然見到 file structure，學得實在。

## Codex prompt 範例（H1）

```
@cwd dotai-personal-os
我跑 npm run dev 出咗以下 error，幫我睇下：
<paste error>

唔好寫 code 住，先解釋呢個 error 嘅 root cause。
```

```
@cwd dotai-personal-os
npm install 撞 SSL「UNABLE_TO_VERIFY_LEAF_SIGNATURE」error，
我之前聽老師講可以加 NODE_OPTIONS=--use-system-ca，
幫我解釋呢個 flag 喺 Windows 上做咩，點解 work。
```

## 完成標準

- [ ] 每位學員 Codex Desktop 開到 project folder + 內建 terminal 跑得起命令
- [ ] localhost:5173 (dev) + localhost:4173 (preview) 都 render 到 5 view 嘅 sample data
- [ ] 學員識喺 terminal 跑 `npm run dev` / `npm run build` / `npm run preview` 3 條 script，知三者分別
- [ ] 學員未需要明白 code 內部點 work — H3 / H4 自然會 touch
