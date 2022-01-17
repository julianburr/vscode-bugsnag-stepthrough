import { Organisation } from "vscode-bugsnag-stepthrough-components/types/bugsnag";

import { get, RequestArgs } from "./get";

export function getOrganisations({ token, query = {} }: RequestArgs) {
  return get<Organisation[]>("/user/organizations", {
    token,
    query,
  });
}
