declare module "*.svg" {
  import { ComponentType, HTMLProps } from "react";
  export const ReactComponent: ComponentType<HTMLProps<SVGElement>>;
}
