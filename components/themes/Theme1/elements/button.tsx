import { afacad } from "@/lib/fonts";
import Image from "next/image";
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
      } ${className} text-white rounded-full min-w-24 bg-theme1-primary pl-4 pr-3 py-3 lg:pl-4 lg:pr-3 text-base flex ${
        fullWidth ? "w-full justify-center" : "justify-between"
      } items-center gap-x-3 lg:gap-x-4 relative overflow-hidden shadow-sm`}
    >
      <Image
        sizes="100px"
        alt={`img-${title}`}
        src="/images/theme1/pattern2.png"
        fill
        className="w-full h-full object-cover opacity-5"
      />
      <span className="text-sm lg:text-base whitespace-nowrap">{title}</span>
      <div className="w-5 lg:w-8 h-5 lg:h-8 rounded-full bg-white text-theme1-primary flex justify-center items-center">
        <span>
          {isLoading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      </div>
    </button>
  );
};

export default Button;
