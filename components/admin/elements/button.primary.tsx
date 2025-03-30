import { redhat } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string | "";
  icon?: ReactNode;
  size?: "extrasmall" | "small" | "medium" | "large";
  isloading?: boolean;
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
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
        return "px-2 py-2 text-xs gap-x-1";
      case "small":
        return "px-3 py-3 text-xs gap-x-2";
      case "medium":
        return "px-4 py-3 text-sm gap-x-3";
      case "large":
        return "px-6 py-4 text-sm gap-x-3";
    }
  };

  return (
    <button
      {...props}
      className={`${redhat.className} ${
        className ?? ""
      } flex items-center text-white font-medium rounded-lg bg-dashboard-dark transition duration-200 whitespace-nowrap hover:bg-admin-hover-dark justify-start ${buttonStyles(
        size
      )} ${
        isloading || props.disabled
          ? "pointer-events-none bg-opacity-50 cursor-not-allowed"
          : ""
      }`}
    >
      <span className="text-sm md:text-sm lg:text-lg">
        {isloading ? <BiLoaderAlt className="animate-spin" /> : icon}
      </span>
      <span>{title}</span>
    </button>
  );
};

export default ButtonPrimary;
