import { redhat } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string | "";
  icon?: ReactNode;
  size?: "small" | "medium" | "large";
  iconPosition?: "left" | "right";
  isloading?: boolean;
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  title,
  className = "",
  icon,
  size = "large",
  isloading = false,
  iconPosition = "right",
  ...props
}) => {
  const buttonStyles = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "px-4 py-2 text-xs gap-x-2";
      case "medium":
        return "px-4 py-3 text-xs gap-x-3";
      case "large":
        return "px-6 py-4 text-sm gap-x-4";
    }
  };

  const iconStyles = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "text-xs";
      case "medium":
        return "text-xs";
      case "large":
        return "text-lg";
    }
  };

  return (
    <button
      {...props}
      className={`${redhat.className} ${
        className ?? ""
      } flex items-center text-white font-medium border border-dashboard-dark rounded-full bg-dashboard-dark transition duration-200 whitespace-nowrap hover:bg-admin-hover-dark justify-start ${buttonStyles(
        size
      )} ${
        isloading || props.disabled
          ? "pointer-events-none bg-opacity-50 cursor-not-allowed"
          : ""
      }`}
    >
      {iconPosition === "left" && (
        <span className={`${iconStyles(size)}`}>
          {isloading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      )}
      <span>{title}</span>
      {iconPosition === "right" && (
        <span className={`${iconStyles(size)}`}>
          {isloading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      )}
    </button>
  );
};

export default ButtonPrimary;
