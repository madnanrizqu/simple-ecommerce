import { Image } from "@/ui_kit";
import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import classes from "./DashboardCard.module.css";

export type DashboardCardProps = {
  title: string;
  value: string;
  valueLabel: string;
};
const DashboardCard = (props: DashboardCardProps) => {
  return (
    <Flex direction="column" className={classes.card}>
      <Text className={classes.cardTitle}>{props.title}</Text>
      <Text
        className={classes.cardValue}
      >{`${props.value} ${props.valueLabel}`}</Text>
      <Box className={classes.cardElipsis1}>
        <Image
          alt=""
          src="/images/dashboard_elipsis_1.png"
          width={55}
          height={62}
        />
      </Box>
      <Box className={classes.cardElipsis2}>
        <Image
          alt=""
          src="/images/dashboard_elipsis_2.png"
          width={55}
          height={62}
        />
      </Box>
    </Flex>
  );
};

export default DashboardCard;
