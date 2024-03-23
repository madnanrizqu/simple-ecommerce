"use client";

import { TextFieldRoot, TextFieldInput, TextFieldSlot } from "@radix-ui/themes";
import React, {
  ChangeEvent,
  ComponentProps,
  LegacyRef,
  ReactNode,
  forwardRef,
} from "react";

export type InputProps = ComponentProps<typeof TextFieldInput> & {
  rightIcon?: ReactNode;
};

export const Input = forwardRef(
  (props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
    return (
      <TextFieldRoot>
        <TextFieldInput
          ref={ref}
          value={props.value}
          className={props.className}
          style={props.style}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
        {props.rightIcon && (
          <TextFieldSlot style={props.style}>{props.rightIcon}</TextFieldSlot>
        )}
      </TextFieldRoot>
    );
  }
);

Input.displayName = "Input";

export default Input;
