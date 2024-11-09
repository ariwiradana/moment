import { roboto } from "@/lib/fonts";
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
          className={`text-sm mb-3 ml-2 ${roboto.className} text-gray-500 font-semibold`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <input
        {...props}
        id={props.id}
        className={`p-4 w-full outline-none text-xs md:text-sm placeholder:text-[10px] placeholder:uppercase placeholder:tracking-[2px] placeholder:text-aruna-dark/30 border border-aruna-dark ${roboto.className}`}
      />
      {props.error && (
        <p className={`text-admin-danger text-xs mt-1 ${roboto.className}`}>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default Input;
