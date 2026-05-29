# Day 2 H4 — Polish + 資安 + 展示 + Q&A + 未來方向 teaser (60 min)

## 目標

學員 polish 自己 OS、跑 5 條 P0 資安紅線 + checklist、demo 比同學睇、Q&A、teaser Level 3。

## 流程

### Step 0 — 資安 mini-section (15-20 min) 🆕

跑 `teaching/security.md` mini-section。重點 5 條 P0 紅線 + 5 步 deploy-time checklist + 2 條 demo（建議 prompt injection + audit script，或 preview URL bypass）。學員 ship 之前必跑 `npm run security:audit`。

對應 student 材料：`STUDENT-HANDBOOK.md` 「資安」一節。

**Time 緊張嘅 fallback**：剩 10 min → cut 落 1 條 demo（推薦 `npm run security:audit` live 跑） + 5 步 checklist 重點講。詳細時間分配見 `security.md` §8。

### Step 1 — Polish (15 min，由 20 min 縮)

每學員 self-polish：
- npm run build verify production bundle 跑得起
- 改 `index.html` title 做自己名
- 改 `src/App.tsx` sidebar header 「Personal OS」做自己 OS 名
- 揀一個 Tailwind 顏色 customize `tailwind.config.js` brand color

Codex prompt 範例：

```
我想 dashboard 改 dark mode default — 你建議：
1. Tailwind dark mode strategy: 'class' 定 'media'?
2. 點改 index.html / App.tsx / index.css 最少改動 ship?
3. Trade-off 寫返一段。
```

### Step 2 — Demo carousel (20 min，由 25 min 縮)

每學員 5 min demo：
- 開 own localhost:4173
- Walkthrough：sidebar / 5+ view / 自己加嘅 feature / 自己 vault data
- 1 個 wow moment （學員揀）
- 1 個 fail moment（坦白講撞咗咩問題、Codex 點幫）

老師 + TA + 同學鼓掌、問問題。

### Step 3 — Q&A (10 min)

開放問題。常見 question + 老師 cheatsheet：

| 問題 | 短答 |
|------|------|
| 點 sync 我兩部機嘅 vault？ | Git 推 vault 做 repo / iCloud / Syncthing。Personal OS 唔擁有 sync，vault 同步邊個 tool 都得。 |
| 想要 mobile app 點？ | Level 3 teaser — React Native + 同一 sync 層 |
| 學員 vault 上傳 GitHub safe 唔 safe？ | Private repo OR vault folder 入 `.gitignore` 揀 export |
| 點搞 production deploy 唔限 localhost？ | Vercel `git push` auto deploy / Netlify drag-drop dist/ folder |
| LLM cost 點 control？ | Codex CLI per-prompt 計、insight script 一日跑一次 cron |
| 想 Codex 自動 commit？ | `gh pr create --fill` + Codex prompt 寫 PR body；但 default 學員手動 review，唔好 auto-merge |

### Step 3.5 — Deploy 教學（optional bonus 或 課後 self-paced，30 min）

如果時間夠，老師示範一次「自己 deploy」by 行返 `teaching/deploy-your-own.md` 流程：

1. 學員開自己 Vercel account（Continue with GitHub）
2. Import 自己嘅 GitHub fork
3. Build command 改做 `npm run sync:vault && npm run build`
4. Deploy 出 URL
5. 設 repo private + 加 noindex meta + （可選）Basic Auth

**為咩呢度教 deploy 但唔係主軸**：
- Personal OS 嘅核心 workflow 喺 H1-H4 已 ship
- Deploy 係 distribute layer，唔影響 OS 本身點 work
- 學員 ship 個 OS 跑得起先，再 worry deploy 反而 mental model 清晰
- 如果時間 squeeze，呢段可以 skip，學員 reference `deploy-your-own.md` 自己跟做

**老師示範 talking point**：
- 私隱：每位學員 vault data 跟 deploy 上 cloud，所以 repo 一定要 private + 用 sample-vault 或者 Basic Auth gate
- 自動化：之後改 vault → `npm run sync:vault` → commit → push → Vercel 自動 rebuild
- Cost：Hobby plan 免費 quota 學員用唔晒

### Step 4 — Level 3 teaser (5 min，唔變)

老師 5 min slide：

**Level 3 預告**（暫定）：
- Multi-device sync (vault Git push + cron sync)
- Cloud deploy (Vercel + GitHub Action vault → public/data/ build-time generate)
- 2-way sync (frontend edit 寫返 vault file via REST API)
- Mobile (React Native 配同一 sync layer)
- Agent loop (Codex 每朝 scan vault 自動 propose insight)

報名 Level 3 加個 google form link。

## 教學收尾

老師 1 min closing：
- 兩日學咗：Vault as DB / Vite + React + TS 基礎 / Obsidian MCP / Codex 配 Git / Live coding workflow
- 真正 take-away：你而家有一個跑得起 + 自己 schema 嘅 personal OS，由今晚開始用
- 下一步：每日 5 min 用 → 一週後 evaluate 邊個 view 真係用、邊個唔用 → 自己 evolve

## 完成標準

- [ ] 學員可講返 5 條 P0 資安紅線 + 識跑 `npm run security:audit`
- [ ] 學員 ship 之前識行 5 步 deploy-time checklist
- [ ] 每學員 demo 自己 OS（5 min）
- [ ] 學員 Q&A 至少 1 條
- [ ] 學員拎走 Level 3 teaser
- [ ] 教學素材 share：repo URL / SYLLABUS / teaching folder（包 `security.md`）
