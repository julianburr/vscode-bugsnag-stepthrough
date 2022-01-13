import { ExtensionContext, Webview } from "vscode";

export type ActionArgs = {
  message: { command: string; data: any };
  context: ExtensionContext;
  webview: Webview;
};

export type Action = {
  name: string;
  handler: (args: ActionArgs) => any;
};

const actions: Action[] = [];

export function registerAction(action: Action) {
  actions.push(action);
}

export async function handleMessage({ message, context, webview }: ActionArgs) {
  const action = actions.find((action) => action.name === message.command);

  if (!action) {
    console.warn(`Command "${message.command}" not found!`);
    return;
  }

  const responseData = await action.handler?.({ message, context, webview });
  webview.postMessage({
    command: `${message.command}Response`,
    data: responseData,
  });
}
