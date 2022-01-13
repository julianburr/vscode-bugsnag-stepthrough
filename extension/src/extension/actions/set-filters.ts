import { ActionArgs } from ".";
import { FILTERS_KEY } from "../constants";

export const setFilters = {
  name: "setFilters",
  handler: ({ context, message }: ActionArgs) => {
    context.workspaceState.update(FILTERS_KEY, message.data);
    return message.data;
  },
};
