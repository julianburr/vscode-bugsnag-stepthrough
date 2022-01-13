import { ActionArgs } from ".";
import { TOKENS_KEY } from "../constants";

export const addToken = {
  name: "addToken",
  handler: ({ context, message }: ActionArgs) => {
    const globalTokens = (context.globalState.get(TOKENS_KEY) ||
      []) as string[];

    const newTokens = globalTokens.concat([message.data]);
    context.globalState.update(TOKENS_KEY, newTokens);

    return newTokens;
  },
};
