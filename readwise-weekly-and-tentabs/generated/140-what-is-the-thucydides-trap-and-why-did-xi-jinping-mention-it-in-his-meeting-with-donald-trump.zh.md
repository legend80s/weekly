# 国外技术周刊 #140：镜像生命的末日警示

**欢迎打开本期国外技术周刊**：一群顶尖科学家在合成「镜像生命」的研究中突然意识到，他们可能正在制造足以终结地球上所有生命的武器，于是反过来紧急叫停。此外，Noah Hawley 参加 Bezos 的私密 Campfire 峰会，洞察亿万富翁世界的认知偏差；The Guardian 解读习近平在与 Trump 会晤中提到的「修昔底德陷阱」为何在全球引发震荡。以下是本期完整内容。

## 本周观点：回退的艺术

Anthropic 的 Thariq Shihipar 分享了一个他在 Claude Code 中的发现，看似微不足道，却指向了与 AI 协作的一个核心元认知技巧：知道何时回退。

多数人的本能反应是这样：AI 犯错后，继续追加指令——「不行，试试 X」或者「基于以上，改成 Y」。每一轮都在前一轮的基础上叠加修正，上下文越来越膨胀，模型也越来越困惑。

Thariq 的做法截然不同：双击 Esc（或运行 /rewind），直接跳回之前的一个干净状态重新开始。比如，Claude 读了五个文件，尝试了一个方法，失败了。你的本能是继续对话；但更好的做法是回退到刚读完文件的那一刻，带着你从失败中学到的信息重新提问。

这个技巧包含一个反直觉的洞见：与 AI 协作时，修正不是加法，而是减法。每一次追加都在降低信号噪声比；每一次回退都是让历史归零，重新出发。

Chatbots 会一路走到黑，Agents 懂得即兴发挥——而真正的高手知道，什么时候该回退。

## 一、本周最多人高亮的文章

### 1.1 [在 Jeff Bezos 的私密 Campfire 峰会上，我学到了关于亿万富翁的事](https://theatlantic.com/magazine/2026/05/billionaire-consequence-free-reality/686588/)

![What I Learned About Billionaires at Jeff Bezos's Private Retreat](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/what-i-learned-about-billionai/cover_image.avif)

《冰血暴》剧集创作人 Noah Hawley 回忆 2018 年参加 Jeff Bezos 的 Campfire 峰会的见闻，窥见精英世界的真实面貌。「坐在讲堂里，拿着铅笔，听一位名厨讲解他的人道主义工作，很容易让人相信世界的问题触手可解。但环顾四周那些只在杂志或屏幕上见过的面孔，我产生了一个不安的顿悟：这就是成就的傲慢。在一件事上被公认为天才，你就开始相信自己无所不能。」

Noah Hawley · 10 分钟 | **The Atlantic**

### 1.2 [关于 Claude Design 的一些想法和感受](https://samhenri.gold/blog/20260418-claude-design/)

![Thoughts and Feelings around Claude Design](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/thoughts-and-feelings-around-c/cover_image.webp)

Claude Design 发布后，Sam Henri Gold 为那些非主流工具发声。在他看来，Figma 是「一套极其僵硬的 schemas，外面套了一层自由散漫的伪装，就像一个 A 型性格的人被强制放松，内心却在尖叫：你的框架没嵌套、token 已脱离、一切都不在网格上！」。而 Claude Design 虽然粗糙，但至少诚实——它「HTML 和 JS，仅此而已」。

Sam Henri Gold · 5 分钟 | **samhenri.gold**

### 1.3 [深入 Notion 内部](https://colossus.com/article/inside-notion/)

![Inside Notion](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/inside-notion/cover_image.png)

Brie Wolfson 和 Camille Ricketts 从内部审视了 Notion 的文化和运营——他们推测这家 pre-AI 软件公司最有可能在新时代持续繁荣。「我们最终找到了一份名为『2026 路线图』的文档，里面并没有我们预期的待发布功能清单。它只写了一句话：要做的事就是不被琐事动摇、对世界观保持信念，同时足够灵活地应对周遭的重大变化。」

Brie Wolfson 和 Camille Ricketts · 32 分钟 | **Colossus**

## 二、本周最多人高亮的 YouTube 视频

### [我是如何创建 OpenClaw 这个突破性 AI 智能体的](https://youtube.com/watch/?v=7rzYDM6vMtI)

![How I Created OpenClaw, the Breakthrough AI Agent](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/how-i-created-openclaw-the-bre/cover_image.jpg)

刚加入 OpenAI 的 OpenClaw 创造者 Peter Steinberger 讲述了他构建这个运行在 Telegram 和 WhatsApp 中的智能体的思考。「那一刻我意识到这是全新的东西。这不是聊天机器人。聊天机器人会放弃，智能体即兴发挥。」

Peter Steinberger | TED · 18 分钟

## 三、本周最多人高亮的 Twitter

### [使用 Claude Code：会话管理与 100 万上下文](https://x.com/trq212/status/2044548257058328723/?rw_tt_thread=True)

![Using Claude Code: Session Management & 1M Context](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/using-claude-code-session-mana/cover_image.webp)

Anthropic 的 Thariq Shihipar 分享了他认为最能体现良好上下文管理的习惯：知道何时回退。「在 Claude Code 中，双击 Esc（或运行 /rewind）可以跳回之前任意消息重新开始……比如，Claude 读了五个文件，尝试了一个方法，没成功。你的本能可能是输入『这不行，试试 X』，但更好的做法是回退到刚读完文件之后的状态，带着你学到的新信息重新提问。」

Thariq · 5 分钟

## 四、本周最多人高亮的 PDF

### [万物的未来都是谎言，我猜](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/the-future-of-everything-is-li/the-future-of-everything-is-lies.pdf)

![The Future Of Everything Is Lies, I Guess](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/the-future-of-everything-is-li/cover_image.webp)

Kyle Kingsbury 对 AI 叙事中的盲区毫不留情。他讲述了一个荒诞经历：「ChatGPT 长篇大论地论证我是异性恋，甚至引用我的博客声称我有女朋友。我当然是彻头彻尾的同性恋，而且那篇文章根本没提女朋友。经过一番争论，我们最终妥协——认定我是双性恋。」

Kyle Kingsbury · 1 小时 39 分钟

## 五、本周精选书籍

### [解码伟大](https://readwise.io/reader/fd/448114944)

![Decoding Greatness](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/decoding-greatness/cover_image.jpg)

Stephen King 通过临摹漫画学会讲故事，Claude Monet 通过研究 Eugène Delacroix 的作品精进画技，就连个人计算机的先驱们也是直接站在彼此的肩膀上。在《Decoding Greatness》中，心理学家 Ron Friedman 用这些故事展示了逆向工程如何驱动成功，Cal Newport 和 Daniel Pink 都推荐了这本书。「Jobs 和 Gates 都从研究同时代人的作品中获得了巨大收益，提取关键洞见，再将所学应用于开发新产品。他们并非个例。计算机的历史不是独立天才的历史，而是探索者相互学习的故事。」

如果你喜欢预览内容，可以在美国和加拿大的任何电子书平台以 2.99 美元购买完整电子书，限时优惠。

Ron Friedman

## 六、本周精选 RSS

### [古典心智](https://andrewbharker.substack.com/)

![The Classical Mind](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/the-classical-mind/cover_image.jpg)

Andrew Harker 的 Substack 是一个以 newsletter 形式呈现的舒适图书馆。这位古典教师书写哲学、慢阅读和心智生活。「知识分子不会把自己关在盒子里，他们明白学习是一种享受，知识在很多方面是相互关联的。我从阅读一本关于木材因含水率膨胀和收缩的家具设计书中获得的乐趣，与花一下午读《指环王》一样多，花时间思考朗费罗的智慧也是如此。」

## 七、还有哪些值得看的国际新闻

### 7.1 [什么是修昔底德陷阱？习近平为何在与特朗普会晤时提到它](https://clicks.mozilla.org/f/a/V96xd3Od8qkDJ-qfA32tag~~/AAQRxRA~/_kEriv5MWIwx8Lexvg-D0qygfK-xBL2BHMEZrY6x1lDwq-wqJOnrF1mMLWiO7si-f9WB1UuhfIKD08e8En2ycN6J5tD8IZPLUebgk2rLtr5MpTH24fUTmjcX4t7F68wCYH1YkwCTgV8t09yvVRFFchGs-ptw9CTrcVjlNZMDMrojLxL6kzzg5XXv0_F3Ov-XfXlnsMLJtk_bUpamrFcQVOA1Kb3d9FX__anniW382_Q3fnM0_lgRkdaOlrTHH-bdY415ouZI_mj0jFbyrDJODzpEZXP-_9JkpqJcCcvVWlA0-eVanG6s1O_KCzFGoISwk_ksidm5iUc1oYSP4KY-7Ezji91ncY-bFvQ-BmWsimY3MeY5kjT_09kkgDTf85Flc2N6QNViJexy-GhCGJPiqxrQBXOex6Bu4ew0jk4Z2b5yGIkosmkSB93Gi18Nr0ay1sNY4hxyE4axKRN6BrFDu6wMGm0ZwX9VS0eQjO0y24O7AOdwbkI7LRoLB1JXMbxpWbsewI33bcUZ2_cJdyPBynRWdE5EdSq-9nlZhpiKctf7yMn-X72gatujQ8GMOh4ndRACXffV6tfCEFcRCq99-mCwU1qehPVlua-FxaUtgM8~)

![What is the Thucydides Trap and why did Xi Jinping mention it in his meeting with Donald Trump?](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fee01ec62-7f77-42bc-8118-abe4458942c1.png)

中国领导人在北京与美国总统会晤时，提及古希腊历史学家修昔底德。The Guardian 解读这一概念及其当代意义。

Staff | **The Guardian**

### 7.2 [Medicaid 削减在即，照顾残疾亲属的家庭面临艰难抉择](https://clicks.mozilla.org/f/a/NSbh2G4eo5SMkg7DO0Tufg~~/AAQRxRA~/oxaHn2akDWTOMvZ8FKThoVG3RHRLLS8J7I1fpb-YurBtsfNYlfoZ07XgRlsFUlh-p8JlViZcuzNgmqndphBxTVyfmlZS56TsDUYCEytumJpGZMrYoZ4zemj_qsR3_ADrul2_UNV_k9RdlOR8_o8MXqWFbVHzLdzQthP2VlptcOar9lLXfbDrEk_stiMQHSXa7J556VvHlKUMjLOH3Mor2K5Jqc7RfgEnkGuVBwXYmm9MZWcovOf0kzv1ZUQiduKoC8pQ0fk_wgr39BH2HgNx76ND7vQA77R4keU-L3BrVwD_Ns3X8d4b6z99HSV5ZJTlyZEOSWlKIuzmraCenSe1PScYHgp97VUW4QUlJ2ROsmAdGcYkvxMYs5h1pGGnzZrmIKEMwhy80ZP-6iV_g7Cb10FruMCDNKSUwWcWSWE2qg3VcLilMFSo0qwH20mcww0IuO6sN73g8yr5lPEJKhmtqwlcVtAkYaVA4P4T_Muirq9MjMQta56ye8VAHrGWr6aqU9Wgc0a4MwlSxyYCljcYcL6KpRgWWdlCsChkAQrivnK2o6UlAXoCIPPVXBJhsUktpzxfREbptH7cf7FfcO4DSg~~)

![Families caring for disabled relatives face unthinkable choices as Medicaid cuts loom](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F0b4124b3-758e-429e-9887-758754126f94.jpeg)

Trump 总统的「大而美的法案」、各州预算动荡以及对带薪家庭护理的新一轮攻击，让人们在努力避免亲人进入养老机构的同时，面临财务崩溃的恐惧。

Mike Hixenbaugh | **NBC News**

### 7.3 [「我们需要锤他们」：一座小城如何将停车执法推向极端](https://clicks.mozilla.org/f/a/xL2Ph5aS9RO3khQFCe3wcQ~~/AAQRxRA~/v61zHJZghHEzJoUHUJpTkSF8dktH-rtfD8p53gxFCIQWrKPu_QwhiKkFFPCdSpl1IcpL6X6DLNFcpQ3wcKg2ZKOnjqsLjkNbYwrLVpPRvxngf6ZAGSkYTCIuu_ZPrBVVFfz7UL7hlWc8MFgJZrZmZrzoGqsf3aAi8WDZm28z30-WljDKl92KkGawkh4hvIhy9eQSnLFfoIbfpRH-9qLsGVmcej-fTA-xpt7r-2yQJljLZY9LczB-TwH7DWstmuofhSG01hGQOPRZ-GoSX4-o2koQlfpQRSswuX4Ukfr3UwBTMOkxAbef4ExTYyZ_E0Of25hVI7t2_MGH6kysUH12c-bCLkam8WZpYYfT8uxs384KefHmyNNVQjw382lrht2cQeVSzLahVsWsBj2Nb3MJi2MvVtvN-6bCm4dKFIHCnZQN-8FjklSRrLG-l--2bMnm_8ZEp5VVZo2YlubHBo1uHmNKrEHTVfZYapPwALSAWLE8MpGUt4ADhme_D9zCYRi2Neayiv2hQDzNxjOudEV4AQ~~)

!['We Need to Hammer Them': How One City Took Parking Enforcement to the Extreme](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F5016c26e-6f36-4feb-ab59-e1a013be1018.jpeg)

Lorain 市当时的警察局长针对停在草坪上的车辆出台了一项计划，最终导致超过 1000 份驾照吊销令。

Mark Puente | **The Marshall Project**

### 7.4 [那个「不可思议」的人物，刚刚颠覆了近年来最疯狂的审判](https://clicks.mozilla.org/f/a/go1afMhHahs7U2I_f4pUaw~~/AAQRxRA~/0Rq3uXTn0QC5nJ8DtOvhbbSBcMBfphMvi-lmwxLj5SA7j2Z1A5Aky8UsNv24eBivPmP9K4UWV67j0oF84nNOfthf8ICbYP9XBt6C9n9dF5zWqQ8wThfnWw1iaecj8Hlfxn-WeGOPWpfQPjmMS4m5gLBiVvDCShmGjXnDhz4q31Pvd1mAMn2DDzsmPhVXlNXWTEcWuIGkshH0D92Y70atdFpNnGRErgG-ApQ3l1og87rUQ44FtgrJEM-EWIESNd1LfhA5y1mg75BjnvNoJz2sFRYNKC2nCRQvnsjwblOo4gHU5jh90a4sCoe_ixdpJ6bvpcj5yinXa2ek-UTVIGXWgieh5kVw_UOr4SZ1MTEAWpC-LUFucCs72zBaknNSPZnktsSMXuao08dm_pdrVav1K1NJjQNUKtI25MkdQeyQsVoVq9fxmYQFa17xRQBMw2OHPL1cP7hpHD1CN377gKuoEXte8GVBLaCMQjdZWCbdhS_qmA75TQi-KUfn5S_U6u7Wf9hBm6MJasDkR8OSKZ07A-)

![The "Unbelievable" Character Who Just Upended the Wildest Trial in Years](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F240ae2e8-9341-407a-8ccb-548c17cde26f.jpeg)

这个事件背后的责任人「令人难以置信。」

Laura Miller | **Slate**

### 7.5 [一年获得四项提名——那位可能创造奥斯卡历史的演员](https://clicks.mozilla.org/f/a/j5z1RJs9R56a3F0DxPd05g~~/AAQRxRA~/n4LP6fH41QlgR3w5IwE2ODS2zNdiVXPmSA9NludKEKmx0R6UYRjZl_UypCj6_op6umDc-rzdM-1jDOdulo9LxA7gqwm1TeLlnZkbjs03IHFH5czhSK7cimUhKNLkpcp8ZV2iigFDTivVdRSSCuSZNkJl1FtGY-TmgjPsVH68AYf6YG7QAddsmgLfo1YusqyQu__w565gz6n6JJtB88C7ibRjOl3rvKK1kXlzATnGrLzmbuCiw-AZkmdZO4jmNup5C7gd21ceHCb_Ht4qAqvFb0cWPCUzmG1kpVvC2WjLEeGtXP_5JkEUSGO44QKbVkMJVyC0-dECjhYg8Fwqs6BXkuir7v6IyM_JA1XUEkzHrMnC3rt0i3dfhPBYX4Z188415_4VwjM5c8ySDt8e76ydMnb6CqKOKjuCCjmxVhVnF7puXB4YozhHnLmefAXE_1a40YTLYsZNqbXVEbkrlpZTYA2fqrLhCuFSw3WcU6i7pL3JSPtGQ6wDjwnk9DeeJmS6xpD8S75O7LRWgSibiGWO7SuhBHvokeDDYlaIJ-K0ghDfYk959OmIUGVAW-VxRRvGNGIZQzv4AeKiCQ8vs1SgMIK4yWCVgav0ASpL4aauN1I~)

![Four nominations in one year - the actress who could make Oscars history](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F6961103a-eb80-4fb2-8749-09be802e4915.jpeg)

Sandra Hüller 凭借《Project Hail Mary》横扫票房，新片《Fatherland》在戛纳获得好评——她可能完成前所未有的壮举。

Nicholas Barber | **BBC**

### 7.6 [在激烈争议中角逐 Eurovision 的 10 首最佳歌曲](https://clicks.mozilla.org/f/a/YOL2ojDLsnhhBqJhDEUaWA~~/AAQRxRA~/zf1gqQndLf4BaLpPLIfx9k49O5ziHEyYRbcc8P5pFyWFjRDa1vcU5pKVlRu7S2djF28t536aGlApzjbohmUGgR4WJG5aPwBvWnCzGVNOLyJ6ISTQa_3ftt9viTnm_ZP-sfdZvTc8gU2CUS67NJXc4fz-B8yhwzvrP2jRbqSdKHIBMWydmo_jhhPmvLI2aN-9Td3f0XpoO3ys3QKKoKbCBQjSuZpGTG2A4wqAfoUgo_BRt6UDPaUf_6gQL1rEg5gkcxqNwdIq1YxsC2nISjQrvGZZMhVC2h1148mb5EXQpmZjsbX47gUJAM5Qe89Z9WC64SXStFNlbYhWBUVFMDFDoL-Twj_G95AQ0FwoG0rBnjL3EXwaxvQcVzgV6f5nk4ihT5URxvwbiZMpXdG0sxjL0R61YgXWPHHrxxefr_YVFRrmydlH5kPLChwUJDzHVxSzL7C3sD5mMoa1_jtkk0bA49AN4E9hBHRRiWvvCSy1yCImqKxBtmg9Jub3tB-rwnn4VKQ4c-c4H7XgxG0rV7lP8Q~~)

![The 10 best songs competing at (a very contentious) Eurovision](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F03d73453-1ffe-431e-955f-0d0ab591055c.jpeg)

维也纳的 Eurovision 舞台上，闪光灯、声乐技巧、现场火焰轮番上演——尽管五个国家因以色列参赛而抵制今年的比赛，演出仍在继续。

Glen Weldon | **NPR**

### 7.7 [末日有机体](https://clicks.mozilla.org/f/a/KZ15FgnGrhVHqUQ8FvYDSw~~/AAQRxRA~/dlU-QFy66uxTqlz8FjXzOVD-eW2bJiHbLTkcHmB8eKd2v16-_e9VoVGbpgWrChjljwPc3vx1UVpEPF2ECaQMDdstpFW5QPVmnTbilajU73ir2UMNnOktN4ZJ_hyzhtnVQm8j1pjXXNkuJDeOp2EAkh5YF9w0OXo4JrUbewr8vRuRGBG0Z21honwKEOTcgDjHpbVpqLS5EaDNsibfwRu5xarGRdamzoWOxmN-gEAlCdTbBFDpJwFaR8RZKW4aPFcqKlNrwi8lJ_5bbIJmOs1q7GYdFSEjp5MQ7BaeHGISPSgXvYxTFsliGDJzFtRaMLpd7AmJclmzPeSWR9U5zCn424096rymJHcAtfqADijI7oevMqIUFfTvVMXLOeSrt3ZP62x849_eBxdtXLI60cqxejRIbwvjs5RTCqcant08IUQ~)

![The Doomsday Organism](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F8c413a36-b6aa-4e20-952f-afdfb1694dd6.png)

从事合成「镜像生命」研究的科学家们逐渐意识到：一旦被创造出来，它可能对地球生命构成存亡威胁。

Joe Zadeh | **Noema Magazine**

### 7.8 [F1 车手和网球高手在心理体操实验室里练什么](https://clicks.mozilla.org/f/a/novBCf3wD-dLOi0qpJvyZA~~/AAQRxRA~/b4NcSJ10Gg9MurvLIvKyie1-VdStdkP5C51yhzK0Olb0C7kqxFEjwUlnOoNpoXCZr1MfO4Tj6kE12wLV5ekKSLlQ4YqIJl61xcLex0iqe8uUVcAZ6_SjHT8I3kLRhufhxYjZiME1YCPH3m_P9zAdAv65GyCGpfvrkzZaiV1ji0g6ON9M2LKcoHyDrr9VlabhuOCWJnkVcMJUMwrTrGbL3h840dezNlHqSVveqTOZa9Bd6rrCBa7DAmN-gpgTxcqRSnv4duiTKAICd62_3LeQn-qRI8y8Nfqt1foiU_HCTSELSH2UffQPBqGgpCpFmEKO8MCPV8gYOPZT9U-DRexj9VcIwqeUMiwbskha5wnq-dTwVvvJJ5WvFu04t7YoBBuoDJFdHTHkAE962n_KUYjtD3rITZNh-qjDf8RAqC5NSc_Hu1zQWcONrABgPz2XGioXk8vqJVEpYdv4vTL7tourLhL0nJq7M3ZtXM8vOky1hDoO6rjrtPytE3f4SdrAoPtRyOGkZEei0pz5CXlRVvOngy6azSuE2FFqj35FWRgHnKYMlRE9l-E_phT5XcsUNOZ-PKh5TKj4swdFHYeOVyKFGg~~)

![What F1 Drivers and Tennis Pros Practice In a Mental Gymnastics Lab](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F907b3ec2-5e99-4618-90eb-f1d8118e0ff0.jpeg)

掌握他们的精神经济学秘诀——在健身房和其他任何地方都能事半功倍。

Nick Pachelli | **Men's Health**

### 7.9 [我问了食品安全专家：保鲜膜和铝箔纸哪个更好？答案让我很惭愧](https://clicks.mozilla.org/f/a/0KMFgnYWA8AZ5cdAfOx6Kg~~/AAQRxRA~/vUtgT2vKbesWCrsY_EOsBE2vCh44EVdF4Ffkn913fRU2e6nVFSHDMHfI_W0hDMxj8zWmt6hKcNYP_vc1cnTwXLSAPdUnp7aK0xrZpS9onSW-4tYvrONbXsYNED66X2MNNkdWB1TkAoUWC3cmBJjmWTmQ97p52rBnpL3fiRz8Tm6eRdt0-M74IIjYKGKmooG9aQMEC4sitUFisvblsMs6U-d_ail-elJBE2zkz07Q7OHFzF8oHWizEBxfF12UCzPDdN0b03lwOmrqdGlN0QeP-ctZZ_AABrZ-WTyemNtDpuguNfgeQ33CK83v6SDYNlE5N03_6fUDQLQzsmlA0x-giUfAwI2PVkJZmsjoj2k1zuiLCPzzDL08LyGdcCTMlHEYkkcJYcxawEpR0Gqfs_s_ZGnT2OEVKhssS9zsK3lyidnc1ZtGP7peQfux32UKduN3NAPywL7CThFcJSvIdJNI6j2V2p8mTi5WEQBrcv-lAlCNgRPjWw_D8-I6QIKIJTGw3NRD2TiiNy4Po1PCt)

![I Asked a Food Safety Expert if It's Better to Use Plastic Wrap or Aluminum Foil and Was Guilty](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc23ae8dc-898d-4a61-a17e-ed2769f19991.jpeg)

答案是：取决于情况。

Celia Funderburk | **The Kitchn**

### 7.10 [本周 36 张照片](https://clicks.mozilla.org/f/a/PbxXDHbgKUlupJg5JWNGNw~~/AAQRxRA~/F9-mNb8YvaZK4yMug_rNazfjr-EOKaIun7XUE_z_BNWcwoL2VZm6n-RIyjefPBIy15-x0-gClDFHic17lhG4S01ysfx41srw1sabTJpJaA4Pc4_Ea1vWs-e7NkqxOjc327qqRDdL7oXMmfHRavI12qAyOkNw3aWdDk0RsEQ69l7_PxwjS6fONp9hIACe-oDhedAlHzxKtNL3mLpXvD4pLF2kkDSXsImngAv1ApW4acmaKyTVkCxQHKFbgxC6ydDj6YYICy8BbpfpxvLVQiafzv7h-ttSobAJJIAJ_oDvBqGXz34Y5YOKHEztZjERIlrPQkcZd7FkWHZ3qqCoLLIZRGqLkHrSXuX_QIC_e8zUDfc5FXXC6-p1TvGX_catffpvJ2DFe9eN_GY6holubKb2jlbcQBiU7yGNSPxlgKcWd192EZNTjDM_KmeuZD0IILMSdFiL5MJYznoUXlqADjG70Vm5KUa1Yg72zBvjN6wea3iVsRhwiaOvceC4tHhMTM0C)

![The week in 36 photos](https://pocket-image-cache.com/600x600/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F4d627863-342b-41b3-ac55-7d6b0290fe7d.jpeg)

看看 5 月 7 日至 5 月 14 日这一周的 36 张照片。

Grace Widyatmadja | **CNN**
