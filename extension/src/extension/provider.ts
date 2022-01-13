import { Uri, WebviewView, WebviewViewProvider } from "vscode";

import { createWebview } from "./webview";

type ProviderArgs = {
  id: string;
  context: {
    extensionUri: Uri;
    extensionPath: string;
  };
  entryScript: string;
};

export class Provider implements WebviewViewProvider {
  public id: string;

  protected _context: any;
  protected _entryScript: string;

  private _webviewView?: WebviewView;

  constructor({ id, entryScript, context }: ProviderArgs) {
    this.id = `bugsnagStepthrough.${id}`;
    this._context = context;
    this._entryScript = entryScript;
  }

  public resolveWebviewView(webviewView: WebviewView) {
    this._webviewView = webviewView;
    createWebview(this._webviewView.webview, {
      context: this._context,
      entryScript: this._entryScript,
    });
  }
}
