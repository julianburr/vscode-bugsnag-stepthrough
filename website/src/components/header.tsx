import customProtocolCheck from "custom-protocol-check";
import styled, { keyframes } from "styled-components";

import { event } from "src/utils/ga";

import heroPng from "src/assets/images/hero.png";
import heroWebp from "src/assets/images/hero.webp";

import GithubSvg from "src/assets/icons/github.svg";
import TwitterSvg from "src/assets/icons/twitter.svg";

import { Inner } from "./inner";

const wiggle = keyframes`
  0% {
    transform: translate(0, 0) rotate(0);
  }
  2% {
    transform: translate(-9px, 15px) rotate(5deg);
  }
  4% {
    transform: translate(5px, 15px) rotate(7deg);
  }
  6% {
    transform: translate(4px, 12px) rotate(3deg);
  }
  8% {
    transform: translate(-11px, 3px) rotate(5deg);
  }
  10% {
    transform: translate(-5px, -11px) rotate(-1deg);
  }
  12% {
    transform: translate(12px, 14px) rotate(1deg);
  }
  14% {
    transform: translate(12px, 8px) rotate(-11deg);
  }
  16% {
    transform: translate(9px, 14px) rotate(-1deg);
  }
  18% {
    transform: translate(-14px, 5px) rotate(-14deg);
  }
  20% {
    transform: translate(-3px, 9px) rotate(-14deg);
  }
  22% {
    transform: translate(-4px, 11px) rotate(-14deg);
  }
  24% {
    transform: translate(13px, -7px) rotate(-13deg);
  }
  26% {
    transform: translate(8px, 13px) rotate(-3deg);
  }
  28% {
    transform: translate(6px, 0px) rotate(9deg);
  }
  30% {
    transform: translate(0px, 5px) rotate(14deg);
  }
  32% {
    transform: translate(12px, 4px) rotate(-12deg);
  }
  34% {
    transform: translate(6px, -6px) rotate(4deg);
  }
  36% {
    transform: translate(6px, 7px) rotate(-3deg);
  }
  38% {
    transform: translate(9px, 0px) rotate(-1deg);
  }
  40% {
    transform: translate(0, 0) rotate(0);
  }
  100% {
    transform: translate(0, 0) rotate(0);
  }
`;

const Container = styled.header`
  width: 100%;
  background: var(--color-primary-500-background);
  background: linear-gradient(
    197deg,
    var(--color-primary-500-background) 0%,
    var(--color-primary-400-background) 100%
  );
  color: var(--color-primary-500-foreground);
  overflow: hidden;
  position: relative;
  padding: 0 0 4rem;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  transform: translate3d(0, 0, 0);
`;

const Message = styled.div`
  padding: 4rem 3.2rem 0;

  & p {
    width: 100%;
    max-width: 55rem;
    margin: 0 auto;
    padding: 1.2rem 1.8rem;
    font-family: Quicksand;
    background: var(--color-primary-700-background);
    color: var(--color-primary-700-foreground);
    border-radius: 0.4rem;
    text-align: center;
    z-index: 2;
    position: relative;
    filter: drop-shadow(0 0.4rem 2rem rgba(0, 0, 0, 0.4));
  }

  &:target {
    p {
      animation: ${wiggle} 4s ease-in-out infinite 0.8s;

      @media (prefers-reduced-motion) {
        animation: none;
      }
    }
  }
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  z-index: 2;

  @media (min-width: 850px) {
    text-align: left;
    align-items: flex-start;
    max-width: 60rem;
    margin: 0;
  }
`;

const Subtitle = styled.span`
  font-size: 2.4rem;
  font-family: Quicksand;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 1.8rem;
  height: 4.8rem;
  border: 0 none;
  font-size: 1.6rem;
  background: var(--color-primary-700-background);
  color: var(--color-primary-700-foreground);
  border-radius: 0.4rem;
  margin: 3.2rem 0;
  transition: background 0.2s;

  @media (min-width: 850px) {
    margin: 3.2rem 0 0;
  }

  &:hover,
  &:focus {
    background: var(--color-primary-800-background);
    color: var(--color-primary-800-foreground);
  }

  & svg {
    height: 1.4em;
    width: auto;
    margin: 0 1.2rem 0 0;
  }
`;

const OutlineLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 1.8rem;
  height: 4.8rem;
  width: 19rem;
  font: inherit;
  font-size: 1.6rem;
  color: var(--color-primary-400-background);
  border: 0.2rem solid currentColor;
  border-radius: 0.4rem;
  text-decoration: none;
  transition: color 0.2s, border 0.2s;

  &:hover,
  &:focus {
    text-decoration: none;
    color: var(--color-primary-600-background);
  }

  & svg {
    height: 1.4em;
    width: auto;
    margin: 0 0.6rem 0 0;
  }
`;

const Hero = styled.div`
  position: absolute;
  top: 15rem;
  left: calc(50% + 20.5rem);
  height: 50rem;
  z-index: 1;
  transform: rotate(12deg);
  display: none;

  @media (min-width: 850px) {
    display: flex;
  }

  img {
    height: 100%;
    width: auto;
  }
`;

const WrapButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3.2rem 0 2.4rem;

  @media (min-width: 850px) {
    flex-direction: row;
    margin: 2.4rem 0 4.8rem;
  }

  & > * {
    margin: 0 0 0.8rem;

    @media (min-width: 850px) {
      margin: 0 0.8rem 0 0;
    }

    &:last-child {
      margin: 0;
    }
  }
`;

export function Header() {
  const twitterText =
    "Finally! The VS Code Bugsnag Extension (that nobody asked for) 😅🚀";

  const twitterUrl = "https://vscode-bugsnag-stepthrough.vercel.app";

  return (
    <>
      <Container>
        <Message id="unofficial">
          <p>
            Please note that this is <u>not</u> an official Bugsnag product. I
            have no connection to Bugsnag, I was just bored over the weekend and
            wanted to have some fun!
          </p>
        </Message>

        <Inner>
          <WrapContent>
            <h1>The Bugsnag Extension for VSCode</h1>
            <Subtitle>
              ...that no one asked for! Making fixing open issues a breeze by
              making it part of your daily routine.
            </Subtitle>

            <Button
              onClick={() => {
                event({ action: "install_clicked" });
                customProtocolCheck(
                  "vscode:extension/julianburr.vscode-bugsnag-stepthrough",
                  () =>
                    alert("You need to have VSCode installed for this to work!")
                );
              }}
            >
              Install in VS Code
            </Button>
          </WrapContent>

          <Hero>
            <picture>
              <source srcSet={heroWebp.src} type="image/webp" />
              <source srcSet={heroPng.src} type="image/png" />
              <img
                src={heroPng.src}
                alt="Screenshot of the VS Code Extension"
              />
            </picture>
          </Hero>
        </Inner>
      </Container>

      <WrapButtons>
        <OutlineLink
          href="https://github.com/julianburr/vscode-bugsnag-stepthrough"
          target="_blank"
          rel="noreferral nofollow"
        >
          <GithubSvg />
          <span>View on Github</span>
        </OutlineLink>
        <OutlineLink
          href={
            `https://twitter.com/intent/tweet` +
            `?text=${encodeURIComponent(twitterText)}` +
            `&url=${encodeURIComponent(twitterUrl)}` +
            `&via=jburr90`
          }
          target="_blank"
          rel="noreferral nofollow"
        >
          <TwitterSvg />
          <span>Share on Twitter</span>
        </OutlineLink>
      </WrapButtons>
    </>
  );
}
