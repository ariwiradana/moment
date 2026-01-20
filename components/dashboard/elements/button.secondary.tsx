import { redhat } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonSecondaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string | "";
  icon?: ReactNode;
  size?: "extrasmall" | "small" | "medium" | "large";
  isloading?: boolean;
}

const ButtonSecondary: FC<ButtonSecondaryProps> = ({
  title,
  className = "",
  icon,
  size = "large",
  isloading = false,
  ...props
}) => {
  const buttonStyles = (size: "extrasmall" | "small" | "medium" | "large") => {
    switch (size) {
      case "extrasmall":
        return "px-2.5 py-1.5 text-xs gap-x-1";
      case "small":
        return "px-4 py-2 text-sm gap-x-2";
      case "medium":
        return "px-4 py-3 text-sm md:text-base gap-x-2";
      case "large":
        return "px-6 py-4 text-base gap-x-3";
    }
  };

  const iconStyles = (size: "extrasmall" | "small" | "medium" | "large") => {
    switch (size) {
      case "extrasmall":
        return "text-xs";
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
      } flex items-center text-dashboard-dark font-medium rounded-full border border-zinc-400 transition duration-200 whitespace-nowrap justify-start ${buttonStyles(
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

export default ButtonSecondary;
