import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkButton = styled(Link)`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    self-align: flex-start;
    self-justify: flex-start;
    font: inherit;
    background: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border: 1px solid var(--vscode-button-border);
    height: var(--vscode-custom-input-height);
    padding: 0 5px;
    cursor: pointer;

    &:hover {
      background: var(--vscode-button-hoverBackground);
      color: var(--vscode-button-foreground);
    }
  }
`;
