import styled from "styled-components";
import { Inner } from "./inner";

export const Section = styled.section<{ reverse?: boolean; stacked?: boolean }>`
  width: 100%;
  padding: 0;
  margin: 0;
  background: var(--color-main-background);
  color: var(--color-main-foreground);
  text-align: center;

  p {
    margin: 1.2rem 0;
    padding: 0;

    & + p {
      margin: 0 0 1.2rem;
    }
  }

  ${Inner} {
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (min-width: 850px) {
      flex-direction: ${(props) =>
        props.stacked ? "column" : props.reverse ? "row-reverse" : "row"};
      align-items: ${(props) => (props.stacked ? "center" : "flex-end")};
      text-align: ${(props) => (props.stacked ? "center" : "left")};
    }
  }

  :nth-child(even) {
    background: var(--color-main-background-alt);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 95%);

    @media (min-width: 850px) {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
    }
  }
`;
