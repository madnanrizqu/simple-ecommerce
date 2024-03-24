import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

export type PaginationProps = {
  page: number;
  maxPage: number;
  style?: React.CSSProperties;
  className?: string;
  onClickPrev?: (newPage: number) => void;
  onClickNext?: (newPage: number) => void;
};

export const Pagination = (props: PaginationProps) => {
  return (
    <Flex
      align="center"
      gap="3"
      className={props.className}
      style={props.style}
    >
      <Button
        variant="outline"
        disabled={props.page - 1 === 0}
        onClick={() => props.onClickPrev?.(props.page - 1)}
      >
        Prev
      </Button>
      <Text size="1">{`Page: ${props.page}`}</Text>
      <Button
        variant="outline"
        disabled={props.page === props.maxPage}
        onClick={() => props.onClickNext?.(props.page + 1)}
      >
        Next
      </Button>
    </Flex>
  );
};
