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
        return "px-2 py-1 text-sm gap-x-1";
      case "small":
        return "px-3 py-2 text-sm gap-x-2";
      case "medium":
        return "px-4 py-3 text-base gap-x-3";
      case "large":
        return "px-6 py-3 text-base gap-x-3";
    }
  };

  return (
    <button
      {...props}
      className={`${
        className ?? ""
      } flex items-center rounded-lg text-white font-medium bg-admin-dark transition duration-200 whitespace-nowrap hover:bg-admin-hover-dark justify-start ${buttonStyles(
        size
      )} ${
        isloading && "pointer-events-none bg-opacity-10 cursor-not-allowed"
      }`}
    >
      <span className="text-sm md:text-base lg:text-lg">
        {isloading ? <BiLoaderAlt className="animate-spin" /> : icon}
      </span>
      <span>{title}</span>
    </button>
  );
};

export default ButtonPrimary;
