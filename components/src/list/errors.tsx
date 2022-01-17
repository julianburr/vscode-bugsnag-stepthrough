import { Link } from "react-router-dom";
import styled from "styled-components";

import { ErrorDetails } from "../../types/bugsnag";
import { LinkButton } from "../button/link";
import { Spacer } from "../spacer";
import { List, Meta, Title } from "../list/core";

const WrapStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  text-align: center;
  width: 100%;
`;

type ErrorsListProps = {
  items: ErrorDetails[];
};

export function ErrorsList({ items }: ErrorsListProps) {
  if (!items.length) {
    return <Center>There are no errors left in this list.</Center>;
  }

  return (
    <>
      <WrapStart>
        <LinkButton to={`/details/${items?.[0].id}`}>
          Start stepthrough
        </LinkButton>
      </WrapStart>

      <Spacer height="30px" />

      <List>
        {items?.map((error) => (
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
