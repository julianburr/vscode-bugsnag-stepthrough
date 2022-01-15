import { EventTrace } from "../types/bugsnag";
import { openFile } from "../utils/vscode";

import { List, Meta, Title } from "./list";

type StacktraceListProps = {
  items: EventTrace[];
};

export function StacktraceList({ items }: StacktraceListProps) {
  return (
    <List>
      {items.map((item, index) => (
        <li key={index}>
          <a
            href="#"
            onClick={() =>
              openFile({
                filePath: item.file,
                line: item.line_number,
                column: item.column_number,
              })
            }
          >
            <Title>{item.method || "anonymous"}</Title>
            <Meta>
              {item.file}:{item.line_number}:{item.column_number}
            </Meta>
          </a>
        </li>
      ))}
    </List>
  );
}
