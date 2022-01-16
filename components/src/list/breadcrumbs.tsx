import dayjs from "dayjs";
import styled from "styled-components";

import { EventBreadcrumb } from "../../types/bugsnag";
import { List, Meta, Title } from "../list/core";

import NavigationSvg from "../../assets/icons/navigation.svg";
import ErrorSvg from "../../assets/icons/alert-triangle.svg";
import RequestSvg from "../../assets/icons/refresh-cw.svg";
import ProcessSvg from "../../assets/icons/truck.svg";
import LogSvg from "../../assets/icons/file-text.svg";
import StateSvg from "../../assets/icons/log-out.svg";
import UserSvg from "../../assets/icons/user.svg";

const ICONS = {
  navigation: NavigationSvg,
  request: RequestSvg,
  process: ProcessSvg,
  log: LogSvg,
  user: UserSvg,
  state: StateSvg,
  error: ErrorSvg,
  manual: LogSvg,
};

const Container = styled.a`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Left = styled.div`
  display: flex;
  flex-shrink: 0;
  margin: 0 10px 0 0;

  svg {
    height: 14px;
    width: 100%;
    opacity: 0.5;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

type BreadcrumbsListProps = {
  items: EventBreadcrumb[];
  eventTimestamp?: string;
};

export function BreadcrumbsList({
  items,
  eventTimestamp,
}: BreadcrumbsListProps) {
  return (
    <List>
      {items.reverse().map((item, index) => {
        const msBefore =
          dayjs(eventTimestamp).valueOf() - dayjs(item.timestamp).valueOf();

        const TypeSvg = ICONS[item.type as keyof typeof ICONS] || LogSvg;

        return (
          <li key={index}>
            <Container>
              <Left>
                <TypeSvg title={item.type} />
              </Left>
              <Right>
                <Title>{item.name}</Title>
                <Meta>
                  {msBefore > 1000
                    ? `${Math.ceil(msBefore / 1000)}s before`
                    : `${msBefore}ms before`}
                </Meta>
              </Right>
            </Container>
          </li>
        );
      })}
    </List>
  );
}
