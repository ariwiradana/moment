import { afacad } from "@/lib/fonts";
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
      className={`${afacad.className} ${
        props.disabled || isLoading ? "pointer-events-none" : ""
      } ${className} text-samaya-dark rounded-full min-w-24 bg-samaya-primary pl-5 pr-3 py-3 lg:pl-5 lg:pr-3 text-base flex ${
        fullWidth ? "w-full justify-center" : "justify-between"
      } items-center gap-x-3 lg:gap-x-4 relative overflow-hidden shadow-sm`}
    >
      <span className="text-sm lg:text-base whitespace-nowrap font-semibold">{title}</span>
      <div className="w-5 lg:w-8 h-5 lg:h-8 rounded-full bg-samaya-dark text-samaya-primary flex justify-center items-center">
        <span>
          {isLoading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      </div>
    </button>
  );
};

export default Button;
