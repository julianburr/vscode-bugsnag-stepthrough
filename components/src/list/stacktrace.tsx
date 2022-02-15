import { EventTrace } from "../../types/bugsnag";
import { useVSCode } from "../providers/vscode";
import { List, Meta, Title } from "../list/core";

type StacktraceListProps = {
  items: EventTrace[];
};

export function StacktraceList({ items }: StacktraceListProps) {
  const { openFile } = useVSCode();
  return (
    <List>
      {items.map((item, index) => (
        <li key={index}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              // VSCode lines are 0-indexed, while Bugsnag lines are 1-indexed :/
              const lineNumber = item.line_number ? item.line_number - 1 : 0;

              openFile?.({
                filePath: item.file,
                line: lineNumber,
                column: item.column_number,
              });
            }}
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
