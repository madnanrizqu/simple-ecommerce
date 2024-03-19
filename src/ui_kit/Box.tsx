import React, { ComponentProps } from "react";
import { Box as _Box } from "@radix-ui/themes";

type BoxProps = ComponentProps<typeof _Box>;
export const Box = (props: BoxProps) => {
  return <_Box {...props} />;
};

export default Box;
