import * as path from "path";
import * as fs from "fs";
import { Position, Range, Selection, Uri, window, workspace } from "vscode";
import { ActionArgs } from ".";

export const openFile = {
  name: "openFile",
  handler: ({ message }: ActionArgs) => {
    const pos = new Position(
      message.data?.line || 0,
      message.data?.column || 0
    );

    const workspacePath = workspace.workspaceFolders?.[0]?.uri?.path;
    const cleanPath = message.data.filePath.replace("webpack-internal:///", "");
    const filePath = workspacePath
      ? path.resolve(workspacePath, cleanPath)
      : undefined;

    if (!filePath || !fs.existsSync(filePath)) {
      throw new Error(
        `File at "${cleanPath}" not found in workspace ("${workspacePath}")`
      );
    }

    const openPath = Uri.file(filePath);

    workspace.openTextDocument(openPath).then((doc) => {
      window.showTextDocument(doc).then((editor) => {
        editor.selections = [new Selection(pos, pos)];
        const range = new Range(pos, pos);
        editor.revealRange(range);
      });
    });
  },
};
