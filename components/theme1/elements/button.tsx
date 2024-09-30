import { comforta } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
}

const Button: FC<Props> = (props) => {
  return (
    <button
      {...props}
      className={`${comforta.className} text-white bg-theme1-primary pl-4 pr-3 py-3 lg:pl-6 lg:pr-4 rounded-full text-sm flex items-center gap-x-3 lg:gap-x-4 relative overflow-hidden`}
    >
      <span className="absolute inset-0 bg-[url('/images/pattern2.png')] bg-cover bg-no-repeat opacity-10"></span>
      <span className="text-xs md:text-sm lg:text-base">{props.title}</span>
      <div className="w-5 lg:w-8 h-5 lg:h-8 bg-white rounded-full text-theme1-primary flex justify-center items-center">
        <span>{props.icon}</span>
      </div>
    </button>
  );
};

export default Button;