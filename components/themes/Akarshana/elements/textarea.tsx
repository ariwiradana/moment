import { afacad } from "@/lib/fonts";
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
          className={`text-sm mb-3 ml-2 ${afacad.className} text-gray-500 font-semibold`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <textarea
        {...props}
        id={props.id}
        className={`placeholder:text-aakarshana-gold p-4 w-full outline-none text-base md:text-lg bg-aakarshana-primary bg-opacity-5 text-aakarshana-primary rounded-lg ${afacad.className}`}
      />
      {props.error && (
        <p className={`text-admin-danger text-sm mt-1 ${afacad.className}`}>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default InputTextarea;
