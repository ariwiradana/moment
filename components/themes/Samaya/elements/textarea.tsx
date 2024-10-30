import { afacad, marcellus } from "@/lib/fonts";
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
        className={`p-4 w-full placeholder:text-white/50 outline-none text-sm md:text-base text-samaya-primary bg-samaya-primary/10 border-b border-b-samaya-primary ${marcellus.className}`}
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
