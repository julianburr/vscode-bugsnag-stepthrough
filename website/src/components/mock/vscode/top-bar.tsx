import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.8rem;
  background: var(--vscode-topbar-background);
  padding: 0 0.6rem;
`;

const TopBarButton = styled.button<{ color: string }>`
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 0.8rem 0 0;
  background: ${(props) => props.color};
  border-radius: 50%;
  border: 0 none;

  &:last-child {
    margin: 0;
  }
`;

export function TopBar() {
  return (
    <Container>
      <TopBarButton color="#fe5f57" />
      <TopBarButton color="#febc2e" />
      <TopBarButton color="#29c940" />
    </Container>
  );
}
