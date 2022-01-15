import { useCallback, useEffect, useMemo, useState } from "react";

import { ErrorDetails, Organisation, Project } from "../types/bugsnag";
import { getErrors, getOrganisations, getProjects } from "../utils/bugsnag";

import { useSettings } from "./settings";

type OrganisationResponse = {
  data?: Organisation;
  projects?: Project[];
};

type UseBugnsagOrganisationArgs = {
  token: string;
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
    loadData({ token });
  }, [token]);

  return { loading, organisation };
}

type GroupedErrors = {
  open: ErrorDetails[];
  skipped: ErrorDetails[];
  resolved: ErrorDetails[];
};

type ProjectSetting = {
  token: string;
  id: string;
};

type UseBugsnagErrorsArgs = {
  projects: ProjectSetting[];
  filters: {
    since?: string;
    sort?: string;
  };
};

export function useBugsnagErrors({ projects, filters }: UseBugsnagErrorsArgs) {
  const { settings, update } = useSettings();

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<ErrorDetails[]>([]);

  const loadErrors = useCallback(
    async ({ projects, filters }) => {
      setLoading(true);
      try {
        let result: ErrorDetails[] = [];
        for (const project of projects) {
          const projectErrors = await getErrors({
            token: project.token,
            projectId: project.id,
            filters,
          });
          result = result.concat(projectErrors);
        }

        setErrors(result);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    },
    [projects, filters]
  );

  const skipped = settings?.workspace.skippedErrors || [];
  const resolved = settings?.workspace.resolvedErrors || [];
  const groupedErrors = useMemo(() => {
    return errors.reduce<GroupedErrors>(
      (all, error) => {
        const enhancedError = { ...error };
        enhancedError._status = "skipped";

        enhancedError._open = async () => {
          await update.workspace?.(
            "skippedErrors",
            skipped.filter((id) => error.id !== id)
          );
          await update.workspace?.(
            "resolvedErrors",
            resolved.filter((id) => error.id !== id)
          );
        };

        enhancedError._resolve = async () => {
          await update.workspace?.(
            "resolvedErrors",
            resolved.concat([error.id])
          );
        };

        enhancedError._skip = async () => {
          console.log({ skipped, error });
          await update.workspace?.("skippedErrors", skipped.concat([error.id]));
        };

        if (skipped?.includes(error.id)) {
          enhancedError._status = "skipped";
          all.skipped.push(enhancedError);
        } else if (resolved?.includes(error.id)) {
          enhancedError._status = "resolved";
          all.resolved.push(enhancedError);
        } else {
          enhancedError._status = "open";
          all.open.push(enhancedError);
        }
        return all;
      },
      { open: [], skipped: [], resolved: [] }
    );
  }, [skipped, resolved, errors]);

  useEffect(() => {
    loadErrors({ projects, filters });
  }, [filters, projects]);

  return { loading, errors: groupedErrors };
}
