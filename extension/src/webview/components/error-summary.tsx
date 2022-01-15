import styled from "styled-components";
import dayjs from "dayjs";

import { ErrorDetails } from "../types/bugsnag";

import { Spacer } from "./spacer";

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
  data: ErrorDetails;
};

export function ErrorSummary({ data }: ErrorSummaryProps) {
  return (
    <>
      <Label>Last seen</Label>
      <Value>
        {dayjs(data?.last_seen_unfiltered).format("DD MMM YYYY H:mma")}
      </Value>

      <Spacer height="6px" />
      <Label>First seen</Label>
      <Value>
        {dayjs(data?.first_seen_unfiltered).format("DD MMM YYYY H:mma")}
      </Value>

      <Spacer height="6px" />
      <Label>Events</Label>
      <Value>{data?.events}</Value>

      <Spacer height="6px" />
      <Label>Users</Label>
      <Value>{data?.users}</Value>

      <Spacer height="6px" />
      <Label>Release Stages</Label>
      <Value>{data?.release_stages?.join?.(",")}</Value>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
