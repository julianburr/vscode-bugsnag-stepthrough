import styled from "styled-components";

export const Illustration = styled.div`
  position: absolute;
  color: currentColor;
  z-index: 0;
  opacity: 0.05;
  display: none;

  & svg {
    height: 100%;
    width: auto;
  }

  @media (min-width: 850px) {
    display: block;
  }
`;
