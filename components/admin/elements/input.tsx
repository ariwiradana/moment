import { montserrat } from "@/lib/fonts";
import React, { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  info?: string;
  full?: boolean;
  className?: string;
  id?: string;
  inputSize?: "small" | "medium" | "large";
  optional?: boolean;
}

const Input: FC<InputProps> = (props) => {
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
    <div className={`${props.className ?? ""} ${montserrat.className} text-sm`}>
      <label
        htmlFor={props.id ?? props.name}
        className="block text-gray-700 mb-1"
      >
        {props.label}{" "}
        <span className="text-xs text-gray-400">
          {props.optional && "(optional)"}
        </span>
      </label>
      <input
        {...props}
        id={props.id}
        className={`w-full border rounded-lg focus:ring-1 focus:outline-none ${
          props.error
            ? "border-admin-danger focus:ring-transparent"
            : "focus:ring-admin-dark"
        } ${paddingStyles(props.inputSize ?? "large")}`}
      />
      {props.error && (
        <p className="text-admin-danger border-admin-danger text-sm mt-1">
          {props.error}
        </p>
      )}
    </div>
  );
};

export default Input;
