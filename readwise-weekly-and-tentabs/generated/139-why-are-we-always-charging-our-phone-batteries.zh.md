# 国外技术周刊 #139：LLM 正在杀死程序员的「懒惰美德」

**欢迎打开本期国外技术周刊**：Anthropic 最强大的模型 Claude Mythos Preview 能自主发现操作系统和浏览器的零日漏洞，因此被雪藏；Bryan Cantrill 警告 LLM 正在侵蚀程序员最珍贵的「懒惰美德」；Ben Thompson 论证超大规模云厂商的竞争已从边际成本转向机会成本。

## 本周观点：LLM 正在杀死程序员的「懒惰美德」

受 Oxide Computer 联合创始人 Bryan Cantrill 一篇博客启发——他提出了一个反直觉的观点：程序员最宝贵的品质之一——「有原则的懒惰」——正在被 LLM 侵蚀。

什么是「有原则的懒惰」？它不是说程序员懒到不干活，而是说程序员因为「懒得以后返工」，所以会花心思写出简洁、可维护、自动化的代码。这种懒惰驱动着一切：写脚本代替手动操作、重构消灭重复代码、设计架构避免未来踩坑。

LLM 的问题在于：它没有这种懒惰。对 LLM 来说，干活没有成本。它不会觉得「这段代码以后会很难维护」，也不会想「这个系统会不会越来越臃肿」。它只会忠实地、毫无怨言地往已有的烂摊子上继续堆垃圾。Cantrill 的原话是：「LLM 天生缺乏懒惰的美德。如果不加约束，LLM 会让系统变得更大，而不是更好。」

这话听起来刺耳，但想想我们最近的代码库：是不是多了很多 LLM 生成的、功能正确但风格迥异的代码片段？是不是开始出现「只要 prompt 能跑就行」的倾向？

利用这点，我们应该把 LLM 当作一个需要「代码审查」的初级工程师，而不是放任它自由发挥。真正的生产力不是来自生成更多代码，而是来自生成更少的、更正确的代码。

### 一、本周最受关注的文章

#### 1.1 [Mythos、Muse 与计算的机会成本](https://stratechery.com/2026/mythos-muse-and-the-opportunity-cost-of-compute/)

![Mythos, Muse, and the Opportunity Cost of Compute](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/mythos-muse-and-the-opportunit/cover_image.jpg)

Stratechery 的 Ben Thompson 论证，消费科技增长由零边际成本驱动的时代正在让位于机会成本驱动的时代。「对超大规模厂商来说，挑战不是边际成本，而是机会成本。多少计算资源该给客户，给哪些客户？多少应该留给内部负载？微软需要在 Azure——既服务企业客户也服务 OpenAI——和它的软件业务之间做平衡；亚马逊需要平衡电商、AWS 以及对 Anthropic 和 OpenAI 的战略投资。谷歌则必须在 GCP、对 Anthropic 的战略投资和消费者业务之间做出取舍。」

Ben Thompson · 12 分钟 | **Stratechery**

#### 1.2 [懒惰丧失的危险](https://bcantrill.dtrace.org/2026/04/12/the-peril-of-laziness-lost/)

![The peril of laziness lost](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/the-peril-of-laziness-lost/cover_image.jpg)

Oxide Computer 联合创始人 Bryan Cantrill 警告，LLM 可能侵蚀程序员最重要的品质之一：有原则的懒惰。「LLM 天生缺乏懒惰的美德。对 LLM 来说，干活没有成本。LLM 不会觉得自己（或任何人）的未来时间需要优化，它会乐此不疲地往垃圾蛋糕上继续堆砌。如果不加约束，LLM 会让系统变得更大，而不是更好。」

Bryan Cantrill · 4 分钟 | **bcantrill.dtrace.org**

#### 1.3 [Sam Altman](https://blog.samaltman.com/2279512/)

![Sam Altman](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/sam-altman/cover_image.jpg)

住所遭纵火袭击后，OpenAI 的 Sam Altman 反思权力与 AGI，同时呼吁就 AI 的未来展开健康的辩论。「在我们辩论的同时，应该降低言论和策略的激烈程度，努力让更少的爆炸发生在更少的家里——无论是字面意义还是比喻意义上。」

samaltman.com · 4 分钟 | **Sam Altman**

### 二、本周最受关注的 YouTube 视频

#### [重启人生的蓝图](https://youtube.com/watch/?v=NNdrePfnVc4)

![The Blueprint to Reset Your Life](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/the-blueprint-to-reset-your-li/cover_image.jpg)

把错误变成改变的蓝图——子弹笔记创始人 Ryder Carroll 分享道：「惩罚不等于问责。实际上，惩罚恰恰是缺乏问责的表现。自我鞭笞让你感觉自己在做点什么，但它改变不了任何东西。你只是在加倍强化一个你其实不想成为的身份。」

Bullet Journal · 6 分钟

### 三、本周最受关注的 Twitter

#### [Thin Harness, Fat Skills](https://x.com/garrytan/status/2042925773300908103/?rw_tt_thread=True)

![Thin Harness, Fat Skills](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/thin-harness-fat-skills/cover_image.jpg)

Y Combinator 总裁 Garry Tan 拆解了从 2x 跃升到 100x AI 生产力背后的架构模式：一套不断进化、永不退化的技能体系。「你写的每一个技能都是系统的永久升级。它永不退化，永不遗忘。凌晨 3 点你在睡觉，它还在跑。当下一个模型发布时，每个技能都会自动变得更强——潜在步骤的判断力提升，而确定性步骤保持绝对可靠。」

Garry Tan · 7 分钟

### 四、本周最受关注的 PDF

#### [系统卡：Claude Mythos Preview](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/system-card-claude-mythos-prev/Claude_Mythos_Preview_System_Card.pdf)

![System Card: Claude Mythos Preview](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/system-card-claude-mythos-prev/cover_image_VgJDHDq.png)

Anthropic 为未发布的 Claude Mythos Preview 出具的系统卡解释了为什么其最强大的模型没有推向市场。「Claude Mythos Preview 在网络能力上展现了惊人的飞跃，包括能够自主发现并利用主流操作系统和浏览器中的零日漏洞。」

Anthropic · 4 小时 29 分钟

### 五、本周精选书籍

#### [《We》](https://readwise.io/reader/fd/445914361)

!["We"](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/we/cover_image.jpg)

Charles Lindbergh 的自传追溯了他从特技飞行表演者到航空传奇的历程，最终以 1927 年驾驶圣路易斯精神号独自横跨大西洋的历史性飞行达到顶峰。在《We》中，Lindbergh 记述了支撑他独自横跨大西洋的自律、耐力和勇气，以第一视角呈现了航空史上最著名的旅程之一。

> 「黑暗大约在 8 点 15 分降临，海面上泛起一层薄雾，白色的冰山在雾中清晰得惊人。我在约 1500 英尺的高度，几乎整整两小时在雾中完全盲飞。」

本书由 Standard Ebooks 提供。

Charles Lindbergh

### 六、本周精选 RSS

#### [between two seas](https://betweentwoseas.substack.com)

![between two seas](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/between-two-seas/cover_image.webp)

进化生物学家 Rebecca Hooper 在苏格兰海岸边写作 between two seas——一个关于科学、生命和惊奇感的 Substack。关于太空中的藤壶：「从微小的幼虫开始，在开阔的海洋中随波逐流，被洋流带去任何地方——藤壶在岩石上爬行，寻找同伴，然后比基本需求所暗示的更紧密地挤在一起，建造它们永久的家。」

### 七、值得一看顶尖出版物精彩文章

#### 7.1 [WHO 宣布埃博拉疫情为全球卫生紧急事件，你需要知道什么](https://clicks.mozilla.org/f/a/0SI4v0HBIimtHZlZZlH6JQ~~/AAQRxRA~/WF0nvhUit4KHu1cUMB-7BHPwkxmZlTRlIabtatUWPsOEBdcyyypp-3EAuC8P4rgJpcDpEf4SmQVZfS0qTYoIpHLFnBbiAfA1wVJoVQxfeEBw7l3T1vwKU_3g_zUYnnAxkHHxN2YZAPXjgboBa4r45WLsPAdUA3CgmLbWAe1BobPnIgTB2JtzqOG1XeTFocJvJjCksEzR2wOkFkv0ta1K-Exy-j1FSf6SBiuU42MGulIoqF-ZQ2qigWx3aIxL6ae5l229shIY7dX7JQzFHajdZh3fjscO6K9M6SZ8OaUKHDMHOhmCLtaBMh1SC0MTFFnGuK-tYW4noi_AS13slaQnlFdhpHC08WInxcHsaf9k5Om9MPeXF6Cd0rpoCcaeXxeSVAzOgeQfmc2s6jgg8O0EoxqpDWpI4Q2Qtc4_W6ykQ7zElbjiZSI7n5jv66S9VhtVHt2tmYM6LlE3FDZ-p9NCAMtAGlJPI4-mCAwzGR3l_J0YpEZvNKOptKMzCjnYsEOuEZ0m9IEetIfsWq4R15sWpg~~)

![What to know about the Ebola outbreak that the WHO has declared a global health emergency](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Ffab264a9-a34e-48b7-a465-f450ab46b159.jpeg)

WHO 宣布刚果和乌干达的埃博拉疫情为国际关注的公共卫生紧急事件。

Chinedu Asadu | **The Associated Press**

#### 7.2 [糟糕透顶的室友](https://clicks.mozilla.org/f/a/qqO26hjDAqHtOX9RwyN5ng~~/AAQRxRA~/iofyrlU_vgWuzesIDeHKPVPzTn5KWnZcrwsssP728dY4wvR8mpD07IPdKDsoPRV9AO6lFD29IldKqUjlw1UkHdBsE1uQRWRA4NPkRsI_TuGB4UbGVLC8reZNseSPwg4UO2P1UwgnUjg9bxe3z4_Pi6IrJyHKWmmCiF8QE5sDkBfzzBXR9zgEC-qqiIfm8F1qeN_OgSS00KeQLaHFWaZRMByQNSgPNJUhYglgoYL79wEiSMIkujju9SecNPdS16wBKIrzjwk1Jv153kTWmIcI6bqNB4G3ah-ddzFOnoyhBpZbic7qMPheY9PIjlkgU4HaivXBDBJFE3hNcSCEHbfd0yH7lZjbfQFSw6Zjkcf8EHKIkSKexnEbOp1yI98m8dV_osN9ETGTWVK0UhLrE48O7Cw_yY8h8MYKl-ZXgQGXdvfUh0qdUwVc2fshEZrUvjbyG1PvufNOLhPysXLksVB6GxfszO5LL6phm7iRlJSNwDDDUVvvbA1Po-Cq84VybQkB2WU49pmKYPU2TH24HHRjsw~~)

![Bad, Bad, Bad, Bad Roommate](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fb952acfc-e01f-4bb5-ad9e-f5ec834d59ac.jpeg)

一个噩梦般的租房处境如何把一个充满同情心的进步派推向家庭监控、驱逐法和报警。

Ian Frisch | **The Verge**

#### 7.3 [为什么治理英国这么难，谁来都一样](https://clicks.mozilla.org/f/a/Wv4PB4UVpslCmrZupJlW8w~~/AAQRxRA~/uXWou5rpKXbkT1CRNVwAEsctl7iElebVeenA8S2pJQJyRfTTStNHMWyc0Qb1RX_4GoT1rEK9-R832D0EFwBZ3L8ZV-kxgLRLohD8nLYpPR0ejnHX7w1roi6LOGACva6P8UenKUAuMeUtj5mot8Z95hEZEkFuGOAUzEQrzdsvXb3m_bCMecJ0MhtTlAeSwAMGm4bDAzmQuD8fmz_5664EDL_TAwH0VTxRFJSW5Z9S_9pnVNS2s3dGV1TLrjXVmwKurFl1fAAW5Yua6LERd_7IFBmNtYnA7qTq8PhnX7yHoVoaYO-rTcfy9h0wrEJlRaIkQBGW_w3Y_ATHH0AOpwXnWIe2VRVm8yIbADVvhO8fEYg980AAjPjxvCNEBxsByUh0BFpbqB__V7fHK8--w2oAG6oNmZ06Hdh8dDuUcORF0AOi7EVpIqK-UZxe-mgiUlpWuQBKEK77e5xNXZa13_AbgxZQvXp7D3wuRhH4JDu7eHLRdsQ19-JhbAxoiryl9Fjw)

![Why running Britain is so hard, no matter who does it](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F58d35413-5c03-4f43-b075-e409dfd89579.png)

过去 10 年，英国换了 6 任首相，没有一个人能扭转局面。祝 Wes、Andy 或 Angela 好运——你们会需要的。

Charlie Cooper | **POLITICO Europe**

#### 7.4 [无 HIV 的一代比你想象的更近](https://clicks.mozilla.org/f/a/LG6JfT8VB7ODikgBrHpqEA~~/AAQRxRA~/zLs0qwC8J_LpiI7PpvofelMrDgQdPzPdq0d8WT9Udzi2sEZwpnUp2-e1B5ipEP3m4olWshflTQMXpxFCjSc7NYl5knwMLOcqbbaAVu2hdZoQXdHOOuKqw5Nfy6-Ahc6wvKg6nWuRLKH-G-qpGIZQydbpc8aVV_3h9bj-iOhMPj5EtDNQ0pROPIAJAlJzXqO3ovPGmHlHIIsTq_U9w9VJ0MO_0gz9oDgwL3SED1r2CmzBoDZy_vmEUJRTboG1Bz9MRxMn9BlzhAhAALnRa6hSslkCZnAwvUVuyfY6-K3XWHfY0j83eNLkIo5-0aqcxfOpb_yekH8azq8EqFmffv0BKutSPMXCtjdnvcfrqipaUv_X97L05yT4FAuCDEymKuF2hxhEuigmM9djet6e2imRfSOlMwflz9ZU4bdBZCmjxiCvQWkv_ykM6-6KvfMDMOkYBC_bWn-LxzmHSPAZvAqRXgrbLwudI4mczO4X9j0K388~)

![An HIV-free generation is closer than you think](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc3f3fb9c-31bc-460e-8e4d-1d9d7f87447e.jpeg)

保护婴儿免受 HIV 感染的努力正在起作用，但它也面临危险。

Sara Herschander | **Vox**

#### 7.5 [「感觉像在做作业」：《星球大战》为何如此失败](https://clicks.mozilla.org/f/a/ONqFCkcX7Y5iw8ucLV1UKA~~/AAQRxRA~/4LI58cN91er2OC5uzRykAT44nok1ggCjBEJm_esrtEogCyDAVNWgaLQKRGLXX-v837YtXvbtarz1hqyK6grsA0AfTQ0wZuTX_0tzHmDmpezQg_bnELkqk33spKeTEIxDLXdpN47h1tsdAlXLOiuTL0OW6syhaPdsvpBxxVqmtpU3j5JXgtM_QrOBhGnBLE9t0-fBb0vk21I6UMYTReUjzn23fHWeKMwr6Q-ZyOoqN8iVTAe8BzzfGPzENy11st9PGM_v38Jqi5pasXreJfT1ygmQ9riWESdCkQdFmqpBKqvAYcs_Lrbi3gGMebFjXnqQlbHC7lyncoTS1NnNXn3dxdQyRWXLLIO9EgdBSCQaVzFRgxkBDRZZ_2AxmdAoh4_y_ZMr4R1pzGj5UvgqDY5vzR8yySIB4-3yv0IrODGLOQRr7CSOZiysDZhJ9wMKr4XaV3WoeKPk9fnSRdUp9dBDA8LLSHUT7Oh1G1VXFEdtSd4~)

![‘It’s felt like homework’: Why Star Wars went so wrong](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Ff0ec863a-addc-4727-bef2-c17b4ea6ba3a.webp)

《曼达洛人与古古》本周上映，预计将创下《星球大战》系列电影史上最低的首周末票房。电视剧集同样表现挣扎，文章分析了观众兴趣减退的原因。

Hanna Flint | **BBC**

#### 7.6 [爱国者队遭遇 NFL 40 年未见的奇葩赛程](https://clicks.mozilla.org/f/a/8ko3Kh-xsayp8YG6_SCObA~~/AAQRxRA~/EUJ_M-Ty8FUE5N1640Hrdw7G7IscXAuPCZRwNsFP1soLoMZjfRHXsh8TI4qHK5UIK35brvgqjVhnBFQeE7wFUKaUi1N0KhdZ0wlNosHnY1vDCMPjGODcQ-8BDpiU_jU6WmalkuMlsE2MQQAAwwbdc2WIIPYggrxXD2C-xHOH8hNVNA6PSJ66KS3g2bDl4Q8EgYFIuK-2CGvjwzWD9HquFJD23j9aUeDWxmjljfS3rjHd84IaSyidjvf2_gZAWsNkmCEVcNAnNNbephhIlwUIpDZElPif7GDBFynCcV1mN6jldznerOE8WCAIwUfdtulQ6H1GgNmmdClUq05KARY_t1ET5MOJCVfE_BOj317uuALB-a-WVXL6ykIMEBAMXUYHrccVes6R0PbkogO6hrw_ury5tiZ6Q5Uc3OHQ9702AR-S5viuIsXGdSqscY6aemAL-5o_tWS3aK57LcyX2_vSkjEvr9EA81jlsPh6fhhVKvE~)

![Patriots hit with bizarre scheduling quirk the NFL hasn't seen in 40 years, plus 21 other schedule oddities](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F93b9964b-79a5-4b93-b850-2a1fd3000027.jpeg)

有些球队收到的赛程安排简直离谱。

John Breech | **CBS Sports**

#### 7.7 [手机电池越来越好，为什么我们总在充电？](https://clicks.mozilla.org/f/a/H2t-nW4B7PhWS4zPEJsUmw~~/AAQRxRA~/ZpJQyydrb-REHVMpeui1Hmvj0x2dN04APA5LWP8v2MCQLRGU3yo1UHFj5cxST0rDXw26VZfJxUeMVi5UILGHOFN1BfWV-zuyE1h6FrXLJU5dp8q6R8z2CoWisQwNKv-ePSXLo-jGS1NWzVZVDy04nkNBKR4NTDCOJS3mqPxbwdpAW7zUiHOt4iub0zBO6DDPY146C6JfvmqMGlyRaGnjhwe5mZvDsP029StCWqEPwPW0B-H449HhHrheKGApLK8L-WtFgvQQ0y-aBXSNSbQIWk66bzMkzWY9NHhXftZJNzQN47BVOGSzSxI1BQ5_6T0vwiurkfZAAiI3Q1TXq2pcXrHZsB7_PjPGKzEOkiganKa6pAAwJthLRsN42VnwEYrrcOafFhq_kWvxHzViP8rq9_XEK6Ez926ADLrW4OAkI28bKJveIe3rp3MPeHt72LYMR_G9jKKDKHa6_hgG39VT5DPNuX-7uycbYNmj5ksmoHSbVdQXLZy6WxkXzb5j-OzAjx5YZ82YJqny5BU2JRUGKw~~)

![Phone Batteries Keep Getting Better. So Why Are We Always Charging?](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fe4769be0-d6cc-4217-b88d-7d80460b715e.jpeg)

手机越来越先进，电池的压力也越来越大。但技术改进和习惯转变或许能缩小这个差距。

Abrar Al-Heeti | **CNET**

#### 7.8 [新研究发现一种精油能有效驱蚊](https://clicks.mozilla.org/f/a/0TXhlPvAcexMBtoRS6-NEg~~/AAQRxRA~/PI1QouXOQymumSRqWloiA1Yc0oII1W4FcjZTy3F3DJ8dpVHRRbJIqbzEMocnnznFE8urq30NLoJFdR3ORO6oAkosD35DEMsXq1wUODjS26W-axA0xYS7TjActKP1bZUNGtVrgNPTArGx7W3kxfljo6TgtpfnjrMBam8jdnCfkbbBLn1rbtLcPtI1FqmY_KEkJl-G2bXpDrr4TIGE2_oWs2fgnsWUWIuZKLjjiv2djSYFV8zvp3N9SyZk-XC0pkb0FgpTD7BeDJL_Km-asF4MEsAe0vT_04we8vjYn_4laIeLHb3UpD89d9xBCIky8-MkXN9nS-dZz_5eptm-eCUdZ-jQ_mtZpqrmUyvaGjNDWJxDToZt2sm0lUbZAvlY_-RKdNijbrhcBA2HWLW9Hl6_QUQRxg-LEHfd4_ZHnh6vPOysU1vEohOcpX2SBg4s_b58s4KM-jc6rQMcFMIfxDX__V93O6Vb50bxA57W_a7bW4PfeVKpUzyaIqlFzqMPDGxI)

![New Study Finds That an Essential Oil Can Effectively Ward Off Mosquitoes. Here’s What to Know.](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fda8e13d5-bd02-4080-813f-aae2bd5b8d91.jpeg)

为了测试驱蚊效果，参与者把手臂伸进满是蚊子的笼子里待了三个小时。皮肤科医生和虫子专家给出建议。

Korin Miller | **Outside**

#### 7.9 [「Bird」如何成为 TikTok 最流行的约会侮辱词](https://clicks.mozilla.org/f/a/H7CypF9VXvcv1QbGyqTeYQ~~/AAQRxRA~/qcM_rTVBxlKkCKTiHi7edYV5Bi51_MOopMMhg662l42AIV7LcZwPCDEf-f152GeQZ4mlwotvvJnFSPJBZpHPSlD8Zk3f8Yl12mabXlDoJ3aHxEtyilJgIGQYOXLhSWBoBnqXdu8xhf-iwaD9W-ANrXqKD8BKXldN-VNe6DUQXOsLuY7ark0zR_ygVhFYvojZnU8smcMCXVMPsDVwwufHvtd25DrycNHSjou2vXS01oZqxpJnL9IcFKa0Du_PgVbuLkJHzl_1bhA5aq8jE1NYtLY0Idn9EUNvQJvyQVGwBxJWAIWfZDYmXzjBBmvOnegulHiyauUL0bXBpaaRXt1tg25EZsNmMMrleVZ6g7RfBVCLDANEFr6zoz-Omu1tHuqARcPeJgccY76Libb1I4df4r-JXTRQpMOfNeopOzzxR0Kx-IwypA1Mz74AZf0gP4zkE_4Dwt7DqVTCJ27D5PHIvw3dqJxtUz7fz_GT1dLSpw-74oBoXdRjKR1yuJB1YJGPGdUzOG-SUuRM5GOOmObHaiJtne5NiPtlKL22CegQHSoeHsPbgLpHlj8mCCqEPoeudICgGC5k6GdWoGf8ydsjOa11d0cDcXRXoylNCCSZP0pyY9xEWiiVzt__eUY1W02m6L5gDDE-dFaCVQH8NZmrtA~~)

![How ‘bird’ became TikTok’s favourite new dating insult](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F45d72c81-e719-4a21-8448-462f734d7ca5.jpeg)

这个词已成为「以男性为中心」的代名词，女性们分享约会恐怖故事，学习在夏天到来之前摆脱自己的「Bird」行为。

Isabel Bekele | **Dazed**

#### 7.10 [黄油还是油？5 位专业糕点师揭秘哪种更适合做蛋糕](https://clicks.mozilla.org/f/a/A7H_VLC88oRgJ0LZRUPcRQ~~/AAQRxRA~/QKMP-PZme5I1gJyD7QDockMTSFmxlDaWmTbL6C3tKqd4U_lXB6WVciW6NE46waSSpbLTkQK4eFgU--zR6pzqyrQgIqvF5GpMnwM-t0mFardH7bbyFcGo9qvMJiE-sS4MTGAOW8DwJSBcZt4bNbve8lgdu0xphENWdpvMm6sEiF3tumc0HC27zl1OSmh3ubhtemR-NzO1G04AAGNsdH2N_cCK5vePg5CgUmtFC1EtdemUl2JNm7CKKrLyprQrujDPXXA0VhEq35XgmklCY5hmnVLsklwYhSEMNh8hF3kZ8fIjCICxg8ZTEVh05SKiZxMlwJ3HA2zYdFsm8HhcRtuLoZB1JeB5La0OmAm1clfC7twsv9o2ejg3ou8Yi2iybrQvar3LMiZa0rnSpONkPfCXToguTn_vNFZ28JnZbJB_5SWtKF0pbdPrmKX1rYI2jefCwq_2FqXEV7tyYaM0gQr1kw~~)

![Butter or Oil? 5 Professional Pastry Chefs Reveal the Best One for Better-Than-Bakery Cakes](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F4c7ff71c-a74f-4dda-a402-a844da03a8c6.jpeg)

争论终于有了答案。

Alexandra Foster | **The Kitchn**
