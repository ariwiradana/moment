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
          className={`text-white/70 mt-4 text-[8px] md:text-[10px] uppercase tracking-[3px] ${rubik.className}`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <textarea
        {...props}
        id={props.id}
        className={`p-4 w-full outline-none bg-transparent text-white text-xs md:text-sm rounded-none placeholder:text-xs placeholder:text-white border border-white/50 mt-1 ${rubik.className}`}
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
