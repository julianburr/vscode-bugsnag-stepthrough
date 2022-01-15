import { ReactNode } from "react";
import styled from "styled-components";

import { Spinner } from "./spinner";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 100px;
  margin: 0 auto;

  & svg {
    opacity: 0.5;
  }
`;

type LoadingMessageProps = {
  message: ReactNode;
};

export function LoadingMessage({ message }: LoadingMessageProps) {
  return (
    <Container>
      <Spinner />
      <p>{message}</p>
    </Container>
  );
}
