import styled from "styled-components";

import FireworksSvg from "../../assets/icons/illustrations/fireworks.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & svg {
    width: 80px;
    maxwidth: 90%;
    height: auto;
    margin: 0 0 8px;
    opacity: 0.5;
  }
`;

export function SuccessMessage() {
  return (
    <Container>
      <FireworksSvg />

      <p>
        You did it! There seem to be no more errors left in the your projects.
      </p>
    </Container>
  );
}
