import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { useVSCode } from "../providers/vscode";
import { useBugsnag } from "../providers/bugsnag";

import { Checkbox } from "../checkbox";
import { Spacer } from "../spacer";
import { LoadingMessage } from "../message/loading";

import TrashSvg from "../../assets/icons/vscode/trash.svg";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: 24px 0 8px 0;
`;

const Title = styled.h2`
  font-size: 13px;
  line-height: 1.2;
  margin: 0 0 3px 0;

  button {
    display: inline-flex;
    vertical-align: middle;
    font: inherit;
    color: inherit;
    border: 0 none;
    background: 0 none;
    margin: 0 0 0 4px;
    padding: 3px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;

    section:hover & {
      opacity: 0.8;
    }

    svg {
      height: 1.1em;
    }
  }
`;

type AccountDetailsProps = {
  token: string;
};

export function AccountDetails({ token }: AccountDetailsProps) {
  const { settings, updateSetting, confirmMessage } = useVSCode();

  const { accounts, loadAccount } = useBugsnag();
  const account = accounts?.find((a) => a.token === token);

  const [loading, setLoading] = useState(!account);
  useEffect(() => {
    if (token) {
      loadAccount?.({ token })
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          // TODO: add error handling
          // https://github.com/julianburr/vscode-bugsnag-stepthrough/issues/5
          console.error(e);
          setLoading(false);
        });
    }
  }, [token]);

  const removeToken = useCallback(async (token) => {
    try {
      const answer = await confirmMessage?.({
        message:
          `This setting is stored across your workspaces. ` +
          `Do you really want to remove this token?`,
      });

      if (answer?.data !== "Yes") {
        return;
      }

      const newTokens = settings?.global?.tokens
        ? settings.global?.tokens?.filter?.((t: string) => t !== token)
        : [];
      await updateSetting?.global?.({ key: "tokens", value: newTokens });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCheckboxChange = useCallback(async (e) => {
    try {
      const projects = settings?.workspace?.projects || [];
      const newProjects = e.target.checked
        ? projects.concat([{ token, id: e.target.name }])
        : projects.filter((p: any) => p.id !== e.target.name);
      await updateSetting?.workspace?.({ key: "projects", value: newProjects });
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (loading) {
    return (
      <>
        <Spacer height="20px" />
        <LoadingMessage message="Loading organisation for token..." />
      </>
    );
  }

  if (!account) {
    return <p>Something went wrong!</p>;
  }

  return (
    <Container>
      <Title>
        <span>{account.data?.name}</span>
        <button title="Remove account" onClick={() => removeToken(token)}>
          <TrashSvg />
        </button>
      </Title>

      {account.projects?.map?.((project) => (
        <div key={project.id}>
          <Checkbox
            label={project.name}
            name={project.id}
            onChange={handleCheckboxChange}
            defaultChecked={
              !!settings?.workspace?.projects?.find(
                (p: any) => p.id === project.id
              )
            }
          />
        </div>
      ))}
    </Container>
  );
}
