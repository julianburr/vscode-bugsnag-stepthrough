import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ErrorDetails, Project } from "../../types/bugsnag";

import { TitleBar } from "../title-bar";
import { LoadingMessage } from "../message/loading";
import { Spacer } from "../spacer";
import { Button } from "../button/core";
import { ErrorSummary } from "../error/summary";
import { IconButtonLink } from "../button/icon-link";
import { useVSCode } from "../providers/vscode";
import { useBugsnag } from "../providers/bugsnag";

import ArrowLeftSvg from "../../assets/icons/vscode/arrow-left.svg";
import ExternalSvg from "../../assets/icons/vscode/link-external.svg";

const Sticky = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 27px;
  margin: 0 -20px;
  padding: 0 20px 10px;
  background: var(--vscode-sideBar-background);
  z-index: 20;
`;

const Label = styled.span`
  font-size: 8px;
  text-transform: uppercase;
  opacity: 0.5;
  margin: 0 0 2px;
`;

const Title = styled.h1`
  && {
    font-size: 18px;
    font-weight: normal;
    margin: 0;
    padding: 0;

    & b {
      font-weight: bold;
      padding: 0 8px 0 0;
    }
  }
`;

const Message = styled.p`
  font-size: 16px;
  opacity: 0.7;
  margin: 4px 0;
  padding: 0;
`;

const WrapActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`;

const TITLES = {
  open: "open errors",
  skipped: "skipped errors",
  fixed: "fixed errors",
};

export function DetailsScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { settings, updateSetting } = useVSCode();
  const { errors, loadErrors, accounts } = useBugsnag();

  const listId = settings?.workspace?.activeTab || "open";
  const list: ErrorDetails[] = (errors as any)[listId];
  const index = list?.findIndex((e) => e.id === id);
  const nextIndex = index + 1 >= list?.length ? 0 : index + 1;

  const data = list?.[index];
  const nextData = nextIndex !== index ? list?.[nextIndex] : undefined;

  const [loading, setLoading] = useState(!data);
  useEffect(() => {
    loadErrors?.({
      projects: settings?.workspace?.projects || [],
      filters: settings?.workspace?.filters,
      skipped: settings?.workspace?.skippedErrors,
      fixed: settings?.workspace?.fixedErrors,
    })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        // TODO: add error handling
        // https://github.com/julianburr/vscode-bugsnag-stepthrough/issues/5
        console.error(e);
        setLoading(false);
      });
  }, [
    JSON.stringify(settings?.workspace?.projects),
    JSON.stringify(settings?.workspace?.filters),
    JSON.stringify(settings?.workspace?.skippedErrors),
    JSON.stringify(settings?.workspace?.fixedErrors),
  ]);

  const token = settings?.workspace?.projects?.find?.(
    (p: any) => p.id === data?.project_id
  )?.token;

  // NOTE: we could load accounts here as well if they haven't been loaded yet
  // which probably makes sense, since right now we only load them on the
  // settings screen :/
  const project = accounts
    ?.reduce<Project[]>((all, account) => {
      all = all.concat(account.projects);
      return all;
    }, [])
    .find((project) => project.id === data?.project_id);

  const externalLink =
    data && project?.html_url
      ? `${project.html_url}/errors/${data?.id}`
      : undefined;

  const titleBar = (
    <TitleBar
      title="Error details"
      actionsLeft={<IconButtonLink to="/" icon={<ArrowLeftSvg />} />}
      actionsRight={
        externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noreferrer nofollow"
            title={"Open in Bugsnag"}
          >
            <ExternalSvg />
          </a>
        )
      }
    />
  );

  const status = settings?.workspace?.skippedErrors?.includes?.(data?.id)
    ? "skipped"
    : settings?.workspace?.fixedErrors?.includes?.(data?.id)
    ? "fixed"
    : "open";

  async function open() {
    await updateSetting?.workspace?.({
      key: "skippedErrors",
      value: (settings?.workspace?.skippedErrors || []).filter(
        (id: string) => id !== data?.id
      ),
    });
    await updateSetting?.workspace?.({
      key: "fixedErrors",
      value: (settings?.workspace?.fixedErrors || []).filter(
        (id: string) => id !== data?.id
      ),
    });
  }

  async function skip() {
    await open();
    await updateSetting?.workspace?.({
      key: "skippedErrors",
      value: [...(settings?.workspace?.skippedErrors || []), data?.id],
    });
  }

  async function fix() {
    await open();
    await updateSetting?.workspace?.({
      key: "fixedErrors",
      value: [...(settings?.workspace?.fixedErrors || []), data?.id],
    });
  }

  if (loading) {
    return (
      <>
        {titleBar}
        <LoadingMessage message="Loading error details from bugsnag..." />
      </>
    );
  }

  return (
    <>
      {titleBar}

      <Sticky>
        <Spacer height="6px" />
        <Label>
          {list.length} {TITLES[listId as keyof typeof TITLES] || "items"} left
        </Label>

        <Spacer height="2px" />
        <WrapActions>
          {status !== "skipped" && (
            <Button
              secondary
              onClick={async () => {
                await skip();
                navigate(nextData?.id ? `/details/${nextData?.id}` : "/");
              }}
            >
              Skip
            </Button>
          )}

          {status !== "open" && (
            <Button
              secondary
              onClick={async () => {
                await open();
                navigate(nextData?.id ? `/details/${nextData?.id}` : "/");
              }}
            >
              Open
            </Button>
          )}

          {status !== "fixed" && (
            <Button
              onClick={async () => {
                await fix();
                navigate(nextData?.id ? `/details/${nextData?.id}` : "/");
              }}
            >
              Fixed
            </Button>
          )}
        </WrapActions>
      </Sticky>

      <Spacer height="10px" />
      <Title>
        <b>{data?.error_class}</b>
        <span>{data?.context}</span>
      </Title>

      <Spacer height="3px" />
      <Message>{data?.message}</Message>

      <Spacer height="18px" />
      <ErrorSummary token={token!} data={data} />
    </>
  );
}
