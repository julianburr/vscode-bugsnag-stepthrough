import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
    stroke-dashoffset: calc(0.6 * var(--spinner-size));
  } 

  50% {
    transform: rotate(720deg);
    stroke-dashoffset: calc(${Math.PI} * var(--spinner-size));
  } 

  100% {
    transform: rotate(1080deg);
    stroke-dashoffset: calc(0.6 * var(--spinner-size));
  }
`;

const Svg = styled.svg<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  x: 0px;
  y: 0px;
  viewbox: ${(props) => `0 0 ${props.size}px ${props.size}px`};
`;

const Circle = styled.circle<{ size: number; width: number; color: string }>`
  --spinner-size: ${(props) => `${props.size}px`};
  fill: transparent;
  stroke: ${(props) => props.color};
  stroke-width: ${(props) => props.width};
  stroke-linecap: round;
  stroke-dasharray: ${(props) => Math.PI * props.size}px;
  stroke-radius: ${(props) => `${props.width}px`};
  transform-origin: ${(props) => `${props.size / 2}px ${props.size / 2}px 0`};
  animation: ${spin} 3s linear infinite;
`;

type SpinnerProps = {
  size?: number;
  width?: number;
  color?: string;
};

export function Spinner({
  size = 18,
  width = 2,
  color = "var(--vscode-foreground)",
}: SpinnerProps) {
  return (
    <Svg size={size}>
      <Circle
        size={size}
        width={width}
        color={color}
        cx={size / 2}
        cy={size / 2}
        r={(size - width) / 2}
      />
    </Svg>
  );
}
