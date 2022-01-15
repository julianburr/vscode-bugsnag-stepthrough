import { useCallback, useEffect, useState } from "react";

import { Organisation, Project } from "src/webview/types/bugsnag";
import { getOrganisations, getProjects } from "src/webview/utils/bugsnag";

type OrganisationResponse = {
  data?: Organisation;
  projects?: Project[];
};

type UseBugnsagOrganisationArgs = {
  token?: string;
};

export function useBugnsagOrganisation({ token }: UseBugnsagOrganisationArgs) {
  const [loading, setLoading] = useState(true);
  const [organisation, setOrganisation] = useState<OrganisationResponse>({});

  const loadData = useCallback(async ({ token }) => {
    setLoading(true);
    const organisations = await getOrganisations({ token });
    const projects = await getProjects({
      token,
      orgId: organisations?.[0]?.id,
    });

    setOrganisation({ data: organisations?.[0], projects });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      loadData({ token });
    }
  }, [token]);

  return { loading, organisation };
}
