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
      } ${className} text-samaya-primary rounded-full min-w-24 bg-samaya-primary/20 px-5 py-3 text-base flex hover:bg-samaya-primary transition-colors ease-in-out duration-500 hover:text-samaya-dark ${
        fullWidth ? "w-full justify-center" : "justify-between"
      } items-center gap-x-2 lg:gap-x-4 relative overflow-hidden shadow-sm`}
    >
      <span className="text-sm lg:text-base whitespace-nowrap font-medium">{title}</span>
      <div className="flex justify-center items-center">
        <span>
          {isLoading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      </div>
    </button>
  );
};

export default Button;
