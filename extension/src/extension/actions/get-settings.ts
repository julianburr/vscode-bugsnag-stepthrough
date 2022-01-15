import { ActionArgs } from ".";
import { PREFIX } from "../constants";

export const getSettings = {
  name: "getSettings",
  handler: ({ context }: ActionArgs) => {
    const { globalState, workspaceState } = context;
    console.log({ keys: globalState.keys() });

    // Get all global settings
    const global = globalState.keys().reduce<any>((all, key) => {
      if (key.startsWith(PREFIX)) {
        all[key.replace(`${PREFIX}/`, "")] = globalState.get(key);
      }
      return all;
    }, {});

    // Get all workspace settings
    const workspace = workspaceState.keys().reduce<any>((all, key) => {
      if (key.startsWith(PREFIX)) {
        all[key.replace(`${PREFIX}/`, "")] = workspaceState.get(key);
      }
      return all;
    }, {});

    return { global, workspace };
  },
};
