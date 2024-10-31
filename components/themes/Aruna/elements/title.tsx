import { afacad, windsong } from "@/lib/fonts";
import React, { FC } from "react";

interface Props {
  title: string;
  className?: string;
  caption?: string;
  white?: boolean;
}

const Title: FC<Props> = ({
  className,
  title = false,
  caption,
  white = false,
}) => {
  return (
    <div
      className={`${windsong.className} text-4xl lg:text-5xl text-center ${
        white ? "text-white" : "text-samaya-primary"
      } ${className ?? ""} relative`}
    >
      <span>{title}</span>
      {caption && (
        <div className="flex items-center gap-x-2 justify-center">
          <div
            className={`h-[0.5px] w-20 ${
              white ? "bg-white" : "bg-samatext-samaya-primary"
            }`}
          ></div>
          <p
            className={`${white ? "text-white" : "text-samaya-primary"} ${
              afacad.className
            } text-sm`}
          >
            {caption}
          </p>
        </div>
      )}
    </div>
  );
};

export default Title;
