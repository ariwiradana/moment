import { afacad } from "@/lib/fonts";
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

const ButtonPrimary: FC<ButtonPrimaryProps> = (props) => {
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

  return (
    <button
      {...props}
      disabled={props.isloading ? true : false}
      className={`${afacad.className} ${
        props.className ?? ""
      } flex items-center text-dashboard-dark rounded whitespace-nowrap font-medium bg-dashboard-primary bg-opacity-95 transition duration-500 hover:bg-opacity-100 justify-start ${buttonStyles(
        props.size ?? "large"
      )} ${
        props.isloading &&
        "pointer-events-none bg-opacity-10 cursor-not-allowed"
      }`}
    >
      <span className="text-lg lg:text-xl">
        {props.isloading ? (
          <BiLoaderAlt className="animate-spin" />
        ) : (
          props.icon
        )}
      </span>
      <span>{props.title}</span>
    </button>
  );
};

export default ButtonPrimary;
