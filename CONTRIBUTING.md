# 一起來改

## 發現問題

翻譯讀起來卡卡的、用詞怪怪的、連結壞掉、或是內容有錯？開一個 Issue 就好。
想直接動手，也歡迎送 Pull Request。

譯稿的判準寫在 **[TRANSLATING.md](TRANSLATING.md)**：語感、翻譯腔清單、
臺灣用語詞彙表，以及五類「看起來像內文、其實是機制」的標記。動手之前請先讀。

（第一章那些「摩爾／更多」的雙關不是錯字，是原作的⋯⋯呃⋯⋯「笑點」。）

## 內容錯誤

如果是**原作**的內容有誤，請到
[hackclub/ai-safety-dance](https://github.com/hackclub/ai-safety-dance) 開 Issue。
這個 repo 只負責中文版。

## 建置

```bash
npm install
npm run dev     # 開發伺服器，改 .md / templates/ 就自動重建並重新整理
npm run build   # 就地產生 index.html 與各章的 index.html
npm test        # 產生器與內容不變式
npm run check   # 格式、lint、型別
```

`npm run build` 直接寫進 repo 根目錄，因為 GitHub Pages 就是從那裡出貨。
產生的 HTML 請跟原始檔一起 commit——`npm test` 裡有一項會比對兩者，忘記重建就會紅。

改完一章請跑：

```bash
node scripts/check-chapter.ts p2/p2.md
```

它會確認註腳標籤與順序、頁內錨點、Nutshell 標題、圖片路徑、Nunjucks 標記、
Orbit 卡片數、標題層級、段落數都沒變，也會抓出任何字數掉到原本 0.6 倍以下
或漲到 1.6 倍以上的段落——也就是「不小心把一段摘要掉了」。

## 圖片

圖裡的英文字要另外處理：用你順手的影像編輯器改 `media/` 底下的圖，
中文字型可以去 Google Fonts 找。

## 閃卡

`anki/all-orbits-to-anki.sh` 會把各章的 Orbit 閃卡轉成可以匯入 Anki 的 .txt。
一般改稿用不到。

## 總之，玩得開心
