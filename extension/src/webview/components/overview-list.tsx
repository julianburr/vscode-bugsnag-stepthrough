import { Link } from "react-router-dom";
import styled from "styled-components";

import { ErrorDetails } from "../types/bugsnag";

import { LinkButton } from "./button";
import { Spacer } from "./spacer";
import { List, Meta, Title } from "./list";

const WrapStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
    <>
      <WrapStart>
        <LinkButton to={`/details/${errors[0].id}`}>
          Start stepthrough
        </LinkButton>
      </WrapStart>

      <Spacer height="30px" />

      <List>
        {errors.map((error) => (
          <li key={error.id}>
            <Link to={`/details/${error.id}`}>
              <Title>
                <b>{error.error_class}</b>
                <span>{error.context}</span>
              </Title>
              <Meta>{error.message}</Meta>
            </Link>
          </li>
        ))}
      </List>
    </>
  );
}
