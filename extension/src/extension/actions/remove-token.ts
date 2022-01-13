import { ActionArgs } from ".";
import { TOKENS_KEY } from "../constants";

export const removeToken = {
  name: "removeToken",
  handler: ({ context, message }: ActionArgs) => {
    const globalTokens = (context.globalState.get(TOKENS_KEY) ||
      []) as string[];

    const newTokens = globalTokens.filter((t) => t !== message.data);
    context.globalState.update(TOKENS_KEY, newTokens);

    return newTokens;
  },
};
