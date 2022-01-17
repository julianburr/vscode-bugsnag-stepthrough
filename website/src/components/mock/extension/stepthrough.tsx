import dayjs from "dayjs";
import { Root } from "vscode-bugsnag-stepthrough-components";
import { BugsnagProvider } from "vscode-bugsnag-stepthrough-components/src/providers/bugsnag";
import { VSCodeProvider } from "vscode-bugsnag-stepthrough-components/src/providers/vscode";
import {
  ErrorDetails,
  EventDetails,
  TrendBucket,
} from "vscode-bugsnag-stepthrough-components/types/bugsnag";

import { useMock } from "./data/use-mock";

export function ExtensionMock() {
  let totalEvents = 0;
  const trend = Array.from(new Array(30)).map((_, index) => {
    const count =
      index >= 15 ? Math.floor(Math.random() * (30 - 7 + 1) + 7) : 0;
    totalEvents += count;
    return {
      from: dayjs().subtract(30 - index, "day"),
      to: dayjs().subtract(29 - index, "day"),
      events_count: count,
    };
  }) as any as TrendBucket[];

  const mockData = useMock({
    errors: {
      open: [
        {
          id: "cat",
          error_class: "TypeError",
          context: "/awesome/cats",
          message: "Undefined is not a cat",
          events: totalEvents,
          users: 50,
          first_seen_unfiltered: dayjs().subtract(14, "day"),
          last_seen_unfiltered: dayjs().subtract(37, "minute"),
          release_stages: ["development", "production"],
          project_id: "launch",
        },
      ] as any as ErrorDetails[],
      skipped: [],
      fixed: [],
    },
    events: {
      cat: {
        exceptions: [
          {
            error_class: "TypeError",
            message: "Undefined is not a cat",
            type: "browserjs",
            stacktrace: [
              {
                column_number: 92,
                in_project: null,
                line_number: 67,
                method: "findACat",
                file: "src/cat.js",
                type: null,
                code: null,
                code_file: null,
                address_offset: null,
                macho_uuid: null,
                source_control_link: null,
                source_control_name: "",
              },
            ],
          },
        ],
      } as any as EventDetails,
    },
    trends: {
      cat: trend,
    },
  });

  return (
    <VSCodeProvider value={mockData.vscode}>
      <BugsnagProvider value={mockData.bugsnag}>
        <Root initialEntries={["/details/cat"]} />
      </BugsnagProvider>
    </VSCodeProvider>
  );
}
