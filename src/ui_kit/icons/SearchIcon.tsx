import React, { ComponentProps } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type SearchIconProps = ComponentProps<typeof MagnifyingGlassIcon>;
export const SearchIcon = (props: SearchIconProps) => {
  return <MagnifyingGlassIcon {...props} />;
};

export default SearchIcon;
