import { Box } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import { Bars } from "react-loader-spinner";
import classes from "./PageLoader.module.css";

export type PageLoaderProps = {
  children: ReactNode;
  isLoading: boolean;
};
export const PageLoader = (props: PageLoaderProps) => {
  if (!props.isLoading) {
    return props.children;
  }

  return (
    <Box className={classes.root}>
      <Bars
        wrapperClass={classes.loader}
        height="80"
        width="80"
        color="#41A0E4"
        ariaLabel="bars-loading"
        visible={true}
      />
      <Box className={classes.backdrop}></Box>
      {props.children}
    </Box>
  );
};
