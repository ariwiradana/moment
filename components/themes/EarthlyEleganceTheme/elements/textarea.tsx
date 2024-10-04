import { comforta } from "@/lib/fonts";
import React, { FC } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const InputTextarea: FC<Props> = (props) => {
  return (
    <div>
      <label
        className={`text-sm mb-3 ml-2 ${comforta.className} text-gray-500 font-semibold`}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <textarea
        {...props}
        id={props.id}
        className={`bg-theme1-gold bg-opacity-5 px-4 py-3 w-full outline-none focus:border focus:border-gray-200 text-sm font-medium text-admin-dark rounded-xl ${comforta.className}`}
      />
    </div>
  );
};

export default InputTextarea;
