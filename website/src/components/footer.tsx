import styled from "styled-components";

import { Inner } from "./inner";

import GithubSvg from "src/assets/icons/github.svg";
import LinkedInSvg from "src/assets/icons/linkedin.svg";
import TwitterSvg from "src/assets/icons/twitter.svg";

const Container = styled.footer`
  background: var(--color-footer-background);
  color: var(--color-footer-foreground);
  font-family: Quicksand;
  font-size: 1.4rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Social = styled.div`
  display: flex;
  flex-direction: row;

  a {
    display: flex;
    padding: 0.6rem;

    svg {
      height: 1.3em;
      width: auto;
    }
  }
`;

const Copyright = styled.div`
  margin: 0 2.4rem 0 0;
`;

export function Footer() {
  return (
    <Container>
      <Inner>
        <Content>
          <Copyright>
            &copy; {new Date().getFullYear()} — created by{" "}
            <a
              href="https://www.julianburr.de"
              target="_blank"
              rel="noreferrer nofollow"
            >
              Julian Burr
            </a>
          </Copyright>

          <Social>
            <a
              href="https://github.com/julianburr"
              target="_blank"
              rel="noreferrer nofollow"
              title="@julianburr on Github"
            >
              <GithubSvg />
            </a>
            <a
              href="https://www.linkedin.com/in/julianburr/"
              target="_blank"
              rel="noreferrer nofollow"
              title="@julianburr on LinkedIn"
            >
              <LinkedInSvg />
            </a>
            <a
              href="https://twitter.com/jburr90"
              target="_blank"
              rel="noreferrer nofollow"
              title="@jburr90 on Twitter"
            >
              <TwitterSvg />
            </a>
          </Social>
        </Content>
      </Inner>
    </Container>
  );
}
