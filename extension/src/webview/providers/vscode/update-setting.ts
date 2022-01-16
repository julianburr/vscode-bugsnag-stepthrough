import { sendMessage } from "./send-message";

type UpdateSettingArgs = {
  type: "global" | "workspace";
  key: string;
  value: any;
};

export function updateSetting({ type, key, value }: UpdateSettingArgs) {
  return sendMessage("updateSetting", { data: { type, key, value } });
}
