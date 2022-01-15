import { ExtensionContext, window } from "vscode";

import { Provider } from "./provider";

export function activate(context: ExtensionContext) {
  // Stepthrough side bar panel
  const stepthrough = new Provider({
    context,
    entryScript: "index.js",
    id: "webview",
  });

  const stepthroughPanel = window.registerWebviewViewProvider(
    stepthrough.id,
    stepthrough,
    {
      webviewOptions: {
        // This is set to reduce the amount of overhead having to store
        // the current route as well as all already fetched data somehow
        retainContextWhenHidden: true,
      },
    }
  );

  // Add all subscriptions
  context.subscriptions.push(stepthroughPanel);
}

export function deactivate() {
  // Any potential cleanups
}
