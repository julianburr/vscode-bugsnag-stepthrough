import styled from "styled-components";

export const Inner = styled.div`
  width: 100%;
  max-width: 95rem;
  margin: 0 auto;
  padding: 2.4rem;
  position: relative;

  & > * {
    position: relative;
    z-index: 1;
  }
`;
