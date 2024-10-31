import { lora } from "@/lib/fonts";
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
      className={`${lora.className} ${
        props.disabled || isLoading ? "pointer-events-none" : ""
      } ${className} bg-white text-aruna-dark hover:bg-white/30 hover:text-white rounded-full min-w-24 backdrop-blur-sm px-8 py-3 flex border-[0.7px] border-white transition-colors ease-in-out duration-700 ${
        fullWidth ? "w-full justify-center" : "justify-between"
      } items-center gap-x-3 md:gap-x-5 relative overflow-hidden shadow-sm`}
    >
      <span className="text-sm md:text-base whitespace-nowrap">{title}</span>
      <div className="flex justify-center items-center">
        <span>
          {isLoading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      </div>
    </button>
  );
};

export default Button;
