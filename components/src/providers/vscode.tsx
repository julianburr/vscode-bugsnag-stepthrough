import { createContext, PropsWithChildren, useContext } from "react";

export type VSCodeContextValue = {
  // Data
  loading: boolean;
  settings: {
    global: { [key: string]: any };
    workspace: { [key: string]: any };
  };

  // Methods
  sendMessage?: (args: { command: string; data?: any }) => Promise<any>;
  updateSetting?: {
    global: (args: { key: string; value: any }) => Promise<any>;
    workspace: (args: { key: string; value: any }) => Promise<any>;
  };
  openFile?: (args: {
    filePath: string;
    line?: number;
    column?: number;
  }) => Promise<{ data: boolean }>;
  confirmMessage?: (args: {
    message: string;
    options?: string[];
  }) => Promise<{ data: string }>;
};

const VSCodeContext = createContext<VSCodeContextValue>({
  loading: true,
  settings: {
    global: {},
    workspace: {},
  },
});

type VSCodeProviderProps = PropsWithChildren<{
  value: VSCodeContextValue;
}>;

export function VSCodeProvider(props: VSCodeProviderProps) {
  return <VSCodeContext.Provider {...props} />;
}

export function useVSCode() {
  return useContext(VSCodeContext);
}
