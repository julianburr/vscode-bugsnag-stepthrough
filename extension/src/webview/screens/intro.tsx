import { ReactNode } from "react";
import styled from "styled-components";

import LogoSvg from "assets/icons/logo.svg";
import { Link } from "src/webview/components/link";
import { Spacer } from "../components/spacer";

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

type IntroScreenProps = {
  message: ReactNode;
};

export function IntroScreen({ message }: IntroScreenProps) {
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
