import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 -20px;
  padding: 0 20px;
  background: var(--vscode-sideBar-background);
  position: sticky;
  top: 0;
  z-index: 20;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.h1<{ paddingLeft?: boolean }>`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 6px 0;
  padding: ${(props) => (props.paddingLeft ? "0 0 0 8px" : "0")};
`;

const WrapActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & a {
    svg {
      height: 1em;
      margin: 0;
    }
  }
`;

const WrapActionsLeft = styled(WrapActions)`
  & > * {
    margin: 0 3px 0 0;
  }
`;

const WrapActionsRight = styled(WrapActions)`
  & > * {
    margin: 0 0 0 3px;
  }
`;

type TitleBarProps = {
  title: string;
  actionsLeft?: ReactNode;
  actionsRight?: ReactNode;
};

export function TitleBar({ title, actionsLeft, actionsRight }: TitleBarProps) {
  return (
    <Container>
      <Left>
        {actionsLeft && <WrapActionsLeft>{actionsLeft}</WrapActionsLeft>}
        <Title>{title}</Title>
      </Left>

      {actionsRight && <WrapActionsRight>{actionsRight}</WrapActionsRight>}
    </Container>
  );
}
