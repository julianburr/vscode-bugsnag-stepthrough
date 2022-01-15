import styled from "styled-components";

export const Spacer = styled.div<{
  height?: number | string;
  width?: number | string;
}>`
  display: flex;
  height: ${(props) => props.height ?? "1px"};
  width: ${(props) => props.width ?? "1px"};
`;
