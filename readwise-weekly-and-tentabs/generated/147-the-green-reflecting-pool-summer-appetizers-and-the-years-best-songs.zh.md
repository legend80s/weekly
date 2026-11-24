# 国外技术周刊 #147：WTF Is a Loop？——AI 编程循环大争论

大家好，我是**俯仰可拾™**，欢迎打开本期国外技术周刊。

## 本期观点：AI 编程的"循环"到底是什么？

这周科技圈吵翻了一个话题：AI coding "loops" 到底是什么？

起因是 Peter Steinberger 和 Boris Cherny 对"循环"的定义产生了根本分歧——一个说它不过就是加了 AI 步骤的定时任务（cron），另一个认为它是全新的编程范式。

Matt Van Horn 的总结最清醒："诚实地说，循环既不是新的魔法，也不是单纯的 cron。它是 cron 加上循环体里的一个决策者。而真正的工程挑战，是围绕那个决策者外面包裹的一切——确保它不会失控跑偏。"

这恰恰呼应了本期 Anthropic 的文章：他们 80% 以上的代码已经是 Claude 写的了。当 AI 写代码成为常态，"谁来盯着 AI"这个问题就从一个思想实验变成了日常工程决策。

Addy Osmani 上周说的"编排税"也是同一枚硬币的另一面——启动 Agent 很便宜，但关闭循环的那个人是你，而且你只有一个。

当代码越来越多由 AI 生成，我们真正需要的不是更快的循环，而是更好的护栏。

---

## 一、本周热议文章

### 1.1 [当 AI 自己构建自己](https://anthropic.com/institute/recursive-self-improvement/)

![When AI builds itself](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/when-ai-builds-itself/cover_image.png)

Anthropic 论证递归自我改进即将到来，并以自己的代码库为证："截至 2026 年 5 月，我们合并到 Anthropic 代码库中超过 80% 的代码是由 Claude 编写的。而在 2025 年 2 月 Claude Code 以研究预览版发布之前，这个数字只有个位数。"

Marina Favaro 和 Jack Clark · 20 分钟 | **Anthropic**

### 1.2 [LLM 实际是如何工作的](https://0xkato.xyz/how-llms-actually-work/)

![How LLMs Actually Work](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/how-llms-actually-work/cover_image.png)

0xkato 在这份面向初学者的 transformer LLM 指南中跳过了数学，从 tokenization 讲起。"经典例子：问 LLM 'strawberry' 里有多少个 R。LLM 以前总是搞错。这不是模型不会数数，而是模型不直接操作字母，它只操作 token ID——这些 ID 恰好拼出了人类会逐个字母拆分的一个词。"

0xkato · 17 分钟 | **0xkato**

### 1.3 [不，人工智能没有意识](https://theatlantic.com/philosophy/2026/06/no-artificial-intelligence-is-not-conscious/687378/)

![No, Artificial Intelligence Is Not Conscious](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/no-artificial-intelligence-is-/cover_image.jpg)

科幻作家 Ted Chiang（《降临》原著作者）认为纠结于 LLM 是否有意识纯属浪费时间。"对 LLM 有意识的可能性持开放态度，就等于对 Microsoft Word 有意识持开放态度——或者更准确地说，每个包含对话记录的 Word 文档中都沉睡着多个不同的意识，每次加载文档时它们就会被唤醒。"

Ted Chiang · 22 分钟 | **The Atlantic**

## 二、本周精选 YouTube 视频

### [我用 Obsidian + Claude Cowork 管理人生的方式](https://youtube.com/watch/?v=rRa9td4oe7k)

![How I Use Obsidian + Claude Cowork to Run My Life](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/how-i-use-obsidian-claude-cowo/cover_image_34CiDxv.jpg)

Linking Your Thinking 创始人 Nick Milo 介绍了他的便携式 Obsidian + Claude 工作流，设计初衷是避免工具锁定。"真正的目标是你要拥有自己的思想、思考方式和 AI 工作流，然后只是租赁 AI 工具本身。不久之前 ChatGPT 还是默认选择，今天是 Claude。两年后还会是它们中的哪一个吗？"

Linking Your Thinking with Nick Milo · 19 分钟

## 三、本周精选 Twitter

### [WTF Is a Loop？Peter Steinberger vs. Boris Cherny](https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True)

![WTF Is a Loop? Peter Steinberger vs. Boris Cherny](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/wtf-is-a-loop-peter-steinberge/cover_image.jpeg)

Matt Van Horn 拆解了本周关于 AI 编程"循环"含义的病毒式辩论。"诚实的说法是：循环既不是新的魔法，也不是单纯的 cron。它是 cron 加上循环体里的一个决策者。而真正有趣的工程，是围绕那个决策者外面包裹的所有东西——确保它不会失控跑偏。"

Matt Van Horn · 9 分钟

## 四、本周精选 PDF

### [如果 LLM 具有人类属性，那么帝国时代 2 也有](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/if-llms-have-human-like-attrib/1309.pdf)

![If LLMs Have Human-Like Attributes, Then So Does Age of Empires II](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/if-llms-have-human-like-attrib/cover_image.png)

微软研究员 Adrian de Wynter 解释了支持 LLM 有意识的论点同样适用于一款策略游戏。"我们在《帝国时代 2》上构建并训练了一个简单的神经网络，并指出任何处于足够强大基底中的实体——比如乐高或大波士顿地区——也能呈现出这些属性。因此，LLM 所谓拟人化属性在经验上并不独特。"

Adrian de Wynter · 58 分钟

## 五、本周精选书籍

### [坚毅](https://readwise.io/reader/fd/465402890)

![Grit](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/grit/cover_image_ttApC7a.jpg)

MacArthur 奖得主、宾夕法尼亚大学心理学家 Angela Duckworth 聚焦于将杰出成就者与其他人区分开来的心态。在《Grit》中，她揭穿了天赋神话，展示了持续的努力才是通往精通的复利。

"天赋 x 努力 = 技能。技能 x 努力 = 成就。没有努力，你的天赋不过是未兑现的潜力。没有努力，你的技能不过是你本可以做到但没有做到的事。"

如果你喜欢这个预览，限时可在美国和加拿大的电子书销售渠道以 2.99 美元购买全本。

Angela Duckworth

## 六、本周精选 RSS

### [当心这个德国人！](https://igerman.cc/)

![beware, the german!](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/beware-the-german/cover_image.jpeg)

German 的博客涵盖了从隐私、LLM 到文化和媒体的一切。他最新的文章爆火，几乎进入了本周前三。来自《多巴胺水力压裂法》：这是一个隐喻——就像真正的水力压裂法一样，它对任何被施加对象的长期健康和可持续性都极其有害，但在短期内可以产生非常强烈和集中的多巴胺（或石油）冲击。

## 七、值得一看的顶尖出版物精彩文章

### 7.1 [为什么 2026 年世界杯有喝水休息时间？FIFA 为何被批评？](https://www.espn.co.uk/football/story/_/id/48945011/why-there-drinks-breaks-2026-world-cup-fifa-criticised)

![Why are there drinks breaks at the 2026 World Cup, and why has FIFA been criticised?](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fbb0d2954-447b-466e-84de-251935cc45da.jpeg)

2026 年世界杯所有 104 场比赛都将暂停两次进行"补水休息"。FIFA 为何规定此举？又为何招致批评？

Tom Chambers | **ESPN UK**

### 7.2 [2026 年上半年最佳歌曲](https://www.rollingstone.com/music/music-lists/best-songs-of-2026-so-far-1235571412/)

![The Best Songs of 2026 So Far](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F45781728-28f2-4b6d-b515-dc9739799f42.jpeg)

2026 年上半年最佳歌曲：Lana Del Rey、Bruce Springsteen、Charli XCX。

Rolling Stone | **Rolling Stone**

### 7.3 [聊天机器人写出一篇获奖小说？这重要吗？](https://clicks.mozilla.org/f/a/_n2oQ4ExhyH1ZXE_3isMfw~~/AAQRxRA~/MwNV0eUyLheQiOlmlDOq3rJXxQ1gmGke41dsbCCS0JHB3hwg6EGTLknc5ewBARYw_2kMd2PG_ko8HzNBPMwu_XLRhESoWzdMoRmHUXgaztEVkA9xUAQ5afVlTLDwm3ZSDs7YUoUu7yg-Q-1mC4wFx3Wc5_T6TfOzHwaartsYUfdt2ytlCTy85FmM3FNA2M-phXHxZZVCvxHCAP4mUpt5q60kYA0qq442LuaxSbGhMQgZAlaEYoIgFU1XdwIpiQCKIKsccH8f94ckGgbf2-Rkyu-AkQ1U_cj7-5r_RMX3kRzEWy2q2lxRDH7YbDCYdQV-N2Hr7vDBSEOld4Nci9gbVD4zCislYgy6_FmEx7WH7pcI1XaSFN62nbi_FcA7pbaRg4bQhiKzsh-MWlZnpA4z2TwpTLDZ0coBkXIfDj7wv5IHNTrAtSYUuR1xyDPnnjVCTgzeLdj1FSs0mMWgxlDF3FopoXqqq83cAcCGKsUTHCtTmbv-6Bg7Z0Zq4VISlKxImW4KdqDQVZTtqC1VqWEtysXhIZrbvxzLSmXGs6Yie0YRte1HA60pmmKKtMksae-t)

![Did a Chatbot Write a Prize-Winning Story? Does It Matter?](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F595ae626-3fb3-4016-8901-940aad01f128.png)

一篇英联邦奖获奖短篇小说似乎是由 AI 生成的。这一事件暴露了文学写作中关于诚实、动机和期望的更大焦虑。

Katy Waldman | **The New Yorker**

### 7.4 [Trump 想把倒影池刷成"美国国旗蓝"——藻类正把它变绿](https://clicks.mozilla.org/f/a/FzO5Bu82gPMTgxkCdd360A~~/AAQRxRA~/Vr-ApbiNiL8dhqF0TDQntU7xpWQGxMGDR35laFfuKi-1kC-rFqgrZZUxS_oF1B7g3LGrqn0kav1SBbudpwtp8cHNpiFpBiNf0LRkqQc4YL1cLr7dzOsSSke_etAn_vhI5aS7vS8sXdpnQ9-qg_Lz-BrEkdBbcBcxQeMBNg7yMoCasoNY3qbUE7fpPsN9QCpIuzAF6WQnOx6gfhCq2PbOaHdDHc7MF_I5r6W-WGR3Oz4g2iOcautEOryiHEyxz2VuJnYzcn83UvH1-qY7hitDJEKDvFdl_ruv8v09wvbJkUNJzhTTqxb1ZHHO1qBWKEspsMcEGGasOgLAEtZFe56leGVwVKBe4A6XQ959-BQOECcmz0HAv5Nyr1NaeNxYRFjqqoTjoOfk4nrGUHuYHynUNWC6Y-MellDeyK0nAmVg4Wz5wq-gct6f1-OJ8sPiZAij9QerFB83yXfKo6ErD1jNzuTv0_110oXIKSpr4CuPf9GFHnPqr0HASYDOwIdSIK2VcYfcKyG2IWeG1L4_iDPs2TfHGzhsx5roAQxBlXNHKGI~)

![Trump wanted the Reflecting Pool to be 'American flag blue.' Algae are turning it green.](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Ff7ac9750-bc64-4f20-9778-2ae33ace5261.jpeg)

负责内衬的承包商告诉 NBC News，最初报价是 1310 万美元，后来增加到 1460 万美元，因为"公园管理局在原始范围内增加了工作。"

Monica Alba | **NBC News**

### 7.5 [现在是租房市场吗？取决于你住在哪里](https://clicks.mozilla.org/f/a/_wbw6EQ3DjLgB7atSZJrKQ~~/AAQRxRA~/lERZemwm2Sp4mMAbsOLwV1r0saeZnN_c3PtqcQaoBsDxkt0ldjmluHxWvDq5qGSz8AabepSLI4DY-DQ2p7glu_6_RLaOmG5PYmda5Zg2FwUeWgW-7VJHnZAdDZR1ht3P0DVMPKdytYMR9jVjBUIS-ShuEGxruME7Q6iUJQTN-do6astUQie81GTlG5CKUld1yZIEbD-0K1FA73lokQjWx1me6tLWRuuujFqXD4Lf0555L_vnX22arU1eX3VlsgJG3A_CAxaoH8xTC_M8ME35nNeZxlpqBTCPYnzs0a9nVHWhyBbyOMyuKl82MaxrqflV77FyBBLr8P11NzVjvmCNnwXTHwIRwlE4UaGgJ37zPysy7gwKMdXUlXR_g8eaYl6jv-ZSTH6lwXFhdNCs9keNTS2xG3QKse42b7eqqkE6j_HmXcaTcjE8ClLf9bVUb0-JgWb88XGaO2tp7JHzTVdMFFGOXb6mxB3pO3JWVlX7OZeRC3-WR5mEeE_Cxsa05ypuNtlLeoGwme09JLnd1-HZ1Q~~)

![Is it a renter's market? It depends on where you live](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fd268d07d-c1a9-4f45-95b3-cade088b8ee9.jpeg)

Zillow 上约 40% 的租房提供入住优惠（比如一个月免费），这是因为建筑热潮在美国部分地区造成了公寓过剩。

Stephan Bisaha | **NPR**

### 7.6 ["我是被影响了，还是这真的是我？"——个人品味如何过时了](https://clicks.mozilla.org/f/a/UB6Jjsg8qOrLMkd_Q-deCQ~~/AAQRxRA~/oB55augvylsEzoKplBZPBgU0VRkUuVCDDugaGPCtJkPjLRq1vEN28XAvuT7TIrCrjMsdgH3a58ozTz3vtPzlIeaa9LqWfKSySWSrNcrLM_en-Dbj2LZeUmhAUPzc8WJhXLBin56dxErRfUbZe5wLZ9rxFXXyUp7nluEu5JEwqngVJznU74U4pbam2Z_QS5fLDME5Y3XZbyLir9auEoRiu9XHUB6KKVeA92m5ionwBpdvca2_TVPdxFx6-q6Q3sOR8hxdiJxZUobaJsZ_VO7e-y2LllpgyKGtaLZB4UP_p5_eVdPzHVutn9oQkg0PFJ9ns15643LNPd6nyH15KmGnMgAmve3tfg2cJlWfuR-uDNgdlcGRZyb3f7MXfwEPCeSjFvctkx0zU2kWcI65ZFMOiyM_XnGRk7x9_V3oI7JNVFbHpGcIFmANTH-gfpJ66XkdKWLtNDagOAU2Tfe9-SUNqal1N254ZibxmkSrtHqwljRIVFP2rjdjRUNWryiFkY8dWxHTvnjeYgTUwJRAyONg-Xsp4fzYotYrJqUfvdPA9_JsaV1r-Y_kQ98ty7wA-AUAAdtJqnSVPWcNU29VB3PPbA~~)

!['Have I been influenced, or is this actually me?' How personal taste fell out of fashion](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F9cc5afa8-d381-45d6-a6bb-e89b0cd32bbe.png)

我们最爱的音乐、衣服和书籍曾经是个性的标志——但算法把我们都变成了羊群。认识一下正在反击的风格叛逆者。

Rachel Aroesti | **The Guardian**

### 7.7 [佛州夫妇在 IVF 诊所胚胎混淆后决定保留非亲生的婴儿](https://clicks.mozilla.org/f/a/aljI-TPpiiUO9wDHo4t4IA~~/AAQRxRA~/wDZLt9QGb9-RWi29361PHhsxFfpldlXDhjMpCvD-yIy1Uu2BMvHHlyt8TR4YqmBLsS5CwPYHPPgUkdp_Oim98GY8FWWMCg2IoOR3LL0oir9jIuvWhCgOzw729ObfLT8soep7exjkP1USlCjROw82axx6sTu6fmBapsp82tfG2NYqgnju1pRhlhKFwagEYWHJExHYg2kVdXz0zWY2Xx_mhVGXmoagmvOoaNtCDk44rKOdlYYJFdiQFqPkNFQWE5qwwOP1W9r_VsrDyX1vz7VHIPavbBlaaCzWpjbc7nU2yVhZ9fQMTM8-djtzNh1tuce_GxD-lHX6ZvLtnDcKlubWMoj_IzZ7dlgHG6Hor36tNGIL2GsNXC6YfWasXXzzTcfP64593TBOgb3w1KwItvjxqiY5B-3oNU6OOKjmgKfdZzulmFxYecnYdAeQlhb768vddAewoq5HEOcNH5Kf1bGKEUu22c4KtLJssY4qani0hd4CueUzCwBW5FILCtWuhYJyPdyAZiZIYIYb504_07RrbDAswAi5MAd8lNkknMyq2Nmwk-Lz8mTFLL753xALlU-nvtlh3EstnnAGyPgzmKHDsw~~)

![Florida couple in IVF clinic's embryo mix-up will keep baby who is not genetically theirs](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fb7e5487a-aead-4c4b-b5f0-83ea9a9e6155.jpeg)

法庭记录显示，Tiffany Score 和 Steven Mills 与小女孩的生物学父母达成了监护权协议。

Elizabeth Chuck | **NBC News**

### 7.8 [这是什么石头？](https://aeon.co/essays/the-strange-rocks-that-wouldnt-exist-without-us)

![What is this rock?](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fe8ddd13e-a75c-41bd-9944-724512fae433.false)

不完全是自然的，也不完全是非自然的——人类世中这些奇怪的新岩石正在拓展地质学的边界。

Richard Fisher | **Aeon**

### 7.9 [22 道非常简单、非常天才的夏季开胃菜](https://food52.com/story/24179-easy-summer-appetizers)

![22 Very Easy, Very Genius Appetizers to Make All Summer](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Ff63029f0-310a-43f8-bb24-6d86466fda2a.jpeg)

这些快速夏季开胃菜几乎不用烹饪，而且全都美味。想想：crostini、最后一分钟酸奶蘸酱等等。

Brinda Ayer & Editors | **Food52**

### 7.10 ["我和鲸鱼对视的那一刻"](https://clicks.mozilla.org/f/a/NCw2tB8koWmjy4mHI6gczQ~~/AAQRxRA~/6cr3yRgeyje6lus-CV3vQUt7NC0BrPht-5gAqY6n2Q79BTQCYA2H0Q_vLYKVorJyIVzVJsA43kIGbswpwZlfEOaZ69DgsYdZc8VNPS6eMGFppRFIj_KosRFjXlsCNzXrwucS8i68aJhSrehSv_4WWKOiZ_pQHtcWxt16dmb2JScpHcPq6cCHF9bgd4vvIFq2xvE2pAtZjFwzJXnPo-9HCePc-nV52qEkexmOrQtC-z1bWNWFfMwEuTvd6Y2y6MpmQIbsrH0PYXfApAXTLHJ7fxwTJjza1N67-nWrmbzmKCa1Yp1WbrqLV8ZGyELXmOr0w241oXxvuU0IENAjF0hrJRZTmQ3vzsh8t1yHaW-dqWB7XJdzp0uZU6o7B9C9VcwlMQDU8p9Fd3n8jX5gaMbloWbSP78YFb1w_UE_QH3JUrrFCZFANjUmHVVeI_RCKDqNrofspesNtgEJScfdJ6Ehr2y3Grj3w7wdSocydA0FWuqHAgNaE_AM_DeMCvQ9FqT8vWMXf9jBUpykreeTXtangg~~)

!['The moment I made eye contact with a whale'](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fcfe46620-334d-408d-9b79-c01f68f982cc.webp)

通过一系列引人注目的照片，Marcia Riederer 捕捉到了神秘的小须鲸的优雅与好奇心。

Isabelle Gerretsen | **BBC**

---
我是**俯仰可拾™**，如果本期对你有启发不妨点赞支持周刊。
