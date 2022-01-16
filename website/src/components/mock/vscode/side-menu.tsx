import styled from "styled-components";

import FilesSvg from "src/assets/icons/vscode/files.svg";
import SearchSvg from "src/assets/icons/vscode/search.svg";
import SourceControlSvg from "src/assets/icons/vscode/source-control.svg";
import DebugSvg from "src/assets/icons/vscode/debug-alt.svg";
import ExtensionsSvg from "src/assets/icons/vscode/extensions.svg";
import BugsnagSvg from "src/assets/icons/bugsnag.svg";
import AccountSvg from "src/assets/icons/vscode/account.svg";
import SettingsSvg from "src/assets/icons/vscode/settings-gear.svg";
import customProtocolCheck from "custom-protocol-check";

const Container = styled.menu`
  display: flex;
  flex-direction: column;
  width: 5rem;
  background: var(--vscode-sidemenu-background);
  color: var(--vscode-sidemenu-foreground);
  margin: 0;
  padding: 0;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;

    &:first-child {
      flex: 1;
    }
  }

  li {
    margin: 0;
    padding: 0;
    list-style: none;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5rem;
      height: 5rem;
      position: relative;
      color: inherit;
      text-decoration: none;
      position: relative;

      & svg {
        width: 2.4rem;
        height: auto;
      }

      &:hover {
        color: var(--vscode-sidemenu-active-foreground);
      }

      &.active {
        color: var(--vscode-sidemenu-active-foreground);

        &:before {
          content: " ";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 0.2rem;
          background: var(--vscode-sidemenu-active-foreground);
        }
      }
    }
  }
`;

export function SideMenu() {
  return (
    <Container>
      <ul>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <FilesSvg />
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <SearchSvg />
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <SourceControlSvg />
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <DebugSvg />
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              customProtocolCheck(
                "vscode:extension/julianburr.vscode-bugsnag-stepthrough",
                () => console.error("VS Code not available")
              );
            }}
          >
            <ExtensionsSvg />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="active"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <BugsnagSvg />
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <AccountSvg />
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <SettingsSvg />
          </a>
        </li>
      </ul>
    </Container>
  );
}
