import { useCallback, useEffect, useState } from "react";

import { TrendBucket } from "src/webview/types/bugsnag";
import { getErrorTrend } from "src/webview/utils/bugsnag";

type UseBugsnagErrorTrendArgs = {
  token: string;
  projectId: string;
  errorId: string;
};

export function useBugsnagErrorTrend({
  token,
  projectId,
  errorId,
}: UseBugsnagErrorTrendArgs) {
  const [loading, setLoading] = useState(true);
  const [trend, setTrend] = useState<TrendBucket[]>();

  const loadData = useCallback(async ({ token, projectId, errorId }) => {
    setLoading(true);
    try {
      const response = await getErrorTrend({ token, projectId, errorId });
      setTrend(response);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData({ token, projectId, errorId });
  }, [token, projectId, errorId]);

  return { loading, trend };
}
