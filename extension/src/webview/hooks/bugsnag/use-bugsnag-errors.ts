import { useCallback, useEffect, useMemo, useState } from "react";

import { ErrorDetails } from "src/webview/types/bugsnag";
import { getErrors } from "src/webview/utils/bugsnag";

import { useSettings } from "../use-settings";

type GroupedErrors = {
  open: ErrorDetails[];
  skipped: ErrorDetails[];
  fixed: ErrorDetails[];
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
  const fixed = settings?.workspace.fixedErrors || [];
  const groupedErrors = useMemo(() => {
    return errors.reduce<GroupedErrors>(
      (all, error) => {
        const enhancedError = { ...error };
        enhancedError._status = "skipped";

        async function clean() {
          await update.workspace?.(
            "skippedErrors",
            skipped.filter((id) => error.id !== id)
          );
          await update.workspace?.(
            "fixedErrors",
            fixed.filter((id) => error.id !== id)
          );
        }

        enhancedError._open = async () => {
          await clean();
        };

        enhancedError._fix = async () => {
          await clean();
          await update.workspace?.("fixedErrors", fixed.concat([error.id]));
        };

        enhancedError._skip = async () => {
          await clean();
          await update.workspace?.("skippedErrors", skipped.concat([error.id]));
        };

        if (skipped?.includes(error.id)) {
          enhancedError._status = "skipped";
          all.skipped.push(enhancedError);
        } else if (fixed?.includes(error.id)) {
          enhancedError._status = "fixed";
          all.fixed.push(enhancedError);
        } else {
          enhancedError._status = "open";
          all.open.push(enhancedError);
        }
        return all;
      },
      { open: [], skipped: [], fixed: [] }
    );
  }, [skipped, fixed, errors]);

  useEffect(() => {
    loadErrors({ projects, filters });
  }, [filters, projects]);

  return { loading, errors: groupedErrors };
}
