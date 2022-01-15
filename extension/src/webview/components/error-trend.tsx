import dayjs from "dayjs";
import styled from "styled-components";
import { useBugsnagErrorTrend } from "../hooks/bugsnag/use-bugsnag-error-trend";

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
  projectId: string;
  errorId: string;
};

export function ErrorTrend({ token, projectId, errorId }: ErrorTrendProps) {
  const { trend } = useBugsnagErrorTrend({
    token,
    projectId,
    errorId,
  });

  const largestCount =
    trend?.reduce((all, trend) => {
      if (trend.events_count > all) {
        all = trend.events_count;
      }
      return all;
    }, 0) || 0;

  console.log({ trend, largestCount });

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
