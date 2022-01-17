import { Project } from "vscode-bugsnag-stepthrough-components/types/bugsnag";

import { get, RequestArgs } from "./get";

type GetProjectsArgs = RequestArgs & {
  orgId: string;
};

export function getProjects({ token, orgId, query }: GetProjectsArgs) {
  return get<Project[]>(`/organizations/${orgId}/projects`, {
    token,
    query,
  });
}
