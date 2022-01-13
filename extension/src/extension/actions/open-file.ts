import * as path from "path";
import { Position, Range, Selection, Uri, window, workspace } from "vscode";
import { ActionArgs } from ".";

export const openFile = {
  name: "openFile",
  handler: ({ message }: ActionArgs) => {
    const pos = new Position(
      message.data?.line || 0,
      message.data?.column || 0
    );

    const filePath = path.resolve(__dirname, "./extension.js");
    var openPath = Uri.file(filePath);

    workspace.openTextDocument(openPath).then((doc) => {
      window.showTextDocument(doc).then((editor) => {
        editor.selections = [new Selection(pos, pos)];
        var range = new Range(pos, pos);
        editor.revealRange(range);
      });
    });
  },
};
