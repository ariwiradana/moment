import {  marcellus } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  isLoading?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const Button: FC<Props> = ({
  title,
  icon,
  isLoading,
  className = "",
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${marcellus.className} ${
        props.disabled || isLoading ? "pointer-events-none" : ""
      } ${className} text-flora-dark rounded-full min-w-24 bg-flora-primary px-5 py-3 text-base flex ${
        fullWidth ? "w-full justify-center" : "justify-between"
      } items-center gap-x-2 lg:gap-x-4 relative overflow-hidden shadow-sm`}
    >
      <span className="text-sm lg:text-base whitespace-nowrap font-semibold">
        {title}
      </span>
      <div className="text-flora-dark flex justify-center items-center">
        <span>
          {isLoading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      </div>
    </button>
  );
};

export default Button;
