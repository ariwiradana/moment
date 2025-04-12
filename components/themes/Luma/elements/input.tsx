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
          className={`text-sm mb-3 ml-2 ${rubik.className} text-luma-dark/70`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <input
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

export default Input;
