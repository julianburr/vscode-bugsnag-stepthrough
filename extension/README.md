# VS Code Bugsnag Extension

Subrepo with the core code of the extension itself.

## Development

### Getting Started

```bash
# Clone the repo
git clone git@github.com:julianburr/vscode-bugsnag-stepthrough.git

# Install dependencies
yarn
cd extension

yarn start  # build dev bundles and watch for file changes
yarn build  # build production bundle
yarn lint  # run eslint
yarn typecheck  # runs tsc
```

### Debugging locally

- start dev mode (or build) for both the webview and the extension
- in VS Code press "F5" and select "VS Code Extension Development", which will open a new window with the extension installed
- after any changes, you'll need to refresh the extension window

## CI/CD

Github Actions run linting and tests on every PR, as well as automatically publish the extension using [`vsce`](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce) whenever any changes to the extension code are pushed to `main`
