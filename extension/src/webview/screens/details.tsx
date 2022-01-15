import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ErrorDetails } from "../types/bugsnag";
import { useSettings } from "../hooks/use-settings";
import { useBugnsagOrganisation } from "../hooks/bugsnag/use-bugsnag-organisation";
import { useBugsnagErrors } from "../hooks/bugsnag/use-bugsnag-errors";
import { Header } from "../components/header";
import { LoadingMessage } from "../components/loading-message";
import { Spacer } from "../components/spacer";
import { Button } from "../components/button";
import { ErrorSummary } from "../components/error-summary";

const Sticky = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 25px;
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
  font-size: 18px;
  font-weight: normal;
  margin: 0;
  padding: 0;

  & b {
    font-weight: bold;
    padding: 0 8px 0 0;
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
  const { settings } = useSettings();

  const listId = settings?.workspace.activeTab || "open";

  const { errors, loading } = useBugsnagErrors({
    projects: settings!.workspace.projects!,
    filters: settings!.workspace.filters!,
  });

  const list: ErrorDetails[] = (errors as any)[listId];
  const index = list.findIndex((e) => e.id === id);
  const nextIndex = index + 1 >= list.length ? 0 : index + 1;

  const data = list[index];
  const nextData = nextIndex !== index ? list[nextIndex] : undefined;

  const token = settings?.workspace?.projects?.find?.(
    (p) => p.id === data?.project_id
  )?.token;

  const { organisation } = useBugnsagOrganisation({ token });
  const project = organisation.projects?.find?.(
    (p) => p.id === data?.project_id
  );

  const externalLink = project?.html_url
    ? `${project.html_url}/errors/${data.id}`
    : undefined;

  if (loading) {
    return (
      <>
        <Header
          backTo="/"
          title="Error details"
          externalLink={externalLink}
          externalTitle="Open in Bugsnag"
        />
        <LoadingMessage message="Loading error details from bugsnag..." />
      </>
    );
  }

  return (
    <>
      <Header
        backTo="/"
        title="Error details"
        externalLink={externalLink}
        externalTitle="Open in Bugsnag"
      />

      <Sticky>
        <Spacer height="6px" />
        <Label>
          {list.length} {TITLES[listId as keyof typeof TITLES] || "items"} left
        </Label>

        <Spacer height="2px" />
        <WrapActions>
          {data?._status !== "skipped" && (
            <Button
              secondary
              onClick={async () => {
                await data._skip();
                navigate(nextData?.id ? `/details/${nextData?.id}` : "/");
              }}
            >
              Skip
            </Button>
          )}

          {data?._status !== "open" && (
            <Button
              secondary
              onClick={async () => {
                await data._open();
                navigate(nextData?.id ? `/details/${nextData?.id}` : "/");
              }}
            >
              Open
            </Button>
          )}

          {data?._status !== "fixed" && (
            <Button
              onClick={async () => {
                await data._fix();
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
