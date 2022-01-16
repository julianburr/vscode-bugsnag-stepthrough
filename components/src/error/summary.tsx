import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { ErrorDetails } from "../../types/bugsnag";
import { Spacer } from "../spacer";
import { LoadingMessage } from "../message/loading";
import { StacktraceList } from "../list/stacktrace";
import { BreadcrumbsList } from "../list/breadcrumbs";
import { ErrorTrend } from "../error/trend";
import { Value } from "../value";
import { Label } from "../label";
import { useVSCode } from "../providers/vscode";
import { useBugsnag } from "../providers/bugsnag";

dayjs.extend(relativeTime);

type ErrorSummaryProps = {
  token: string;
  data?: ErrorDetails;
};

export function ErrorSummary({ token, data }: ErrorSummaryProps) {
  const { openFile } = useVSCode();

  const { events, loadEvent } = useBugsnag();

  const eventData = data ? events?.[data.id] : undefined;
  const [loading, setLoading] = useState(!eventData);

  const stack = eventData?.exceptions?.[0]?.stacktrace;

  useEffect(() => {
    if (data?.id) {
      loadEvent?.({ token, projectId: data.project_id, errorId: data.id })
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          // TODO: add error handling
          // https://github.com/julianburr/vscode-bugsnag-stepthrough/issues/5
          console.log(e);
          setLoading(false);
        });
    }
  }, [data?.id]);

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
                openFile?.({
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
          <Spacer height="16px" />
        </>
      )}

      <Spacer height="10px" />
      <Label>Last seen</Label>
      <Value>
        {dayjs(data?.last_seen_unfiltered).format("D MMM YYYY H:mma")} (
        {dayjs(data?.last_seen_unfiltered).fromNow()})
      </Value>

      <Spacer height="10px" />
      <Label>First seen</Label>
      <Value>
        {dayjs(data?.first_seen_unfiltered).format("D MMM YYYY H:mma")}
      </Value>

      <Spacer height="10px" />
      <Label>Error trend</Label>
      <ErrorTrend
        projectId={data?.project_id}
        errorId={data?.id}
        token={token}
      />

      <Spacer height="10px" />
      <Label>Events</Label>
      <Value>{data?.events}</Value>

      <Spacer height="10px" />
      <Label>Users</Label>
      <Value>{data?.users}</Value>

      <Spacer height="10px" />
      <Label>Release Stages</Label>
      <Value>{data?.release_stages?.join?.(",")}</Value>

      <Spacer height="10px" />
      <Label>Stacktrace</Label>
      <StacktraceList items={eventData?.exceptions?.[0]?.stacktrace || []} />

      <Spacer height="10px" />
      <Label>Breadcrumbs</Label>
      <BreadcrumbsList
        items={eventData?.breadcrumbs || []}
        eventTimestamp={eventData?.received_at}
      />

      <Spacer height="20px" />
    </>
  );
}
