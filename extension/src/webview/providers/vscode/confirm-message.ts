import { sendMessage } from "./send-message";

type ConfirmMessageArgs = {
  message: string;
  options?: string[];
};

export function confirmMessage(data: ConfirmMessageArgs) {
  return sendMessage<string>("confirm", { data });
}
