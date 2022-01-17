import { ReactNode, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { Content } from "./content";
import { SideBar } from "./side-bar";
import { SideMenu } from "./side-menu";
import { TopBar } from "./top-bar";

export const GlobalMockStyles = createGlobalStyle`
  :root {
    --mock-vscode-primary-background: rgb(0, 122, 204);
    --mock-vscode-primary-foreground: rgb(255, 255, 255);
    --mock-vscode-topbar-background: rgb(221, 221, 221);
    --mock-vscode-topbar-foreground: rgb(51, 51, 51);
    --mock-vscode-sidemenu-background: rgb(51, 51, 51);
    --mock-vscode-sidemenu-foreground: rgba(255, 255, 255, 0.4);
    --mock-vscode-sidemenu-active-foreground: rgb(255, 255, 255);
    --mock-vscode-sidemenu-badge-background: var(
      --mock-vscode-primary-background
    );
    --mock-vscode-sidemenu-badge-foreground: var(
      --mock-vscode-primary-foreground
    );
    --mock-vscode-sidebar-background: rgb(243, 243, 243);
    --mock-vscode-sidebar-foreground: rgba(38, 119, 203, 0.18);
    --mock-vscode-sidebar-title-foreground: rgb(111, 111, 111);
    --mock-vscode-content-background: rgb(255, 255, 255);
    --mock-vscode-content-foreground: rgb(0, 0, 0);
    --mock-vscode-code-primary: #a546ca;
    --mock-vscode-code-primary-alt: #3777dd;
    --mock-vscode-code-secondary: #d76060;
    --mock-vscode-code-text: #000;
  }

  &[data-theme="dark"] {
    --mock-vscode-topbar-background: rgb(60 60 60);
    --mock-vscode-topbar-foreground: rgb(204, 204, 204);
    --mock-vscode-sidemenu-background: rgb(51, 51, 51);
    --mock-vscode-sidemenu-foreground: rgba(255, 255, 255, 0.4);
    --mock-vscode-sidemenu-active-foreground: rgb(255, 255, 255);
    --mock-vscode-sidebar-background: rgb(37, 37, 38);
    --mock-vscode-sidebar-foreground: rgba(83, 89, 93, 0.5);
    --mock-vscode-sidebar-title-foreground: rgb(187, 187, 187);
    --mock-vscode-content-background: rgb(30, 30, 30);
    --mock-vscode-content-foreground: rgb(212, 212, 212);
    --mock-vscode-code-primary: #569dd6;
    --mock-vscode-code-primary-alt: 9dddff;
    --mock-vscode-code-secondary: #ce9179;
    --mock-vscode-code-text: #d4d4d4;
  }

  &[data-theme="quiet-light"] {
    --mock-vscode-primary-background: rgb(112, 86, 151);
    --mock-vscode-primary-foreground: rgb(255, 255, 255);
    --mock-vscode-topbar-background: rgb(196, 183, 215);
    --mock-vscode-topbar-foreground: rgb(51, 51, 51);
    --mock-vscode-sidemenu-background: rgb(237, 237, 245);
    --mock-vscode-sidemenu-foreground: rgba(112, 86, 151, 0.4);
    --mock-vscode-sidemenu-active-foreground: rgb(112, 86, 151);
    --mock-vscode-sidebar-background: rgb(242, 242, 242);
    --mock-vscode-sidebar-foreground: rgb(97, 97, 97);
    --mock-vscode-sidebar-title-foreground: rgb(97, 97, 97);
    --mock-vscode-content-background: rgb(245, 245, 245);
    --mock-vscode-content-foreground: rgb(97, 97, 97);
    --mock-vscode-code-primary: #416acc;
    --mock-vscode-code-primary-alt: 7d91a2;
    --mock-vscode-code-secondary: #b92a2a;
    --mock-vscode-code-text: #833aa2;
  }
`;

const Container = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0.8rem;
  width: 120rem;
  height: 70rem;
  background: var(--mock-vscode-topbar-background);
  transition: opacity 0.2s, transform 0.2s;
  transform-origin: center center;
  opacity: ${(props) => (props.visible ? "1" : "0")};
  transform: ${(props) =>
    props.visible ? "translate3d(0, 0, 0)" : "translate3d(8rem, 30rem, 0)"};
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const WrapSideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 26rem;
  height: 100%;

  select {
    pointer-events: none;
  }
`;

type VSCodeMockProps = {
  content?: ReactNode;
};

export function VSCodeMock({ content }: VSCodeMockProps) {
  const [visible, setVisible] = useState(true);
  return (
    <Container visible={visible} data-theme="dark" role="presentation">
      <TopBar onClose={() => setVisible(false)} />
      <WrapContent>
        <SideMenu />
        <WrapSideBar>
          <SideBar content={content} />
        </WrapSideBar>
        <Content />
      </WrapContent>
    </Container>
  );
}
