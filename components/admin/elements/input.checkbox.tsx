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
}

const InputCheckbox: FC<InputProps> = (props) => {
  return (
    <div className={`${props.className ?? ""} ${montserrat.className} text-sm`}>
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          {...props}
          id={props.id}
          className={`border rounded-lg outline-none accent-black w-4 h-4`}
        />
        <label htmlFor={props.id ?? props.name} className="block text-admin-dark font-medium whitespace-nowrap">
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
