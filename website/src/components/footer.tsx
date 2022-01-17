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
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;

  @media (min-width: 850px) {
    flex-direction: row;
  }
`;

const Social = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 0.8rem;

  @media (min-width: 850px) {
    margin: 0;
  }

  a {
    display: flex;
    padding: 1rem;

    svg {
      height: 2em;
      width: auto;
    }

    @media (min-width: 850px) {
      padding: 0.6rem;

      svg {
        height: 1.3em;
      }
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
              rel="noreferrer noopener"
            >
              Julian Burr
            </a>
          </Copyright>

          <Social>
            <a
              href="https://github.com/julianburr"
              target="_blank"
              rel="noreferrer noopener"
              title="@julianburr on Github"
              aria-label="@julianburr on Github"
            >
              <GithubSvg role="presentation" />
            </a>
            <a
              href="https://www.linkedin.com/in/julianburr/"
              target="_blank"
              rel="noreferrer noopener"
              title="@julianburr on LinkedIn"
              aria-label="@julianburr on LinkedIn"
            >
              <LinkedInSvg role="presentation" />
            </a>
            <a
              href="https://twitter.com/jburr90"
              target="_blank"
              rel="noreferrer noopener"
              title="@jburr90 on Twitter"
              aria-label="@jburr90 on Twitter"
            >
              <TwitterSvg role="presentation" />
            </a>
          </Social>
        </Content>
      </Inner>
    </Container>
  );
}
