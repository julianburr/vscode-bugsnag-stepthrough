import styled from "styled-components";

const Container = styled.div<{ width?: string; height?: string }>`
  background: var(--mock-vscode-sidebar-background);
  height: ${(props) => props.height || "32rem"};
  width: ${(props) => props.width || "25rem"};
  border-radius: 0.8rem 0.8rem 0 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 20;

  & > * {
    background: transparent;
  }
`;

export function Placeholder() {
  return <Container data-theme="dark"></Container>;
}
