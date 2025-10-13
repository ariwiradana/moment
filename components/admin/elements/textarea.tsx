import { redhat } from "@/lib/fonts";
import React, { FC } from "react";

interface InputTextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  error?: string;
  rows?: number;
  inputSize?: "small" | "medium" | "large";
  optional?: boolean;
}

const InputTextarea: FC<InputTextareaProps> = (props) => {
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
    <div className={`${redhat.className} text-sm`}>
      <label
        htmlFor={props.id}
        className="block text-dashboard-dark/60 mb-1 text-sm"
      >
        {props.label}{" "}
        <span className="text-xs text-gray-400">
          {props.optional && "(opsional)"}
        </span>
      </label>
      <textarea
        rows={props.rows ?? 4}
        {...props}
        className={`w-full border border-dashboard-dark/10 focus:ring-1 focus:outline-none ${
          props.error
            ? "border-admin-danger focus:ring-transparent"
            : "focus:ring-admin-dark"
        } ${paddingStyles(props.inputSize ?? "large")}`}
      />
      {props.error && <p className="text-red-500 text-sm">{props.error}</p>}
    </div>
  );
};

export default InputTextarea;
