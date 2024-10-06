import { afacad } from "@/lib/fonts";
import React, { FC } from "react";

interface Props {
  title: string;
  className?: string;
}

const Title: FC<Props> = ({ className, title = false }) => {
  return (
    <div
      className={`${
        afacad.className
      } text-4xl lg:text-4xl text-center text-theme1-gold ${
        className ?? ""
      } relative`}
    >
      <span>{title}</span>
    </div>
  );
};

export default Title;
