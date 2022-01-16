import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.8rem;
  background: var(--mock-vscode-topbar-background);
  padding: 0 1rem;
`;

const TopBarButton = styled.button<{ color: string }>`
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0.8rem 0 0;
  background: ${(props) => props.color};
  border-radius: 50%;
  border: 0 none;

  &:last-child {
    margin: 0;
  }
`;

type TopBarProps = {
  onClose?: () => void;
};

export function TopBar({ onClose }: TopBarProps) {
  return (
    <Container>
      <TopBarButton color="#fe5f57" onClick={onClose} />
      <TopBarButton color="#febc2e" />
      <TopBarButton color="#29c940" />
    </Container>
  );
}
