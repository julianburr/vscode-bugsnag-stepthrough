# VS Code Bugsnag Stepthrough Extension - Components

## Why?

This subrepo only exists because I thought it would be neat if I reused the actual plugin on the website instead of taking static screenshots 😅

It contains essentially the whole extension in form of "dumb" React components, the actual functionality is then just added in the `/extensions` subrepo via context providers. This allows using the same components on the website for some extension previews.

I couldn't be bothered to properly set this up tho, so it's just using yarn workspaces to automatically get symlinked into the extension and website subrepos. Those just import the raw TS files, there is no compiling/bundling going on in between.

## Development

```bash
# Clone repo
git clone git@github.com:julianburr/vscode-bugsnag-stepthrough.git
cd vscode-bugsnag-stepthrough

# Install dependencies
yarn
cd components

yarn lint  # run eslint
yarn typecheck  # runs tsc
```
