# 自己 Deploy — 由 0 到一條 URL（私隱保護版）

學員每位開自己嘅 GitHub + Vercel account，將真實 vault data 嘅 personal OS 推上 cloud，攞返一條**有密碼保護**嘅 URL。

**老師示範時間**：Day 2 H4 最後 30 min，或者課後 self-paced。

---

## 整個 deploy 嘅 mental model

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
[Dashboard render，學員睇到自己 OS]
```

**4 層私隱保護**：
1. GitHub repo private（vault JSON 唔公開）
2. Vercel project private（dashboard URL random hash）
3. Edge Middleware Basic Auth（要密碼先入到）
4. noindex meta（Google 唔 index）

---

## ⚠️ 開始之前必讀

**Vercel 唔識讀你部機上嘅 vault**。Vercel build machine 喺 cloud，只睇到你 GitHub repo 入面嘅 file。

所以工作流程係：
1. 喺**自己機**用 `npm run sync:vault` 將 vault → JSON
2. 將 JSON `git commit` 入 repo
3. `git push` 上 GitHub
4. Vercel 從 GitHub 拎已經 build 好嘅 JSON，serve 出去

**呢個 = vault JSON 真係會去到 GitHub 同 Vercel**。所以：
- GitHub repo 必須 `--private`（外人見唔到你個 repo）
- Vercel URL 必須有密碼 gate（即使 URL leak 都入唔到）

呢 2 樣係 **mandatory**，唔係 optional。

---

## Step 1 — Repo 設 Private

如果未有自己 fork：

```bash
# Clone 老師 repo 落本機
git clone https://github.com/kennethlaw325/dotai-personal-os
cd dotai-personal-os

# 喺自己 GitHub 開新 private repo + push
gh repo create <你嘅 username>/dotai-personal-os --private --source=. --push
```

如果已經 fork 咗（public）想改 private：

1. 去 GitHub repo settings
2. 拉到底「Danger Zone」
3. 撳「Change repository visibility」→ Private → confirm

**確認 private**：repo 名側邊有個🔒 icon。

---

## Step 2 — 開 Vercel account

1. 去 https://vercel.com/signup
2. 揀「Continue with GitHub」（一鍵連 GitHub account）
3. Authorize Vercel access 你 GitHub
4. 揀 Hobby plan（免費）

**第一次用 Vercel 嘅 mental model**：
- Vercel = host static / serverless site 嘅雲端公司
- 你 GitHub push code → Vercel webhook 收到 → Vercel build + deploy → 出 URL
- 全自動，0 server 要你管

---

## Step 3 — Import 你個 GitHub repo

喺 Vercel dashboard：

1. 撳「Add New」→「Project」
2. 揀「Import Git Repository」
3. 列出你 GitHub 全部 repo，揀「dotai-personal-os」
4. 撳「Import」

---

## Step 4 — 配置 build

Vercel 應該 auto-detect Vite，框框已填好：

- **Framework Preset**: Vite
- **Build Command**: `npm run build`（**default OK，唔好加 sync:vault**）
- **Output Directory**: `dist`
- **Install Command**: `npm install`（default OK）

**重要：唔好將 build command 改做 `npm run sync:vault && npm run build`**。

點解？Vercel build machine 冇你 vault file，sync:vault 跑出嚟係空，會 overwrite 已 commit 嘅 JSON。

正確流程：
- **本機跑 sync** → commit 出嚟嘅 JSON
- **Vercel build** 只 build 已 commit 嘅 JSON
- Vercel 永遠唔需要見到你 vault

---

## Step 4.5 — 🚨 關咗 Vercel Authentication（必做，5 秒）

**唔做呢步，後面個 Basic Auth middleware 永遠都唔會 trigger。** Vercel 2025 起新 project 預設開「Vercel Authentication: Standard Protection」— 即係即使你部署到 production，都要透過 Vercel OAuth 先入到 site。呢個內建層喺 middleware **之前** intercept，所以你寫嘅 Basic Auth 唔會 fire。

1. 開 `https://vercel.com/<你 username>/dotai-personal-os/settings/deployment-protection`（或 dashboard → project → Settings → Deployment Protection）
2. **「Vercel Authentication」** section：「Require Log In」toggle **OFF**（藍變灰）
3. 撳「Save」

⚠️ **唔好掂下面個「Password Protection」** — 嗰個係 Vercel Pro plan $150/月 嘅 feature。我哋自己寫嘅 middleware Basic Auth 已 cover 同樣功能 + 仲多埋 security header。

驗證已關咗：之後 deploy 完，唔輸入 password curl 個 URL → 應該見到 `WWW-Authenticate: Basic realm="Personal OS"`（我嘅 middleware 出嘅），唔係 `Set-Cookie: _vercel_sso_nonce=...`（Vercel SSO 出嘅）。

---

## Step 5 — 加密碼保護（Edge Middleware）

呢步係**整個 deploy 嘅核心安全層**。Vercel Edge Middleware 喺 build 完之後喺 CDN 邊緣攔截每一個 request，無啱嘅密碼就返 401。

### 5.1 — 喺 project root 加 `middleware.ts`

✅ **Syntax 已 production verified**（2026-05-29 Phase 7 live deploy）：`@vercel/edge` 嘅 `next({ headers })` helper 喺 Vite SPA non-Next.js project work，pass-through path 嘅 SECURITY_HEADERS 真係 propagate 落下游。第一次 deploy 撞 import error 嘅話 `npm install @vercel/edge --save`。

```typescript
// middleware.ts at project root
//
// ⚠️ Vite SPA 版 pass-through syntax 未喺 production Vercel verify 過，
// 第一次 deploy 撞 error 跟 Vercel 提示 install `@vercel/edge` 即可。

import { next } from '@vercel/edge';

export const config = {
  // 紅線 #4 fix: 明確包 /data/* /api/* 防止 JSON 被 bypass
  matcher: ['/((?!_static|favicon|robots\\.txt).*)']
};

const SECURITY_HEADERS = {
  // 紅線 #5 cross-cut: 收緊 render-time exfil 通道
  'Content-Security-Policy':
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

export default function middleware(request: Request) {
  const password = process.env.SITE_PASSWORD;

  // 紅線 #2 fix: env var 漏設 → fail closed，唔係 fail open
  if (!password) {
    return new Response('Server misconfigured: SITE_PASSWORD not set', { status: 500 });
  }

  // 紅線 #4 fix: production + preview 都 enforce; 其他 env 直接拒
  const env = process.env.VERCEL_ENV;
  if (env !== 'production' && env !== 'preview') {
    return new Response('Forbidden', { status: 403 });
  }

  const auth = request.headers.get('authorization');

  if (auth) {
    const encoded = auth.split(' ')[1] ?? '';
    let decoded = '';
    try { decoded = atob(encoded); } catch { /* invalid base64 */ }
    const [, supplied] = decoded.split(':');
    if (supplied && supplied === password) {
      // 紅線 #5 fix: pass-through path 都套 SECURITY_HEADERS
      // `next()` 傳 headers option 會 propagate 落 downstream response
      return next({
        headers: SECURITY_HEADERS,
      });
    }
  }

  // 密碼錯或者冇 → 401 + 彈密碼框
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Personal OS"',
      'Content-Type': 'text/plain',
      ...SECURITY_HEADERS,
    }
  });
}
```

**呢個版本 vs 原版本嘅 5 條 hardening**（對應 §security.md 紅線）：
1. `SITE_PASSWORD` 漏設 → 500 fail-closed（紅線 #2）
2. `VERCEL_ENV` 唔係 production / preview → 403 拒絕（紅線 #4）
3. 401 response 套 CSP / X-Frame-Options / HSTS / Referrer-Policy / nosniff（紅線 #5 cross-cut）
4. `atob` 包 try/catch，invalid base64 唔會 throw 漏 stack trace
5. Pass-through path 都 propagate `SECURITY_HEADERS` 落下游 response（用 `@vercel/edge` `next()` helper）— Vite SPA 版未 Phase 7 verify，如撞 syntax error 跟 Vercel 提示 fallback 直接 `return undefined`


### 5.2 — 喺 Vercel 設 `SITE_PASSWORD` env var

Vercel project page → Settings → Environment Variables：
- **Name**: `SITE_PASSWORD`
- **Value**: 你揀嘅密碼（建議 12+ 字符）
- **Environments**: 揀 Production + Preview + Development 全部

撳「Save」。

### 5.3 — 揀密碼嘅原則

- 唔好用你 GitHub / email / Vercel 嘅同一個密碼
- 12+ 字符，包字母 + 數字 + 符號
- 比自己易記，比別人難猜
- 課程後可以 rotate（改 env var → redeploy → 舊密碼即時失效）

---

## Step 6 — 第一次 Deploy

返 Vercel dashboard，撳「Deploy」。Vercel 會：

1. Clone 你 GitHub repo
2. 跑 `npm install`
3. 跑 `npm run build`（純 build，唔 sync vault）
4. 將 `dist/` serve 上 CDN
5. Edge Middleware activated
6. 出條 URL：`https://dotai-personal-os-<hash>.vercel.app`

第一次 deploy 通常 2-3 分鐘。

打開條 URL — 應該彈出 browser 嘅密碼框：

```
Sign in
https://dotai-personal-os-xxx.vercel.app
Username: (隨便填)
Password: ********
```

輸入你 Step 5.2 設嘅密碼 → 入到 dashboard 🎉
輸入錯 → 彈框再彈 / 401 error。

---

## Step 7 — 防 Google 索引

`public/robots.txt` 已經包喺 skeleton repo 入面：
```
User-agent: *
Disallow: /
```

`index.html` `<head>` 應該已經有：
```html
<meta name="robots" content="noindex, nofollow">
```

雙重保險。即使有人公開 link 條 URL，Google bot 入到都彈密碼 → 入唔到 → 唔會 index。

---

## 之後嘅日常工作流程

**每次你 vault 有 update**：

```bash
# 1. 改 Obsidian vault file（task / daily note / draft）
#    （喺 Obsidian app 入面，唔關 terminal 事）

# 2. 喺 dashboard repo 跑 sync — 食 vault → 出新 JSON
VAULT_DIR="<你 vault path>" npm run sync:vault

# 3. Commit JSON + push
git add public/data/
git commit -m "sync vault $(date +%F)"
git push

# 4. Vercel auto-deploy 2 min 後 URL 內容更新
```

**Windows PowerShell 等價**：
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

**改 component / view**：
1. 改 `src/views/*.tsx` 或者其他 source code
2. Push
3. Vercel rebuild（vault JSON 唔變）

---

## FAQ

**Q：免費 Hobby plan 夠嗎？**
A：100 GB bandwidth / 月 + 6000 build minute / 月。一個 personal OS 5 學員 share 用 < 1% quota。

**Q：每次 push 都會 deploy 嗎？**
A：Push 去 `main` branch = auto-deploy production。Push 去其他 branch = preview deployment（每條 branch 一個獨立 URL，同 production URL 一齊 password gate）。

**Q：唔小心 push 咗 sensitive vault data 點搶救？**
A：因為 repo 已 private，外人本身就見唔到。但如果你誤將 repo 改 public，仲又 push 咗 sensitive vault — `git rm public/data/*.json && git commit --amend --no-edit && git push --force`（但 Git history 仲有 trace，最徹底 = 改 password + rotate 任何露咗嘅 credential）。**唔好用 `--force` 落已 share 嘅 branch**。

**Q：可唔可以 share URL 比朋友睇？**
A：得，但仲要 share 密碼。朋友每次入都要輸入密碼。課程完之後想收返 access，rotate 密碼即可。

**Q：點睇 deploy log / error？**
A：Vercel dashboard → Deployments → 撳邊個 deploy → 睇 build log。99% bug 喺 log 入面有 hint。

**Q：middleware.ts syntax 落到 Vercel 撞 error 點算？**
A：第一次 deploy 撞 error 跟 Vercel error message 提示 install 對應 package（最常見 `@vercel/edge`）。Update import + redeploy。

**Q：可以唔可以唔加 Basic Auth？**
A：唔可以。SPEC 講明真實 vault data → 一定要密碼 gate。冇 gate = 任何撞到 URL 嘅人都見到你個 vault。

**Q：用 PowerShell 跑 `vercel env add` 攞 password 變咗亂碼點算？**
A：⚠️ **PowerShell `Write-Output $pw | vercel env add ...` 會 silent 加 UTF-16 BOM + CRLF 落 password value**，Vercel store 後 middleware 比對失敗，唔輸入 password 都 401（其實 stored password 係 `<BOM>p0B4...\r\n` 唔係 `p0B4...`）。

✅ **修法**：
1. 用 **Bash / Git Bash** 跑：
   ```bash
   printf '%s' 'your-password' | vercel env add SITE_PASSWORD production
   ```
2. 或 PowerShell 用 `[Console]::Out.WriteLineAsync` / `Out-File -Encoding ASCII -NoNewline` 寫去 tempfile 再 redirect
3. **建議方法**：直接喺 Vercel dashboard Settings → Environment Variables UI 入 password，零 encoding 陷阱

**Q：Preview environment 點解 `vercel env add` 加唔到？**
A：CLI 攞 Preview environment 需要互動確認「apply to all preview branches」，session 非 interactive 時就 reject。解決：用 Vercel dashboard 加（30 秒），或者用 Vercel REST API `POST /v10/projects/<id>/env`。

---

## 完成標準

- [ ] GitHub repo 設咗 private（有🔒 icon）
- [ ] Vercel project import 成功
- [ ] Build Command 係 `npm run build`（**唔係** `sync:vault && build`）
- [ ] `middleware.ts` 喺 root，內容 verify 過
- [ ] Vercel env var `SITE_PASSWORD` 已設，3 個 environment 全揀
- [ ] 第一次 deploy 成功，攞到 URL
- [ ] 打開 URL 彈密碼框（唔係直接入 dashboard）
- [ ] 輸入啱密碼之後入到 dashboard，render 你真實 vault data
- [ ] robots.txt + noindex meta 已落
- [ ] 你識下次點 sync vault + push 更新 deploy
