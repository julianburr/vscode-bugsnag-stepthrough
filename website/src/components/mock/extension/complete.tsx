import { Root } from "vscode-bugsnag-stepthrough-components";
import { BugsnagProvider } from "vscode-bugsnag-stepthrough-components/src/providers/bugsnag";
import { VSCodeProvider } from "vscode-bugsnag-stepthrough-components/src/providers/vscode";

import { useMock } from "./data/use-mock";

export function ExtensionMock() {
  const mockData = useMock();
  return (
    <VSCodeProvider value={mockData.vscode}>
      <BugsnagProvider value={mockData.bugsnag}>
        <Root />
      </BugsnagProvider>
    </VSCodeProvider>
  );
}
