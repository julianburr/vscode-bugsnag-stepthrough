import { EventDetails } from "vscode-bugsnag-stepthrough-components/types/bugsnag";

import { get, RequestArgs } from "./get";

type GetEventArgs = RequestArgs & {
  errorId: string;
};

export function getEvent({ token, errorId, query }: GetEventArgs) {
  return get<EventDetails>(`/errors/${errorId}/latest_event`, {
    token,
    query,
  });
}
