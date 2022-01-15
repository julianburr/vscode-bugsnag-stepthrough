import styled from "styled-components";

export const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  position: relative;

  li {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 2px 0 0;

    a {
      display: flex;
      flex-direction: column;
      padding: 10px;
      color: inherit;
      position: relative;
      word-wrap: break-word;

      & > * {
        position: relative;
        z-index: 1;
      }

      &:before {
        content: " ";
        position: absolute;
        inset: 0;
        background: var(--vscode-editorIndentGuide-background);
        opacity: 0.4;
        z-index: 0;
      }

      &[href]:hover:before {
        opacity: 1;
      }
    }
  }
`;

export const Title = styled.h2`
  margin: 0 0 2px;
  padding: 0;
  font-size: 12px;
  font-weight: normal;

  b {
    font-weight: bold;
    padding-right: 6px;
  }
`;

export const Meta = styled.span`
  font-size: 10px;
  opacity: 0.5;
`;
