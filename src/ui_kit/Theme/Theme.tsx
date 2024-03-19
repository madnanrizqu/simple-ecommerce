import { Theme as _Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./reset.css";
import "./theme-config.css";

export type ThemeProps = {
  children: React.ReactNode;
};
export const Theme = (props: ThemeProps) => {
  return (
    <_Theme appearance="light" accentColor="blue" radius="none">
      {props.children}
    </_Theme>
  );
};

import { ThemePanel as _ThemePanel } from "@radix-ui/themes";
import React from "react";

export const ThemePanel = _ThemePanel;
export default Theme;
