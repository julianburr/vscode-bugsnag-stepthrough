import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  background: var(--mock-vscode-sidebar-background);
  padding: 0 2rem;
`;

const SidebarTitle = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: center;
  height: 3.5rem;

  h2 {
    color: var(--mock-vscode-sidebar-title-foreground);
    font-size: 1.1rem;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: var(--vscode-foreground);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  font-weight: 400;
  text-align: left;

  & h1,
  & h2,
  & h3 {
    font-weight: 700;
    font-family: inherit;
    color: inherit;
  }

  & a {
    &,
    &:hover,
    &:focus {
      color: var(--vscode-button-background);
      text-decoration: none;
    }
  }

  [data-theme="light"] & {
    --vscode-settings-checkboxBackground: #ffffff;
    --vscode-settings-checkboxBorder: #cecece;
    --vscode-settings-dropdownBackground: #ffffff;
    --vscode-settings-dropdownBorder: #cecece;
    --vscode-foreground: #616161;
    --vscode-editorIndentGuide-background: #d3d3d3;
    --vscode-button-background: #007acc;
    --vscode-button-foreground: #ffffff;
    --vscode-settings-textInputBackground: #ffffff;
    --vscode-settings-textInputForeground: #616161;
    --vscode-settings-textInputBorder: #cecece;
    --vscode-input-placeholderForeground: #767676;
    --vscode-sideBar-background: #f3f3f3;
    --vscode-button-secondaryBackground: #5f6a79;
    --vscode-button-secondaryHoverBackground: #4c5561;
    --vscode-button-hoverBackground: #0062a3;
  }

  [data-theme="dark"] & {
    --vscode-settings-checkboxBackground: #3c3c3c;
    --vscode-settings-checkboxForeground: #f0f0f0;
    --vscode-settings-checkboxBorder: #3c3c3c;
    --vscode-settings-dropdownBackground: #3c3c3c;
    --vscode-settings-dropdownForeground: #f0f0f0;
    --vscode-settings-dropdownBorder: #3c3c3c;
    --vscode-foreground: #cccccc;
    --vscode-editorIndentGuide-background: #404040;
    --vscode-button-background: #0e639c;
    --vscode-button-foreground: #ffffff;
    --vscode-settings-textInputBackground: #3c3c3c;
    --vscode-settings-textInputForeground: #cccccc;
    --vscode-input-placeholderForeground: #a6a6a6;
    --vscode-sideBar-background: #252526;
    --vscode-button-secondaryBackground: #3a3d41;
    --vscode-button-secondaryHoverBackground: #45494e;
    --vscode-button-hoverBackground: #1177bb;
  }

  [data-theme="quiet-light"] & {
    --vscode-settings-checkboxBackground: #f5f5f5;
    --vscode-settings-checkboxBorder: #cecece;
    --vscode-settings-dropdownBackground: #f5f5f5;
    --vscode-settings-dropdownBorder: #cecece;
    --vscode-foreground: #616161;
    --vscode-editorIndentGuide-background: rgba(170, 170, 170, 0.38);
    --vscode-button-background: #705697;
    --vscode-button-foreground: #ffffff;
    --vscode-settings-textInputBackground: #ffffff;
    --vscode-settings-textInputForeground: #616161;
    --vscode-input-placeholderForeground: rgba(97, 97, 97, 0.5);
    --vscode-sideBar-background: #f2f2f2;
    --vscode-button-secondaryBackground: #5f6a79;
    --vscode-button-secondaryHoverBackground: #4c5561;
    --vscode-button-hoverBackground: #5a4579;
  }
`;

type SideBarProps = {
  content?: ReactNode;
};

export function SideBar({ content }: SideBarProps) {
  return (
    <Container>
      <SidebarTitle>
        <h2>Bugsnag Stepthrough</h2>
      </SidebarTitle>

      <WrapContent>{content}</WrapContent>
    </Container>
  );
}
