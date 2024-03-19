"use client";

import { TextFieldRoot, TextFieldInput, TextFieldSlot } from "@radix-ui/themes";
import React, { ReactNode } from "react";

export type InputProps = {
  placeholder?: string;
  rightIcon?: ReactNode;
  onChange?: (v: string) => void;
};
export const Input = (props: InputProps) => {
  return (
    <TextFieldRoot>
      <TextFieldInput
        placeholder={props.placeholder}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
      {props.rightIcon && <TextFieldSlot>{props.rightIcon}</TextFieldSlot>}
    </TextFieldRoot>
  );
};

export default Input;
