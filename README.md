# VS Code Bugsnag Extension

The extension nobody asked for 😅🚀

Bugsnag Extension for [VS Code](https://code.visualstudio.com/) that allows you to connect to your Bugsnag account (or multiple if you want to), select the relevant projects for your current workspace and see all open issues directly in your IDE. Then simply step through the issues one by one and get rid of them 🥳

## Install

If you have VS Code installed, simply click <a href="vscode:extension/julianburr.vscode-bugsnag-stepthrough" target="_blank">here</a> to open the extension page and click "Install".

Alternatively install as usual:

- press `cmd` + `shift` + `p` in VS Code
- search for `Extensions: Install Extension`
- search the marketplace for "Bugsnag Stepthrough"
- click "Install"

## What does the extension do

It adds another sidebar panel, where you can:

- connect to your Bugsnag accounts (the connected accounts are stored in the global settings)
- select the project or projects that belong to your current workspace
- the extension will fetch all open issues from Bugsnag and show them in the sidebar, allowing you to step throgh them one by one
- if you use sourcemaps in Bugsnag, the extension will automatically open the relevant source file based on the error trace when you step through the issues
- you can mark issues as either "fixed" or "skipped" to move on to the next one, which will mark it acordingly (for you locally, not in Bugsnag!)

See https://vscode-bugsnag-stepthrough.vercel.app for more details.

## Contributing

If you're interested in contributing in any shape or form, please feel free to do so and/or reach out if I can help in any way 😊
