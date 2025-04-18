import { rubik } from "@/lib/fonts";
import React, { FC } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const InputTextarea: FC<Props> = (props) => {
  return (
    <div>
      {props.label && (
        <label
          className={`text-luma-dark/70 mt-4 text-[10px] md:text-xs uppercase tracking-[3px] ${rubik.className}`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <textarea
        {...props}
        id={props.id}
        className={`p-4 w-full outline-none disabled:opacity-40 bg-transparent placeholder:text-luma-dark/40 text-luma-dark text-xs md:text-sm rounded-none placeholder:text-xs mt-[2px] border border-luma-dark/50 ${rubik.className}`}
      />
      {props.error && (
        <p className={`text-admin-danger text-xs mt-1 ${rubik.className}`}>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default InputTextarea;
