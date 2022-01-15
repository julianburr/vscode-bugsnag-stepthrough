import { window } from "vscode";

import { ActionArgs } from ".";

export const confirm = {
  name: "confirm",
  handler: ({ message }: ActionArgs) => {
    const { message: msg, options = ["Yes", "No"] } = message.data;
    return window.showInformationMessage(msg, ...options);
  },
};
