import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  VSCodeProvider as Provider,
  VSCodeContextValue,
} from "vscode-bugsnag-stepthrough-components/src/providers/vscode";
import { confirmMessage } from "./confirm-message";

import { getSettings } from "./get-settings";
import { openFile } from "./open-file";
import { updateSetting } from "./update-setting";

type VSCodeProviderProps = PropsWithChildren<Record<never, any>>;

export function VSCodeProvider(props: VSCodeProviderProps) {
  const [loading, setLoading] = useState<VSCodeContextValue["loading"]>(true);
  const [settings, setSettings] = useState<VSCodeContextValue["settings"]>({
    global: {},
    workspace: {},
  });

  const loadSettings = useCallback(
    () =>
      getSettings()
        .then(({ data }) => {
          setSettings(data);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        }),
    []
  );

  const updateSettingType = useCallback(
    async ({
      type,
      key,
      value,
    }: {
      type: "global" | "workspace";
      key: string;
      value: any;
    }) => {
      const response = await updateSetting({ type, key, value });
      // We automatically refresh the settings whenever we send an update
      // to VS Code
      await loadSettings();
      return response;
    },
    []
  );

  useEffect(() => {
    loadSettings();
  }, []);

  const value = useMemo<VSCodeContextValue>(
    () => ({
      loading,
      settings,

      getSettings,
      updateSetting: {
        global: ({ key, value }: { key: string; value: any }) =>
          updateSettingType({ type: "global", key, value }),
        workspace: ({ key, value }: { key: string; value: any }) =>
          updateSettingType({ type: "workspace", key, value }),
      },
      openFile,
      confirmMessage,
    }),
    [loading, settings]
  );

  return <Provider value={value} {...props} />;
}
