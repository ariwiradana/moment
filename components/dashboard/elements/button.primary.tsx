import { afacad } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string | undefined;
  className?: string | "";
  icon?: ReactNode;
  size?: "extrasmall" | "small" | "medium" | "large";
  isloading?: boolean;
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  title = undefined,
  className = "",
  icon,
  size = "large",
  isloading = false,
  ...props
}) => {
  const buttonStyles = (size: "extrasmall" | "small" | "medium" | "large") => {
    switch (size) {
      case "extrasmall":
        return "px-2 py-1 text-sm gap-x-1";
      case "small":
        return "px-3 py-2 text-sm gap-x-2";
      case "medium":
        return "px-4 py-3 text-base gap-x-3";
      case "large":
        return "px-6 py-3 text-lg gap-x-3";
    }
  };
  const iconStyles = (size: "extrasmall" | "small" | "medium" | "large") => {
    switch (size) {
      case "extrasmall":
        return "text-sm";
      case "small":
        return "text-base";
      case "medium":
        return "text-lg";
      case "large":
        return "text-xl";
    }
  };

  return (
    <button
      {...props}
      disabled={isloading ? true : false}
      className={`${afacad.className} ${
        className ?? ""
      } flex items-center text-dashboard-dark rounded whitespace-nowrap font-medium bg-dashboard-primary bg-opacity-95 transition duration-500 hover:bg-opacity-100 justify-start ${
        !title ? "p-2 md:p-2 lg:p-2" : buttonStyles(size)
      } ${isloading && "pointer-events-none bg-opacity-10 cursor-not-allowed"}`}
    >
      <span className={iconStyles(size)}>
        {isloading ? <BiLoaderAlt className="animate-spin" /> : icon}
      </span>
      {title && <span>{title}</span>}
    </button>
  );
};

export default ButtonPrimary;
