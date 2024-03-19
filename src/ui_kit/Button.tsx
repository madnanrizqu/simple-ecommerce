import React from "react";
import { Button as _Button } from "@radix-ui/themes";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof _Button>;
export const Button = (props: ButtonProps) => {
  return <_Button {...props} />;
};

export default Button;
