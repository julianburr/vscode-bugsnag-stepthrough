import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { ErrorDetails } from "../types/bugsnag";

import { Spacer } from "./spacer";
import { useBugsnagEvent } from "../hooks/bugsnag/use-bugsnag-event";
import { LoadingMessage } from "./loading-message";
import { StacktraceList } from "./stacktrace-list";
import { BreadcrumbsList } from "./breadcrumbs-list";
import { ErrorTrend } from "./error-trend";
import { openFile } from "../utils/vscode";

dayjs.extend(relativeTime);

const Label = styled.span`
  font-size: 8px;
  text-transform: uppercase;
  opacity: 0.5;
  margin: 0 0 2px;
`;

const Value = styled.p`
  margin: 0;
  padding: 0;
`;

type ErrorSummaryProps = {
  token: string;
  data: ErrorDetails;
};

export function ErrorSummary({ token, data }: ErrorSummaryProps) {
  const { loading, data: eventData } = useBugsnagEvent({
    token,
    errorId: data?.id,
  });

  const stack = eventData?.exceptions?.[0]?.stacktrace;

  if (loading) {
    return (
      <>
        <Spacer height="10px" />
        <LoadingMessage message="Loading additional event data for this event from bugsnag..." />
      </>
    );
  }

  if (!token) {
    return <p>Something went wrong!</p>;
  }

  return (
    <>
      {stack?.[0]?.file && (
        <>
          <Value>
            The above error occurred in <b>{stack?.[0]?.method}</b> @{" "}
            <a
              href="#"
              onClick={() =>
                openFile({
                  filePath: stack?.[0]?.file,
                  line: stack?.[0]?.line_number,
                  column: stack?.[0]?.column_number,
                })
              }
            >
              {stack?.[0]?.file}:{stack?.[0]?.line_number}:
              {stack?.[0]?.column_number}
            </a>
          </Value>

          {stack?.[0]?.code && (
            <>
              <Spacer height="4px" />
              <pre>{stack?.[0]?.code}</pre>
            </>
          )}
          <Spacer height="12px" />
        </>
      )}

      <Spacer height="6px" />
      <Label>Last seen</Label>
      <Value>
        {dayjs(data?.last_seen_unfiltered).format("D MMM YYYY H:mma")} (
        {dayjs(data?.last_seen_unfiltered).fromNow()})
      </Value>

      <Spacer height="6px" />
      <Label>First seen</Label>
      <Value>
        {dayjs(data?.first_seen_unfiltered).format("D MMM YYYY H:mma")}
      </Value>

      <Spacer height="6px" />
      <Label>Error trend</Label>
      <ErrorTrend projectId={data.project_id} errorId={data.id} token={token} />

      <Spacer height="6px" />
      <Label>Events</Label>
      <Value>{data?.events}</Value>

      <Spacer height="6px" />
      <Label>Users</Label>
      <Value>{data?.users}</Value>

      <Spacer height="6px" />
      <Label>Release Stages</Label>
      <Value>{data?.release_stages?.join?.(",")}</Value>

      <Spacer height="6px" />
      <Label>Stacktrace</Label>
      <StacktraceList items={eventData?.exceptions?.[0]?.stacktrace || []} />

      <Spacer height="6px" />
      <Label>Breadcrumbs</Label>
      <BreadcrumbsList
        items={eventData?.breadcrumbs || []}
        eventTimestamp={eventData?.received_at}
      />

      <Spacer height="20px" />
    </>
  );
}
