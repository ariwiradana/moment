import { rubik } from "@/lib/fonts";
import React, { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: FC<Props> = (props) => {
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
      <input
        {...props}
        id={props.id}
        className={`p-4 w-full disabled:opacity-40 outline-none bg-transparent placeholder:text-luma-dark/40 text-luma-dark text-xs md:text-sm rounded-none placeholder:text-xs mt-[2px] border border-luma-dark/50 ${rubik.className}`}
      />
      {props.error && (
        <p className={`text-admin-danger text-xs mt-1 ${rubik.className}`}>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default Input;
