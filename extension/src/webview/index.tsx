import { render } from "react-dom";
import { Root } from "vscode-bugsnag-stepthrough-components";

import { BugsnagProvider } from "./providers/bugsnag";
import { VSCodeProvider } from "./providers/vscode";

function Extension() {
  return (
    <VSCodeProvider>
      <BugsnagProvider>
        <Root />
      </BugsnagProvider>
    </VSCodeProvider>
  );
}

render(<Extension />, window.document.getElementById("app"));
