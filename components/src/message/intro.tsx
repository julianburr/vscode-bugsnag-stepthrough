import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Spacer } from "../spacer";

import LogoSvg from "../../assets/icons/logo.svg";

const Container = styled.div`
  padding: 10vh 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Logo = styled(LogoSvg)`
  height: 60px;
  width: auto;
  opacity: 0.4;
`;

type IntroMessageProps = {
  message: ReactNode;
};

export function IntroMessage({ message }: IntroMessageProps) {
  return (
    <Container>
      <Logo />

      <Spacer height="20px" />
      {message}

      <Spacer height="4px" />
      <Link to="/settings">Go to settings</Link>
    </Container>
  );
}
