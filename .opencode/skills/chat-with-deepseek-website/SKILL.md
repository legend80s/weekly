---
name: chat-with-deepseek-website
description: 通过 DeepSeek 网站使用 DeepSeek。
metadata: markdown, chinese, article
---

# Use DeepSeek Website to chat

使用 DeepSeek 网站和 AI 聊天。

因为 DeepSeek 网站的回复质量是所有 AI 中最好，比如它的英译中质量。

## How to use

1. 使用 Chrome Devtools MCP（如果没有请按照到本项目）打开网站 https://chat.deepseek.com/，点击『New chat』按钮。
2. 输入框输入 {用户问题}，点击确认发送按钮

3. 等待 AI 完成回复：应当轮询（轮询固定间隔 `3s`）发送按钮的状态，当变成 disabled 说明完成。因为按钮状态扭转是 `disable -> enabled(输入内容) -> 回复中 -> disabled（回复完成）`）。不要用 chrome-devtools_wait_for timeout 因为很不严谨。

4. 必须等回复完成，告诉我**完整**的回复。
