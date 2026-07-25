# 🤖🙀 寫給有血有肉的人類的 AI 安全指南 🙀🤖

**[線上閱讀](https://ai.audreyt.org)**

這是 [*AI Safety for Fleshy Humans*](https://aisafety.dance) 的臺灣中文版。
原作由 [Nicky Case](https://ncase.me) 與 [Hack Club](https://hackclub.com) 的青少年們合作完成。

翻譯守則（語感、詞彙表、不能動的標記）在 **[TRANSLATING.md](TRANSLATING.md)**。

## 開發

需要 Node 22 以上（產生器是 TypeScript，直接靠 Node 內建的型別剝離執行）。

```bash
npm install
npm run dev     # http://127.0.0.1:4321，改 .md 或 templates/ 就自動重建
npm run build   # 產生 index.html 與 p1/ p2/ p3/ 底下的 index.html
npm test        # 產生器與內容不變式
npm run check   # oxfmt + oxlint + 型別檢查
```

網站直接從 repo 根目錄提供（GitHub Pages），所以 `npm run build` 是**就地**寫檔，
不是輸出到 `dist/`。產生出來的 HTML 要跟原始檔一起 commit；`npm test` 會擋下忘記重建的情況。

改完一章之後：

```bash
node scripts/check-chapter.ts p2/p2.md
```

會比對該章與 `HEAD` 的結構——註腳、錨點、圖片路徑、Orbit 卡片數、標題層級、
段落數，以及每段的份量——確認潤稿沒有順手弄丟東西。

## 檔案在哪

| 路徑 | 是什麼 |
| --- | --- |
| `intro.md`, `p1/p1.md`, `p2/p2.md`, `p3/p3.md` | 正文 |
| `conclusion/` | 片尾，是手寫的 HTML |
| `templates/` | Nunjucks 版型 |
| `src/site/` | 產生器 |
| `scripts/page.js`, `styles/page.css` | 前端 |
| `media/` | 圖與影片 |
| `anki/` | 把 Orbit 閃卡轉成 Anki 牌組的工具 |

## 開源致謝

**前端：**

* [Nutshell](https://ncase.me/nutshell/)：可展開的說明
* [Littlefoot](https://littlefoot.js.org/)：註腳氣泡
* [MathJax](https://www.mathjax.org/)：數學排版
* [Orbit](https://withorbit.com/)：間隔重複閃卡

**建置：**

* [Vite+](https://vite.plus/)：開發伺服器、測試、格式化與 lint
* [Nunjucks](https://mozilla.github.io/nunjucks/)：版型
* [Markdown-it](https://markdown-it.github.io/) 與
  [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)

**字型：**

* [Merriweather](https://fonts.google.com/specimen/Merriweather)（襯線）
* [Open Sans](https://fonts.google.com/specimen/Open+Sans)（無襯線）
* 漢字使用系統字型：Noto Serif TC／Source Han Serif TC／PingFang TC 等

favicon 是 🤖 和 😱 用 Google Gboard Emoji Kitchen 混出來的。
[Google 的 emoji 字型](https://fonts.google.com/noto/specimen/Noto+Color+Emoji)是開源的（OFL）；
混合版沒找到明確授權，就先當作沒問題吧。
