import { PropsWithChildren, useMemo, useState } from "react";
import {
  BugsnagProvider as Provider,
  BugsnagContextValue,
} from "vscode-bugsnag-stepthrough-components/src/providers/bugsnag";

import { getErrorTrend } from "./get-error-trend";
import { getGroupedErrors } from "./get-errors";
import { getEvent } from "./get-event";
import { getOrganisations } from "./get-organisations";
import { getProjects } from "./get-projects";

type BugsnagProviderProps = PropsWithChildren<Record<never, any>>;

export function BugsnagProvider(props: BugsnagProviderProps) {
  const [accounts, setAccounts] = useState<BugsnagContextValue["accounts"]>([]);
  const [errors, setErrors] = useState<BugsnagContextValue["errors"]>();
  const [events, setEvents] = useState<BugsnagContextValue["events"]>({});
  const [trends, setTrends] = useState<BugsnagContextValue["trends"]>({});

  const value = useMemo<BugsnagContextValue>(
    () => ({
      accounts,
      errors,
      events,
      trends,

      loadAccount: async ({ token }) => {
        try {
          const fromCache = accounts?.find((a: any) => a.token === token);
          if (fromCache) {
            return fromCache;
          }
          const organisations = await getOrganisations({ token });
          if (!organisations?.[0]) {
            throw new Error(`Organisation not found for token "${token}"`);
          }

          const projects = await getProjects({
            token,
            orgId: organisations?.[0]?.id,
          });

          const data = { data: organisations?.[0], projects, token };
          setAccounts((state) => (state || []).concat([data]));

          return data;
        } catch (e) {
          console.error(e);
        }
      },

      loadErrors: async ({ projects, filters, skipped = [], fixed = [] }) => {
        const cacheKey =
          `${projects.map((p) => p.token).join("--")}//` +
          `${filters?.since}--${filters?.sort}//` +
          `${skipped.join("--")}//` +
          `${fixed.join("--")}`;

        if (errors?._key === cacheKey) {
          return errors;
        }

        console.log({ projects, filters });
        const data = await getGroupedErrors({
          projects,
          filters,
          skipped,
          fixed,
        });

        data._key = cacheKey;
        setErrors(data);

        return data;
      },

      loadEvent: async ({ token, errorId }) => {
        if (events?.[errorId]) {
          return;
        }

        const data = await getEvent({ token, errorId });
        setEvents((state) => ({
          ...(state || {}),
          [errorId]: data,
        }));

        return data;
      },

      loadErrorTrend: async ({ token, projectId, errorId }) => {
        if (trends?.[errorId]) {
          return;
        }

        const data = await getErrorTrend({ token, projectId, errorId });
        setTrends((state) => ({
          ...(state || {}),
          [errorId]: data,
        }));

        return data;
      },
    }),
    [accounts, errors, events, trends]
  );

  return <Provider value={value} {...props} />;
}
