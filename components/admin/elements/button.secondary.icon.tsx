import React, { FC, ReactNode } from "react";

interface ButtonSecondaryIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string | "";
  icon: ReactNode;
  size?: "extrasmall" | "small" | "medium" | "large";
}

const ButtonSecondaryIcon: FC<ButtonSecondaryIconProps> = (props) => {
  const buttonStyles = (size: "extrasmall" | "small" | "medium" | "large") => {
    switch (size) {
      case "extrasmall":
        return "p-1 h-8 w-8";
      case "small":
        return "p-2 h-10 w-10";
      case "medium":
        return "p-3 h-12 w-12";
      case "large":
        return "py-3 h-12 w-12";
    }
  };
  return (
    <button
      {...props}
      className={`${
        props.className ?? ""
      } flex items-center justify-center  rounded-lg text-admin-hover-dark bg-white aspect-square transition duration-200 border hover:bg-gray-100 ${buttonStyles(
        props.size ?? "large"
      )}`}
    >
      <span className="text-sm md:text-base lg:text-lg">{props.icon}</span>
    </button>
  );
};

export default ButtonSecondaryIcon;
