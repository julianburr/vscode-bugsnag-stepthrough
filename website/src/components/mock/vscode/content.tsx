import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  background: var(--vscode-content-background);
  color: var(--vscode-content-foreground);
`;

export function Content() {
  return <Container />;
}
