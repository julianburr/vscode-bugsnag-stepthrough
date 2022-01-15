import { useRef } from "react";
import { useForm } from "react-cool-form";
import styled from "styled-components";

import { useSettings } from "../hooks/settings";
import { AccountSettings } from "../components/account-settings";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { Spacer } from "../components/spacer";
import { Hr } from "../components/hr";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
  }

  button {
    flex-shrink: 0;
    margin: 0 0 0 4px;
  }
`;

export function SettingsScreen() {
  const addRef = useRef<HTMLInputElement>();
  const { settings, refresh, update } = useSettings();

  const { form, use } = useForm({
    onSubmit: async ({ token }) => {
      try {
        const newTokens = settings?.global?.tokens
          ? settings.global.tokens.concat([token])
          : [token];
        await update.global?.("tokens", newTokens);
        addRef.current!.value = "";
      } catch (e) {
        console.error(e);
      }
    },
  });

  const isSubmitting = use("isSubmitting");

  return (
    <>
      <Header backTo="/" title="Settings" />

      <p>
        Enter{" "}
        <a
          href="https://app.bugsnag.com/settings/my-account"
          target="_blank"
          rel="noreferrer nofollow"
        >
          your bugsnag auth token
        </a>{" "}
        below to add {settings?.global?.tokens?.length ? "another" : "an"}{" "}
        account to your profile.
      </p>

      <Form ref={form}>
        <Input
          type="password"
          name="token"
          placeholder="Enter bugsnag token"
          ref={addRef as any}
        />
        <Button type="submit" disabled={isSubmitting}>
          Add
        </Button>
      </Form>

      {settings?.global?.tokens && settings.global.tokens.length > 0 && (
        <>
          <Spacer height="20px" />
          <Hr />
          <Spacer height="16px" />
          <p>
            Select the projects below that you want to associate with the
            current workspace.
          </p>
          {settings?.global?.tokens?.map?.((token) => (
            <AccountSettings key={token} token={token} />
          ))}
        </>
      )}
    </>
  );
}
