import dayjs from "dayjs";
import { useState } from "react";
import {
  ErrorDetails,
  EventDetails,
  Organisation,
  Project,
  TrendBucket,
} from "vscode-bugsnag-stepthrough-components/types/bugsnag";

type UseMockArgs = {
  errors?: {
    open: ErrorDetails[];
    skipped: ErrorDetails[];
    fixed: ErrorDetails[];
  };
  events?: { [key: string]: EventDetails };
  trends?: { [key: string]: TrendBucket[] };
};

export const useMock = ({
  errors: mockErrors = {
    open: [],
    skipped: [],
    fixed: [],
  },
  events: mockEvents = {},
  trends: mockTrends = {},
}: UseMockArgs = {}) => {
  const mockSettings = {
    global: {
      tokens: ["boring"],
    },
    workspace: {
      projects: [{ id: "launch", token: "boring" }],
    },
  };

  const [settings, setSettings] = useState(mockSettings);

  return {
    vscode: {
      loading: false,
      settings,
      getSettings: async () => settings,
      updateSetting: {
        global: async ({ key, value }: any) =>
          setSettings((state) =>
            key === "tokens"
              ? state
              : {
                  ...state,
                  global: { ...state.global, [key]: value },
                }
          ),
        workspace: async ({ key, value }: any) =>
          setSettings((state) => ({
            ...state,
            workspace: { ...state.workspace, [key]: value },
          })),
      },
      openFile: async () => ({ data: false }),
      confirmMessage: async () => ({ data: "No" }),
      sendMessage: async () => undefined,
    },

    bugsnag: {
      accounts: [
        {
          token: "boring",
          data: { name: "SpaceX Technologies Corp." } as any as Organisation,
          projects: [
            { id: "website", name: "Marketing Website" } as any as Project,
            { id: "launch", name: "Space Launch System" } as any as Project,
            { id: "starman", name: "Starman Roadster" } as any as Project,
          ],
        },
      ],
      errors: mockErrors,
      events: mockEvents,
      trends: mockTrends,

      loadErrors: async ({ key }: any) => ({
        ...(mockErrors || {}),
        key,
      }),

      loadEvent: async () => undefined,
      loadTrend: async () => undefined,
    },
  };
};
