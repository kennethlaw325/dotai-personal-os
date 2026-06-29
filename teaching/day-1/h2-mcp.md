# Day 1 H2 — Codex 第一次讀你 vault (60 min)

## 目標

學員體驗「Codex 已經識我 vault」嘅 wow moment。

呢小時介紹**3 條路**俾 Codex 讀你 vault，由最簡單到最進階：

| 路 | 點 setup | 何時用 |
|----|------|--------|
| 1. 直接讀 vault folder | 0 setup，`@cwd <vault>` 即可 | 課堂主軸，每個學員都用得起 |
| 2. Obsidian MCP server | 裝 plugin + npm install + Codex config | 想 live 同 Obsidian 同步 / search / link 操作 |
| 3. Obsidian CLI | 裝 npm 套件，叫 command | Power user / 進階 scripting |

呢 60 min 學員會：
- 用路 1 試「Codex 識我 vault」（主軸 30 min）
- 用路 2 試一次 MCP setup（20 min）
- 路 3 簡單 demo + 點時候用（10 min）

---

## 流程

### Step 1 — 路 1：直接讀 vault folder（30 min）

最簡單。Codex Desktop 本身就識讀 markdown / text file。你只需要話佢知 vault 喺邊。

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

3. Codex 用 file system tool 行 vault folder → 讀 frontmatter → 出 list

**Wow moment**：Codex 真係可以讀你 vault 任何 file，唔係 hallucinate。

跟進 prompt 試 :
- 「揾我 vault 入面最後 3 個改動嘅 file」
- 「我 inbox folder 有幾多個 unsorted note？」
- 「我 tasks/ folder 入面 status 係 doing 嘅 task 有邊個？」

**老師 commentary**：
- 路 1 = 0 dependency，學員今晚返到屋企都用得返
- 限制：Codex 只係 read file，唔識操作 Obsidian app（無法 trigger plugin / open vault / 寫去 graph view）
- 對 Level 2 personal OS 嘅需要嚟講，路 1 已經夠用

### Step 2 — 路 2：Obsidian MCP server（20 min）

MCP = Model Context Protocol，Anthropic 提出嘅標準。Obsidian MCP server = 將 vault expose 做 Codex tool。

好處：
- Codex 可以叫 Obsidian 嘅 plugin function（例：search-graph、open-note、create-note）
- Codex 可以 trigger vault 嘅 real-time event
- Codex 可以 modify file 同 Obsidian 同步（唔需要學員手動 refresh）

**做法**（學員跟做）：

1. **Obsidian app 內**：Settings → Community plugins → Browse → search「Local REST API」→ Install + Enable
2. **拎 API key**：Settings → Local REST API → Copy API key + 留意 port (default `127.0.0.1:27124`)
3. **裝 obsidian-mcp-server**（喺學員 terminal）：
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

Codex 應該 call `obsidian.list_folders` 之類嘅 MCP tool 出 list。

**老師 commentary**：
- MCP 比路 1 更深層整合，但 setup 6 step 對新手 friction 高
- 課堂示範一次，學員自己揀返屋企繼續用定唔用
- 跑唔到 fail mode：Obsidian app 唔係 running → MCP server 連唔到；API key 錯 → 401；port 撞 → 改 Obsidian plugin port

### Step 3 — 路 3：Obsidian CLI（10 min）

第三方 npm 套件 `obsidian-cli`（或者 `obsidiancli`），唔由 Obsidian 官方維護。

特點：
- 直接 command line trigger Obsidian function（open vault / create note / search）
- 適合 script automation
- 唔需要每次都開 chat

**老師示範**（學員睇住）：

```bash
npx obsidian-cli --help
# 列出可用 command
```

```bash
npx obsidian-cli open "30 - Notes/2026-05-24 內容排程系統 Phase 1 ship.md"
# 直接喺 Obsidian app 開呢個 note
```

**老師 commentary**：
- 路 3 唔係 Codex 直接用，係你寫 script 嘅時候 leverage
- 課堂唔深入，學員自己研究自動化時參考
- 唔係主流選擇，但有 niche use case（例：每朝 cron job auto-open 今日 daily note）

---

## 路 1 / 2 / 3 trade-off 總結

學員應該記住：

- **路 1（直接讀）= 95% 用 case 嘅 default**。0 setup，最 portable，課程主軸
- **路 2 (MCP)** = 需要 Codex 同 Obsidian 雙向互動嘅 advanced setup。Day 2 H2 LLM aggregation 用得到
- **路 3 (CLI)** = 寫 script 自動化嘅 power user 工具

---

## Codex prompt 範例（H2）

```
@cwd <你 vault path>
列出我 vault 嘅 `tasks/` folder 入面所有 .md，
每個 output 一行：filename + frontmatter status。
```

```
@cwd <你 vault path>
我有 50 個 inbox 未分類 note，
讀晒呢啲 file 嘅 title + 首段，
幫我 group 做 5 個 theme 出來。
```

```
比較「路 1：Codex 直接讀 vault folder」vs「路 2：Obsidian MCP」嘅 trade-off。
我嘅 use case 係 personal OS dashboard build + 偶爾叫 Codex search / summarize my notes，
應該揀邊條路？
```

## 完成標準

- [ ] 每位學員用路 1 成功問 Codex「列出我 vault 入面有咩 task」
- [ ] 至少看過老師示範路 2 MCP setup 一次（自己跟做為 stretch goal）
- [ ] 學員清楚路 1 / 2 / 3 各自咩用，唔混淆
- [ ] 學員理解 Codex 真係識讀你 vault，唔係 hallucinate
