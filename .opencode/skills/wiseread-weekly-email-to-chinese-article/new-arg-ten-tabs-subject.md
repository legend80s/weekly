/brainstorming 新增参数“`--ten-tabs-subject`: 待搜索的 Ten Tabs 邮件主题 (**required**)”。

目前的逻辑是仅搜索 wisereads 邮件，如果该参数存在需要搜索主题是 `--ten-tabs-subject` 的邮件并转成 markdown 保存在 `readwise-weekly-and-tentabs/generated/<lower-kabab-case-tentabs-subject>.md` 然后将 `readwise-weekly/generated/<vol>.md` 二者合并成 `readwise-weekly-and-tentabs/generated/<vol>-<lower-kabab-case-tentabs-subject>.md`。


将其转成符合格式的 markdown，让测试通过，

1. 如果`readwise-weekly-and-tentabs/generated/<vol>-<lower-kabab-case-tentabs-subject>.md`文件存在则正常退出即可。
2. 

技术要求 1尽量复用已有邮件搜索代码，2且使用邮件搜索单例模式，3为了性能应该并行搜索。有个难点，需要将 ten tabs 搜索后的 HTML 邮件内容转成 markdown。

假设参数：

```sh
bun --env-file .opencode/skills/imap-smtp-email/.env .opencode/skills/wiseread-weekly-email-to-chinese-article/scripts/index.ts --vol=132 --ten-tabs-subject="Why Are We Always Charging Our Phone Batteries?"
```
