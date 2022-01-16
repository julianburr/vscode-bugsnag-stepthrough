import styled from "styled-components";

import { Content } from "./content";
import { SideBar } from "./side-bar";
import { SideMenu } from "./side-menu";
import { TopBar } from "./top-bar";

const Container = styled.div`
  --vscode-primary-background: rgb(0, 122, 204);
  --vscode-primary-foreground: rgb(255, 255, 255);

  --vscode-topbar-background: rgb(221, 221, 221);
  --vscode-topbar-foreground: rgb(51, 51, 51);

  --vscode-sidemenu-background: rgb(51, 51, 51);
  --vscode-sidemenu-foreground: rgba(255, 255, 255, 0.4);
  --vscode-sidemenu-active-foreground: rgb(255, 255, 255);
  --vscode-sidemenu-badge-background: var(--vscode-primary-background);
  --vscode-sidemenu-badge-foreground: var(--vscode-primary-foreground);

  --vscode-sidebar-background: rgb(243, 243, 243);
  --vscode-sidebar-foreground: rgba(38, 119, 203, 0.18);
  --vscode-sidebar-title-foreground: rgb(111, 111, 111);

  --vscode-content-background: rgb(255, 255, 255);
  --vscode-content-foreground: rgb(0, 0, 0);

  &[data-theme="dark"] {
    --vscode-topbar-background: rgb(60 60 60);
    --vscode-topbar-foreground: rgb(204, 204, 204);

    --vscode-sidemenu-background: rgb(51, 51, 51);
    --vscode-sidemenu-foreground: rgba(255, 255, 255, 0.4);
    --vscode-sidemenu-active-foreground: rgb(255, 255, 255);

    --vscode-sidebar-background: rgb(37, 37, 38);
    --vscode-sidebar-foreground: rgba(83, 89, 93, 0.5);
    --vscode-sidebar-title-foreground: rgb(187, 187, 187);

    --vscode-content-background: rgb(30, 30, 30);
    --vscode-content-foreground: rgb(212, 212, 212);
  }

  &[data-theme="quiet-light"] {
    --vscode-primary-background: rgb(112, 86, 151);
    --vscode-primary-foreground: rgb(255, 255, 255);

    --vscode-topbar-background: rgb(196, 183, 215);
    --vscode-topbar-foreground: rgb(51, 51, 51);

    --vscode-sidemenu-background: rgb(237, 237, 245);
    --vscode-sidemenu-foreground: rgba(112, 86, 151, 0.4);
    --vscode-sidemenu-active-foreground: rgb(112, 86, 151);

    --vscode-sidebar-background: rgb(242, 242, 242);
    --vscode-sidebar-foreground: rgb(97, 97, 97);
    --vscode-sidebar-title-foreground: rgb(97, 97, 97);

    --vscode-content-background: rgb(245, 245, 245);
    --vscode-content-foreground: rgb(97, 97, 97);
  }

  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0.8rem;
  width: 120rem;
  height: 70rem;
  background: var(--vscode-topbar-background);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export function VSCodeMock() {
  return (
    <Container data-theme="dark">
      <TopBar />
      <WrapContent>
        <SideMenu />
        <SideBar />
        <Content />
      </WrapContent>
    </Container>
  );
}
