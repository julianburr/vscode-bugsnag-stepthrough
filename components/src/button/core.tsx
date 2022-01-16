import styled from "styled-components";

export const Button = styled.button<{ secondary?: boolean }>`
  font: inherit;
  background: ${(props) =>
    props.secondary
      ? "var(--vscode-button-secondaryBackground)"
      : "var(--vscode-button-background)"};
  color: ${(props) =>
    props.secondary
      ? "var(--vscode-button-secondaryForeground)"
      : "var(--vscode-button-foreground)"};
  border: ${(props) =>
    props.secondary
      ? "1px solid var(--vscode-button-secondaryBorder)"
      : "1px solid var(--vscode-button-border)"};
  height: var(--vscode-custom-input-height);
  padding: 0 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.secondary
        ? "var(--vscode-button-secondaryHoverBackground)"
        : "var(--vscode-button-hoverBackground)"};
  }
`;
