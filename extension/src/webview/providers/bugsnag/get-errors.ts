import { ErrorDetails } from "vscode-bugsnag-stepthrough-components/types/bugsnag";

import { get, RequestArgs } from "./get";

type GetErrorsArgs = RequestArgs & {
  projectId: string;
  filters?: { sort?: string; since?: string };
};

export async function getErrors({
  token,
  projectId,
  filters,
  query = {},
}: GetErrorsArgs) {
  const finalFilters = {
    "filters[event.since][][type]": "eq",
    "filters[event.since][][value]": filters?.since,

    "filters[error.status][][type]": "eq",
    "filters[error.status][][value]": "open",

    "filters[error.severity][][type]": "eq",
    "filters[error.severity][][value]": "error",
  };

  const finalQuery = {
    ...query,
    ...finalFilters,
    sort: filters?.sort,
  };
  const response = await get<ErrorDetails[]>(`/projects/${projectId}/errors`, {
    token,
    query: finalQuery,
  });

  return response;
}

type GroupedErrors = {
  open: ErrorDetails[];
  skipped: ErrorDetails[];
  fixed: ErrorDetails[];
  _key?: string;
};

type GetGroupedErrorsArgs = {
  projects: { token: string; id: string }[];
  filters?: { sort?: string; since?: string };
  skipped?: string[];
  fixed?: string[];
};

export async function getGroupedErrors({
  projects,
  filters,
  skipped,
  fixed,
}: GetGroupedErrorsArgs) {
  let data: ErrorDetails[] = [];
  for (const project of projects) {
    const projectErrors = await getErrors({
      token: project.token,
      projectId: project.id,
      filters,
    });
    data = data.concat(projectErrors);
  }

  const groupedErrors = data.reduce<GroupedErrors>(
    (all, error) => {
      if (skipped?.includes?.(error.id)) {
        all.skipped.push(error);
      } else if (fixed?.includes?.(error.id)) {
        all.fixed.push(error);
      } else {
        all.open.push(error);
      }
      return all;
    },
    { open: [], skipped: [], fixed: [] }
  );

  return groupedErrors;
}
