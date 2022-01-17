import { sendMessage } from "./send-message";

type GetSettingsResponse = {
  global: { [key: string]: any };
  workspace: { [key: string]: any };
};

export function getSettings() {
  return sendMessage<GetSettingsResponse>("getSettings");
}
