import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

export type PaginationProps = {
  page: number;
  style?: React.CSSProperties;
  className?: string;
  onClickPrev?: () => void;
  onClickNext?: () => void;
};

export const Pagination = (props: PaginationProps) => {
  return (
    <Flex
      align="center"
      gap="3"
      className={props.className}
      style={props.style}
    >
      <Button variant="outline" onClick={props.onClickPrev}>
        Prev
      </Button>
      <Text size="1">{`Page: ${props.page}`}</Text>
      <Button variant="outline" onClick={props.onClickNext}>
        Next
      </Button>
    </Flex>
  );
};
