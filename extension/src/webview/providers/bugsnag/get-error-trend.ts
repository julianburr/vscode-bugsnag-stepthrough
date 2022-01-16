import { TrendBucket } from "vscode-bugsnag-stepthrough-components/types/bugsnag";

import { get, RequestArgs } from "./get";

type GetErrorTrendArgs = RequestArgs & {
  projectId: string;
  errorId: string;
};

export async function getErrorTrend({
  token,
  projectId,
  errorId,
  query,
}: GetErrorTrendArgs) {
  const finalQuery = {
    ...query,
    "filters[event.since][][type]": "eq",
    "filters[event.since][][value]": "30d",
    buckets_count: 30,
  };
  const response = await get<TrendBucket[]>(
    `/projects/${projectId}/errors/${errorId}/trend`,
    {
      token,
      query: finalQuery,
    }
  );

  return response;
}
