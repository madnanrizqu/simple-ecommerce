import React from "react";
import classes from "./DashboardChip.module.css";
import clsx from "clsx";

type DashboardChip = {
  variant: "active" | "inActive";
};
const DashboardChip = (props: DashboardChip) => {
  return (
    <div
      className={clsx(classes.common, {
        [classes.chipActive]: props.variant === "active",
        [classes.chipInActive]: props.variant === "inActive",
      })}
    >
      {props.variant === "active" ? "Aktif" : "Tidak Aktif"}
    </div>
  );
};

export default DashboardChip;
