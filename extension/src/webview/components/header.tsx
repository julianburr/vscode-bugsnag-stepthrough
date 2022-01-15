import styled from "styled-components";

import { Link } from "src/webview/components/link";
import ArrowLeftSvg from "assets/icons/vscode/arrow-left.svg";
import SettingsSvg from "assets/icons/vscode/settings-gear.svg";

const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 -20px;
  padding: 0 20px;
  background: var(--vscode-sideBar-background);
  position: sticky;
  top: 0;
  z-index: 20;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.h1<{ paddingLeft?: boolean }>`
  font-size: 11px;
  text-transform: uppercase;
  margin: 6px 0;
  padding: ${(props) => (props.paddingLeft ? "0 0 0 8px" : "0")};
`;

const IconLink = styled(Link)`
  margin: 3px 0 0;

  svg {
    height: 1em;
    margin: 0;
  }
`;

type HeaderProps = {
  title: string;
  backTo?: string;
  settingsLink?: boolean;
};

export function Header({ title, backTo, settingsLink }: HeaderProps) {
  return (
    <Container>
      <Left>
        {backTo && (
          <IconLink to={backTo} title="Back to overview">
            <ArrowLeftSvg />
          </IconLink>
        )}
        <Title paddingLeft={!!backTo}>{title}</Title>
      </Left>
      {settingsLink && (
        <IconLink to="/settings" title="Go to settings">
          <SettingsSvg />
        </IconLink>
      )}
    </Container>
  );
}
