import { montserrat } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  isLoading?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const ButtonLight: FC<Props> = ({
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
      className={`${montserrat.className} ${
        props.disabled || isLoading ? "pointer-events-none" : ""
      } ${className} bg-nirvaya-light-brown text-nirvaya-dark hover:bg-nirvaya-dark hover:text-white rounded-full min-w-24 backdrop-blur-sm px-5 py-3 flex transition-colors ease-in-out duration-700 ${
        fullWidth ? "w-full justify-center" : "justify-between"
      } items-center gap-x-3 relative overflow-hidden shadow-sm`}
    >
      <span className="text-[10px] md:text-xs uppercase tracking-[2px] whitespace-nowrap">
        {title}
      </span>
      <div className="flex justify-center items-center text-xs md:text-sm">
        <span>
          {isLoading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      </div>
    </button>
  );
};

export default ButtonLight;
