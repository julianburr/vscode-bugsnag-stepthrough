import {
  useContext,
  useEffect,
  createContext,
  useState,
  useCallback,
  useMemo,
  PropsWithChildren,
} from "react";

import { sendMessage } from "../utils/vscode";

type Settings = {
  global: {
    tokens?: string[];
  };
  workspace: {
    projects?: {
      token: string;
      id: string;
    }[];
    filters?: {
      since?: string;
      sort?: string;
    };
    activeTab?: string;
    skippedErrors?: string[];
    fixedErrors?: string[];
  };
};

type SettingsContextValue = {
  loading: boolean;
  error?: any;
  settings?: Settings;
  refresh?: () => Promise<Settings>;
  update: {
    global?: (key: keyof Settings["global"], value: any) => Promise<void>;
    workspace?: (key: keyof Settings["workspace"], value: any) => Promise<void>;
  };
};

const SettingsContext = createContext<SettingsContextValue>({
  loading: true,
  error: undefined,
  settings: { global: {}, workspace: {} },
  update: {},
});

export function SettingsProvider(props: PropsWithChildren<Record<never, any>>) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [settings, setSettings] = useState<any>();

  const loadSettings = useCallback(async () => {
    try {
      const { data } = await sendMessage("getSettings");
      setSettings(data);
      setLoading(false);
      return data;
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
      return {};
    }
  }, []);

  const updateSetting = useCallback(
    async (type: "global" | "workspace", key: string, value: any) => {
      try {
        await sendMessage("updateSetting", {
          data: {
            type,
            key,
            value,
          },
        });
        await loadSettings();
      } catch (e) {
        console.error(e);
        setError(e);
      }
    },
    []
  );

  useEffect(() => {
    loadSettings();
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({
      loading,
      error,
      settings,
      refresh: loadSettings,
      update: {
        global: (key, value) => updateSetting("global", key, value),
        workspace: (key, value) => updateSetting("workspace", key, value),
      },
    }),
    [loading, error, settings, loadSettings, updateSetting]
  );

  return <SettingsContext.Provider value={value} {...props} />;
}

export function useSettings() {
  return useContext(SettingsContext);
}
