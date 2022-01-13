import React, { useCallback } from "react";

import { useSettings } from "../hooks/settings";
import { sendMessage } from "../utils/vscode";

type AccountSettingsProps = {
  token: string;
};

export function AccountSettings({ token }: AccountSettingsProps) {
  const { settings, refresh } = useSettings();

  const removeToken = useCallback(async (token) => {
    try {
      await sendMessage("removeToken", { data: token });
      await refresh?.();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCheckboxChange = useCallback(async (e) => {
    try {
      await sendMessage(e.target.checked ? "addProject" : "removeProject", {
        data: e.target.name,
      });
      await refresh?.();
    } catch (e) {
      console.error(e);
    }
  }, []);

  console.log({ settings });

  return (
    <section>
      <p>
        Token: {token} -{" "}
        <button onClick={() => removeToken(token)}>remove</button>
      </p>
      {[1, 2, 3, 4].map((id) => (
        <div key={id}>
          <label>
            <input
              type="checkbox"
              name={`${token}-project${id}`}
              onChange={handleCheckboxChange}
              defaultChecked={settings?.workspace?.projects?.includes(
                `${token}-project${id}`
              )}
            />{" "}
            Project {id}
          </label>
        </div>
      ))}
    </section>
  );
}
