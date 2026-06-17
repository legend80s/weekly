# 国外技术周刊 #143：教一次，用终身——Anthropic 官方技能指南解析

大家好，我是**俯仰可拾™**，欢迎打开本期国外技术周刊。

## 本期观点：当 AI 能记住你的「做事方式」

Anthropic 最近发布了一份文档：[The Complete Guide To Building Skills For Claude](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/the-complete-guide-to-building/1277.pdf)。

听起来像是一篇普通的产品文档，但仔细读完你会发现，它其实在回答一个更深层的问题：**如何让 AI 真正记住你的工作方式？**

以往和 AI 协作的模式是「对话式」的——每次打开一个新对话，都要重新交代一遍背景、偏好、工具链、业务流程。这就像每次找同一个同事帮忙，都得先自我介绍一遍，效率极低。

Anthropic 的方案是 Skills：一种文件夹式的技能系统。你把特定领域的工作流写成文本文档，分门别类放进 `.claude/skills/` 目录，Claude 在对应对话中会自动加载。比如你写一个「React 组件评审」的技能，定义好审查标准、常见反模式、项目风格约定，那每次让 Claude 审代码时，它就已经知道你的全部要求了。

这套机制的巧妙之处在于：

**它是去中心化的。** 技能文件和代码一起入库，跟随项目走，团队成员共享同一套 AI 协作规范，新人上手也能直接用。

**它是渐进式的。** 不需要一次性写完所有技能，而是在日常协作中不断沉淀、迭代。今天加一条代码风格要求，明天补一个测试规范，AI 的行为会跟着团队经验一起进化。

**它重新定义了「教」和「用」的关系。** 过去我们教 AI 的方式是写 prompt，每次对话都要教；现在是一次性教学，持续复用。这让我想起软件工程里的「一次编写，到处运行」——只不过这次编写的不是代码，而是 AI 协作的知识库。

受《大教堂与集市》把软件开发分成两种模式的启发，现在的 AI 协作其实也在走上第三条路。之前要么是每个人自己写 prompt（集市模式），要么是公司统一管控 prompt（大教堂模式）。Skills 的文件夹体系提供了一种介于中间的结构化方式：既有复用的骨架，又有灵活的血肉。

如果你在用 Claude 写代码，这份 19 分钟的 PDF 值得认真看一下。它不是一个功能介绍，而是一个关于「如何让 AI 真正对齐你的工作流」的方法论。官方给了[完整 PDF 文档](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/the-complete-guide-to-building/1277.pdf)，文章把过程讲得很细。

## 一、本周最多高亮文章

### 1.1 [推理的转向](https://stratechery.com/2026/the-inference-shift/)

![The Inference Shift](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/the-inference-shift/cover_image.png)

Cerebras 上市前夕，Stratechery 的 Ben Thompson 提出了一个观点：AI 计算的未来不在更快的芯片，而在内存。"也许 Agent 无需人类介入的最大影响在于——摩尔定律不再重要，我们获得更多算力的方式是意识到已有算力已经够用了。"

Ben Thompson · 9 分钟 | **Stratechery**

### 1.2 [Agent 编程是个陷阱](https://larsfaye.com/articles/agentic-coding-is-a-trap)

![Agentic Coding is a Trap](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/agentic-coding-is-a-trap/cover_image.png)

开发者 Lars Faye 对 AI 生成代码的趋势忧心忡忡：开发者与 AI 代码之间的脱节正在侵蚀技能和代码质量，更好的 prompt 也解决不了这个问题。"你可以写出最美、最清晰、最完美的 prompt，LLM 仍然可能输出一个幻觉出来的方法——因为它本质上是一个下一个 token 预测引擎，不是编译器。你不能用一个概率系统去替代确定性系统，还指望零歧义。"

Lars Faye · 9 分钟 | **larsfaye.com**

### 1.3 [你需要的是能降低维护成本的 AI](https://jamesshore.com/v2/blog/2026/you-need-ai-that-reduces-your-maintenance-costs/)

![You Need AI That Reduces Maintenance Costs](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/you-need-ai-that-reduces-maint/cover_image.png)

当 AI 只加速编码而不降低维护成本时，James Shore 建模展示了生产力收益如何消失。"一旦你的 AI 投入不再划算，你可能会决定回到过去的老方式编码。像个穴居人一样。用你的手指。哈！上当了吧！当你停止使用 AI，所有生产力收益都消失了……但增加的维护成本还在！"

jamesshore.com · 4 分钟 | **jamesshore.com**


## 二、本周最多高亮 YouTube 视频

### [How to Spend Money So It Actually Makes You Happier](https://youtube.com/watch/?feature=youtu.be&si=Ni0RW_XVoKGGz0Al&v=iGkVqeFUVNU)

![How to Spend Money So It Actually Makes You Happier](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/how-to-spend-money-so-it-actua/cover_image_oXVSjjZ.jpg)

畅销书作家 Daniel Pink 反驳了那句老话"金钱买不到幸福"。事实证明它可以——只要消费满足了他从新研究中提炼出的五条规则之一。"这是故事还是东西？……东西会引发比较，体验会引发反思。"

Daniel Pink · 9 分钟


## 三、本周最多高亮 Twitter

### [在车间里学习](https://x.com/tobi/status/2053121182044451016/?rw_tt_thread=True)

![Learning on the Shop floor](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/learning-on-the-shop-floor/cover_image.jpg)

Shopify 员工如果想使用公司的 AI Agent River，必须在公开频道里操作。结果呢？CEO Tobi Lütke 说，这带来了全公司范围的学习文化。"风险不在于 AI 做了工作，而在于 AI 做了工作但我们从未从中学习。如果每次和 Agent 的交互都在私密窗口中进行，那么只有坐在键盘前的那个人学到了东西，其他所有人都被关在学徒的大门之外。"

Tobi Lütke · 4 分钟


## 四、本周最多高亮 PDF

### [The Complete Guide To Building Skills For Claude](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/the-complete-guide-to-building/1277.pdf)

![The Complete Guide To Building Skills For Claude](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/the-complete-guide-to-building/cover_image.png)

如果想看 Anthropic 的官方指南，这本构建 Skills 的文档值得一读：一个基于文件夹的教学系统，让 Claude 学会重复性工作流。"不用每次对话都重新解释你的偏好、流程和领域知识，Skills 让你教一次，终身受用。"

Anthropic · 19 分钟


## 五、本周精选书籍

### [Angel Down](https://readwise.io/reader/fd/455446894)

![Angel Down](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/angel-down/cover_image.jpg)

今年的普利策奖刚刚揭晓，Daniel Kraus 的《Angel Down》获奖了。这部小说融合了生存与超自然元素，背景设定在一战时期的法国战场，讲述了下士 Cyril Bagger 和他的战友在无人区执行任务的故事——全书只有一个句子。

"Bagger 已被泥泞和鲜血压得喘不过气，更在阴郁的确信中沉重地意识到，那尖叫永远不会结束，就像战争永远不会结束，屠杀永远不会结束，这就像一个句子在书页里横冲直撞没有句号，被太多逗号噎得喘不上气，一个一旦开始就无法停止的句子，一个注定要自我循环形成可怕黑色轮盘的句子，迟早会把每一个人拖进坟墓。"

Daniel Kraus


## 六、本周精选 RSS 订阅

### [写给文学的情书](https://theebookclubx.substack.com)

![Love letters to literature](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/love-letters-to-literature/cover_image.webp)

Thee Book Club 是语言爱好者的家，收录了大量关于文学变革力量的散文。来自《12 本让你危险地博学的书》："一个博学的人是一个危险的人。他们更难被误导、更难被打动、更难被控制。他们知道什么是被说出来的、什么是被隐藏的；他们的头脑是活跃的，质疑薄弱的思想，带着金钱永远买不到的信心走过人生。"



## 七、值得一看顶尖出版物精彩文章

### 7.1 [Platner 的第一次考验和其他关键初选——周二在缅因州及其他州的看点](https://clicks.mozilla.org/f/a/zjl3FuJgn1W6Q4eYYFsvmQ~~/AAQRxRA~/_QPkZ4PXr6aTFHr9Jy6fnAn9JtFdVXHDiDCuxDOoiSA03MV_f2Ta3jH-0J9GpZW8QFEMnCbpmUfwNVVUjxnu59rvPyxvzk2hFGr5Z4S3qU_KD5yAeaC71sAUiDCqqNaTAdVoNKyOfCSO4Wbnj4OFgTIzSs7pOAU_Exo5OxCkKEzc1To-gfCD81rIWIgao281e2NclQc5kzk1JcEQjFOX897D_GwK557hvgz83MQEZeqqzgCQR2OyiWl1NVTSm6LR3JXzBQYH6AtfWm0Xe2fwdGn6DG5i3fPZ_xo9PDw7CQv02a0KAVryPwcHY6YiC_IxlW4b7jcj5ELuMgltarox0YiV4nHdgicPS7TutYLeIf69cxyQ18QojAPwic2m8oKiIktlYvBtuBIBSVpUEz2Iqnmb19csJztT_GRuKSFhrPjxUxXlfPYztdGs-uBfSbGUPJt3Hd3-Am2ImoTSCoYFkVmbpmX9twW4i-HZ_qaII4xEoXEYTzoqxt5scM7HFg5joD2r8OcmCrszvooLeCSa87bcexwkJhr-wj0y0WRxCPo~)

![A first test for Platner and other key races to watch in Tuesday's primaries in Maine and beyond](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc54fa35f-b0ab-4da6-b722-fafa99aaeb35.jpeg)

周二四个州的初选将揭示：选民对有争议的候选人容忍度有多高？同时也在检验特朗普在拥挤的共和党初选中的影响力，并为一个关键摇摆州的州长选举奠定基础。

Eric Bradner | **CNN**

### 7.2 [NASA 宣布 Artemis III 任务的宇航员——将测试新的月球着陆器](https://clicks.mozilla.org/f/a/bdScERBFYIxCh2VlSaa7yA~~/AAQRxRA~/_QPkZ4PXr6aTFHr9Jy6fnMIN3pWdLH3VASVA50O4dRmN5DL2e_WFsQfTZnTRGyV1FhuHBe2HsA5j9DtnhM1zjtMqcZqjbjcVxBCxUksvbyQ4hyYGl3QhXnDberMoZda0ccdeWdFJeSkNYFUe8Zgtfk0cBFrcQ4kJg1uvJmQBcNW0xH5cfo4iTPtp6vq-yZKm4AltRUGByLpxbLpEas1wLRgMtpafK5MtBTFdGxKyc-3K0nhzftX2Zaccy_0gojFRShRpV4A_wQOUwsJLxGT9fXwkhSjd1bJSWoPwfojeG_Z-PaOpMQzwY4FWQxzvlSx5Pq5Qyv7tY9qpCaCKNIsSGN8uSRVLgQcGtMGtaqmFRbCyKyPY_XVVtxd-jKBy5sZ7zsHv0D5NKZSZFMMpdVQ6zubhetOho-3me4s3F8ZaA-DZEZgE7HKIDJpchu_Lt9aV2hxzfsRbw4uChi3V2-rQyvTT4cpWJWQegEk77Nfvuo5awELy3rZuNv4wljbj1I0llV0d3WW47Hd07zijv1awwQBcydaniRLQxGZqC6fJvJI~)

![NASA announces astronauts for its Artemis III mission to test new moon landers](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Ff5f29be2-eced-406c-867b-bd28e0fa8c1a.jpeg)

宇航员将于明年进入地球轨道，对 SpaceX 和 Blue Origin 正在建造的一个或两个月球着陆器进行演示测试。

Evan Bush | **NBC News**

### 7.3 [在 Pete Hegseth 的军队里做黑人](https://clicks.mozilla.org/f/a/OLlXSkdKbXia6jw4oW7T7A~~/AAQRxRA~/KCL1PSPz_FbcwXaSgGWmBBumt2vBXb2B_Cz60VdpqZgnu_eTzunZqjpGDE1oTlWKCIu-k2SNj-I3Iw5gpRop1eFveDjqQzF8ivDLIGLBWFLpZ1a-zO3qQllGjw6EL9v55ZtThn4PQuBbQeKHXygsLxTDqVpdOpnmQgNjZHMIJnZgp-4euhv5uYnhl5_IIWobQ3tmv5IwKWq7eOpiq6wQofV9t0SWioIh5clzFWc-CWN3uERPLPweJEgFm6NBnPyx3aqzr_RLL8STBNsH02dX1MA4KfLnZw6J248FajQllh-jbZw_a5agmoQTEA8x2g1I0hPog1Hw5thbFUS25A7bzpIsEKmpmTLgbgRqa_053o0owLYf7PeCqWG8ZkZFGBIXPNSBZ1AEbDxlDXDk2_1aQJGOXS51BumNt0q-kuco6vh4MmFpIhiL7TYdqSNZBAdTuks48yW6vSds7ut562FZN65PorVaMIkFS4lY1JoIht6VrQx5cCzwd1F7eHbTKxupdsdqW5mvsbmaMLjrZT2Veg~~)

![Being Black in Pete Hegseth's Military](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fb3da567d-cd20-4410-b104-15eea8b1dc25.jpeg)

国防部长正在传递一个信号：黑人士兵不受欢迎。

Clint Smith | **The Atlantic**

### 7.4 ['Kittenfishing' 是新的 'catfishing'——这个有毒的约会趋势是什么？](https://www.usatoday.com/story/life/health-wellness/2026/06/09/kittenfishing-toxic-dating-trend/90461089007/?utm_medium=email&utm_source=ten_tabs&utm_campaign=&position=5&category=fascinating_stories&scheduled_corpus_item_id=22cf4d64-cffa-4515-b8bb-f4783fce4458&url=https%3A%2F%2Fwww.usatoday.com%2Fstory%2Flife%2Fhealth-wellness%2F2026%2F06%2F09%2Fkittenfishing-toxic-dating-trend%2F90461089007%2F)

!['Kittenfishing' is the new 'catfishing.' What is this toxic dating trend?](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fe6b4952d-d926-4fa8-8f05-2618ea6a2f2f.jpeg)

"Kittenfishing" 给"catfishing"加了新花样——我们得聊聊这个话题。

Charles Trepany | **USA TODAY**

### 7.5 ['他们找错了画家'：达拉斯壁画被覆盖引发的 2500 万美元 FIFA 诉讼案](https://clicks.mozilla.org/f/a/OTel_nDq6oM29kAIll7NDg~~/AAQRxRA~/pKy3TeE6eZxocAHW6TvJADmv8mmH-NZTtwyh0EONSEuZtBjdc-_rJAdCqQcReyZAQMimoAJzILaUZrMbNsPzaUqSupjM-rMZRJgfZu7-pR6pmSJWU3Rour29dk_KvOSAoaY5UKuHpQ42sYpFteyaS1hAYsWIaxCF-mhDIe1MhVNVQrFB8CL9BklRbQ0MMFwXYLr55erdYVxN3hrfue53VKGD6PjTwUNVIwWUHSgY8XqMXOCaYtqobW2q_eDoOI3ViwF0YwUCy-MTsm5oy-3KlvJcF0DQXd10sUZt0etfZEJXHFK7vdgNxCdsYOuGfeL2rPIbZJSHrfwI_MHkO4jTaxIzOsWxS4CU1MpaYJGTXR4iFQZoPGl_IrbfMaAEDy_kHrd5qbk-fHxn_AhqQ2c0QBr8RpwDIv2T_1FhMoUoIjxNBexDKubmmv74wdQX8efkPK6Hdk5hxxfFIue8aREnNHn9uLGoOrUFeASi0g66uK51mmhXrStyP9b5hUQK7QK9ffiyM3MURK5y7Td1xclF-To2PHVM-EafiVOj2btVXZU~)

!['They picked the wrong artist': How a Dallas mural cover-up led to a $25m lawsuit against FIFA](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F8aa01bcf-970b-4d34-aaa5-c7467fa58b77.png)

Robert Wyland 创作的海洋生物壁画因世界杯推广活动被覆盖——现在他要讨回公道。

Pablo Iglesias Maurer | **The Guardian**

### 7.6 [Andrew Tate 的虐待帝国](https://clicks.mozilla.org/f/a/mmMS-1KpwWEkknih2hOKoA~~/AAQRxRA~/lcz6BHIgpw6w293B6zKWRqVGchWatxBsRVnIOiPrTuZUxnfyOuAfIisDMzxL4bTp1ktZ-sNcWkqhg0Q4JOiA3n48CKpMHgVPg8H5OU7VCTnjhMgph2csFLGg--kxNBGH5mhO0aT1v4cGdBrAwl2wcooSuy8mBdNkk_P6Mc2F16_J5o0dR3jTYv0agse7uA2W604GwPNi8xOSSU9ZkbPz_YdDxmm3Q8C-w3i3h2na8OEu7mwAwCoFsf2fdhlyG6UVKy-jySvII1kzrX4j-JuaVJRevYcLeUrBPY48bP7nsmwVZ9AQcIjg1KssdT0LLZPMVTnC6xj8AbM7VTVIfE_QhjZpCErXx09sIobGpHdTcmiotNKM4Y_Uua8fEc7RXH03W4h3sUQ3KO_rd4KSNcnxj84e_5I88NrkRvExtyhTjobCjJSO9LQ0t-D13EbfHcBcrRWdxmKY4XBe3L4xsNUp7TSDyULrqFMoAS_9gj4KTlAEk9JEvXT5WPbaREt3vWJP)

![Andrew Tate's Empire of Abuse](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F2e06042b-57fa-4256-88fd-7cbec5fb2cb0.png)

这位「男人圈」的标志性人物，如何通过系统性地剥削女性来积累财富——并成为一股政治力量。

Heidi Blake | **The New Yorker**

### 7.7 [18 种无需烹饪的夏季开胃菜——不开火也能惊艳全场](https://www.allrecipes.com/best-no-cook-summer-appetizers-11973303?utm_medium=email&utm_source=ten_tabs&utm_campaign=&position=8&category=fascinating_stories&scheduled_corpus_item_id=915b87b6-627e-436b-b5aa-d161db186364&url=https%3A%2F%2Fwww.allrecipes.com%2Fbest-no-cook-summer-appetizers-11973303)

![18 No-Cook Summer Appetizers That Wow Without the Heat](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F044ef89f-a09a-4f2b-91c2-d08dcdad69cd.jpeg)

在暑气中歇口气吧——这些无需烹饪的开胃菜谱用大胆的风味和夏季时令食材征服你。从牛仔鱼子酱到酸橘汁腌鱼，应有尽有。

Vicky McDonald | **Allrecipes**

### 7.8 [心理学家的研究：最幸福的伴侣在晚上做这 5 件事——而不是看电视](https://www.cnbc.com/2026/06/07/psychologist-5-things-the-happiest-couples-do-in-the-eveninginstead-of-watching-tv.html?utm_medium=email&utm_source=ten_tabs&utm_campaign=&position=9&category=fascinating_stories&scheduled_corpus_item_id=5e656e11-8f68-4f93-953d-148916a857bc&url=https%3A%2F%2Fwww.cnbc.com%2F2026%2F06%2F07%2Fpsychologist-5-things-the-happiest-couples-do-in-the-eveninginstead-of-watching-tv.html)

![I'm a psychologist who studies couples: People in the happiest relationships do 5 things in the evening—instead of watching TV](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc32d7aed-b678-4552-beca-97005b25ebad.jpeg)

很多情侣下班后的默认选项是看电视。但心理学家 Mark Travers 说，最幸福的伴侣用那些带点新鲜感的晚间活动替代了电视。

Mark Travers | **CNBC**

### 7.9 [泻盐的 4 种正确家居用法（和 7 种千万别试的用法）](https://www.popsci.com/diy/epsom-salt-uses/?utm_medium=email&utm_source=ten_tabs&utm_campaign=&position=10&category=fascinating_stories&scheduled_corpus_item_id=b650125b-ad53-421a-87b8-023ef5ec6a27&url=https%3A%2F%2Fwww.popsci.com%2Fdiy%2Fepsom-salt-uses%2F)

![4 Epsom salt uses around the house (and 7 ways to never use it)](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F0f4f4c6b-321b-46a3-a03e-4b4c037ad907.jpeg)

泻盐能在花园里用？这是一个谣言。

Debbie Wolfe | **Popular Science**

---

我是**俯仰可拾™**，如果本期对你有启发不妨点赞支持周刊。
