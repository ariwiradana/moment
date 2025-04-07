import { rubik } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  isLoading?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const ButtonPrimary: FC<Props> = ({
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
      className={`${rubik.className} ${
        props.disabled || isLoading ? "pointer-events-none" : ""
      } ${className} bg-white/20 text-white hover:bg-white/30 rounded-full min-w-24 backdrop-blur-sm px-4 py-3 flex transition-colors ease-in-out duration-700 ${
        fullWidth ? "w-full justify-center" : "justify-between"
      } items-center gap-x-2 md:gap-x-4 relative overflow-hidden shadow-sm`}
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

export default ButtonPrimary;
