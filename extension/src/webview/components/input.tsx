import { ComponentProps } from "react";
import styled from "styled-components";

export const Input = styled.input`
  font: inherit;
  padding: 0 5px;
  color: var(--vscode-settings-textInputForeground);
  border: 1px solid var(--vscode-settings-textInputBorder);
  background: var(--vscode-settings-textInputBackground);
  height: var(--vscode-custom-input-height);
  width: 100%;

  &::placeholder {
    color: var(--vscode-input-placeholderForeground);
  }
`;

export function TextInput(props: ComponentProps<typeof Input>) {
  return <Input type="text" {...props} />;
}

export function EmailInput(props: ComponentProps<typeof Input>) {
  return <Input type="email" {...props} />;
}
