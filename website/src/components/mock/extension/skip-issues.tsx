import { Root } from "vscode-bugsnag-stepthrough-components";
import { BugsnagProvider } from "vscode-bugsnag-stepthrough-components/src/providers/bugsnag";
import { VSCodeProvider } from "vscode-bugsnag-stepthrough-components/src/providers/vscode";
import { ErrorDetails } from "vscode-bugsnag-stepthrough-components/types/bugsnag";

import { useMock } from "./data/use-mock";

export function ExtensionMock() {
  const mockData = useMock({
    errors: {
      open: [],
      skipped: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
      ] as any as ErrorDetails[],
      fixed: [],
    },
  });
  return (
    <VSCodeProvider value={mockData.vscode}>
      <BugsnagProvider value={mockData.bugsnag}>
        <Root />
      </BugsnagProvider>
    </VSCodeProvider>
  );
}
