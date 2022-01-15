declare module "*.svg" {
  import { ComponentType, HTMLProps } from "react";
  const content: ComponentType<HTMLProps<SVGElement>>;
  export default content;
}
