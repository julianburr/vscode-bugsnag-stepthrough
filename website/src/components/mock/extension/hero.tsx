import { useState } from "react";
import { Root } from "vscode-bugsnag-stepthrough-components";
import { BugsnagProvider } from "vscode-bugsnag-stepthrough-components/src/providers/bugsnag";
import { VSCodeProvider } from "vscode-bugsnag-stepthrough-components/src/providers/vscode";
import {
  Organisation,
  Project,
} from "vscode-bugsnag-stepthrough-components/types/bugsnag";

const useMock = () => {
  const mockSettings = {
    global: {
      tokens: ["boring"],
    },
    workspace: {
      projects: [{ id: "launch", token: "boring" }],
    },
  };

  const mockErrors = {
    open: [
      // {
      //   id: "catz",
      //   error_class: "TypeError",
      //   context: "/awesome/cats",
      //   message: "Undefined is not an object, duh",
      //   project_id: "project1",
      // } as any as ErrorDetails,
    ],
    skipped: [],
    fixed: [],
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
      events: {},
      trends: {},

      loadErrors: async ({ key }: any) => ({
        ...mockErrors,
        key,
      }),

      loadEvent: async () => undefined,
      loadTrend: async () => undefined,
    },
  };
};

export function HeroMock() {
  const mockData = useMock();
  return typeof window !== "undefined" ? (
    <VSCodeProvider value={mockData.vscode}>
      <BugsnagProvider value={mockData.bugsnag}>
        <Root />
      </BugsnagProvider>
    </VSCodeProvider>
  ) : null;
}
