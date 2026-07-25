# 中譯守則

這個 fork 把 *AI Safety for Fleshy Humans* 譯成臺灣中文。原文是 Nicky Case
寫的——口語、俏皮、會自嘲、會突然對你講話。**譯文也要是這樣。** 讀起來像機器翻譯，
就等於沒翻。

## 一、語感

目標：像一位風趣的臺灣科普作者「用中文寫出來」的東西，而不是「把英文搬過來」。

判準很簡單——**唸出來會不會卡？** 會卡就重寫。

### 翻譯腔清單（看到就改）

| 病灶 | 例 | 改成 |
| --- | --- | --- |
| 「一個」當冠詞 | 這是一個很好的例子 | 這是很好的例子 |
| 「被」字濫用 | 這個問題被稱為⋯⋯ | 這個問題叫做⋯⋯ |
| 「進行／做出」＋名詞 | 對它進行訓練 | 訓練它 |
| 「⋯⋯性的」 | 災難性的風險 | 災難級的風險／會出大事的風險 |
| 「當⋯⋯的時候」 | 當你看到它的時候 | 你看到它時 |
| 「對於⋯⋯來說」 | 對於 AI 來說 | 對 AI 而言／（多半可直接刪） |
| 代名詞照搬 | 它們會學習它們的偏見 | 會學到偏見 |
| 「的」連環 | 一個不嚴謹的非專業的名錄 | 一份不嚴謹、非專業的名錄 |
| 直譯英文成語 | 深埋在六英尺深的術語裡 | 被術語埋得死死的 |
| 名詞化 | 有一個對它的理解 | 看懂它 |

### 保留的東西

- **玩笑就是玩笑。** 雙關若翻不動，換一個中文也好笑的，別翻成解釋。
- **語氣詞、破折號、括號旁白、emoji** 是作者的節奏，照留。
- **第二人稱「你」**，不要改成「我們」或「讀者」。
- 原文用 `<i>` 強調的，中文也強調同一個意思——不必是同一個詞。

## 二、標點與排版

- 全形標點：`，。？！；：（）「」『』`
- 刪節號用 `⋯⋯`（六點），不要 `……`
- 中文與英數之間留半形空格：`2024 年`、`GPT-4 的能力`、`AI 安全`
- 破折號用 `——`
- 書名、作品名用 `《》`

## 三、詞彙表（臺灣用語）

一般用語：

| 英文 / 中國用語 | 臺灣用語 |
| --- | --- |
| chess / 國際象棋 | 西洋棋 |
| game theory / 博弈論 | 賽局理論 |
| algorithm / 算法 | 演算法 |
| software / 軟件 | 軟體 |
| program / 程序 | 程式 |
| data / 數據 | 資料 |
| information / 信息 | 資訊 |
| network / 網絡 | 網路 |
| computer / 計算機 | 電腦（`計算機` 在臺灣是「calculator」） |
| quality / 質量 | 品質（物理質量才用「質量」） |
| optimization | 最佳化 |
| probability / 概率 | 機率 |
| print / 打印 | 列印 |
| run / 運行 | 執行 |
| via / 通過 | 透過 |
| distribution / 分佈 | 分布 |
| Olympiad / 奧林匹克 | 奧林匹亞（數學競賽） |
| Van Gogh / 梵高 | 梵谷 |
| polio / 脊髓灰質炎 | 小兒麻痺症 |
| Turing | 圖靈 |
| Kahneman | 康納曼 |
| *Thinking, Fast and Slow* | 《快思慢想》 |
| brain in a vat / 缸中之腦 | 桶中之腦 |
| Pareto | 帕雷托 |
| Bayes | 貝氏 |

AI 安全術語（第一次出現時附原文，之後只用中文）：

| 英文 | 中文 |
| --- | --- |
| alignment | 對齊 |
| outer / inner alignment | 外部對齊／內部對齊 |
| deceptive alignment | 欺騙性對齊 |
| capabilities | 能力 |
| robustness | 穩健性（不要用「魯棒性」） |
| interpretability | 可解釋性 |
| scalable oversight | 可擴展監督 |
| reward hacking | 鑽獎勵漏洞 |
| goal misgeneralization | 目標錯誤泛化 |
| out-of-distribution | 分布外 |
| instrumental convergence | 工具趨同 |
| Goodhart's Law | 古德哈特定律 |
| takeoff | 起飛 |
| AGI | 通用人工智慧（AGI） |
| LLM | 大型語言模型（LLM） |
| fine-tuning | 微調 |
| RLHF | 人類回饋強化學習（RLHF） |
| benchmark | 基準測試 |
| neural network | 神經網路 |
| gradient descent | 梯度下降 |
| image classification | 影像分類 |
| computer vision | 電腦視覺 |
| agent | 代理（agent） |
| corrigibility | 可矯正性 |
| red teaming | 紅隊演練 |
| cyborg / centaur | 賽博格／半人馬 |
| existential risk | 存亡風險 |
| notkilleveryoneism | 「別殺光所有人」主義 |
| Swiss cheese model | 瑞士乳酪模型 |

## 四、絕對不能動的東西

網頁的互動機制**藏在內文裡**。改壞了不會報錯，只會在瀏覽器裡默默失效。

1. **註腳標籤**：`[^chess-vs-cats]` 與 `[^chess-vs-cats]:` 的英文標籤原封不動，
   數量與順序都不能變。譯的是註腳的**內容**。
2. **Nutshell 展開標題**：`#### :x Capabilities Not Intelligence` 這一行整行**保持英文**。
   Nutshell 用 `heading.replace(/[^A-Za-z0-9]/g,'')` 去比對錨點，翻成中文就變空字串，
   展開框會直接壞掉。
3. **Nutshell 連結**：`[:譯文](#CapabilitiesNotIntelligence)` —— 冒號前綴要留，
   `#Anchor` 要留，只譯中括號裡的文字。
4. **`<a id="...">`、圖片路徑、`{% include %}`、`{{ root }}`** 一字不改。
5. **`<orbit-reviewarea>` / `<orbit-prompt>`** 的標籤與屬性名不改；`question=` 與
   `answer=` 的**內容要譯**（那是給讀者看的閃卡），但值裡不可以出現半形雙引號 `"`。
6. **段落數不變。** 不要合併段落、不要刪掉旁白、不要「精簡」。
7. **標題層級不變**（`##` 還是 `##`），標題文字可以改得更順。

## 五、自我檢查

```bash
node scripts/check-chapter.ts p2/p2.md    # 對照 HEAD，確認結構沒跑掉
node scripts/build-site.ts                # 重新產生 HTML
vp test run                               # 全部不變式
```

`check-chapter.ts` 會抓：註腳增減、錨點斷掉、圖片路徑改動、段落數變化，以及
任何段落字數掉到原本 0.6 倍以下或漲到 1.6 倍以上（也就是「偷偷摘要掉了」）。
