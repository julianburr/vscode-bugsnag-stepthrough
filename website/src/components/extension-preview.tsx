import { ComponentProps, ReactNode } from "react";
import styled from "styled-components";
import { SideBar } from "./mock/vscode/side-bar";

const Container = styled.div<{ width?: string; height?: string }>`
  background: var(--mock-vscode-sidebar-background);
  height: ${(props) => props.height || "32rem"};
  width: ${(props) => props.width || "25rem"};
  border-radius: 0.8rem 0.8rem 0 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 20;
  pointer-events: none;

  & > * {
    background: transparent;
  }
`;

type ExtensionPreviewProps = ComponentProps<typeof Container> & {
  content?: ReactNode;
  markers?: ReactNode;
};

export function ExtensionPreview({
  content,
  markers,
  ...props
}: ExtensionPreviewProps) {
  return (
    <Container data-theme="dark" role="presentation" {...props}>
      {content ? (
        <>
          {markers}
          <SideBar content={content} />
        </>
      ) : null}
    </Container>
  );
}
