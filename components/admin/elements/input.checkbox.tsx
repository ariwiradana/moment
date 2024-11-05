import { montserrat } from "@/lib/fonts";
import React, { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  info?: string;
  full?: boolean;
  className?: string;
  id?: string;
  optional?: boolean;
  checked?: boolean;
}

const InputCheckbox: FC<InputProps> = (props) => {
  return (
    <div
      className={`${props.className ?? ""} ${
        montserrat.className
      } text-sm p-2 border rounded-lg select-none ${
        props.checked
          ? "border-dashboard-dark bg-dashboard-dark"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          {...props}
          id={props.id}
          className={`border rounded-lg outline-none accent-dashboard-dark w-4 h-4`}
        />
        <label
          htmlFor={props.id ?? props.name}
          className={`block font-medium whitespace-nowrap ${
            props.checked ? "text-white" : "text-dashboard-dark"
          }`}
        >
          {props.label}{" "}
          <span className="text-xs text-gray-400">
            {props.optional && "(optional)"}
          </span>
        </label>
      </div>
      {props.error && (
        <p className="text-admin-danger border-admin-danger text-sm mt-1">
          {props.error}
        </p>
      )}
    </div>
  );
};

export default InputCheckbox;
