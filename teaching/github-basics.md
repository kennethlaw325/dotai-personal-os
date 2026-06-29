# GitHub 基礎教學

開課前學員自學 + 第一日課堂 hands-on。

## Mental model（5 min）

```
[Working tree (你電腦 file)]
       ↕ git add / git restore
[Staging area (準備 commit)]
       ↕ git commit / git reset
[Local repo (你電腦 .git/)]
       ↕ git push / git pull
[Remote repo (GitHub)]
```

3 個 state、4 條 transition。記住呢張圖，90% Git command 就 make sense。

## 一定要識嘅 8 條 command

```bash
# 1. Clone / fork
gh repo fork kennethlaw325/dotai-personal-os --clone

# 2. Status — 任何時候唔知做緊咩，先跑呢條
git status

# 3. 開 branch
git switch -c feat/<feature-name>

# 4. Stage 改動
git add <file1> <file2>
# 或者全部
git add -A

# 5. Commit
git commit -m "feat: short description"

# 6. Push branch
git push -u origin feat/<feature-name>

# 7. 開 PR
gh pr create --title "feat: short description" --body "longer explanation"

# 8. Merge + cleanup
gh pr merge --squash --delete-branch
git switch main && git pull
```

## Conventional commit message

```
<type>: <short summary, ≤ 60 char>

<optional longer body explaining WHY>

<optional footer e.g. Closes #123>
```

`<type>` 揀：

| Type | 用嚟 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修 bug |
| `docs` | 改 README / doc 文 |
| `refactor` | 改 code 但唔改行為 |
| `chore` | dependencies / config / build |
| `test` | 改 test |

範例：
- ✅ `feat: add reading list view + sync function`
- ✅ `fix: orphan-count miscount when wikilink has alias`
- ❌ `update stuff` (太 vague)
- ❌ `feat: I added a reading list view to the app for tracking books that I am reading and also planned to read.` (太長 + redundant)

## 三個 remote 概念

```bash
git remote -v
# origin     https://github.com/<你>/dotai-personal-os.git  (fetch)
# origin     https://github.com/<你>/dotai-personal-os.git  (push)
# upstream   https://github.com/kennethlaw325/dotai-personal-os.git  (fetch)
# upstream   https://github.com/kennethlaw325/dotai-personal-os.git  (push)
```

- `origin` = 你 fork 嘅 repo（你 push 去呢度）
- `upstream` = 原 repo（fetch 拎老師 update）
- 永遠唔好 push 去 `upstream`，你冇權限

拎 upstream update：
```bash
git fetch upstream
git switch main
git merge upstream/main
git push origin main    # 同步你 fork 嘅 main
```

## Codex 配 Git

Codex 識讀 staged diff 寫 commit message：

```
@cwd dotai-personal-os

我 stage 咗以下改動：
<paste `git diff --staged`>

幫我寫 commit message：
- conventional commits format
- ≤ 60 char
- focus 喺 WHY 唔係 WHAT
```

Codex 識 diagnose Git error：

```
我跑 git push 出咗：
"Updates were rejected because the remote contains work that you do not have locally."

幫我 diagnose + 提議 safe fix（唔好建議 force push）。
```

## 點 prevent 自己撞炸

**唔好做**：
- 直接 commit 去 main branch（永遠先 `git switch -c`）
- `git push --force` 去 shared branch（除非你 100% 知後果）
- `git reset --hard` 之後再 `git push`（你 partner 嘅 work 會炸）
- `git clean -fd` 唔睇就跑（unstaged file 永久消失）

**安全 fallback**：撞到唔知點 → `git status` → `git log --oneline -10` → ask Codex「幫我解釋呢個 state」。

## Repo 入 `.gitignore` 嘅嘢

Personal OS 自己 vault 入 GitHub safe 唔 safe？

- **Private repo** = OK
- **Public repo** = `.gitignore` 揀 export — 例如 `sample-vault/` commit、real `vault/` exclude
- **唔好 commit**：API key / `.env` / personal sensitive notes

呢個 skeleton 嘅 `.gitignore`：
```
node_modules
dist
.DS_Store
*.local
.vite
```

學員如果加 real vault `vault/` 都應該 ignore：
```
node_modules
dist
.DS_Store
*.local
.vite
vault/         ← 加呢條
```

## 完成標準

學員可以：
- [ ] 解釋 working tree / staging / local repo / remote 4 個概念
- [ ] 跑 8 條 essential command
- [ ] 用 Codex 寫 commit message
- [ ] 知 origin vs upstream 差別
- [ ] 知 force push 後果同其他 safe fallback
