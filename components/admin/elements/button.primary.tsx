import React, { FC, ReactNode } from "react";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string | "";
  icon?: ReactNode;
  size?: "extrasmall" | "small" | "medium" | "large";
}

const ButtonPrimary: FC<ButtonPrimaryProps> = (props) => {
  const buttonStyles = (size: "extrasmall" | "small" | "medium" | "large") => {
    switch (size) {
      case "extrasmall":
        return "px-2 py-1 text-sm gap-x-1";
      case "small":
        return "px-3 py-2 text-sm";
      case "medium":
        return "px-4 py-3 text-base";
      case "large":
        return "px-6 py-3 text-base";
    }
  };

  return (
    <button
      {...props}
      className={`${
        props.className ?? ""
      } flex items-center rounded-lg text-white font-medium bg-admin-dark transition duration-200 hover:bg-admin-hover-dark justify-start ${buttonStyles(
        props.size ?? "large"
      )}`}
    >
      <span className="text-sm md:text-base lg:text-lg">{props.icon}</span>
      <span className={`${props.icon ? "ml-2" : "ml-0"}`}>{props.title}</span>
    </button>
  );
};

export default ButtonPrimary;
