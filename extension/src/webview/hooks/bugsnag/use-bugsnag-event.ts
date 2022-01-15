import { useCallback, useEffect, useState } from "react";

import { EventDetails } from "src/webview/types/bugsnag";
import { getErrorEvent } from "src/webview/utils/bugsnag";

type UseBugsnagEventArgs = {
  token: string;
  errorId: string;
};

export function useBugsnagEvent({ token, errorId }: UseBugsnagEventArgs) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<EventDetails>();

  const loadData = useCallback(async ({ token, errorId }) => {
    setLoading(true);
    try {
      const response = await getErrorEvent({ token, errorId });
      setData(response);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData({ token, errorId });
  }, [token, errorId]);

  return { loading, data };
}
