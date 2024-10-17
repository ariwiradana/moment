import { montserrat } from "@/lib/fonts";
import React, { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  id?: string;
  inputSize?: "small" | "medium" | "large";
  optional?: boolean;
}

const Input: FC<InputProps> = ({
  label,
  error,
  className = "",
  id,
  inputSize = "large",
  optional = false,
  ...props
}) => {
  const paddingStyles = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "p-2";
      case "medium":
        return "p-3";
      case "large":
        return "p-4";
    }
  };
  return (
    <div className={`${className ?? ""} ${montserrat.className} text-sm`}>
      <label htmlFor={id} className="block text-gray-700 mb-1">
        {label}{" "}
        <span className="text-xs text-gray-400">
          {optional && "(optional)"}
        </span>
      </label>
      <input
        {...props}
        id={id}
        className={`w-full border rounded-lg focus:ring-1 focus:outline-none ${
          error
            ? "border-admin-danger focus:ring-transparent"
            : "focus:ring-admin-dark"
        } ${paddingStyles(inputSize ?? "large")}`}
      />
      {error && (
        <p className="text-admin-danger border-admin-danger text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
