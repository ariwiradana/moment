import { afacad } from "@/lib/fonts";
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
          className={`text-sm mb-3 ml-2 ${afacad.className} text-gray-500 font-semibold`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <input
        {...props}
        id={props.id}
        className={`placeholder:text-theme1-gold p-4 w-full outline-none text-base md:text-lg bg-theme1-primary bg-opacity-5 text-theme1-primary rounded-lg ${afacad.className}`}
      />
      {props.error && (
        <p className={`text-admin-danger text-sm mt-1 ${afacad.className}`}>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default Input;
