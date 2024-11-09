import { roboto } from "@/lib/fonts";
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
      className={`${roboto.className} ${
        props.disabled || isLoading ? "pointer-events-none" : ""
      } ${className} bg-white text-aruna-dark hover:bg-white/70 rounded-full min-w-24 backdrop-blur-sm px-5 py-3 flex transition-colors ease-in-out duration-700 ${
        fullWidth ? "w-full justify-center" : "justify-between"
      } items-center gap-x-3 md:gap-x-5 relative overflow-hidden shadow-sm`}
    >
      <span className="text-[10px] md:text-xs uppercase tracking-[1px] whitespace-nowrap">
        {title}
      </span>
      <div className="flex justify-center items-center text-sm md:text-base">
        <span>
          {isLoading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      </div>
    </button>
  );
};

export default Button;
