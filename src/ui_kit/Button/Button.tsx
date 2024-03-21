import React from "react";
import { Button as _Button } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import { clsx } from "clsx";

import classes from "./Button.module.css";
import { sfProRegular } from "@/styles/font";

type ButtonProps = ComponentProps<typeof _Button>;
export const Button = (props: ButtonProps) => {
  return (
    <_Button
      className={clsx(classes.common, sfProRegular.className, {
        [classes[props.variant ?? "solid"]]: props.variant ?? "solid",
      })}
      {...props}
    />
  );
};

export default Button;
