import React, { useCallback } from "react";
import { useForm } from "react-cool-form";
import { Link } from "react-router-dom";
import { AccountSettings } from "../components/account-settings";

import { useSettings } from "../hooks/settings";
import { sendMessage } from "../utils/vscode";

export function SettingsScreen() {
  const { settings, refresh } = useSettings();
  console.log({ settings });

  const { form, use } = useForm({
    onSubmit: async ({ token }) => {
      try {
        await sendMessage("addToken", { data: token });
        await refresh?.();
      } catch (e) {
        console.error(e);
      }
    },
  });

  const isSubmitting = use("isSubmitting");

  return (
    <>
      <h1>Settings</h1>
      <Link to="/">Close</Link>

      {settings?.global?.tokens?.length! ? (
        <p>
          Select the projects below that you want to associate with the current
          workspace.
        </p>
      ) : (
        <p>
          You haven't added any access token yet. Please enter one below to get
          started.
        </p>
      )}

      {settings?.global?.tokens?.map?.((token) => (
        <AccountSettings key={token} token={token} />
      ))}

      <form ref={form}>
        <input type="text" name="token" />
        <button type="submit" disabled={isSubmitting}>
          Add new token
        </button>
      </form>
    </>
  );
}
