import { balthazar } from "@/lib/fonts";
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
          className={`text-sm mb-3 ml-2 ${balthazar.className} text-gray-500 font-semibold`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <input
        {...props}
        id={props.id}
        className={`p-4 w-full outline-none text-sm md:text-lg rounded border-b border-b-nirvaya-dark text-nirvaya-dark ${balthazar.className}`}
      />
      {props.error && (
        <p className={`text-admin-danger text-sm mt-1 ${balthazar.className}`}>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default Input;
