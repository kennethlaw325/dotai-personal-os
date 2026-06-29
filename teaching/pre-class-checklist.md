# Pre-class Checklist

開課前一週讀。15 min 內裝齊環境，開課當日省返 setup 時間。

冇睇都唔死人 — Day 1 H1 第一個 step 會 catch 漏裝嘅學員，但搭 setup 時其他學員等你嘅 5-10 min 比較唔好意思。

---

## ✅ 要裝嘅 5 樣

### 1. Node.js 22.x

- 去 https://nodejs.org/
- 揀 LTS 版本（標 v22.x）
- Windows / Mac installer 直接 next-next-next
- Mac 用 brew: `brew install node@22`

裝完 verify：
```bash
node --version    # 應該 v22.x.x
npm --version     # 應該 10.x.x 或以上
```

### 2. Git

- Windows: https://git-scm.com/download/win 揀 installer
- Mac: 已 pre-install（`git --version` confirm），如冇就 `xcode-select --install`
- Linux: `sudo apt install git`（Ubuntu/Debian）

裝完 verify：
```bash
git --version    # 應該 git version 2.x.x
```

### 3. Codex Desktop

- 去 https://codex.openai.com（或者 OpenAI 嘅最新 desktop app 入口）
- Download Mac / Windows version
- 安裝 + login 你 OpenAI account
- 確認入到 main UI，見到 chat panel + file output window + 內建 terminal

**Note**：呢個係課程嘅主要 IDE。**唔需要另外裝 VS Code**。

### 4. Obsidian

- 去 https://obsidian.md
- Download Mac / Windows version
- 安裝 + open vault — 揀「Create new vault」整一個空白 vault 就 OK（不過如果你已有自己 vault 更好，Day 1 H3 會用）

### 5. GitHub account

- 如果未有：https://github.com/signup 註冊（用你常用 email）
- 確認可以 login 入 github.com 見到你 dashboard

---

## 🛑 Windows 學員特別注意（Norton / Symantec SSL 問題）

如果你部 Windows 機裝咗 **Norton Antivirus** 或者 **Symantec Endpoint Protection**（公司機常裝），第一次跑 `npm install` 可能撞 SSL error：

```
npm error UNABLE_TO_VERIFY_LEAF_SIGNATURE
npm error Exit handler never called!
```

**原因**：Norton 攔截 HTTPS connection 做 cert scanning，npm 唔識認 Norton 自簽 cert。

**Fix**：跑 npm 嘅時候加 `NODE_OPTIONS=--use-system-ca` prefix，叫 Node 用 Windows 系統嘅 cert store（入面已裝 Norton root）：

```powershell
$env:NODE_OPTIONS = "--use-system-ca"
npm install
```

或者每次 inline 加：
```powershell
$env:NODE_OPTIONS="--use-system-ca"; npm install
```

**Mac / Linux 學員唔需要呢個 workaround**，Mac/Linux 用 OpenSSL default cert store，唔受 Norton 影響。

---

## 🧠 Git mental model（30 秒）

```
[你電腦 file]
   ↕ git add / git restore
[Staging area]
   ↕ git commit / git reset
[Local repo (.git/)]
   ↕ git push / git pull
[Remote repo (GitHub)]
```

3 個 state、4 條 transition。Day 2 H1 詳細教，今日只需要記住呢張圖。

---

## 🤖 Codex Desktop 5 個基本動作（30 秒）

開 Codex Desktop 之後，你會用到：

1. **New chat** — Cmd/Ctrl+N 開新對話
2. **Switch model** — 揀 Claude / GPT model（default 由老師推薦）
3. **`@cwd <folder>`** — 設 working directory 比 Codex 識讀，Day 1 H1 開始用
4. **Drag-drop file** — 直接拖 file 入 chat 做 context
5. **Settings → MCP** — 入面睇 connected MCP server 列表，Day 1 H2 會 add Obsidian MCP

---

## 🔒 資安準備（30 秒，必做）

Day 2 H4 會跑 5 條 P0 資安紅線 mini-section。開課前先做 3 樣，省返堂上時間：

### 1. Password manager 生個 16+ 字 password

- 用 Bitwarden / 1Password / Apple Passwords / Windows Credential Manager 生 16+ 字 random password（字母 + 數字 + 符號）
- 將佢標籤做「dotai-personal-os SITE_PASSWORD」備用
- 唔好用你 GitHub / email / 銀行嘅同一個 password
- Day 2 deploy 教學會用呢個 password

### 2. GitHub 開 Secret Scanning + Dependabot

開課當日 fork 完 repo 之後：
- Repo → Settings → Code security and analysis
- ✅ Secret scanning（push protection enabled）
- ✅ Dependabot alerts + security updates

呢個係後台被動 protection — 万一你漏 commit 個 secret，push 即時 reject。

### 3. Codex Desktop 確認預設 sandbox mode

- 開 Codex Desktop → Settings → Sandbox / Execution
- 確認 default mode = `workspace-write`（唔係 `danger-full-access`）
- 全程課程都唔需要 `danger-full-access`；老師如果叫你改，先停一停問點解

---

## ✅ 完成 checklist

開課前一日 self-verify：

- [ ] `node --version` 出 v22.x
- [ ] `npm --version` 出 10.x+
- [ ] `git --version` 出 git version 2.x
- [ ] Codex Desktop 開到，已 login，見到 chat + terminal + file panel
- [ ] Obsidian 開到，有起碼一個 vault
- [ ] github.com login 入到自己 dashboard
- [ ] （Windows + Norton 用戶）已記住 `NODE_OPTIONS=--use-system-ca` workaround
- [ ] 已睇過 Git mental model 同 Codex Desktop 5 動作
- [ ] Password manager 入面已生 16+ 字「dotai-personal-os SITE_PASSWORD」
- [ ] Codex Desktop default sandbox mode 確認 `workspace-write`

---

## 撞 problem 點算？

開課前 3 日內 message 老師（Discord / WhatsApp 提供 contact）。

最常見：
- Node 裝錯 LTS 16/18 — 升 22
- Git push 撞 authentication — open SSH key OR https token，老師會幫
- Codex Desktop login fail — confirm OpenAI account 仲 active
- Obsidian vault 揀錯位 — 隨時可以 close + open another vault
