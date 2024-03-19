import React, { ComponentProps } from "react";
import { Flex as _Flex } from "@radix-ui/themes";

export type FlexProps = ComponentProps<typeof _Flex>;
export const Flex = (props: FlexProps) => {
  return <_Flex {...props} />;
};
