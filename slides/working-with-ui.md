## Tips and Tricks
### Working with UI

````md magic-move
```shell
❯ nvim ~/.gemini/settings.json
```
```json
{
  "selectedAuthType": "oauth-personal",
  "theme": "Default"
}
```
```json
{
  "mcpServers": {
    "context7": {
      "httpUrl": "https://mcp.context7.com/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  },
  "selectedAuthType": "oauth-personal",
  "theme": "Default",
}
```
```shell
╭───────────────────────────────────────────────────────────────────────────────────╮
│ > Now map the domain data to the UI component, as per the attached screenhsot. @  │
╰───────────────────────────────────────────────────────────────────────────────────╯
✅
╭───────────────────────────────────────────────────────────────────────────────────╮
│ > There is glitch in the UI.                                                      │
╰───────────────────────────────────────────────────────────────────────────────────╯
```
```shell
╭───────────────────────────────────────────────────────────────────────────────────╮
│ > Now map the domain data to the UI component, as per the attached screenhsot. @  │
╰───────────────────────────────────────────────────────────────────────────────────╯
✅
╭───────────────────────────────────────────────────────────────────────────────────╮
│ > There is glitch in the UI.                                                      │
│   Use Playwright MCP to see it.                                                   │
╰───────────────────────────────────────────────────────────────────────────────────╯
```
```shell
╭───────────────────────────────────────────────────────────────────────────────────╮
│ > Now map the domain data to the UI component, as per the attached screenhsot. @  │
╰───────────────────────────────────────────────────────────────────────────────────╯
✅
╭───────────────────────────────────────────────────────────────────────────────────╮
│ > There is glitch in the UI.                                                      │
│   Use Playwright MCP to see it.                                                   │
│   Make sure to run the dev server in the background.                              │
╰───────────────────────────────────────────────────────────────────────────────────╯
```
````
