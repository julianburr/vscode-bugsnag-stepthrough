import styled from "styled-components";

import CodeLinesSvg from "src/assets/illustrations/mock-code-lines.svg";

const Container = styled.div`
  flex: 1;
  background: var(--mock-vscode-content-background);
  color: var(--mock-vscode-content-foreground);
  padding: 3rem;

  & svg {
    width: 55rem;
    height: auto;
    opacity: 0.05;
  }
`;

export function Content() {
  return (
    <Container>
      <CodeLinesSvg />
    </Container>
  );
}
