import { createContext, PropsWithChildren, useContext } from "react";

import {
  ErrorDetails,
  EventDetails,
  Organisation,
  Project,
  TrendBucket,
} from "../../types/bugsnag";

type Account = {
  data: Organisation;
  projects: Project[];
  token: string;
};

type ProjectSetting = {
  token: string;
  id: string;
};

type GroupedErrors = {
  open: ErrorDetails[];
  skipped: ErrorDetails[];
  fixed: ErrorDetails[];
  _key?: string;
};

export type BugsnagContextValue = {
  // Data
  accounts?: Account[];
  errors?: GroupedErrors;
  events?: {
    [errorId: string]: EventDetails;
  };
  trends?: {
    [errorId: string]: TrendBucket[];
  };

  // Methods
  loadAccount?: (args: { token: string }) => Promise<Account | undefined>;
  loadErrors?: (args: {
    projects: ProjectSetting[];
    filters?: { sort?: string; since?: string };
    skipped?: string[];
    fixed?: string[];
  }) => Promise<GroupedErrors | undefined>;
  loadEvent?: (args: {
    token: string;
    projectId: string;
    errorId: string;
  }) => Promise<EventDetails | undefined>;
  loadErrorTrend?: (args: {
    token: string;
    projectId: string;
    errorId: string;
  }) => Promise<TrendBucket[] | undefined>;
};

const BugsnagContext = createContext<BugsnagContextValue>({});

type BugsnagProviderProps = PropsWithChildren<{
  value: BugsnagContextValue;
}>;

export function BugsnagProvider(props: BugsnagProviderProps) {
  return <BugsnagContext.Provider {...props} />;
}

export function useBugsnag() {
  return useContext(BugsnagContext);
}
