"use client";

import { TextFieldRoot, TextFieldInput, TextFieldSlot } from "@radix-ui/themes";
import React, { ReactNode } from "react";

export type InputProps = {
  placeholder?: string;
  rightIcon?: ReactNode;
  onChange?: (v: string) => void;
  style?: React.CSSProperties;
};
export const Input = (props: InputProps) => {
  return (
    <TextFieldRoot>
      <TextFieldInput
        style={props.style}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
      {props.rightIcon && (
        <TextFieldSlot style={props.style}>{props.rightIcon}</TextFieldSlot>
      )}
    </TextFieldRoot>
  );
};

export default Input;
