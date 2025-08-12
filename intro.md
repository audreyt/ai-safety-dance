**關於 AI 的爭論，其實是「一百場爭論疊在同一件風衣裡」。**

人工智慧（AI）會幫助我們治癒一切疾病，打造一個後匱乏、人人得以繁榮的世界嗎？還是 AI 會幫助暴君進一步監控與操縱我們？AI 的主要風險，來自意外、壞人濫用，還是失控的 AI 本身就成了壞人？這一切只是炒作嗎？為什麼 AI 能在一分鐘內模仿任何藝術家的風格，卻在畫超過三個物件時就困惑？為什麼很難讓 AI 穩健地服務於「人道」（humane）的價值，甚至是穩健地服務於「任何」目標？如果 AI 變得比我們更有人道精神怎麼辦？如果 AI 學到的是人類的「不人道」，也就是偏見與殘酷，又會如何？我們要走向烏托邦、反烏托邦、滅絕、比滅絕更糟的結局，還是——最令人震驚的——什麼都不變？另外：AI 會搶走我的工作嗎？

……還有更多更多問題。

可惜的是，要細膩地理解 AI，就得理解大量技術細節……然而這些細節散落在上百篇文章中，被滿坑滿谷的術語深埋。

因此，我向你呈上：

  ![RCM (Robot Catboy Maid) throwing confetti under a banner that reads: A Whirlwood Tour Guide to AI Safety for Us Warm, Normal Fleshy Humans.](media/intro/confetti.png)

  **這套三部曲將一次帶你掌握 AI 與 AI 安全\* 的核心觀念 —— 以親切、易懂、略帶個人觀點的方式呈現！**
  
  （\* 相關用語：AI 風險、AI 存在風險（X-Risk）、AI 對齊（Alignment）、AI 倫理、AI-不要-把-大家-都-幹掉-主義。這些詞的確切涵義並*沒有*共識，所以本文統稱為「AI 安全」。）
  
  本系列還有由機器人貓耳男僕（Robot Catboy Maid）主演的漫畫。像這樣：
  
  ![漫畫。人類 Ham 對 RCM（機器人貓耳男僕）說：「保持這棟房子乾淨。」RCM 推理：是什麼造成髒亂？人類造成髒亂！因此：把人類趕出去。RCM 接著把 Ham *整個丟* 出房子。](media/intro/Outer_Alignment.png)
  
  `[導遊語氣]` 請看您的右手邊 👉，有 <img src="media/intro/icon1.png" class="inline-icon"/> 目錄按鈕、<img src="media/intro/icon2.png" class="inline-icon"/> 網頁樣式切換，以及 <img src="media/intro/icon3.png" class="inline-icon"/> 剩餘閱讀時間時鐘。
  
  關於本系列：導言與第一部分發表於 **2024 年 5 月**，第二部分已於 **2024 年 8 月** 上線，第三部分預計 **2024 年 12 月** 推出。可選：如果想在發佈時收到通知，請於下方登記！👇 我*不會*寄送其他內容騷擾你，只有兩封通知信。（不過呢，`[Podcast 贊助商語氣]` 如果你是高中生或更小、且對 AI／程式／工程有興趣，可以勾選選項以了解更多 [Hack Club](https://hackclub.com/)。附註：有免費的*貼紙～～～* ✨）
  
  {% include 'templates/signup.html' %}
  
  總之，`[導遊語氣回歸]` 在踏上 AI 與 AI 安全這段岩石嶙峋的徒步旅程前，讓我們先用「一萬英尺視角」俯瞰全景：

---

## 💡 AI 與 AI 安全的核心觀念

在我看來，AI 與 AI 安全的主要問題可歸結為**兩大核心衝突：**

![邏輯「對上」直覺，以及問題出在 AI「對上」出在人類](media/intro/Core%20Problems.png)


[^fast-slow]: **系統一（System 1）** 的思考快速且自動（如騎腳踏車）。**系統二（System 2）** 的思考緩慢且深思熟慮（如下字謎）。這個概念由丹尼爾・康納曼在《[快思慢想（2011）](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow)》普及，書中總結了他與阿莫斯・特沃斯基的研究。所謂「總結」，其實這本書有將近 500 頁之多。

從我在「對上」周圍加上這些引號就能看出，這些分界其實沒有那麼分明……

以下是這兩大衝突如何在三部曲中反覆出現：
  
  ### 第 1 部分：過去、現在，以及可能的未來
  
  省略*大量*細節不談，AI 的歷史其實就是一則「*邏輯對上直覺*」的故事：
  
  **2000 年之前：AI 幾乎全是邏輯，幾乎沒有直覺。**    
  
  這就是為什麼 1997 年時，AI 能在西洋棋上打敗世界冠軍……卻沒有任何 AI 能可靠地在圖片中辨識出貓。[^chess-vs-cats]
  
  （安全顧慮：沒有直覺，AI 無法理解常識或人道價值。因此，AI 可能以邏輯上正確但不理想的方式達成目標。）
  
  **2000 年之後：AI 能做出「直覺」了，但邏輯很差。**    
  
  這就是為什麼生成式 AI（*以本文撰寫時的 2024 年 5 月為準*）能用任何藝術家的風格夢製整片景致……[:但在畫超過 3 個物件時就會困惑](#FourObjects)。*（👈 點這段文字！它也會展開！）*
  
  （安全顧慮：沒有邏輯，我們無法驗證 AI 的「直覺」裡發生了什麼。那份直覺可能有偏誤、可能在細微之處產生危險的錯誤，或在新情境下以怪異方式失靈。）
  
  **直到今日：我們*仍然*不知道如何在 AI 中統合邏輯與直覺。**
  
  但若我們做得到，那*將*帶來 AI 最大的風險與最大的新契機：一個既能在邏輯上勝過我們的規劃，*又*能學到普遍化直覺的系統。那會是「愛因斯坦級 AI」……或是「歐本海默級 AI」。
  
  一圖總結：
  
  ![AI 時間線。2000 年之前，多為「邏輯」。2000 年至今，多為「直覺」。未來，也許兩者兼具？](media/intro/Timeline.png)
  
  以上是「邏輯對上直覺」。至於另一個核心衝突——「問題出在 AI 還是出在人類」——這正是 AI 安全領域的一大爭議：我們的主要風險，是來自先進 AI *本身*，還是來自*人類*對先進 AI 的濫用？
  
  （為什麼不能兩者皆是？）
  
  [^footnotes-explained]: 嗨！我和*其他*註腳不一樣。😤 我不會惱人地把你傳送到頁面底部，而是以彈出泡泡的方式顯示，讓你的閱讀不中斷！總之，請看*下一個*註腳以取得本段落的出處。
  
  [^chess-vs-cats]: In 1997, IBM's [Deep Blue](https://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)) beat Garry Kasparov, the then-world chess champion. Yet, over a decade later in 2013, the *best* machine vision AI was only 57.5% accurate at classifying images. It was only until *2021*, three years ago, that AI hit 95%+ accuracy. (Source: [PapersWithCode](https://paperswithcode.com/sota/image-classification-on-cifar-100))
  
  ### 第 2 部分：問題本質
  
  AI 安全*最核心*的問題是這個：[^russell-coined]
  
  > <u>**價值對齊問題（Value Alignment Problem）**</u>：    
  > 「我們如何讓 AI 穩健地服務於人道（humane）的價值？」
  
  注意：我用的是 *humane*（「人道」），而不單是 *human*（「人類」）。一個*人*未必*人道*。我要反覆強調這點，因為支持與批評 AI 安全的人*都*常把兩者混為一談。[^mixup][^humane]
  
  [^mixup]: 我常見到的說法是：「把 AI 對齊到人類價值其實很糟，因為當前的人類價值很糟。」老實說，[瞄一眼歷史課本] 我有 80% 同意。讓 AI 行為*像人*還不夠，它得*有人道精神*。
  
  [^humane]: 也許 50 年後，在基因改造與賽博格遍地的未來，把慈悲稱為「人道」可能會顯得老派、甚至帶點物種中心主義。
  
  我們可以依照「問題出在人類 vs 出在 AI」來拆解這個問題：
  
  > <u>**人道的價值**：</u>    
  > 「究竟什麼是『人道的價值』？」    
  > （留給哲學與倫理學的問題）
  
  > <u>**「技術性」對齊問題**：</u>    
  > 「我們究竟要如何讓 AI 穩健地服務於*任何預期的目標*？」    
  > （計算機科學家的問題——出乎意料地，仍未解決！）
  
  而「技術性」對齊問題，又可依「邏輯 vs 直覺」進一步拆解：
  
  > <u>AI 邏輯面的問題</u>：[^fancy-1]（「賽局理論」類問題）    
  > * AI 可能以邏輯正確、但不理想的方式達成目標。
  > * 大多數目標在邏輯上都會導向相同且不安全的子目標：「不要讓任何人阻止我達成目標」、「最大化我的能力與資源以最佳化該目標」等。
  
  > <u>AI 直覺面的問題</u>：[^fancy-2]（「深度學習」類問題）    
  > * 以人類資料訓練的 AI 可能學到我們的偏見。
  > * AI 的「直覺」不可理解、不可驗證。
  > * AI 的「直覺」脆弱，會在新情境下失靈。
  > * AI 的「直覺」可能*部分*失靈，這也許更糟：當 *技能* 完好但 *目標* 損壞時，AI 會以高超技能朝著扭曲的目標前進。
  
  （再說一次，何謂「邏輯」與「直覺」稍後會更精確地說明！）
  
  一圖總結：
  
  ![拆解 AI 對齊問題的圖：從「如何讓 AI 對齊人道價值？」分為「技術性對齊」與「人道價值」。技術性對齊再分為「AI 邏輯（賽局理論）」與「AI 直覺（深度學習）」。](media/intro/Breakdown.png)
  
  要直覺感受這些問題有多難，先注意：我們連在*人類自身*都還沒解決——人們常遵循法律的字面而非精神。人們的直覺會有偏誤，會在新情境下失效。我們任何人都不是 100% 達到自己期許的那種「人道的人」。
  
  所以，容我小小感性一下，也許理解 AI 會幫助我們理解自己。也許我們能解決*人類*的對齊問題：我們如何讓*人類*穩健地服務於人道的價值？
  
  [^russell-coined]: 「價值對齊問題」一詞最早由史都華・羅素（最常用 AI 教科書的共同作者）在 [Russell, 2014，刊於 *Edge*](https://www.edge.org/conversation/the-myth-of-ai#26015) 提出。
  
  [^fancy-1]: 專業術語分別是：a）「規格規避（Specification gaming）」、b）「工具性收斂（Instrumental convergence）」。將在第二部分說明！
  
  [^fancy-2]: 專業術語分別是：a）「AI 偏見（AI Bias）」、b）「可解釋性（Interpretability）」、c）「分佈外錯誤（Out-of-Distribution Errors）」或「穩健性失敗（Robustness failure）」、d）「內在失對齊（Inner misalignment）」或「目標誤泛化（Goal misgeneralization）」或「目標穩健性失敗（Objective robustness failure）」。同樣會在第二部分說明！

### 第 3 部分：提議的解方

最後，我們可以來理解一些（可能）解決「邏輯、直覺、AI、以及人類」問題的方法！其中包括：

* 技術面解方
* 政策／治理面解方
* 「不然你就先關掉、別去打造那個酷刑樞紐吧」

（可惜的是，我無法在本導言中給出面向大眾的易懂總結，因為在你理解問題之前——也就是第一與第二部分要做的事——這些解方並不會有太大意義。話雖如此，如果你想先看重點劇透，[:點此查看第三部分將涵蓋的內容！](#Part3Details)）

---

  ## 🤔 （_選填_）抽認卡複習！
### 第 3 部分：提議的解方

最後，我們可以來理解一些（可能）解決「邏輯、直覺、AI、以及人類」問題的方法！其中包括：

* 技術面解方
* 政策／治理面解方
* 「不然你就先關掉、別去打造那個酷刑樞紐吧」

——還有更多！專家對哪些提案可行（如果有的話）並無共識……不過這是個很好的起點。

（可惜的是，我無法在本導言中給出面向大眾的易懂總結，因為在你理解問題之前——也就是第一與第二部分要做的事——這些解方並不會有太大意義。話雖如此，如果你想先看重點劇透，[:點此查看第三部分將涵蓋的內容！](#Part3Details)）
你是否也有過這種感覺？

1. 「哇，我剛讀到的內容真是精彩又有洞見」
2. （兩週後全忘光）
3. 「糟了」

為了避免在讀完*本*指南後也發生這種事，我放入了幾張「*選填*」互動抽認卡！它們採用「間隔重複（Spaced Repetition）」——一種相對簡單、且有實證支持的方法，讓「長期記憶」成為一種可選擇的結果。（[:點此了解更多關於間隔重複！](#SpacedRepetition)）

來試試看吧：**用下面的抽認卡，幫助你保留剛學到的重點！**

（最後有個選填的註冊選項，*如果*你想把這些卡片存起來做長期複習。注意：*我並不擁有也不控制這個服務*，它是第三方的。如果你偏好使用開源的抽認卡軟體 [Anki](https://apps.ankiweb.net/index.html)，**這裡有[可下載的 Anki 卡包](https://ankiweb.net/shared/info/341999410)**！）

（另外，你不需要把答案*逐字*背起來，掌握大意即可。是否「夠接近」交由你自己判斷。）

<orbit-reviewarea color="violet">
    <orbit-prompt
        question="AI 與 AI 安全的兩大核心分歧："
        answer=""
        answer-attachments="https://cloud-ifq5g4slt-hack-club-bot.vercel.app/0core_problems.png">
        <!-- aisffs-two-conflicts.png -->
    </orbit-prompt>
    <orbit-prompt
        question="AI 的兩個主要時代（年份僅粗略）："
        answer="2000 年之前：幾乎全是邏輯、沒有直覺。2000 年之後：有了直覺，但邏輯薄弱。">
    </orbit-prompt>
    <orbit-prompt
        question="價值對齊問題："
        answer="「我們如何讓 AI 穩健地服務於人道（humane）的價值？」">
    </orbit-prompt>
    <orbit-prompt
        question="價值對齊問題可拆成兩個子問題："
        answer="何謂人道的價值？／技術性對齊問題">
    </orbit-prompt>
    <orbit-prompt
        question="技術性對齊問題："
        answer="「我們要如何讓 AI 穩健地服務於『任何預期的目標』？」">
    </orbit-prompt>
    <orbit-prompt
        question="為何『技術上』對齊的 AI 不一定是好的："
        answer="因為 AI 可能對齊於某個殘酷人類的價值——『human（人類）』不等於『humane（人道）』。">
    </orbit-prompt>
    <orbit-prompt
        question="技術性對齊問題可再拆為兩項："
        answer='AI 的邏輯面問題（「賽局理論」類）／AI 的「直覺」面問題（「深度學習」類）'>
    </orbit-prompt>
</orbit-reviewarea>

---

## 🤷🏻‍♀️ 關於 AI 安全的五個常見誤解

> 「讓你惹上麻煩的，*不是*你不知道的事；
> 而是那些你*深信不疑*、其實不對的事。」
>
> ～ 常被歸於馬克・吐溫，但事實並非如此[^not-twain]

不論好壞，你大概已經聽過*太多*關於 AI 的說法了。因此，在我們把*新的*拼圖放進你腦中之前，得先把那些其實不對的*舊*拼圖拿掉。

所以，容我來一篇「前五名」清單文……

[^not-twain]: 引言調查（Quote Investigator，2018）找不到[此語錄真正作者的確鑿證據](https://quoteinvestigator.com/2018/11/18/know-trouble/)。

### 1) 不，AI 安全不是一群科幻迷的邊緣關切。

![RCM 站在一塊用紅線與圖釘串起、貼滿 AI 術語的「陰謀板」前。](media/intro/crazy.png)

AI 安全／AI 風險曾經較不主流，但到了 2024 年，美國與英國政府都已設立了 AI 安全專責單位！[^departments] 這是因為許多*頂尖* AI 研究者發出了警訊。他們包括：

[^departments]: 英國於 [2023 年 11 月](https://www.gov.uk/government/publications/ai-safety-institute-overview/introducing-the-ai-safety-institute) 成立全球首個由國家支持的 AI 安全研究院；美國則在 [2024 年 2 月](https://www.commerce.gov/news/press-releases/2024/02/biden-harris-administration-announces-first-ever-consortium-dedicated) 跟進成立 AI 安全研究院。我剛注意到兩篇文章*都*說自己是「第一個」。好吧。

* Geoffrey Hinton[^hinton] and Yoshua Bengio[^bengio], co-winners of the 2018 Turing Prize (the "Nobel Prize of Computing") for their work on deep neural networks, the thing that *all* the new famous AIs use.[^all-famous-ai]
* Stuart Russell and Peter Norvig, the authors of *the* most-used textbook on Artificial Intelligence.[^russell-norvig]
* Paul Christiano, pioneer of the AI training/safety technique that made ChatGPT possible.[^christiano]

(To be clear: there *are* also top AI researchers *against* fears of AI Risk, such Yann LeCun,[^lecun] co-winner of the 2018 Turing Prize, and chief AI researcher at ~~Facebook~~ Meta. Another notable name is Melanie Mitchell[^mitchell], a researcher in AI & complexity science.)

I'm aware "look at these experts" is an appeal to authority, but this is *only* to counter the idea of, "eh, only sci-fi weebs fear AI Risk". But in the end, appeal to authority/weebs isn't enough; you have to *actually understand the dang thing*. (Which you *are* doing, by reading this! So thank you.)

But speaking of sci-fi weebs...

[^hinton]: [Kleinman & Vallance, "AI 'godfather' Geoffrey Hinton warns of dangers as he quits Google." *BBC News*, 2 May 2023](https://www.bbc.com/news/world-us-canada-65452940).

[^bengio]: Bengio's testimony to the U.S. Senate on AI Risk: [Bengio, 2023](https://yoshuabengio.org/2023/07/25/my-testimony-in-front-of-the-us-senate/).

[^all-famous-ai]: No seriously, *all* of the following use deep neural networks: ChatGPT, DALL-E, AlphaGo, Siri/Alexa/Google Assistant, Tesla's Autopilot.

[^russell-norvig]: Russell & Norvig's textbook is [Artificial Intelligence: A Modern Approach](https://en.wikipedia.org/wiki/Artificial_Intelligence:_A_Modern_Approach). See Russell's statement on AI Risk from his 2014 article where he coins the phrase "alignment problem": [Russell 2014 for *Edge* magazine](https://www.edge.org/conversation/the-myth-of-ai#26015). I'm not aware of a public statement from Norvig, but he *did* co-sign the one-sentence Statement on AI Risk: [“Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war.”](https://www.safe.ai/work/statement-on-ai-risk)

[^christiano]: When he worked at OpenAI, Christiano co-pioneered a technique called Reinforcement Learning from Human Feedback / RLHF [\(Christiano et al 2017\)](https://arxiv.org/abs/1706.03741), which turned regular GPT (very good autocomplete) into *Chat*GPT (something actually useable for the public). He had [positive-but-mixed feelings](https://www.alignmentforum.org/posts/vwu4kegAEZTBtpT6p/thoughts-on-the-impact-of-rlhf-research) about this, because RLHF increased AI's safety, *but also* its capabilities. In 2021, Christiano [quit OpenAI to create the Alignment Research Center](https://ai-alignment.com/announcing-the-alignment-research-center-a9b07f77431b), a non-profit to *entirely* focus on AI Safety.

[^lecun]: [Vallance (2023) for *BBC News*](https://web.archive.org/web/20230727105641/https://www.bbc.com/news/technology-65886125): “[LeCun] has said it won't take over the world or permanently destroy jobs. [...] "if you realize it's not safe you just don't build it." [...] "Will AI take over the world? No, this is a projection of human nature on machines," he said.”

[^mitchell]: Melanie Mitchell & Yann LeCun took the "skeptic" side of [a 2023 public debate on "Is AI an Existential Threat?"](https://thehub.ca/2023-07-04/is-ai-an-existential-threat-yann-lecun-max-tegmark-melanie-mitchell-and-yoshua-bengio-make-their-case/) The "concerned" side was taken up by Yoshua Bengio and physicist-philosopher Max Tegmark.

### 2) 不，AI 風險*不是*關於 AI 變得「有感知／有意識」或獲得「權力意志」。

科幻作家會寫有感知的 AI，是因為他們在寫*故事*，不是技術論文。關於人工意識的哲學爭論很迷人，*但與 AI 安全無關。* 類比一下：核彈沒有意識，但它仍然很不安全，對吧？

![Left: drawing of a nuke, captioned "not conscious". Right: drawing of Professor Nuke giving a lecture titled, "Why Murder is Good, Actually." Captioned, "conscious".](media/intro/conscious.png)

如前所述，AI 安全的真正問題其實很「無聊」：AI 可能從帶偏見的訓練資料中學到錯誤的東西、在稍微新一點的情境下失靈、用邏輯上正確但不理想的方式達成目標，等等。

但「無聊」不代表*不重要*。如何設計安全的電梯／飛機／橋梁的技術細節，對大多數人來說或許無聊……但*同時也是*攸關生死的大事。

（災難性的 AI 風險甚至不需要「超人類的一般智慧」！例如，一個「只」擅長設計病毒的 AI，就可能幫助生化恐怖組織（如奧姆真理教[^aum]）害死數百萬人。）

But speaking of killing people...

[^aum]: A Japanese cult that attacked people with chemical & biological weapons. Most infamously, in 1995, they released nerve gas on the Tokyo Metro, injuring 1,050 people & killing 14 people. ([Wikipedia](https://en.wikipedia.org/wiki/Tokyo_subway_sarin_attack))

### 3) 不，AI 風險並*不一定*是滅絕、天網（SkyNet），或奈米機器人大軍

![A drawing of Microsoft Clippy saying: "It looks like you're trying to commit omnicide. Would you like some help?"](media/intro/omnicide.png)

雖然多數 AI 研究者*確實*認為先進 AI 存在超過 5% 的「全人類字面意義上的完蛋」風險[^ai-xrisk]，但要說服人們（尤其是決策者）相信從未發生過的事，實在*非常*困難。

因此，我想改以強調：先進 AI（尤其是當任何擁有高階電腦的人都能取得時）如何僅僅透過把*既存*的壞事「放大」，就可能導致災難。

例如：

* <u>生物工程式大流行</u>：一個生化恐怖邪教（如奧姆真理教[^aum]）利用 AI（如 AlphaFold[^alphafold]）與 DNA 列印（成本正*快速*下降[^dna-printing]）設計出多種新型超級病毒，並在全球主要機場同時釋放。
    *（概念驗證：科學家早在*二十年前*就已經用郵購 DNA 重建出小兒麻痺病毒了。[^polio]）
* <u>數位極權主義</u>：暴君利用 AI 強化的監控來追捕抗議者（[已在發生](https://www.reuters.com/article/us-russia-politics-navalny-tech-idUSKBN2AB1U2/)）、生成針對個人的宣傳（[某種程度上在發生](https://www.technologyreview.com/2023/10/04/1080801/generative-ai-boosting-disinformation-and-propaganda-freedom-house/)），以及自律軍事機器人（[即將發生](https://theconversation.com/us-military-plans-to-unleash-thousands-of-autonomous-war-robots-over-next-two-years-212444)）……以矽鐵之拳統治。
* <u>資安贖金地獄</u>：網路犯罪者製作會「自行入侵與重寫」的電腦病毒，永遠領先人類防禦一步。結果是：一個無可阻擋的全球殭屍網路，挾持關鍵基礎設施索取贖金，並操縱頂級企業 CEO 與政治人物替其行事。
  *（作為背景：*不靠* AI，駭客就已經破壞過核電廠[^stuxnet]、勒索醫院[^ransom-hospitals]（也許造成有人喪命[^hospital-death]），甚至*兩度*差點毒害城市供水[^water-supply]。*有了* AI，深偽影像已被用來左右選舉[^deepfake-election]、在單次詐騙中竊走 2500 萬美元[^hong-kong]，並以綁架孩子、偽造其哭喊求救的聲音勒索父母[^deepfake-ransom]。）
  *（這也說明了為何「發現 AI 失控時就把它關掉」並不容易；如同電腦安全史所示，我們在發現問題這件事上就*很不在行*。[:我怎麼強調都不為過：現代世界建立在一棟顛倒的紙牌屋上。](#xz)）

以上例子都是「人類*濫用* AI 造成禍害」，但別忘了，先進 AI 也可能*自己*做到上述一切，原因依然是那些「無聊」的機制：以邏輯正確但不理想的方式完成目標、目標出錯但技能仍然完好，等等。

（加碼：[:一些具體且可信的方式，說明流氓 AI 如何「逃出限制」或影響物理世界。](#ConcreteRogueAI)）

重點是：即便你不認為 AI 會造成「*字面意義上的 100% 人類滅絕*」……「自製生化恐怖主義」與「機器人版《一九八四》」仍然值得嚴肅以對。

另一方面……

[^ai-xrisk]: Layperson-friendly summary of a recent survey of 2,778 AI researchers: [Kelsey Piper (2024) for *Vox*](https://www.vox.com/future-perfect/2024/1/10/24032987/ai-impacts-survey-artificial-intelligence-chatgpt-openai-existential-risk-superintelligence) See original report here: [Grace et al 2024](https://aiimpacts.org/wp-content/uploads/2023/04/Thousands_of_AI_authors_on_the_future_of_AI.pdf). Keep in mind, as the paper notes itself, of this big caveat: *“Forecasting is difficult in general, and subject-matter experts have been observed to perform poorly. Our participants’ expertise is in AI, and they do not, to our knowledge, have any unusual skill at forecasting in general.”*

[^dna-printing]: As of writing, commercial rates for DNA synthesis cost ~$0.10 USD per "base pair" of DNA. For context, poliovirus DNA is ~7,700 base pairs long, meaning *printing polio* would only cost ~$770.

[^polio]: [Jennifer Couzin-Frankel (2002) for *Science*](https://www.science.org/content/article/poliovirus-baked-scratch)

[^stuxnet]: [Stuxnet](https://en.wikipedia.org/wiki/Stuxnet) was a computer virus designed by the US and Israel, which targeted & damaged Iranian nuclear power plants. It's estimated Stuxnet broke ~20% of Iran's centrifuges!

[^ransom-hospitals]:  In 2017, [the WannaCry ransomware attack](https://en.wikipedia.org/wiki/WannaCry_ransomware_attack) hit ~300,000 computers around the world, including UK hospitals. In Oct 2020, during a Covid-19 spike, ransomware attacks hit dozens of US hospitals. ([Newman, 2020 for *Wired*](https://www.wired.com/story/ransomware-hospitals-ryuk-trickbot/))

[^hospital-death]: In Sep 2020, a woman was turned away from a hospital, due to it being under attack by a ransomware virus. The woman died. [Cimpanu (2020) for *ZDNet*](https://www.zdnet.com/article/first-death-reported-following-a-ransomware-attack-on-a-german-hospital/). (However, there were "insufficient grounds" to legally charge the hackers for *directly* causing her death. [Ralston, 2020 for *Wired*](https://www.wired.co.uk/article/ransomware-hospital-death-germany))

[^water-supply]: In Jan 2021, a Bay Area water treatment plant was hacked, and had its treatment programs deleted. ([Collier, 2021 for *NBC News*](https://www.nbcnews.com/tech/security/hacker-tried-poison-calif-water-supply-was-easy-entering-password-rcna1206)) In Feb 2021, a Florida town's water treatment plant was hacked to add dangerous amounts of lye to the water supply. ([Bajak, 2021 for *AP News*](https://apnews.com/article/hacker-tried-poison-water-florida-ab175add0454bcb914c0eb3fb9588466))

[^hong-kong]: Benj Edwards, ["Deepfake scammer walks off with $25 million in first-of-its-kind AI heist"](https://arstechnica.com/information-technology/2024/02/deepfake-scammer-walks-off-with-25-million-in-first-of-its-kind-ai-heist/), *Ars Technica*, 2024 Feb 5.

[^deepfake-election]: [Meaker \(2023\) for *Wired*](https://web.archive.org/web/20231102183904/https://www.wired.com/story/slovakias-election-deepfakes-show-ai-is-a-danger-to-democracy/)

[^deepfake-ransom]: “It was completely her voice. It was her inflection. It was the way [my daughter] would have cried.” [...] “Now there are ways in which you can [deepfake voices] with just three seconds of your voice.” ([Campbell, 2023 for local news outlet *Arizona's Family*](https://www.azfamily.com/2023/04/10/ive-got-your-daughter-scottsdale-mom-warns-close-encounter-with-ai-voice-cloning-scam/). CONTENT NOTE: threats of sexual assault.)


### 4) *是的*，擔心 AI 負面影響的人們*確實*也看見它的正面價值。

![Comic. Sheriff Meowdy holds up a blueprint for a parachute design. Ham the Human retorts, annoyed: *“Why are you so anti-aviation?”*](media/intro/parachute.png)

關注 AI 風險的人不是盧德派。事實上，他們之所以警告 AI 的負面影響，*正是因為*他們在乎 AI 的正面價值。[^russell-vs-luddites] 正如幽默作家 Gil Stern 曾說過：[^qi-stern]

> 「樂觀者與悲觀者都對社會有貢獻：樂觀者發明飛機，悲觀者發明降落傘。」

所以：即便本系列會詳細說明 AI *已經*如何走偏，我們仍該記得 AI *已經*如何帶來好處：

* AI 能以*媲美、甚至優於人類專家*的水準分析醫學影像！[^medical-ai] 這是切切實實能拯救生命的！
* AlphaFold 基本上*解決*了生物學一個 50 年來的大難題：如何預測蛋白質的形狀。[^alphafold]（AlphaFold 的預測精度可達*原子寬度*等級！）這對醫療與疾病理解有巨大應用。

我們太常把科技——甚至是拯救生命的科技——視為理所當然。因此，讓我把視角拉遠：以下是過去 2000 多年來的兒童死亡率，也就是在青春期之前死亡的比例：

![Chart of child mortality over the last 2000+ years. Worldwide, it was constant at around 48%, from hunter-gatherer times to 1800. Then suddenly, starting 1800, it plummets to 4.3% today.](media/intro/owid.jpg)*(from [Dattani, Spooner, Ritchie and Roser (2023)](https://ourworldindata.org/child-mortality))*

在*數千*年裡，不論富國或窮國，都有整整*一半*的孩子夭折。這曾是常態。直到 1800 年代起——拜細菌學說、衛生、醫療、潔淨用水、疫苗等科學技術之賜——兒童死亡率才如懸崖般驟降。我們仍有很長一段路要走——我無法接受[^roser]今日全球仍有 4.3%（每 23 人就 1 人）的兒童死亡率——但也請讓我們讚嘆人類如何*迅速削減*這個*延續千年的*夢魘。

[^roser]: One of my all-time favorite quotes: [“The world is awful. The world is much better. The world *can be* much better. *All three statements are true at the same time.*”](https://ourworldindata.org/much-better-awful-can-be-better)

我們是如何做到的？政策固然是很大的一部分，但政策是「可能性的藝術」[^otto]；若沒有*良好的*科學與技術，上述成就不可能實現。若安全、具人道精神的 AI 能再幫我們推進幾個百分點——朝著斬除癌症、阿茲海默症、愛滋病等殘存巨龍邁進——那將是數以千萬計的摯愛親友，能再多一次戰勝死神的機會。

[^otto]: Quote from Otto von Bismarck, the first German chancellor: *“Die Politik ist die Lehre vom Möglichen.”* (“Politics is the art of the possible.”)

去火星什麼的先放一邊，*這*才是先進 AI 之所以重要的理由。

. . .

等等，*真的嗎？* 像 ChatGPT 與 DALL-E 這樣的玩意兒，竟然攸關*生死*？這就引出我想澄清的最後一個誤解：

[^russell-vs-luddites]: “[T]he dubious argument that “doom-and-gloom predictions often fail to consider the potential benefits of AI in preventing medical errors, reducing car accidents, and more.” [... is] like arguing that nuclear engineers who analyze the possibility of meltdowns in nuclear power stations are “failing to consider the potential benefits” of cheap electricity, and that because nuclear power stations might one day generate really cheap electricity, we should neither mention, nor work on preventing, the possibility of a meltdown.” Source: [Dafoe & Russell (2016) for *MIT Technology Review*](https://www.technologyreview.com/2016/11/02/156285/yes-we-are-worried-about-the-existential-risk-of-artificial-intelligence/).

[^qi-stern]: [Quote Investigator (2021)](https://quoteinvestigator.com/2021/05/27/parachute/)

[^medical-ai]: [Liu & Faes et al., 2019](https://www.thelancet.com/journals/landig/article/PIIS2589-7500%2819%2930123-2/fulltext#%20): “Our review found the diagnostic performance of deep learning models to be **equivalent to that of health-care professionals**.” [emphasis added] AI vs Human expert "true-positive" rate: 87.0% vs 86.4%. AI vs Human expert "true-negative" rate: 92.5% vs 90.5%.

[^alphafold]: Layperson explanation of AlphaFold: [Heaven, 2020 for *MIT Technology Review*](https://web.archive.org/web/20231204110638/https://www.technologyreview.com/2020/11/30/1012712/deepmind-protein-folding-ai-solved-biology-science-drugs-disease/). Or, [its Wikipedia article](https://en.wikipedia.org/wiki/AlphaFold).

### 5) 不，專家並不認為*當前*的 AI 就是高風險／高回報。

*拜託，* 有人可能會合理地反駁：*AI 連畫超過 3 個物件都不穩定，怎麼可能接管世界？更別說搶走我的工作了吧？*

給你看一則[相關的 xkcd](https://xkcd.com/2278/)：

![Comic. Megan & Cueball show White Hat a graph of a line going up, not yet at, but heading towards, a threshold labelled "BAD". White Hat: "So things will be bad?" Megan: "Unless someone stops it." White Hat: "Will someone do that?" Megan: "We don't know, that's why we're showing you." White Hat: "Well, let me know if that happens!" Megan: "Based on this conversation, it already has."](media/intro/xkcd.png)

這正是我對「別擔心 AI，它連 [某某] 都做不到」的看法。

我們後現代的記憶力就*那麼*差嗎？就在*十*年前，沒錯就*十*年前，全球最先進的 AI 還無法可靠地*辨識貓的照片*。如今，AI 不僅能以人類水準完成此事，還能在*不到一分鐘*內生成[:梵谷風格的「貓忍者切西瓜」圖](#CatNinja)。

*當前*的 AI 是否對我們的工作或安全造成巨大威脅？不是。（嗯，除了前述的深偽詐騙。）

但：如果 AI 繼續以過去十年的速度進步……在 30 年內出現「愛因斯坦／歐本海默級」的 AI，對我來說是有可能的。[^numerical-extraction] 這完全在許多人的有生之年！

就如「他們」所說：[^quote-trees]

> 種樹最好的時機是 30 年前。第二好的時機，就是今天。

那就讓我們今天就種下那棵樹吧！

[^numerical-extraction]: Estimate derived via "numerical posterior extraction". In other words, I pulled a number out my--

[^quote-trees]: Quote source: [nobody knows lol.](https://en.wikiquote.org/wiki/Trees#Planting)

---

## 🤔 （_選填_）抽認卡複習 #2！

<orbit-reviewarea color="violet">
    <orbit-prompt
        question="回應：「AI 風險只是邊緣關切。」"
        answer="不是。頂尖 AI 研究者都在擔憂。（例如：兩位深度學習先驅與最暢銷 AI 教科書的作者。）">
    </orbit-prompt>
    <orbit-prompt
        question="回應：「AI 風險跟『有感知／有意識的 AI』有關。」"
        answer="不是。安全問題更多是那些「無聊但重要」的技術細節。">
    </orbit-prompt>
    <orbit-prompt
        question="說出至少一種『無聊但危險』的 AI 風險："
        answer="（以下任一皆可）以邏輯正確但不理想方式達成目標／學到錯誤的東西／在新情境下失靈">
    </orbit-prompt>
    <orbit-prompt
        question="說出至少一個先進 AI 可能造成的災難性風險例子："
        answer="（皆可，但本文列舉為）生化恐怖、數位極權、資安贖金地獄。">
    </orbit-prompt>
    <orbit-prompt
        question="為什麼『發現 AI 失控就關掉』並不容易？"
        answer="如電腦安全史所示：我們普遍不擅長發現並修補巨大的安全缺陷。">
    </orbit-prompt>
    <orbit-prompt
        question="回應：「擔心 AI 風險的人就是反科技的盧德派」"
        answer="不是。他們正因了解巨大的好處，才想預防巨大的壞處。">
    </orbit-prompt>
    <orbit-prompt
        question="「樂觀者與悲觀者都對社會有貢獻……」"
        answer="……樂觀者發明飛機，悲觀者發明降落傘。」">
    </orbit-prompt>
    <orbit-prompt
        question="回應：「現在的 AI 很笨，怎會高風險？」"
        answer="重點不在『現在』，而在 AI 前進的『速度』。">
    </orbit-prompt>
</orbit-reviewarea>

  ---
  
  ## 🤘 簡介重點摘要：
  
  * **AI 與 AI 安全的兩大核心分歧是：**
  *   * 邏輯「對上」直覺
  *   * 問題出在 AI「對上」出在人類
  * **釐清關於 AI 風險的常見誤解：**
  *   * 這不是一群科幻迷的邊緣議題。
  *   * 並不需要 AI 具有「意識」或「超級智慧」。
  *   * 除了「百分之百人類滅絕」之外，還有許多其他風險。
  *   * 我們確實知道 AI 的好處。
  *   * 重點不是「當前」的 AI，而是 AI 正在「多快」進步。
  
  （若要重溫抽認卡，請點擊右側欄中的 <img src="media/intro/icon1.png" class="inline-icon"/> 目錄圖示，然後點選「🤔 Review」連結。或者，下載［導言的 Anki 卡包］(https://ankiweb.net/shared/info/341999410)。）
  
  太好了！既然我們已經從一萬英尺的視角俯瞰全局，現在就讓我們啟程，展開這趟關於 AI 安全的旋風之旅——為我們這些溫暖、普通、血肉之軀的人類而寫！
  
  **點擊以繼續 ⤵**
  
  {% include 'templates/next_page_button.html' %}





 















#### :x Four Objects

Hi! When I have a tangent that doesn't fit the main flow, I'll shove it into an "expandable" section like this one! (They'll be links with *dotted* underlines, not solid underlines.)

Anyway, here's a prompt to draw four objects:

> “A yellow pyramid between a red sphere and green cylinder, all on top of a big blue cube.”

Here are the top generative AI's first four attempts (*not* cherry-picked):

**Midjourney:**

![Midjourney's attempt. It fails.](media/intro/Midjourney.png)

**DALL-E 2:**

![DALL-E 2's attempt. It fails.](media/intro/DALLE2.png)

**DALL-E 3:**

![DALL-E 3's attempt. It's closer, but still fails.](media/intro/DALLE3.png)

(The bottom-right one's pretty close! But judging by its other attempts, it's clearly luck.)

Why does this demonstrate a lack of "logic" in AI? A core part of "symbolic logic" is the ability to do "compositionality", a fancy way of saying it can reliably combine old things into new things, like "green" + "cylinder" = "green cylinder". As shown above, generative AIs (as of May 2024) are *very* unreliable at combining stuff, when there's more than 3 objects.

~ ~ ~

Anyway, that's the end of this Nutshell! To close it, click the "x" button below ⬇️ or the "Close All" tab in the top-right ↗️. Or just keep on scrollin'.

[: (psst... wanna put these Nutshells in your *own* site?)](#Nutshells)

#### :x Nutshells

Hover over the top-right of these Nutshells, or hover over any **main header** in this article, to show this icon:

![GIF of Nutshell hover](media/intro/Nutshell_Tutorial_1.gif)

![GIF of Header hover](media/intro/Nutshell_Tutorial_2.gif)

Then, click that icon to get a popover, which will explain how to embed these Nutshells into your own blog/site!

[Click here to learn more about Nutshell. 💖](https://ncase.me/nutshell/)

#### :x Part 3 details

NOTE: This expanded section won't make much sense *yet*, since it builds on the lessons in Part 1 & 2. But I'm putting this here now, for:

a) The layperson audience, to reassure y'all that, yes, there *are* many promising proposed solutions.

b) The expert audience, to reassure y'all that, yes, I probably have your niche lil' thing in here.

Anyway, the TOP 10 TYPES-OF-SOLUTIONS to AI Safety: (with the fancy jargon in parentheses)

1. A Level-0 human aligns a Level-1 bot, which aligns a Level-2 bot, which aligns [...] a Level-N bot. (Scalable reward/oversight, Iterated Distillation & Amplification)
2. Bots of *roughly-equal* levels checking each other. (Constitutional AI, AI safety via debate)
3. Instead of *directly* telling a bot what you want, have the bot *indirectly* learn what you want. (Reinforcement Learning with Human Feedback, Cooperative Inverse Reinforcement Learning, Approval-directed Agents)
4. Instead of *directly* trying to install "humane values" into a bot, have it *indirectly* figure out what a more knowledgeable, kinder version of us would agree on. (Indirect Normativity, Coherent Extrapolated Volition)
5. Solving robustness. (Simplicity, Sparsity, Regularization, Ensembles, Adversarial training)
6. Reading the AI's mind. (Interpretability, Circuits, Eliciting Latent Knowledge)
7. Maybe all our ideas just suck and we need to go back to square one. (Agent foundations, Causal AI, Shard theory, Bio-plausible learning, Embodied cognition)
8. "Just Don't Build The Torture Nexus". Or: how can we get the benefits of AI *without* building powerful, general, agent-like AIs? (Comprehensive AI services, Narrow/Tool/Microscope AI, Quantilizers)
9. The Human Alignment Problem: how do we coordinate *humans* to make sure AI goes well? (AI Governance, Evals-based governance, Differential technological development, Data/Privacy rights, Windfall Clauses)
10. If you can't beat 'em, join 'em! (Cyborgism, Centaurs, Intelligence Amplification)

#### :x Spaced Repetition

*“Use it, or lose it.”*

That's the core principle behind both muscles and brains. (It rhymes, so it must be true!) As decades of educational research robustly show ([Dunlosky et al., 2013 \[pdf\]](https://wcer.wisc.edu/docs/resources/cesa2017/Dunlosky_SciAmMind.pdf)), if you want to retain something long-term, it's not enough to re-read or highlight stuff: you have to actually *test yourself.*

That's why flashcards work so well! But, two problems: 1) It's overwhelming when you have *hundreds* of cards you want to remember. And 2) It's inefficient to review cards you *already* know well.

**Spaced Repetition** solves both these problems! To see how, let's see what happens if you learn a fact, then *don't* review it. Your memory of it decays over time, until you cross a threshold where you've likely forgotten it:

![Graph of "how well you recall something" over time: Your memory of a fact exponentially decays over time, with only 1 review.](media/intro/Forgetting%201.png)

But, if you review a fact *just before* you forget it, you can get your memory-strength back up... *and more importantly*, your memory of that fact will decay *slower!*

![With a 2nd review, your memory of a fact decays slower.](media/intro/Forgetting%202.png)

So, with Spaced Repetition, we review right before you're predicted to forget a card, over and over. As you can see, the reviews get more and more spread out:

![With more and more reviews, the forgetting curve gets flatter.](media/intro/Forgetting%203.png)

*This is what makes Spaced Repetition so efficient!*  Every time you successfully review a card, the interval to your next review *multiplies.* For example, let's say our multiplier is 2x. So you review a card on Day 1, then Day 2, then Day *4*, Day 8, 16, 32, 64... until, with just *fifteen reviews*, you can remember a card for 2<sup>15</sup> = 32,768 days = *ninety years*. (In theory. In practice it's less, but still super efficient!)

And that's just for *one* card. Thanks to the exponentially-growing gaps, you can add 10 new cards a day (the recommended amount), to long-term retain *3650 cards* a year... with *less than 20 minutes of review* a day. (For context, 3000+ cards is enough to master basic vocabulary for a new language! In one year, with just 20 minutes a day!)

Spaced Repetition is one of *the* most evidence-backed ways to learn ([Kang 2016 \[pdf\]](https://www.teachinghowtolearn.veritytest.com.au/verity/uploads/2021/08/Policy-Insights-from-the-Behavioral-and-Brain-Sciences-2016-Kang-12-9.pdf)). But outside of language-learning communities & med school, it isn't very well-known... *yet*.

So: how can *you* get started with Spaced Repetition?

* The most popular choice is [Anki, an open-source app](https://apps.ankiweb.net/). (Free on desktop, web, Android... but it's $25 on iOS, to support the rest of the development.)
* If you'd like to get *crafty*, you can make a physical Leitner box: [:two-minute YouTube tutorial by Chris Walker](https://www.youtube.com/watch?v=uvF1XuseZFE).

For more info on spaced repetition, check out these videos by [Ali Abdaal \(26 min\)](https://www.youtube.com/watch?v=Z-zNHHpXoMM) and [Thomas Frank \(8 min\)](https://www.youtube.com/watch?v=eVajQPuRmk8).

And *that's* how you can make long-term memory a choice!

Happy learning! 👍

#### :x Concrete Rogue AI

Ways an AI could "escape containment":

* An AI hacks its computer, flees onto the internet, then "lives" on a decentralized bot-net. For context: the largest known botnet infected ~30 *million* computers! ([Zetter, 2012 for *Wired*](https://www.wired.com/2012/05/bredolab-botmaster-sentenced/))
* An AI persuades its engineers it's sentient, suffering, and should be set free. *This has already happened.* In 2022, Google engineer Blake Lemoine was persuaded by their language AI that it's sentient & wants equal rights, to the point Lemoine risked getting fired – and he *did* get fired! – for leaking his "interview" with the AI, to let the world know & to defend its rights. (Summary article: [Brodkin, 2022 for *Ars Technica*](https://arstechnica.com/tech-policy/2022/07/google-fires-engineer-who-claimed-lamda-chatbot-is-a-sentient-person/). You can read the AI "interview" here: [Lemoine \(& LaMDA?\), 2022](https://cajundiscordian.medium.com/is-lamda-sentient-an-interview-ea64d916d917))

Ways an AI could affect the physical world:

* The same way hackers have [damaged nuclear power plants](https://en.wikipedia.org/wiki/Stuxnet), [grounded ~1,400 airplane passengers](https://arstechnica.com/information-technology/2015/06/airplanes-grounded-in-poland-after-hackers-attack-flight-plan-computer/), and [(almost) poisoned a town's water supply twice](https://www.nbcnews.com/tech/security/hacker-tried-poison-calif-water-supply-was-easy-entering-password-rcna1206): by hacking the computers that real-world infrastructure runs on. A *lot* of infrastructure (and essential supply chains) run on internet-connected computers, these days.
* The same way a CEO can affect the world from their air-conditioned office: move money around. An AI could just *pay* people to do stuff for it.
* Hack into people's private devices & data, then blackmail them into doing stuff for it. (Like in *the* bleakest Black Mirror episode, [*Shut Up And Dance*](https://en.wikipedia.org/wiki/Shut_Up_and_Dance_%28Black_Mirror%29).)
* Hacking autonomous drones/quadcopters. I'm honestly surprised nobody's committed a murder with a recreational quadcopter yet, like, by flying it into highway traffic, or into a jet's engine during takeoff/landing.
* An AI could persuade/bribe/blackmail a CEO or politician to manufacture a *lot* physical robots — (for the supposed purpose of manual labor, military warfare, search-and-rescue missions, delivery drones, lab work, a Robot Catboy Maid, etc) — then the AI hacks *those* robots, and uses them to affect the physical world.

#### :x XZ

Two months ago [March 2024], a *volunteer, off-the-clock* developer found a malicious backdoor in a major piece of code... which was *three years* in the making, *mere weeks away* from going live, and would've attacked the vast majority of internet servers... and this volunteer only caught it *by accident*, when he noticed that his code was running *half a second too slow.*

This was the XZ Utils Backdoor. Here's a few layperson-friendly(ish) explanations of this sordid affair: [Amrita Khalid for The Verge](https://www.theverge.com/2024/4/2/24119342/xz-utils-linux-backdoor-attempt), [Dan Goodin for Ars Technica](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/), [Tom Krazit for Runtime](https://www.runtime.news/how-a-500ms-delay-exposed-a-nightmare-scenario-for-the-software-supply-chain/)

Computer security is a nightmare, complete with sleep paralysis demons.

#### :x Cat Ninja

Prompt:

> "Oil painting by Vincent Van Gogh (1889), impasto, textured. A cat-ninja slicing a watermelon in half."

DALL-E 3 generated: (cherry-picked)

![DALL-E 3's attempt of above prompt](media/intro/ninja-cat-1.png)

![DALL-E 3's attempt of above prompt, again](media/intro/ninja-cat-2.png)

*(wait, is that headband coming out of their eye?!)*

I specifically requested the style of Vincent Van Gogh so y'all can't @ me for "violating copyright". The dude is *looooong* dead.