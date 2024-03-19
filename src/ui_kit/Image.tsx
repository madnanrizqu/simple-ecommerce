import React, { ComponentProps } from "react";
import { default as _Image } from "next/image";

type ImageProps = ComponentProps<typeof _Image>;
export const Image = (props: ImageProps) => {
  return <_Image {...props} />;
};

export default Image;
