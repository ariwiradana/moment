import { merienda } from "@/lib/fonts";
import React, { FC } from "react";

interface Props {
  title: string;
  className?: string;
}

const Title: FC<Props> = ({ className, title = false }) => {
  return (
    <div
      className={`${
        merienda.className
      } text-3xl lg:text-4xl text-center text-theme1-gold ${
        className ?? ""
      } relative`}
    >
      <span>{title}</span>
    </div>
  );
};

export default Title;
