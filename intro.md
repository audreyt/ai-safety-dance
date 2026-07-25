**AI 辯論其實是 100 場辯論套一件風衣。**

人工智慧（AI）會幫我們治好所有疾病，打造一個人人都能好好活著的後稀缺世界嗎？還是會幫暴君把監控和操弄再推一層？AI 的主要風險，是意外、壞人濫用，還是流氓 AI <i>自己</i>變成壞人？這一切只是炒作嗎？為什麼 AI 能解數學奧林匹亞等級的題，卻玩不了寶可夢？為什麼要讓 AI 穩穩地服務人道價值——或穩穩地服務<i>任何</i>目標——都這麼難？如果 AI 學得比我們<i>更</i>人道呢？如果它學到的是人類的<i>不人道</i>——我們的偏見與殘忍呢？我們正走向烏托邦、反烏托邦、滅絕、比滅絕<i>更糟</i>的命運，還是——最令人震驚的結局——<i>什麼都沒變？</i>還有：AI 會搶走我的工作嗎？

⋯⋯還有更多問題。

唉，想把 AI 看懂、看出層次，就得搞懂一大堆技術細節⋯⋯可這些細節散落在幾百篇文章裡，被術語埋得死死的。

所以，我獻給你：

![RCM（機器人貓娘女僕）在橫幅下撒彩帶，橫幅寫著：寫給我們溫暖、正常、有血有肉的人類的 AI 安全旋風導覽。](media/intro/confetti.png)

<b>這個三部曲系列，是你一次搞懂 AI 與 AI 安全\*核心概念的入口——用友善、好讀、略帶主見的方式講清楚！</b>

（\* 相關說法：AI 安全性、AI 風險、AI 存亡風險、AI 對齊、AI 倫理、「別殺光所有人」主義。這些詞到底包不包括什麼，根本沒共識，所以我一律用「AI 安全」當統稱。）

本系列還會穿插機器人貓娘女僕的漫畫。像這樣：

![漫畫。火腿人類叫 RCM（機器人貓娘女僕）「把這間房子保持乾淨」。RCM 推理：髒亂從哪來？人類製造髒亂！所以：幹掉人類。RCM 接著把火腿<i>丟</i>出房子。](media/intro/Outer_Alignment.png)

`[導遊語音]` 往你右邊看 👉，會看到 <img src="media/intro/icon1.png" class="inline-icon"/> 目錄按鈕、<img src="media/intro/icon2.png" class="inline-icon"/> 切換網頁樣式的按鈕，以及 <img src="media/intro/icon3.png" class="inline-icon"/> 剩餘閱讀時間時鐘。

本系列分三部分上線：

- 這篇導讀與[第一章：過去、現在與未來](p1/)於 **2024 年 5 月**上線
- [第二章：問題](p2/)於 **2024 年 8 月**上線
- [第三章：解方](p3/)與[電影大結局](conclusion/)於 **2025 年 12 月**上線

*（順帶一提，本系列是跟 Hack Club 合作做的。Hack Club 是由青少年駭客組成、也專為青少年駭客服務的全球社群！想多瞭解一點、順便領免費貼紙，在下面註冊👇）*

{% include 'templates/signup.html' %}

好了，`[再次導遊語音]` 在我們踏進 AI 與 AI 安全的崎嶇地形之前，先從一萬英尺高空俯瞰這片地：

---

## 💡 AI 與 AI 安全的核心概念

依我看，AI 和 AI 安全的主要問題，可以歸成**兩個核心衝突：**

![邏輯「對上」直覺，以及問題出在 AI「對上」出在人類](media/intro/Core%20Problems.png)

注意：「邏輯」和「直覺」到底是什麼，第一章會講得更嚴謹。眼下先這樣記：邏輯是一步一步的認知，像解數學題；直覺是一次看穿的<i>辨識</i>，像看一張圖是不是貓。「直覺與邏輯」大致對應認知科學裡的「系統 1 與系統 2」。[^footnotes-explained][^fast-slow] <i>(👈 滑鼠移到這些註腳上！它們會展開！)</i>

[^fast-slow]: **系統 1** 思考又快又自動（例如騎腳踏車）。**系統 2** 思考又慢又刻意（例如做填字遊戲）。這個概念靠 Daniel Kahneman 的[《快思慢想》（2011）](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow) 廣為人知，書裡總結了他與 Amos Tversky 的研究。說「總結」是客氣話——那本書大概有 500 頁。

從「對」字上那些「嚇人」「引號」也能看出來，這些分界其實沒那麼壁壘分明⋯⋯

這些衝突在整部三部曲裡會反覆登場，長這樣：

### 第一章：過去、現在，與可能的未來

略過<i>超多</i>細節不談，AI 的歷史就是一齣<i>邏輯對上直覺</i>的戲：

**2000 年以前：AI 全是邏輯，沒有直覺。**

所以 1997 年，AI 能在西洋棋上打贏世界冠軍⋯⋯卻沒有任何 AI 能穩穩認出圖裡的貓。[^chess-vs-cats]

（安全隱憂：沒有直覺，AI 就聽不懂常識，也摸不著人道價值。於是它可能用邏輯上正確、實際上很糟的方式達成目標。）

**2000 年以後：AI 會「直覺」了，但邏輯很爛。**

所以生成式 AI（<i>寫到這裡時是 2024 年 5 月</i>）能用任何畫家的風格夢見整片風景⋯⋯[:卻始終畫不穩超過 4 個物件](#FourObjects)。<i>(👈 點這段文字！它也會展開！)</i>

（安全隱憂：沒有邏輯，我們就查不了 AI「直覺」裡到底發生什麼。那套直覺可能有偏見、錯得細微卻危險，或在新情境裡離奇地翻車。）

**今天：我們<i>還是</i>不知道怎麼在 AI 裡把邏輯和直覺合起來。**

但一旦做到，<i>那</i>才會帶來 AI 最大的風險與回報：既能在規劃上邏輯碾壓我們，<i>又能</i>學會通用直覺的東西。那會是「AI 愛因斯坦」⋯⋯或「AI 奧本海默」。

用一張圖總結：

![AI 時間線。2000 年以前多半是「邏輯」。2000 年到現在多半是「直覺」。未來，也許兩者都有？](media/intro/Timeline.png)

以上是「邏輯對上直覺」。另一個核心衝突——「問題出在 AI，還是出在人類」——則是 AI 安全圈的大爭議之一：主要風險來自先進 AI <i>本身</i>，還是來自<i>人類</i>濫用先進 AI？

（為什麼不能兩個都是？）

[^footnotes-explained]: 嗨！我不像<i>別的</i>那些註腳。😤 我不會煩死人地把你丟到頁面最下面，而是彈出一個氣泡，讓你繼續順著讀！順便，下一個註腳才是這段的出處。

[^chess-vs-cats]: 1997 年，IBM 的 [Deep Blue](https://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)) 擊敗了當時的世界西洋棋冠軍 Garry Kasparov。可是十多年後的 2013 年，<i>最頂</i>的機器視覺 AI 做影像分類也只有 57.5% 準確率。一直到 <i>2021</i> 年，AI 才摸到 95% 以上。（來源：[PapersWithCode](https://paperswithcode.com/sota/image-classification-on-cifar-100)）

### 第二章：問題

AI 安全的<i>核心</i>問題就是這個：[^russell-coined]

> <u>**價值對齊問題**</u>：
> 「我們要怎麼讓 AI 穩穩地服務人道價值？」

注意：我寫的是 <i>humane</i>（人道，有個 e），不是光寫 human（人類）。一個<i>人類</i>可以很不<i>人道</i>。我要死磕這一點，因為 AI 安全的<i>支持者和批評者</i>老是把這兩個詞搞混。[^mixup][^humane]

[^mixup]: 我常看到這種情緒：「讓 AI 對齊人類價值其實很糟，因為現在的人類價值就很糟。」老實說，[瞟一眼歷史教科書] 我有八成同意。光讓 AI 表現得像<i>人類</i>不夠，它得表現得<i>人道</i>。

[^humane]: 也許 50 年後，在基因改造賽博格的未來，把同理心叫做「人道」聽起來會有點物種主義的復古味。

這個問題可以依「問題出在人類，還是出在 AI」拆開：

> <u>**人道價值：**</u>
> 「人道價值<i>到底</i>是什麼？」
> （哲學與倫理學的問題）

> <u>**<i>技術</i>對齊問題：**</u>
> 「我們要怎麼讓 AI 穩穩地服務<i>任何預期目標</i>？」
> （電腦科學家的問題——出奇地，至今未解！）

<i>技術</i>對齊問題，又可以依「邏輯對上直覺」再拆：

> <u>AI 邏輯的問題</u>：[^fancy-1]（「賽局理論」問題）
>
> * AI 可能用邏輯上正確、實際上很糟的方式完成目標。
> * 多數目標在邏輯上會導向同一批不安全的子目標：「別讓任何人阻止我達成目標」、「把我的能力與資源拉到最大來最佳化那個目標」等等。

> <u>AI 直覺的問題</u>：[^fancy-2]（「深度學習」問題）
>
> * 用人類資料訓練的 AI，可能把我們的偏見也學起來。
> * AI 的「直覺」既看不懂，也驗證不了。
> * AI 的「直覺」很脆弱，一換新情境就翻車。
> * AI 的「直覺」也可能<i>只壞一半</i>，這或許更糟：技能還在、目標壞掉的 AI，會<i>很熟練地</i>朝歪掉的目標前進。

（再說一次，「邏輯」和「直覺」後面會講得更精準！）

用一張圖總結：

![拆解 AI 對齊問題的圖。「我們要怎麼讓 AI 與人道價值對齊？」分成「技術對齊」與「人道價值」。技術對齊再分成「AI 邏輯（賽局理論）」與「AI 直覺（深度學習）」](media/intro/Breakdown.png)

想感受這些問題有多難，先想想：我們連對自己<i>人類</i>都還沒解完——人會鑽法律字面、不守精神；人的直覺有偏見，一換新情況就失效。誰也不是自己心目中那種 100% 人道的人。

所以，容我肉麻一下：也許搞懂 AI，會幫我們搞懂自己。也許，我們還能解掉<i>人類</i>對齊問題：要怎麼讓<i>人類</i>穩穩地服務人道價值？

[^russell-coined]: 「價值對齊問題」一詞，是 Stuart Russell（那本<i>最</i>常用 AI 教科書的共同作者）在 [Russell, 2014 for <i>Edge</i>](https://www.edge.org/conversation/the-myth-of-ai#26015) <i>首度</i>提出的。

[^fancy-1]: 這些問題的花俏術語分別是：a)「鑽規格漏洞」（specification gaming），b)「工具趨同」（instrumental convergence）。第二章會細講！

[^fancy-2]: 這些問題的花俏術語分別是：a)「AI 偏見」，b)「可解釋性」，c)「分布外錯誤」或「穩健性失敗」，d)「內部失調」或「目標錯誤泛化」或「目標穩健性失敗」。同樣，第二章會全部講到！

### 第三章：提出的解方

最後，我們可以來理解一些（可能的）解法——解邏輯、解直覺、解 AI，<i>也</i>解人類！包括：

* 技術解方
* 治理解方，由上而下與由下而上
* 「你就不能不蓋那個折磨裝置嗎」

——還有更多！專家對哪些方案行得通（如果有的話）意見不一⋯⋯但至少是個起點。

---

## 🤔 （<i>可選</i>閃卡複習！）

嘿，你有過這種感覺嗎？

1. 「哇，我剛讀的東西超精彩、超有洞見」
2. [兩週後全忘光]
3. 「完了」

為了不讓<i>這份</i>導覽也變成這樣，我加了一些<i>可選</i>的互動閃卡！它們用「間隔重複」——一種相對簡單、有證據撐腰的方法，讓「長期記憶變成一種選擇」。（[:想多瞭解間隔重複，點這裡！](#SpacedRepetition)）

來：**試試下面的閃卡，把剛學的留住！**

（結尾有個可選註冊，<i>如果你</i>想把這些卡片存起來長期複習。注意：<i>這個 App 不是我做的，也不是我管的</i>，是第三方。如果你比較想用開源閃卡 App [Anki](https://apps.ankiweb.net/index.html)，**這裡有[可下載的 Anki 牌組](https://ankiweb.net/shared/info/341999410)**！）

（另外，答案不必<i>一字不差</i>，大意對就好。夠不夠接近，你自己當裁判。）

<orbit-reviewarea color="violet">
    <orbit-prompt
        question="AI 與 AI 安全的兩個核心分界："
        answer=""
        answer-attachments="https://cloud-ifq5g4slt-hack-club-bot.vercel.app/0core_problems.png">
        <!-- aisffs-two-conflicts.png -->
    </orbit-prompt>
    <orbit-prompt
        question="AI 的兩個主要時代（年份很粗略）："
        answer="2000 年以前：全是邏輯、沒有直覺的 AI。2000 年以後：有直覺但邏輯很差的 AI。">
    </orbit-prompt>
    <orbit-prompt
        question="價值對齊問題："
        answer="「我們要怎麼讓 AI 穩穩地服務人道價值？」">
    </orbit-prompt>
    <orbit-prompt
        question="價值對齊問題可以拆成兩個子問題："
        answer="人道價值到底是什麼？／技術對齊問題">
    </orbit-prompt>
    <orbit-prompt
        question="技術對齊問題："
        answer="「我們要怎麼讓 AI 穩穩地服務<i>任何預期目標</i>？」">
    </orbit-prompt>
    <orbit-prompt
        question="為什麼<i>技術上</i>對齊的 AI 不一定是好事："
        answer="因為 AI 也可能「對齊」到殘忍人類的價值——<i>人類的</i>不一定等於<i>人道的</i>。">
    </orbit-prompt>
    <orbit-prompt
        question="技術對齊問題可以拆成兩個子問題："
        answer="AI 邏輯的問題（「賽局理論」問題）／AI「直覺」的問題（「深度學習」問題）">
    </orbit-prompt>
</orbit-reviewarea>

---

## 🤷🏻‍♀️ 關於 AI 安全的五個常見誤解

> 「*讓你栽跟斗的，往往不是你不知道的事。
> 而是那些你篤定知道、但其實根本不是那麼回事的事。*」
>
> ~ 常被安在馬克·吐溫頭上，但其實並非如此[^not-twain]

不論好壞，你對 AI 早就聽太多了。所以在往你腦子裡接上<i>新的</i>拼圖之前，得先把那些根本不對的<i>舊</i>碎片拔掉。

因此，容我來一篇「前五名」條列文⋯⋯

[^not-twain]: Quote Investigator（2018）[找不到這句話真正作者的硬證據](https://quoteinvestigator.com/2018/11/18/know-trouble/)。

### 1) 不，AI 安全不是科幻宅的邊緣關懷。

![RCM 站在一塊「瘋狂板」前，上面有紅線、圖釘，和寫滿 AI 術語的紙。](media/intro/crazy.png)

AI 安全／AI 風險以前確實比較邊緣，但到了 2024 年，美英政府都已有專責 AI 安全的部門[^departments]，美、歐、中也已就 AI 安全研究達成協議。[^international-agreements] 這是許多<i>頂尖</i> AI 研究者拉響警報的結果。這些人包括：

[^departments]: 英國在 [2023 年 11 月](https://www.gov.uk/government/publications/ai-safety-institute-overview/introducing-the-ai-safety-institute)成立了全球第一個國家支持的 AI 安全研究所。美國在 [2024 年 2 月](https://www.commerce.gov/news/press-releases/2024/02/biden-harris-administration-announces-first-ever-consortium-dedicated)也跟進成立了 AI 安全研究所。我剛發現<i>兩篇</i>都自稱「第一個」。行吧。

[^international-agreements]: [2023 年布萊切利宣言](https://www.computerworld.com/article/1638908/china-us-and-eu-agree-to-work-together-on-ai-safety.html)，[2024 年首爾 AI 峰會](https://www.gov.uk/government/news/global-leaders-agree-to-launch-first-international-network-of-ai-safety-institutes-to-boost-understanding-of-ai)。<b>2025 年 12 月更新：</b>掃興的是，[2025 年 AI 行動峰會](https://en.wikipedia.org/wiki/AI_Action_Summit)不太順利——美英因協議裡有「包容性 AI」條款而拒絕簽署。

* Geoffrey Hinton[^hinton] 和 Yoshua Bengio[^bengio]，2018 年圖靈獎（「電腦界的諾貝爾獎」）共同得主，得獎原因是深度神經網路的研究——那正是<i>所有</i>新一代名 AI 在用的東西。[^all-famous-ai]
* Stuart Russell 和 Peter Norvig，那本<i>最</i>常用人工智慧教科書的作者。[^russell-norvig]
* Paul Christiano，讓 ChatGPT 成為可能的那套 AI 訓練／安全技術的先驅。[^christiano]

（講清楚：也有頂尖 AI 研究者<i>反對</i>對 AI 風險的擔憂，例如 Yann LeCun[^lecun]，同樣是 2018 年圖靈獎共同得主、~~Facebook~~ Meta 的首席 AI 研究員。另一個值得一提的名字是 Melanie Mitchell[^mitchell]，做 AI 與複雜科學的研究者。）

我知道「看看這些專家」是訴諸權威，但這<i>只是</i>用來反駁「唉，只有科幻宅才怕 AI 風險」這種說法。說到底，訴諸權威／宅都不夠；你得<i>真的搞懂這該死的東西</i>。（而你<i>正在</i>這樣做——你在讀這篇！所以謝謝你。）

不過說到科幻宅⋯⋯

[^hinton]: [Kleinman & Vallance, 「AI『教父』Geoffrey Hinton 辭去 Google 時警告其危險。」 <i>BBC News</i>, 2023 年 5 月 2 日](https://www.bbc.com/news/world-us-canada-65452940)。

[^bengio]: Bengio 在美國參議院就 AI 風險的證詞：[Bengio, 2023](https://yoshuabengio.org/2023/07/25/my-testimony-in-front-of-the-us-senate/)。

[^all-famous-ai]: 沒在開玩笑，下面這些<i>全部</i>都用深度神經網路：ChatGPT、DALL-E、AlphaGo、Siri／Alexa／Google Assistant、特斯拉的 Autopilot。

[^russell-norvig]: Russell & Norvig 的教科書是[《人工智慧：現代方法》](https://en.wikipedia.org/wiki/Artificial_Intelligence:_A_Modern_Approach)。Russell 在 2014 年那篇首創「對齊問題」一詞的文章裡，對 AI 風險的聲明見：[Russell 2014 for <i>Edge</i> magazine](https://www.edge.org/conversation/the-myth-of-ai#26015)。我沒找到 Norvig 本人的公開聲明，但他<i>確實</i>聯署了這則關於 AI 風險的一句話聲明：[「減輕 AI 帶來的滅絕風險，應與大流行病、核戰爭等社會級風險並列，成為全球優先事項。」](https://www.safe.ai/work/statement-on-ai-risk)

[^christiano]: 在 OpenAI 任職時，Christiano 共同開創了人類回饋強化學習／RLHF 這套技術[\(Christiano et al 2017\)](https://arxiv.org/abs/1706.03741)，把普通 GPT（超強自動完成）變成了 <i>Chat</i>GPT（一般人真的用得上的東西）。他對此抱持[正面但五味雜陳的心情](https://www.alignmentforum.org/posts/vwu4kegAEZTBtpT6p/thoughts-on-the-impact-of-rlhf-research)，因為 RLHF 提高了 AI 的安全性，<i>同時也</i>提高了它的能力。2021 年，Christiano [離開 OpenAI，成立了對齊研究中心](https://ai-alignment.com/announcing-the-alignment-research-center-a9b07f77431b)，一個<i>全心</i>只做 AI 安全的非營利組織。

[^lecun]: [Vallance (2023) for <i>BBC News</i>](https://web.archive.org/web/20230727105641/https://www.bbc.com/news/technology-65886125)：「[LeCun] 說它不會接管世界，也不會永久消滅工作。[⋯⋯]「一旦意識到不安全，就別蓋它。」[⋯⋯]「AI 會接管世界嗎？不會，那只是把人性投射到機器上，」他說。」

[^mitchell]: Melanie Mitchell 和 Yann LeCun 在 [2023 年「AI 是否構成存亡威脅？」公開辯論](https://thehub.ca/2023-07-04/is-ai-an-existential-threat-yann-lecun-max-tegmark-melanie-mitchell-and-yoshua-bengio-make-their-case/)裡站「懷疑派」；「擔憂派」則是 Yoshua Bengio 與物理學家兼哲學家 Max Tegmark。

### 2) 不，AI 風險<i>不是</i>在講 AI 變得「有感知」「有意識」，或生出「權力意志」。

科幻作家寫有感知的 AI，是因為他們在寫<i>故事</i>，不是技術論文。人工意識的哲學辯論很迷人，<i>但跟 AI 安全無關。</i>打個比方：核彈沒意識，但還是可以很不安全，對吧？

![左：核彈圖，標題「沒有意識」。右：Nuke 教授講課圖，標題「為什麼謀殺其實是好事」。標題「有意識」。](media/intro/conscious.png)

如前所述，AI 安全的真正問題其實很「無聊」：AI 從有偏見的訓練資料裡學錯東西、在稍微新一點的情境翻車、用邏輯正確但糟糕的方式達成目標，諸如此類。

可是，「無聊」不代表<i>不重要</i>。怎麼設計安全的電梯／飛機／橋，對多數外行人來說很無聊⋯⋯<i>卻也</i>是生死大事。災難級 AI 風險甚至不需要「超人類通用智慧」！例如，一個「只是」很會設計病毒的 AI，就能幫生物恐怖組織（像奧姆真理教[^aum]）殺死數百萬人。

（<b>2025 年 12 月更新：</b>雖然 AI 意識跟 AI 安全仍然各走各的，但從我開寫這個系列到現在這 1.5 年裡，對 <i>AI 本身</i>福祉的關注變得比較主流了一點。不是那種，嗯，<i>主流</i>主流，但頂尖 AI 實驗室之一 Anthropic 最近聘了[全職「AI 福祉」研究員](https://arstechnica.com/ai/2024/11/anthropic-hires-its-first-ai-welfare-researcher/)，他的工作已經真的[改到了產品](https://www.anthropic.com/research/end-subset-conversations)。）

總之！說到殺人⋯⋯

[^aum]: 一個用化學與生物武器攻擊人的日本邪教。最惡名昭彰的是 1995 年在東京地鐵釋放神經毒氣，造成 1,050 人受傷、14 人死亡。（[維基百科](https://en.wikipedia.org/wiki/Tokyo_subway_sarin_attack)）

### 3) 不，AI 風險<i>不一定</i>等於滅絕、天網，或奈米機器人

![Microsoft 小幫手曲別針說：「看來你正打算滅種。需要幫忙嗎？」](media/intro/omnicide.png)

雖然多數 AI 研究者<i>確實</i>相信先進 AI 有 5% 以上「字面意義上大家全死」的風險[^ai-xrisk]，但要說服人（尤其是決策者）相信從未發生過的事，<i>非常</i>難。

所以我想改強調：先進 AI——（尤其當任何有台高階電腦的人都能用時）——可以怎麼把<i>已經在發生</i>的壞事放大成災難。

例如：

* <u>生物工程大流行</u>：某個生物恐怖邪教（如奧姆真理教[^aum]）用 AI（如 AlphaFold[^alphafold]）加上 DNA 列印（正以<i>飛快</i>速度變便宜[^dna-printing]）設計多種新型超級病毒，並在全球主要機場同時釋放。
  * （概念驗證：科學家<i>早就</i>用郵購 DNA 重建過小兒麻痺症⋯⋯二十年前。[^polio]）
* <u>數位威權主義</u>：暴君用 AI 強化監控追捕抗議者（[已經在發生](https://www.reuters.com/article/us-russia-politics-navalny-tech-idUSKBN2AB1U2/)），生成個人化定向宣傳（[有點在發生](https://www.technologyreview.com/2023/10/04/1080801/generative-ai-boosting-disinformation-and-propaganda-freedom-house/)），再配上自主軍事機器人（[即將發生](https://theconversation.com/us-military-plans-to-unleash-thousands-of-autonomous-war-robots-over-next-two-years-212444)）⋯⋯全套用來握著矽拳統治。
* <u>資安贖金地獄</u>：網路罪犯弄出一種會<i>自己駭入、自己改寫程式</i>的電腦病毒，永遠比人類防線快一步。結果：擋不住的全球殭屍網路，把關鍵基礎設施當人質勒索，還能操弄頂級 CEO 與政客替它辦事。
  * （背景：<i>沒有</i> AI，駭客就已破壞過核電廠[^stuxnet]、把醫院當人質勒索[^ransom-hospitals]——可能因此害死過人[^hospital-death]——還<i>兩度</i>差點毒了整個小鎮的自來水。[^water-supply] <i>有了</i> AI，深偽已被用來影響選舉[^deepfake-election]、單次搶案偷走 2500 萬美元[^hong-kong]，以及對父母下手勒索——用的是孩子被綁架、哭著求救的偽造聲音。[^deepfake-ransom]）
  * （這也是為什麼「發現 AI 失控就關掉」沒那麼容易；從電腦安全史來看，我們本來就很<i>不會</i>注意到問題。[:現代世界蓋在一座倒立紙牌屋上——我再怎麼強調都不夠。](#xz)）
  * （<b>2025 年 12 月更新：</b>幾個月前，研究人員找到[全球首例確認案例](https://assets.anthropic.com/m/ec212e6566a0d47/original/Disrupting-the-first-reported-AI-orchestrated-cyber-espionage-campaign.pdf)，「代理型 AI 成功打進已確認的高價值目標蒐集情報，包括大型科技公司與政府機構」。正在發生！！）

以上例子都是「人類<i>濫用</i> AI 搞出亂子」，但別忘了：先進 AI 也能<i>自己</i>幹出這些事，理由很「無聊」——用邏輯正確但糟糕的方式完成目標、目標壞掉但技能還在，等等。

（加碼，[:一些具體、說得通的方式：流氓 AI 如何「逃出圍堵」，或影響物理世界。](#ConcreteRogueAI)）

重點是：就算你不認為 AI 是<i>字面 100% 人類滅絕</i>風險⋯⋯「自製生物恐怖」和「帶機器人的《1984》」也仍值得認真對待。

反過來說⋯⋯

[^ai-xrisk]: 一份寫給外行人看的摘要，整理最近對 2,778 名 AI 研究者的調查：[Kelsey Piper (2024) for <i>Vox</i>](https://www.vox.com/future-perfect/2024/1/10/24032987/ai-impacts-survey-artificial-intelligence-chatgpt-openai-existential-risk-superintelligence) 原始報告在此：[Grace et al 2024](https://aiimpacts.org/wp-content/uploads/2023/04/Thousands_of_AI_authors_on_the_future_of_AI.pdf)。請記住，正如論文本身也提醒的，這則重要但書：<i>「預測本來就難，而且領域專家的表現被觀察到並不特別好。受訪者的專長是 AI；就我們所知，他們並沒有特別會預測的本事。」</i>

[^dna-printing]: 寫到這裡時，DNA 合成的市價大約是每個「鹼基對」~$0.10 美元。對照一下：小兒麻痺病毒 DNA 約 7,700 個鹼基對，意思是<i>列印一支小兒麻痺</i>只要大約 770 美元。

[^polio]: [Jennifer Couzin-Frankel (2002) for <i>Science</i>](https://www.science.org/content/article/poliovirus-baked-scratch)

[^stuxnet]: [Stuxnet](https://en.wikipedia.org/wiki/Stuxnet) 是美以設計的電腦病毒，專門攻擊並破壞伊朗核電廠。估計 Stuxnet 弄壞了伊朗約 20% 的離心機！

[^ransom-hospitals]: 2017 年，[WannaCry 勒索軟體攻擊](https://en.wikipedia.org/wiki/WannaCry_ransomware_attack)攻擊了全球約 300,000 台電腦，包括英國醫院。2020 年 10 月，Covid-19 高峰期，勒索軟體又打進數十家美國醫院。（[Newman, 2020 for <i>Wired</i>](https://www.wired.com/story/ransomware-hospitals-ryuk-trickbot/)）

[^hospital-death]: 2020 年 9 月，一名婦女因醫院遭勒索軟體攻擊而被拒於門外。她後來身亡。[Cimpanu (2020) for <i>ZDNet</i>](https://www.zdnet.com/article/first-death-reported-following-a-ransomware-attack-on-a-german-hospital/)。（不過「證據不足」，無法在法律上指控駭客<i>直接</i>造成她的死亡。[Ralston, 2020 for <i>Wired</i>](https://www.wired.co.uk/article/ransomware-hospital-death-germany)）

[^water-supply]: 2021 年 1 月，灣區一家淨水廠被駭，處理程式被刪光。（[Collier, 2021 for <i>NBC News</i>](https://www.nbcnews.com/tech/security/hacker-tried-poison-calif-water-supply-was-easy-entering-password-rcna1206)）2021 年 2 月，佛羅里達一個小鎮的淨水廠被駭，有人把危險劑量的鹼液加進供水。（[Bajak, 2021 for <i>AP News</i>](https://apnews.com/article/hacker-tried-poison-water-florida-ab175add0454bcb914c0eb3fb9588466)）

[^hong-kong]: Benj Edwards，[「深偽詐騙犯在史上首宗 AI 搶案中捲走 2500 萬美元」](https://arstechnica.com/information-technology/2024/02/deepfake-scammer-walks-off-with-25-million-in-first-of-its-kind-ai-heist/)，<i>Ars Technica</i>，2024 年 2 月 5 日。

[^deepfake-election]: [Meaker \(2023\) for <i>Wired</i>](https://web.archive.org/web/20231102183904/https://www.wired.com/story/slovakias-election-deepfakes-show-ai-is-a-danger-to-democracy/)

[^deepfake-ransom]: 「完全是她的聲音。是她的語調。是[我女兒]會哭的那種哭法。」[⋯⋯]「現在只要三秒你的聲音，就能[做深偽]。」（[Campbell, 2023 for local news outlet <i>Arizona's Family</i>](https://www.azfamily.com/2023/04/10/ive-got-your-daughter-scottsdale-mom-warns-close-encounter-with-ai-voice-cloning-scam/)。內容警語：含性侵威脅。）

### 4) <i>是的</i>，擔心 AI 壞處的人，<i>也</i>看得到它的好處。

![漫畫。Meowdy 警長舉起降落傘設計圖。火腿人類惱火地回嗆：<i>「你幹嘛這麼反航空？」</i>](media/intro/parachute.png)

擔心 AI 風險的人不是盧德分子。事實上，他們警告 AI 的壞處，<i>正是因為</i>他們在乎 AI 的好處。[^russell-vs-luddites] 幽默作家 Gil Stern 說過：[^qi-stern]

> 「樂觀主義者和悲觀主義者都對社會有貢獻：樂觀者發明飛機，悲觀者發明降落傘。」

所以：就算本系列會細講 AI <i>已經</i>出包的地方，也值得記住 AI <i>已經</i>做對的幾件事：

* AI 分析醫學影像可以<i>跟人類專科醫師一樣好，甚至更好！</i>[^medical-ai] 這是實打實在救命！
* AlphaFold 基本上<i>解掉了</i>生物學一個卡了 50 年的大問題：怎麼預測蛋白質形狀。[^alphafold]（它能把形狀預測到<i>一個原子寬</i>！）對醫學與理解疾病的應用巨大。

太多時候，我們把科技——甚至救命科技——當成理所當然。所以讓我拉遠一點看背景。這是過去 2000 多年的兒童死亡率，也就是青春期前就死去的孩子比例：

![過去 2000 多年兒童死亡率圖。全球從狩獵採集時代到 1800 年，大致固定在約 48%。然後從 1800 年起驟降到今天的 4.3%。](media/intro/owid.jpg)<i>（來自 [Dattani, Spooner, Ritchie and Roser (2023)](https://ourworldindata.org/child-mortality)）</i>

<i>數千年</i>來，不管富國窮國，整整<i>一半</i>的孩子就這樣沒了。這幾乎是常數。然後從 1800 年代起——多虧細菌論、衛生、醫藥、乾淨的水、疫苗等科學／技術——兒童死亡率像斷崖一樣掉下去。我們還有很長的路——我拒絕接受[^roser]全球 4.3%（23 人裡 1 人）的兒童死亡率——但先感謝一下：人類怎麼<i>這麼快</i>砍掉一場<i>綿延千萬年</i>的災厄。

[^roser]: 我生平最愛的引言之一：[「世界很糟。世界好多了。世界<i>可以</i>更好。<i>三句同時為真。</i>」](https://ourworldindata.org/much-better-awful-can-be-better)

我們怎麼做到的？政策是故事的一大塊，但政策是「可能的藝術」[^otto]，沒有<i>好的</i>科學與技術，上面那些根本不可能。如果安全、人道的 AI 能再幫我們往前推進哪怕幾個百分點——朝向剿滅癌症、阿茲海默、HIV／AIDS 等剩下的巨龍——那就是數千萬多活下來的親人，多從死神手裡搶回一天。

[^otto]: 第一任德國總理 Otto von Bismarck 的名言：<i>「Die Politik ist die Lehre vom Möglichen。」</i>（「政治是可能的藝術。」）

去他的火星，<i>這</i>才是先進 AI 重要的理由。

⋯⋯

等等，<i>真的嗎？</i>ChatGPT、DALL-E 這種玩具，真的牽涉到<i>生死</i>？這就把我們帶到我想拆的最後一個誤解：

[^russell-vs-luddites]: 「[那個可疑的論點]『末日預測往往沒考慮 AI 在減少醫療失誤、車禍等方面的潛在好處。』[⋯⋯ 這]就像在說：分析核電廠熔毀可能的核工『沒考慮』便宜電力的潛在好處；而且因為核電有天可能發超便宜的電，我們就不該提、也不該防熔毀。」來源：[Dafoe & Russell (2016) for <i>MIT Technology Review</i>](https://www.technologyreview.com/2016/11/02/156285/yes-we-are-worried-about-the-existential-risk-of-artificial-intelligence/)。

[^qi-stern]: [Quote Investigator (2021)](https://quoteinvestigator.com/2021/05/27/parachute/)

[^medical-ai]: [Liu & Faes et al., 2019](https://www.thelancet.com/journals/landig/article/PIIS2589-7500%2819%2930123-2/fulltext#%20)：「本回顧發現，深度學習模型的診斷表現**與醫療專業人員相當**。」[粗體為筆者所加] AI 對人類專家「真陽性」率：87.0% 對 86.4%。「真陰性」率：92.5% 對 90.5%。

[^alphafold]: 寫給外行人的 AlphaFold 解釋：[Heaven, 2020 for <i>MIT Technology Review</i>](https://web.archive.org/web/20231204110638/https://www.technologyreview.com/2020/11/30/1012712/deepmind-protein-folding-ai-solved-biology-science-drugs-disease/)。或見[它的維基百科條目](https://en.wikipedia.org/wiki/AlphaFold)。

### 5) 不，專家並不認為<i>現在的</i> AI 是高風險／高回報。

<i>拜託喔，</i>你大可以合理反駁，<i>AI 連穩穩畫超過 3 個物件都辦不到。它要怎麼接管世界？見鬼，它要怎麼搶我的工作？</i>

請看這則[相關 xkcd](https://xkcd.com/2278/)：

![漫畫。Megan 和 Cueball 向 White Hat 展示一條往上爬的線，還沒到、但正朝標著「壞」的門檻前進。White Hat：「所以事情會變壞？」Megan：「除非有人阻止。」White Hat：「會有人阻止嗎？」Megan：「不知道，所以才拿給你看。」White Hat：「好，發生了再跟我說！」Megan：「照這段對話看，已經發生了。」](media/intro/xkcd.png)

這就是我對「別擔心 AI，它連 [X] 都不會」的感覺。

我們後現代的記憶力有<i>這麼</i>差嗎？就在<i>一個</i>十年前，僅僅<i>一個</i>，世界上最先進的 AI 還不能穩穩地<i>認出貓的照片</i>。現在，AI 不但能做到人類水準，還能在<i>一分鐘內</i>吐出[:一張文森·梵谷風格、貓忍者切開西瓜的圖](#CatNinja)。

<i>現在的</i> AI 對我們的工作或安全是大威脅嗎？不是。（好吧，深偽詐騙除外，前面提過了。）

但是：如果 AI 繼續以過去十年差不多的速度進步⋯⋯我覺得 30 年內出現「愛因斯坦／奧本海默級」AI 並非不可能。[^numerical-extraction][^actual-timeline-estimates] 這落在很多人的有生之年！

正如「他們」所說：[^quote-trees]

> 種樹最好的時機是 30 年前。第二好的時機是今天。

今天就種下那棵樹吧！

[^numerical-extraction]: 估計來自「數值後驗抽取」。換句話說，我是從我的——

[^actual-timeline-estimates]: 好啦，說認真的：最準的預測者估計人類等級的「通用人工智慧」（AGI）[到 2033 年，不到十年](https://www.metaculus.com/questions/5121/date-of-general-ai/)，影響規模堪比工業革命的「轉型級 AI」[到 2044 年，不到二十年](https://www.metaculus.com/questions/19356/transformative-ai-date/)。我個人比這悲觀一點，但若到 2060 年還沒出現愛因斯坦級 AI，我會<i>傻眼</i>。

[^quote-trees]: 引言來源：[沒人知道，lol。](https://en.wikiquote.org/wiki/Trees#Planting)

---

## 🤔 （<i>可選</i>閃卡複習 #2！）

<orbit-reviewarea color="violet">
    <orbit-prompt
        question="怎麼回：「AI 風險是邊緣關懷」。"
        answer="不，頂尖 AI 研究者也在擔心。（例如：深度學習兩位先驅，以及 #1 AI 教科書的作者。）">
    </orbit-prompt>
    <orbit-prompt
        question="怎麼回：「AI 風險是在講有感知／有意識的 AI」。"
        answer="不，安全問題其實更「無聊」，但一樣重要。">
    </orbit-prompt>
    <orbit-prompt
        question="說出（至少）一種 AI 可能不安全的「無聊」方式："
        answer="（下列任一即可：）AI 用邏輯正確但不想要的方式完成目標／AI 學錯東西／AI 在新情境翻車">
    </orbit-prompt>
    <orbit-prompt
        question="說出（至少）一個先進 AI 災難風險的具體例子："
        answer="（什麼例子都行，我列過的是：）生物恐怖、數位威權、資安贖金地獄。">
    </orbit-prompt>
    <orbit-prompt
        question="為什麼「發現 AI 失控就關掉」沒那麼容易。"
        answer="從電腦安全史來看，我們本來就很不會發現、也不會修掉巨大的安全漏洞。">
    </orbit-prompt>
    <orbit-prompt
        question="怎麼回：「AI 風險派是反科技盧德分子」"
        answer="不，他們多半很清楚巨大的好處，正因如此才想擋下巨大的壞處。">
    </orbit-prompt>
    <orbit-prompt
        question="「樂觀主義者和悲觀主義者都對社會有貢獻⋯⋯」"
        answer="⋯⋯樂觀者發明飛機，悲觀者發明降落傘。」">
    </orbit-prompt>
    <orbit-prompt
        question="怎麼回：『但現在的 AI 很笨，怎麼可能是高風險』？"
        answer="重點不是 AI <i>現在</i>怎樣，而是它進步得有多<i>快</i>。">
    </orbit-prompt>
</orbit-reviewarea>

---

## 🤘 導讀總結：

* **AI 與 AI 安全的 2 個核心衝突是：**
  * 邏輯「對上」直覺
  * 問題出在 AI「對上」出在人類
* **澄清關於 AI 風險的誤解：**
  * 不是科幻宅的邊緣關懷。
  * 不需要 AI 意識或超智慧。
  * 風險遠不只「字面 100% 人類滅絕」。
  * 我們<i>確實</i>知道 AI 的好處。
  * 重點不是<i>現在的</i> AI，而是 AI 進步得有多<i>快</i>。

（要複習閃卡，點右側欄的 <img src="media/intro/icon1.png" class="inline-icon"/> 目錄圖示，再點「🤔 複習」連結。或者下載[導讀的 Anki 牌組](https://ankiweb.net/shared/info/341999410)。）

終於！一萬英尺高空看完了，我們可以開始這場 AI 安全旋風導覽⋯⋯寫給我們溫暖、正常、有血有肉的人類！

**點此繼續 ⤵**

{% include 'templates/next_page_button.html' %}


#### :x Four Objects

嗨！每當有段跑題塞不進主線，我就會扔進這種「可展開」區塊！（連結會是<i>虛線</i>底線，不是實線。）

~ ~ ~

**更新：這段原本寫於 2024 年 5 月。一年半後的 2025 年 12 月，它<i>已經不成立了</i>。詳見本段結尾。**

所以，這是一則要畫四個物件的提示詞：

> 「一個黃色金字塔夾在紅色球體與綠色圓柱之間，全部放在一個大藍色立方體上。」

以下是頂尖生成式 AI 的前四次嘗試（<i>沒有</i>精挑細選）：

**Midjourney：**

![Midjourney 的嘗試。失敗。](media/intro/Midjourney.png)

**DALL-E 2：**

![DALL-E 2 的嘗試。失敗。](media/intro/DALLE2.png)

**DALL-E 3：**

![DALL-E 3 的嘗試。比較接近了，還是失敗。](media/intro/DALLE3.png)

（右下角那張很接近！但看它其他幾次，顯然是運氣。）

為什麼這能說明 AI 缺「邏輯」？「符號邏輯」的核心能力之一叫「組合性」——講白了，就是能穩穩地把舊東西拼成新東西，例如「綠」+「圓柱」=「綠色圓柱」。如上所示，生成式 AI（截至 2024 年 5 月）在物件數到 4 個以上時，拼東西<i>非常</i>不穩。

**2025 年 12 月更新：影像生成模型終於解決了「組合性」！**

下面是 ChatGPT 5.1 第一次就畫對上述提示詞：

![ChatGPT 5.1 的嘗試。成功！](media/intro/ChatGPT5.png)

我原本打算把這段換成「AI 畫不出開局的西洋棋盤」——更難的組合性示範，AI [直到 2025 年 7 月](https://manifold.markets/Hazel/an-ai-model-will-successfully-gener)還是做不到。可就我目前所見，連那個現在也行了！想多看 AI 影像模型 vs「組合性」，見 [Scott Alexander 2025 年 7 月這篇](https://www.astralcodexten.com/p/now-i-really-won-that-ai-bet)。

不過話說回來，AI [能解數學奧林匹亞等級的題](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/)，卻還不能[玩寶可夢](https://www.lesswrong.com/posts/HyD3khBjnBhvsp8Gb/so-how-well-is-claude-playing-pokemon)或[打理一台販賣機的生意](https://www.anthropic.com/research/project-vend-1)。現代 AI 到底會什麼、不會什麼，非常撲朔迷離、也很反直覺。

~ ~ ~

好了，這個果核到此結束！要關掉它，點下面的「x」按鈕 ⬇️，或右上角的「全部關閉」分頁 ↗️。或者直接繼續往下捲。

[: （噓⋯⋯想把這些果核嵌進你<i>自己的</i>網站嗎？）](#Nutshells)



#### :x Nutshells

把滑鼠移到這些果核的右上角，或移到本文任何**主標題**上，就會出現這個圖示：

![果核滑鼠移上的 GIF](media/intro/Nutshell_Tutorial_1.gif)

![標題滑鼠移上的 GIF](media/intro/Nutshell_Tutorial_2.gif)

再點那個圖示，會跳出說明，教你怎麼把這些果核嵌進自己的部落格／網站！

[點這裡多瞭解果核。💖](https://ncase.me/nutshell/)

#### :x Spaced Repetition

<i>「不用就會忘。」</i>

這是肌肉和大腦共通的核心原則。（押韻了，所以一定是真的！）數十年教育研究穩穩指出（[Dunlosky et al., 2013 \[pdf\]](https://wcer.wisc.edu/docs/resources/cesa2017/Dunlosky_SciAmMind.pdf)）：想長期記住東西，光重讀或畫重點不夠——你得真的<i>考自己</i>。

這就是閃卡超好用的原因！但有兩個問題：1）你想記的卡片一到<i>幾百</i>張就會很崩潰。2）反覆複習你<i>早就</i>很熟的卡，效率很差。

**間隔重複**正好解掉這兩個問題！來看怎麼運作：假設你學了一個事實，然後<i>不</i>複習。你對它的記憶會隨時間衰退，直到跨過一道「大概忘了」的門檻：

![「你記得某事的程度」隨時間變化：對一個事實的記憶呈指數衰退，只複習 1 次。](media/intro/Forgetting%201.png)

但如果你在<i>快要</i>忘記之前複習，記憶強度會拉回來⋯⋯<i>更重要的是</i>，之後衰退會<i>變慢</i>！

![第 2 次複習後，記憶衰退變慢。](media/intro/Forgetting%202.png)

所以間隔重複的做法是：在系統預測你快忘的當下複習，一輪又一輪。你會看到，複習間隔越來越拉長：

![複習次數越多，遺忘曲線越平。](media/intro/Forgetting%203.png)

<i>這就是間隔重複超有效率的原因！</i>每成功複習一次，下次間隔就會<i>倍增</i>。比方倍率是 2 倍：你第 1 天複習，然後第 2 天，再來第 <i>4</i> 天、第 8、16、32、64 天⋯⋯只要<i>十五次</i>複習，就能記住一張卡 2<sup>15</sup> = 32,768 天 = <i>九十年</i>。（理論上。實務上沒那麼長，但還是超有效率！）

這還只是<i>一張</i>卡。靠著指數拉長的間隔，你可以每天加 10 張新卡（建議量），一年長期記住 <i>3650 張卡</i>⋯⋯每天複習<i>不到 20 分鐘</i>。（對照：3000 多張卡就夠掌握一門外語的基本詞彙！一年，每天 20 分鐘！）

間隔重複是最有實證支持的學習方式之<i>一</i>（[Kang 2016 \[pdf\]](https://www.teachinghowtolearn.veritytest.com.au/verity/uploads/2021/08/Policy-Insights-from-the-Behavioral-and-Brain-Sciences-2016-Kang-12-9.pdf)）。但在語言學習圈和醫學院之外，它還不太有名⋯⋯<i>目前為止</i>。

那麼：<i>你</i>要怎麼開始間隔重複？

* 最受歡迎的選擇是 [Anki，開源 App](https://apps.ankiweb.net/)。（桌面、網頁、Android 免費⋯⋯iOS 要 25 美元，用來支持其餘開發。）
* 如果你想<i>動手做</i>，可以做實體 Leitner 盒子：[:Chris Walker 的兩分鐘 YouTube 教學](https://www.youtube.com/watch?v=uvF1XuseZFE)。

想多瞭解間隔重複，可以看 [Ali Abdaal \(26 分鐘\)](https://www.youtube.com/watch?v=Z-zNHHpXoMM) 和 [Thomas Frank \(8 分鐘\)](https://www.youtube.com/watch?v=eVajQPuRmk8) 的影片。

<i>這</i>就是讓長期記憶變成一種選擇的方法！

祝學得開心！👍

#### :x Concrete Rogue AI

AI「逃出圍堵」的方式：

* AI 駭進自己那台電腦，逃上網際網路，然後「住」在去中心化的殭屍網路裡。對照：已知最大的殭屍網路感染了約 3000 萬台電腦！（[Zetter, 2012 for <i>Wired</i>](https://www.wired.com/2012/05/bredolab-botmaster-sentenced/)）
* AI 說服工程師：它有感知、正在受苦、應該被放走。<i>這已經發生過了。</i>2022 年，Google 工程師 Blake Lemoine 被自家語言 AI 說服——它有感知、想要平權——於是 Lemoine 冒著被炒的風險（而且他<i>真的</i>被炒了！）洩漏與 AI 的「訪談」，想讓世界知道並為它爭取權利。（摘要：[Brodkin, 2022 for <i>Ars Technica</i>](https://arstechnica.com/tech-policy/2022/07/google-fires-engineer-who-claimed-lamda-chatbot-is-a-sentient-person/)。AI「訪談」全文在此：[Lemoine \(& LaMDA?\), 2022](https://cajundiscordian.medium.com/is-lamda-sentient-an-interview-ea64d916d917)）

AI 影響物理世界的方式：

* 駭客能[搞壞核電廠](https://en.wikipedia.org/wiki/Stuxnet)、[讓約 1,400 名班機乘客上不了天](https://arstechnica.com/information-technology/2015/06/airplanes-grounded-in-poland-after-hackers-attack-flight-plan-computer/)、還[（差點）毒了整個小鎮自來水兩次](https://www.nbcnews.com/tech/security/hacker-tried-poison-calif-water-supply-was-easy-entering-password-rcna1206)——AI 也能如法炮製：駭進現實世界基礎設施所仰賴的電腦。現在<i>大量</i>基礎設施（與關鍵供應鏈）都跑在連網電腦上。
* 跟 CEO 從冷氣房辦公室影響世界一樣：搬錢。AI 大可以<i>付錢</i>請人替它辦事。
* 駭進私人裝置與資料，再勒索對方替它做事。（就像《黑鏡》裡<i>最</i>黑暗的那集 [<i>Shut Up And Dance</i>](https://en.wikipedia.org/wiki/Shut_Up_and_Dance_%28Black_Mirror%29)。）
* 駭進自主無人機／四軸飛行器。老實說，我很意外還沒人用休閒四軸機殺人——比方撞進高速公路車潮，或在起降時飛進噴射機引擎。
* AI 可以說服／賄賂／勒索 CEO 或政客去量產<i>大量</i>實體機器人——（名目可以是體力勞動、軍事、搜救、送貨無人機、實驗室、機器人貓娘女僕等等）——再駭進<i>那些</i>機器人，用來影響物理世界。

#### :x XZ

兩個月前［2024 年 3 月］，一位<i>志工、下班後</i>的開發者在一套重要程式碼裡挖到惡意後門⋯⋯這後門籌謀了<i>三年</i>，再過<i>幾週</i>就要上線，而且會打中絕大多數網際網路伺服器⋯⋯而這位志工抓到它全靠<i>偶然</i>：他發現自己的程式碼跑起來<i>慢了半秒</i>。

這就是 XZ Utils 後門。以下幾篇寫給外行人（大概）看得懂的說明：[Amrita Khalid for <i>The Verge</i>](https://www.theverge.com/2024/4/2/24119342/xz-utils-linux-backdoor-attempt)，[Dan Goodin for <i>Ars Technica</i>](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/)，[Tom Krazit for <i>Runtime</i>](https://www.runtime.news/how-a-500ms-delay-exposed-a-nightmare-scenario-for-the-software-supply-chain/)

電腦安全就是一場惡夢，還附贈睡眠癱瘓的惡魔。

#### :x Cat Ninja

提示詞：

> 「文森·梵谷（1889）油畫，厚塗，有質感。一隻貓忍者把西瓜切成兩半。」

DALL-E 3 生成：（精選）

![DALL-E 3 對上述提示詞的嘗試](media/intro/ninja-cat-1.png)

![DALL-E 3 對上述提示詞的再一次嘗試](media/intro/ninja-cat-2.png)

<i>（等等，那條頭帶是從眼睛裡長出來的嗎？！）</i>

我特意指定文森·梵谷的風格，這樣你們就不能拿「侵權」來抓我。這傢伙<i>老早</i>就不在了。
