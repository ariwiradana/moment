import Loader from "@/components/admin/elements/loader";
import React, { FC, ReactNode, memo } from "react";

interface ButtonFloatingProps {
  className?: string;
  icon?: ReactNode;
  size?: "extrasmall" | "small" | "medium" | "large";
  isloading?: boolean;
  onClick?: () => void;
}

const ButtonFloating: FC<ButtonFloatingProps> = memo(
  ({ className, icon, isloading = false, onClick }) => {
    return (
      <div className="fixed bottom-6 right-6 md:right-12 md:bottom-12 z-[999]">
        <button
          onClick={onClick}
          disabled={isloading}
          className={`flex items-center p-2 lg:p-3 shadow-md rounded-full text-dashboard-dark font-medium transition duration-500 justify-center
            ${className ?? ""}
            ${
              isloading
                ? "pointer-events-none bg-opacity-10 cursor-not-allowed"
                : ""
            }`}
        >
          <span className="text-3xl lg:text-4xl">
            {isloading ? <Loader /> : icon}
          </span>
        </button>
      </div>
    );
  }
);

ButtonFloating.displayName = "ButtonFloating";

export default ButtonFloating;
