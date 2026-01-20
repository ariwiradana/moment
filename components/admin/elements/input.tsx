import { redhat } from "@/lib/fonts";
import React, { FC, ReactNode, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  error?: string;
  className?: string;
  id?: string;
  inputSize?: "extrasmall" | "small" | "medium" | "large";
  optional?: boolean;
  description?: string;
  action?: ReactNode;
}

const Input: FC<InputProps> = ({
  label,
  error,
  className = "",
  id,
  inputSize = "large",
  optional = false,
  description = "",
  action,
  ...props
}) => {
  const paddingStyles = (size: "extrasmall" | "small" | "medium" | "large") => {
    switch (size) {
      case "extrasmall":
        return "p-1.5";
      case "small":
        return "p-2";
      case "medium":
        return "p-3";
      case "large":
        return "p-4";
    }
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={`${className ?? ""} ${redhat.className} relative`}>
      <label htmlFor={id} className="block text-dashboard-dark/60 mb-1 text-sm">
        {label}{" "}
        <span className="text-sm text-gray-400">
          {optional && "(opsional)"}
        </span>
      </label>
      <div className="relative">
        <input
          {...props}
          type={
            props.type === "password" && showPassword
              ? "text"
              : props.type === "password" && !showPassword
              ? "password"
              : props.type
          }
          id={id}
          className={`w-full border text-base focus:ring-1 focus:outline-none ${
            error
              ? "border-admin-danger focus:ring-transparent"
              : "focus:ring-admin-dark border-dashboard-dark/10 "
          } ${paddingStyles(inputSize ?? "large")}`}
        />
        {action && (
          <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
            {action}
          </div>
        )}
        {props.type === "password" && (
          <div
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center`}
          >
            <button
              type="button"
              onClick={() => {
                if (showPassword) {
                  setShowPassword(false);
                } else {
                  setShowPassword(true);
                }
              }}
              className="text-xl text-dashboard-dark"
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
        )}
      </div>

      {error ? (
        <p className="text-admin-danger border-admin-danger text-sm my-1">
          {error}
        </p>
      ) : description ? (
        <p className="text-admin-dark/50 text-sm my-1">{description}</p>
      ) : null}
    </div>
  );
};

export default Input;
