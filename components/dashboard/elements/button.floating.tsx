import Loader from "@/components/admin/elements/loader";
import { afacad } from "@/lib/fonts";
import React, { FC, ReactNode } from "react";

interface ButtonFloatingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string | "";
  icon?: ReactNode;
  size?: "extrasmall" | "small" | "medium" | "large";
  isloading?: boolean;
}

const ButtonFloating: FC<ButtonFloatingProps> = (props) => {
  return (
    <div className="fixed bottom-6 right-6 md:right-12 md:bottom-12 z-[999]">
      <button
        {...props}
        disabled={props.isloading ? true : false}
        className={`${afacad.className} ${
          props.className ?? ""
        }  flex items-center p-2 lg:p-3 shadow-md rounded-full text-dashboard-dark font-medium transition duration-500 hover:bg-opacity-100 justify-center ${
          props.isloading &&
          "pointer-events-none bg-opacity-10 cursor-not-allowed"
        }`}
      >
        <span className="text-3xl lg:text-4xl">
          {props.isloading ? <Loader /> : props.icon}
        </span>
      </button>
    </div>
  );
};

export default ButtonFloating;
