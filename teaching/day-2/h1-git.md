# Day 2 H1 — Git workflow + Codex 配 Git (60 min)

## 目標

學員 fork → branch → commit (Codex 寫 message) → push → 開 PR → merge → pull upstream。完整 GitHub workflow 行一次。

## 為何 Git 教學要喺 Day 2 H1 唔係 Day 1 H1

Day 1 全班學員 fork 過一次 + commit 過幾條 sample；Day 2 H1 系統化教完整 workflow + 配 Codex。

## 流程

### Step 1 — Git mental model (15 min)

老師白板畫：

```
[Working tree (Disk file)]
       ↕ git add / git restore
[Staging area]
       ↕ git commit / git reset
[Local repo (.git/)]
       ↕ git push / git pull
[Remote repo (GitHub)]
```

3 個 state、4 條 transition、5 條 command 概念。學員 1 句 paraphrase 自己理解。

### Step 2 — 5 條 essential command (15 min)

老師示範 + 學員跟做：

```bash
# 1. Status — 永遠先睇
git status

# 2. 開 branch 做新嘢
git switch -c feat/add-reading-list

# 3. Stage + commit
git add scripts/sync-vault.mjs src/views/ReadingListView.tsx
git commit -m "feat: add reading list view + sync function"

# 4. Push
git push -u origin feat/add-reading-list

# 5. 開 PR
gh pr create --title "feat: reading list view" --body "新增 reading list 同 sync function"
```

老師強調：
- **永遠 branch 做新嘢**，唔好直接 commit main
- **commit message format**：`<type>: <one-line summary>`（type = feat / fix / docs / refactor / chore）
- **PR title = commit message** if single-commit PR

### Step 3 — Codex 寫 commit message (10 min)

老師示範 Codex prompt：

```
@cwd dotai-personal-os

我 stage 咗以下改動（git diff --staged 結果如下）：
<paste git diff --staged>

幫我寫一句 commit message：
- conventional commits format（feat / fix / docs / refactor / chore）
- 一行 ≤ 60 char
- focus 喺 WHY 唔係 WHAT
```

學員 mirror。

老師 commentary：
- Codex 識讀 diff 推 commit message
- Why > what — diff 已經 show what，message 要解釋 why
- "feat: add reading list view" 唔夠好；"feat: surface unread books to reduce vault dig" 好啲

### Step 4 — PR review 同 merge (10 min)

學員 PR open 後，老師示範：
1. 喺 GitHub web UI 開 PR
2. Reviewers 自選一個同學
3. 同學 review code（1 min）+ approve / request change
4. PR creator 收到 approval → `gh pr merge --squash --delete-branch`
5. 本機 `git switch main && git pull origin main`

**重點**：學員體驗一次 squash merge 同 delete branch — 呢個係 industry standard。

### Step 5 — 拎 upstream update (10 min)

老師喺自己 instructor repo push 一個 fix（live，學員見得到）。

學員：
```bash
git fetch upstream
git switch main
git merge upstream/main
git push origin main   # 同步學員 fork 嘅 main
```

老師 commentary：
- `origin` = 你嘅 fork
- `upstream` = 老師原 repo（gh repo fork 自動設）
- 課堂期間老師可能 push fix；學員 pull upstream 拎到

## Codex prompt 範例（H1）

```
我啱啱 git push 出 error: "Updates were rejected because the remote contains work that you do not have locally."

幫我 diagnose + propose 安全 fix（唔好建議 force push）。
```

```
參考 staged diff，幫我寫 commit message 同 PR body：
<paste git diff --staged>
```

## 完成標準

- [ ] 每學員完成一次完整 Git workflow：branch → commit → push → PR → merge → pull upstream
- [ ] 學員識用 Codex 寫 commit message + diagnose Git error
- [ ] 學員理解 fork / origin / upstream 三個 remote 概念
