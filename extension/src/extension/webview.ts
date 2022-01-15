import { ExtensionContext, Uri, Webview } from "vscode";

import { handleMessage, registerAction } from "./actions";
import { confirm } from "./actions/confirm";
import { getSettings } from "./actions/get-settings";
import { openFile } from "./actions/open-file";
import { updateSetting } from "./actions/update-setting";

type CreateWebviewOptions = {
  entryScript: string;
  context: ExtensionContext;
};

export function createWebview(
  webview: Webview,
  { entryScript, context }: CreateWebviewOptions
): Webview {
  webview.options = {
    enableScripts: true,
    localResourceRoots: [context.extensionUri],
  };

  const scriptUri = webview.asWebviewUri(
    // Not sure why TS complains about `.joinPath` not existing here :/
    // eslint-disable-next-line
    // @ts-ignore
    Uri.joinPath(context.extensionUri, "out", "webview", entryScript)
  );

  webview.html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bugsnag Stepthrough</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="${scriptUri}"></script>
      </body>
    </html>
  `;

  // Actions for communication between extension and webview
  registerAction(getSettings);
  registerAction(updateSetting);
  registerAction(openFile);
  registerAction(confirm);

  webview.onDidReceiveMessage((message) => {
    handleMessage({ message, context, webview });
  });

  return webview;
}
