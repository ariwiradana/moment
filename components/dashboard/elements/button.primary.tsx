import { redhat } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string | undefined;
  className?: string | "";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  size?: "extrasmall" | "small" | "medium" | "large";
  isloading?: boolean;
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  title = undefined,
  className = "",
  icon,
  size = "large",
  isloading = false,
  iconPosition = "left",
  ...props
}) => {
  const buttonStyles = (size: "extrasmall" | "small" | "medium" | "large") => {
    switch (size) {
      case "extrasmall":
        return "px-2 py-1 text-xs gap-x-1";
      case "small":
        return "px-3 py-2 text-xs gap-x-2";
      case "medium":
        return "px-4 py-3 text-sm gap-x-3";
      case "large":
        return "px-6 py-3 text-base gap-x-3";
    }
  };
  const iconStyles = (size: "extrasmall" | "small" | "medium" | "large") => {
    switch (size) {
      case "extrasmall":
        return "text-xs";
      case "small":
        return "text-sm";
      case "medium":
        return "text-sm";
      case "large":
        return "text-base";
    }
  };

  return (
    <button
      {...props}
      disabled={isloading ? true : false}
      className={`${redhat.className} ${
        className ?? ""
      } rounded-full flex items-center text-dashboard-dark justify-center whitespace-nowrap bg-opacity-95 hover:bg-opacity-100 bg-dashboard-primary transition duration-500 ${
        !title ? "p-2 md:p-2 lg:p-2" : buttonStyles(size)
      } ${
        isloading || props.disabled
          ? "pointer-events-none opacity-40 cursor-not-allowed"
          : "opacity-100"
      }`}
    >
      {icon && iconPosition === "left" ? (
        <span className={iconStyles(size)}>
          {isloading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      ) : null}
      {title && <span>{title}</span>}
      {icon && iconPosition === "right" ? (
        <span className={iconStyles(size)}>
          {isloading ? <BiLoaderAlt className="animate-spin" /> : icon}
        </span>
      ) : null}
    </button>
  );
};

export default ButtonPrimary;
