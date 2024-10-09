import { afacad } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  isLoading?: boolean;
  className?: string;
}

const Button: FC<Props> = ({
  title,
  icon,
  isLoading,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${afacad.className} ${
        props.disabled || isLoading ? "pointer-events-none" : ""
      } ${className} text-white rounded-full min-w-32 bg-theme1-primary pl-4 pr-3 py-3 lg:pl-4 lg:pr-3 text-base flex justify-between items-center gap-x-3 lg:gap-x-4 relative overflow-hidden shadow-sm`}
    >
      <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-5"></span>
      <span className="text-sm lg:text-base">{title}</span>
      <div className="w-5 lg:w-8 h-5 lg:h-8 rounded-full bg-white text-theme1-primary flex justify-center items-center">
        <span>
          {isLoading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      </div>
    </button>
  );
};

export default Button;
