import { useRef } from "react";
import { useForm } from "react-cool-form";
import styled from "styled-components";

import { TitleBar } from "../title-bar";
import { Input } from "../text-input";
import { Button } from "../button/core";
import { Spacer } from "../spacer";
import { Hr } from "../hr";
import { IconButtonLink } from "../button/icon-link";
import { useVSCode } from "../providers/vscode";
import { AccountDetails } from "../account/details";

import ArrowLeftSvg from "../../assets/icons/vscode/arrow-left.svg";

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
  const { settings, updateSetting } = useVSCode();

  const { form, use } = useForm({
    onSubmit: async ({ token }) => {
      try {
        const newTokens = settings?.global?.tokens
          ? settings.global.tokens.concat([token])
          : [token];
        await updateSetting?.global?.({ key: "tokens", value: newTokens });
        addRef.current!.value = "";
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <>
      <TitleBar
        title="Settings"
        actionsLeft={<IconButtonLink to="/" icon={<ArrowLeftSvg />} />}
      />

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
        <Button type="submit" disabled={use("isSubmitting")}>
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
          {settings?.global?.tokens?.map?.((token: string) => (
            <AccountDetails key={token} token={token} />
          ))}
        </>
      )}
    </>
  );
}
