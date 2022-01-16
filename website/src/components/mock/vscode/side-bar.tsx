import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-drection: column;
  width: 22rem;
  background: var(--vscode-sidebar-background);
  color: var(--vscode-sidebar-foreground);
`;

const SidebarTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
  height: 3.5rem;

  h2 {
    color: var(--vscode-sidebar-title-foreground);
    font-size: 1.1rem;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }
`;

export function SideBar() {
  return (
    <Container>
      <SidebarTitle>
        <h2>Bugsnag Stepthrough</h2>
      </SidebarTitle>
    </Container>
  );
}
