import { afacad, marcellus } from "@/lib/fonts";
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
      className={`${marcellus.className} text-3xl lg:text-4xl text-center ${
        white ? "text-white" : "text-theme1-gold"
      } ${className ?? ""} relative`}
    >
      <span>{title}</span>
      {caption && (
        <div className="flex items-center gap-x-2 justify-center">
          <div
            className={`h-[0.5px] w-32 ${
              white ? "bg-white" : "bg-theme1-gold"
            }`}
          ></div>
          <p
            className={`${white ? "text-white" : "text-theme1-gold"} ${
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
