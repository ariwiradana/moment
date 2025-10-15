import { montserrat } from "@/lib/fonts";
import { Option } from "@/lib/types";
import React, { FC } from "react";

interface InputSelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  full?: boolean;
  options: Option[];
  inputSize?: "extrasmall" | "small" | "medium" | "large";
  optional?: boolean;
}

const InputSelect: FC<InputSelectProps> = (props) => {
  const styles = (size: "extrasmall" | "small" | "medium" | "large") => {
    switch (size) {
      case "extrasmall":
        return "px-1 py-1.5";
      case "small":
        return "p-2";
      case "medium":
        return "p-3";
      case "large":
        return "py-4 pr-4 px-3";
    }
  };

  return (
    <div
      className={`${props.full ? "w-full" : "w-auto"} ${montserrat.className}`}
    >
      {props.label && (
        <label
          htmlFor={props.id}
          className="block text-dashboard-dark/60 mb-1 text-sm"
        >
          {props.label}{" "}
          <span className="text-sm text-gray-400">
            {props.optional && "(opsional)"}
          </span>
        </label>
      )}
      <select
        {...props}
        className={`w-full border focus:ring-1 focus:outline-none text-[15px] ${
          props.error
            ? "border-admin-danger focus:ring-transparent"
            : "focus:ring-admin-dark border-dashboard-dark/10"
        } ${styles(props.inputSize ?? "large")}`}
      >
        {props.options?.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {props.error && (
        <p className="text-admin-danger text-sm mt-1">{props.error}</p>
      )}
    </div>
  );
};

export default InputSelect;
