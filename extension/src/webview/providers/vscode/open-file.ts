import { sendMessage } from "./send-message";

type OpenFileArgs = {
  filePath: string;
  line?: number;
  column?: number;
};

export function openFile(data: OpenFileArgs) {
  return sendMessage<boolean>("openFile", { data });
}
