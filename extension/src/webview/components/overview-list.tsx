import { Link } from "react-router-dom";
import styled from "styled-components";

import { LinkButton } from "./button";
import { Spacer } from "./spacer";

import { ErrorDetails } from "../types/bugsnag";

const Container = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  position: relative;

  li {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 2px 0 0;

    a {
      display: flex;
      flex-direction: column;
      padding: 10px;
      color: inherit;
      position: relative;

      & > * {
        position: relative;
        z-index: 1;
      }

      &:before {
        content: " ";
        position: absolute;
        inset: 0;
        background: var(--vscode-editorIndentGuide-background);
        opacity: 0.4;
        z-index: 0;
      }

      &:hover:before {
        opacity: 1;
      }
    }
  }
`;

const WrapStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin: 0 0 2px;
  padding: 0;
  font-size: 12px;
  font-weight: normal;

  b {
    font-weight: bold;
    padding-right: 6px;
  }
`;

const Message = styled.div`
  font-size: 10px;
  opacity: 0.5;
`;

const Center = styled.div`
  text-align: center;
  width: 100%;
`;

type OverviewListProps = {
  errors: ErrorDetails[];
};

export function OverviewList({ errors }: OverviewListProps) {
  if (!errors.length) {
    return <Center>There are no errors left in this list.</Center>;
  }

  return (
    <Container>
      <WrapStart>
        <LinkButton to={`/details/${errors[0].id}`}>
          Start stepthrough
        </LinkButton>
      </WrapStart>

      <Spacer height="30px" />

      {errors.map((error) => (
        <li key={error.id}>
          <Link to={`/details/${error.id}`}>
            <Title>
              <b>{error.error_class}</b>
              <span>{error.context}</span>
            </Title>
            <Message>{error.message}</Message>
          </Link>
        </li>
      ))}
    </Container>
  );
}
