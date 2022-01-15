import { ActionArgs } from ".";
import { PREFIX } from "../constants";

export const updateSetting = {
  name: "updateSetting",
  handler: ({ context, message }: ActionArgs) => {
    const { globalState, workspaceState } = context;

    const { type, key, value } = message.data;
    if (type === "global") {
      globalState.update(`${PREFIX}/${key}`, value);
    } else {
      workspaceState.update(`${PREFIX}/${key}`, value);
    }
  },
};
