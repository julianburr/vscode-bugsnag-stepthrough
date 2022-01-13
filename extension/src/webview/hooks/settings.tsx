import React, {
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
    projects?: string[];
    filters?: {
      since?: string;
      sort?: string;
    };
  };
};

type SettingsContextValue = {
  loading: boolean;
  error?: any;
  settings?: Settings;
  refresh?: () => Promise<Settings>;
};

const SettingsContext = createContext<SettingsContextValue>({
  loading: true,
  error: undefined,
  settings: { global: {}, workspace: {} },
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

  useEffect(() => {
    loadSettings();
  }, []);

  const value = useMemo(
    () => ({
      loading,
      error,
      settings,
      refresh: loadSettings,
    }),
    [loading, error, settings, loadSettings]
  );

  return <SettingsContext.Provider value={value} {...props} />;
}

export function useSettings() {
  return useContext(SettingsContext);
}
