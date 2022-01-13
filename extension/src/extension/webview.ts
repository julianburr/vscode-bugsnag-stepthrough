import { ExtensionContext, Uri, Webview } from "vscode";

import { handleMessage, registerAction } from "./actions";
import { getSettings } from "./actions/get-settings";
import { addToken } from "./actions/add-token";
import { removeToken } from "./actions/remove-token";
import { addProject } from "./actions/add-project";
import { removeProject } from "./actions/remove-project";
import { openFile } from "./actions/open-file";
import { FILTERS_KEY, PROJECTS_KEY, TOKENS_KEY } from "./constants";

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

  context.globalState.update(TOKENS_KEY, []);
  context.workspaceState.update(PROJECTS_KEY, []);
  context.workspaceState.update(FILTERS_KEY, {});

  // Actions for communication between extension and webview
  registerAction(getSettings);
  registerAction(addToken);
  registerAction(removeToken);
  registerAction(addProject);
  registerAction(removeProject);
  registerAction(openFile);

  webview.onDidReceiveMessage((message) => {
    handleMessage({ message, context, webview });
  });

  return webview;
}
