import { balthazar } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  isLoading?: boolean;
  className?: string;
  fullWidth?: boolean;
  white?: boolean;
}

const ButtonPrimary: FC<Props> = ({
  title,
  icon,
  isLoading,
  className = "",
  fullWidth = false,
  white = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${balthazar.className} ${
        props.disabled || isLoading ? "pointer-events-none" : ""
      } ${className} ${
        !white
          ? "text-white hover:bg-nirvaya-primary bg-nirvaya-primary/50"
          : "text-nirvaya-dark bg-white"
      } rounded-full min-w-24 backdrop-blur-sm px-5 py-3 flex border-[0.7px] border-white transition-colors ease-in-out duration-700 ${
        fullWidth ? "w-full justify-center" : "justify-between"
      } items-center gap-x-2 md:gap-x-4 relative overflow-hidden shadow-sm`}
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

export default ButtonPrimary;
