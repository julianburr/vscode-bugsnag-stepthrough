import dayjs from "dayjs";
import { useEffect } from "react";
import styled from "styled-components";

import { useBugsnag } from "../providers/bugsnag";

const Container = styled.div`
  width: 100%;
  height: 35px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > * {
    margin: 0 2px 0 0;

    &:last-child {
      margin: 0;
    }
  }
`;

const Value = styled.div<{ value: number }>`
  display: flex;
  height: 100%;
  flex: 1;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &:before,
  &:after {
    content: " ";
    position: absolute;
    inset: 0;
  }

  &:before {
    background: var(--vscode-editorIndentGuide-background);
    opacity: 0.5;
  }

  &:after {
    background: var(--vscode-button-background);
    top: auto;
    transition: height 0.2s;
    height: ${(props) => `${props.value * 100}%`};
  }
`;

type ErrorTrendProps = {
  token: string;
  projectId?: string;
  errorId?: string;
};

export function ErrorTrend({ token, projectId, errorId }: ErrorTrendProps) {
  const { trends, loadErrorTrend } = useBugsnag();
  const trend = errorId ? trends?.[errorId] : undefined;

  console.log({ trends, trend });

  useEffect(() => {
    if (projectId && errorId) {
      loadErrorTrend?.({ token, projectId, errorId }).catch((e) => {
        // TODO: add error handling
        // https://github.com/julianburr/vscode-bugsnag-stepthrough/issues/5
        console.error(e);
      });
    }
  }, [projectId, errorId]);

  const largestCount =
    trend?.reduce((all, t) => {
      console.log({ t, all });
      if (t.events_count > all) {
        all = t.events_count;
      }
      return all;
    }, 0) || 0;

  console.log({ largestCount });

  return (
    <Container>
      {Array.from(new Array(30)).map((_, index) => {
        const count = trend?.[index]?.events_count;
        const value = count ? count / largestCount : 0;
        const from = dayjs(trend?.[index].from).format("D MMM YYYY H:mma");
        const to = dayjs(trend?.[index].to).format("D MMM YYYY H:mma");
        const s = count !== 1 && "s";
        return (
          <Value
            key={index}
            value={value}
            title={`${count} event${s} between ${from} and ${to}`}
          />
        );
      })}
    </Container>
  );
}
