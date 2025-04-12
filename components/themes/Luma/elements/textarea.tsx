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
          className={`text-sm mb-3 ml-2 ${rubik.className} text-luma-dark/70 font-semibold`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <textarea
        {...props}
        id={props.id}
        className={`p-4 w-full outline-none bg-transparent text-white backdrop-blur text-xs md:text-sm rounded-none placeholder:text-xs placeholder:text-white border border-white/50 ${rubik.className}`}
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
