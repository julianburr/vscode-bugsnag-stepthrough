import { EventTrace } from "../../types/bugsnag";
import { useVSCode } from "../providers/vscode";
import { List, Meta, Title } from "../list/core";

type StacktraceListProps = {
  items: EventTrace[];
};

export function StacktraceList({ items }: StacktraceListProps) {
  const { openFile } = useVSCode();
  console.log({ openFile });
  return (
    <List>
      {items.map((item, index) => (
        <li key={index}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openFile?.({
                filePath: item.file,
                line: item.line_number,
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
