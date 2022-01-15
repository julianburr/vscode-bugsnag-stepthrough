import { HTMLProps, useState } from "react";
import styled from "styled-components";

import CheckSvg from "assets/icons/vscode/check.svg";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    padding: 3px 0 3px 26px;

    span {
      content: " ";
      position: absolute;
      top: 2px;
      left: 0;
      width: 18px;
      height: 18px;
      background: var(--vscode-settings-checkboxBackground);
      color: var(--vscode-settings-checkboxForeground);
      border: 1px solid var(--vscode-settings-checkboxBorder);
      margin: 0 8px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: codicon;

      svg {
        height: 16px;
        width: auto;
        opacity: 0;
      }
    }
  }

  input:checked + label {
    span svg {
      opacity: 1;
    }
  }
`;

let uuid = 0;

type CheckboxProps = HTMLProps<HTMLInputElement> & {
  label: string;
};

export function Checkbox({ label, ...props }: CheckboxProps) {
  const [instanceUuid] = useState(++uuid);
  return (
    <Container>
      <input id={instanceUuid.toString()} type="checkbox" {...props} />

      <label htmlFor={instanceUuid.toString()}>
        <span role="presentation">
          <CheckSvg />
        </span>
        {label}
      </label>
    </Container>
  );
}
