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
    stepthrough
  );

  // Add all subscriptions
  context.subscriptions.push(stepthroughPanel);
}

export function deactivate() {
  // Any potential cleanups
}
