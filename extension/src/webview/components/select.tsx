import { ComponentProps, HTMLProps, ReactNode } from "react";
import styled from "styled-components";

import ChevronDownSvg from "assets/icons/vscode/chevron-down.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  span {
    font-size: 8px;
    text-transform: uppercase;
    opacity: 0.5;
    margin: 0 0 2px;
  }
`;

const WrapSelect = styled.div`
  display: flex;
  position: relative;
  color: var(--vscode-settings-dropdownForeground);

  svg {
    display: flex;
    height: 16px;
    width: auto;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  height: var(--vscode-custom-input-height);
  padding: 0 5px;
  background: var(--vscode-settings-dropdownBackground);
  color: var(--vscode-settings-dropdownForeground);
  border: 1px solid var(--vscode-settings-dropdownBorder);
  appearance: none;
`;

type SelectProps = ComponentProps<typeof StyledSelect> & {
  label: ReactNode;
  items: { value: any; label: ReactNode }[];
};

export function Select({ label, items, ...props }: SelectProps) {
  return (
    <Container>
      <Label>
        <span>{label}</span>
        <WrapSelect>
          <StyledSelect {...props}>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </StyledSelect>
          <ChevronDownSvg role="presentation" />
        </WrapSelect>
      </Label>
    </Container>
  );
}
