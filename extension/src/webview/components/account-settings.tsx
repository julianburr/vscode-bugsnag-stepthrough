import { useCallback } from "react";
import styled from "styled-components";

import { useSettings } from "../hooks/settings";
import { useBugnsagOrganisation } from "../hooks/bugsnag";
import { confirm } from "../utils/vscode";

import { Checkbox } from "./checkbox";
import { Spacer } from "./spacer";
import { LoadingMessage } from "./loading-message";

import TrashSvg from "assets/icons/vscode/trash.svg";

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

type AccountSettingsProps = {
  token: string;
};

export function AccountSettings({ token }: AccountSettingsProps) {
  const { settings, refresh, update } = useSettings();
  const { loading, organisation } = useBugnsagOrganisation({ token });

  const removeToken = useCallback(async (token) => {
    try {
      const answer = await confirm({
        message:
          `This setting is stored across your workspaces. ` +
          `Do you really want to remove this token?`,
      });

      if (answer !== "Yes") {
        return;
      }

      const newTokens = settings?.global?.tokens
        ? settings.global.tokens.filter((t) => t !== token)
        : [token];
      await update.global?.("tokens", newTokens);
      await refresh?.();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCheckboxChange = useCallback(async (e) => {
    try {
      const projects = settings?.workspace?.projects || [];
      const newProjects = e.target.checked
        ? projects.concat([{ token, id: e.target.name }])
        : projects.filter((p) => p.id !== e.target.name);
      await update.workspace?.("projects", newProjects);
      await refresh?.();
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

  if (!organisation) {
    return <p>Something went wrong!</p>;
  }

  return (
    <Container>
      <Title>
        <span>{organisation.data?.name}</span>
        <button title="Remove account" onClick={() => removeToken(token)}>
          <TrashSvg />
        </button>
      </Title>

      {organisation.projects?.map?.((project) => (
        <div key={project.id}>
          <Checkbox
            label={project.name}
            name={project.id}
            onChange={handleCheckboxChange}
            defaultChecked={
              !!settings?.workspace?.projects?.find((p) => p.id === project.id)
            }
          />
        </div>
      ))}
    </Container>
  );
}
