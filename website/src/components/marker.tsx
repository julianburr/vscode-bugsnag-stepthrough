import styled, { keyframes } from "styled-components";

type MarkerProps = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

export const Marker = styled.div<MarkerProps>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  background: #f4c00b;
  transform: translate3d(-50%, -50%, 0);
  height: 11rem;
  width: 11rem;
  border-radius: 50%;
  z-index: 200;
  opacity: 0.3;
`;
