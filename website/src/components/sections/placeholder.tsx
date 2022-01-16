import styled from "styled-components";

export const Placeholder = styled.div<{ width?: string; height?: string }>`
  background: var(--color-main-foreground);
  height: ${(props) => props.height || "32rem"};
  width: ${(props) => props.width || "25rem"};
  border-radius: 0.4rem 0.4rem 0 0;
`;
