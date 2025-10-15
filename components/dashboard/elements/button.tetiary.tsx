import { redhat } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonTetiaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string | "";
  icon?: ReactNode;
  size?: "small" | "medium" | "large";
  isloading?: boolean;
}

const ButtonTetiary: FC<ButtonTetiaryProps> = ({
  title,
  className = "",
  icon,
  size = "large",
  isloading = false,
  ...props
}) => {
  const buttonStyles = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "px-4 py-2 text-sm gap-x-2";
      case "medium":
        return "px-4 py-3 text-sm md:text-base gap-x-2";
      case "large":
        return "px-6 py-4 text-base gap-x-3";
    }
  };

  const iconStyles = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-base md:text-lg";
      case "large":
        return "text-lg";
    }
  };

  return (
    <button
      {...props}
      className={`${redhat.className} ${
        className ?? ""
      } flex items-center w-full text-white bg-white/5 font-medium rounded-full hover:bg-white/[0.07] hover:border-white/10 transition duration-200 border border-white/5 whitespace-nowrap justify-center ${buttonStyles(
        size
      )} ${
        isloading || props.disabled
          ? "pointer-events-none bg-opacity-50 cursor-not-allowed"
          : ""
      }`}
    >
      <span>{title}</span>
      <span className={iconStyles(size)}>
        {isloading ? <BiLoaderAlt className="animate-spin" /> : icon}
      </span>
    </button>
  );
};

export default ButtonTetiary;
