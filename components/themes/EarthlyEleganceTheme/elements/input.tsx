import { comforta } from "@/lib/fonts";
import React, { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<Props> = (props) => {
  return (
    <div>
      {props.label && (
        <label
          className={`text-sm mb-3 ml-2 ${comforta.className} text-gray-500 font-semibold`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <input
        {...props}
        id={props.id}
        className={`bg-theme1-gold bg-opacity-5 p-4 w-full outline-none text-sm font-medium text-admin-dark border-b border-b-theme1-gold rounded-none ${comforta.className}`}
      />
    </div>
  );
};

export default Input;
