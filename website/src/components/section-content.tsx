import styled from "styled-components";

export const SectionContent = styled.div<{ stacked?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4.8rem 0;

  @media (min-width: 850px) {
    width: 50%;
    flex-shrink: 0;
    padding: ${(props) => (props.stacked ? "6.4rem 0 0" : "6.4rem 0")};
    margin: ${(props) => (props.stacked ? "0 0 -2rem" : "0")};
  }
`;
