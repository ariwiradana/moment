import { alexbrush } from "@/lib/fonts";
import React, { FC } from "react";

interface Props {
  title: string;
  className?: string;
}

const Title: FC<Props> = (props) => {
  return (
    <h1
      className={`${
        alexbrush.className
      } text-[40px] md:text-5xl text-center text-theme1-gold ${props.className ?? ""}`}
    >
      {props.title}
    </h1>
  );
};

export default Title;
