import React, { FC, ReactNode } from "react";

interface ButtonPrimaryIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string | "";
  icon: ReactNode;
  size?: "extrasmall" | "small" | "medium" | "large";
}

const ButtonPrimaryIcon: FC<ButtonPrimaryIconProps> = (props) => {
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
      } flex items-center justify-center h-12 w-12 rounded-lg text-white bg-admin-dark aspect-square transition duration-200 hover:bg-admin-hover-dark ${buttonStyles(
        props.size ?? "large"
      )}`}
    >
      <span className="text-lg">{props.icon}</span>
    </button>
  );
};

export default ButtonPrimaryIcon;
