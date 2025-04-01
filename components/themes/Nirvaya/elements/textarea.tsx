import { raleway } from "@/lib/fonts";
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
          className={`text-sm mb-3 ml-2 ${raleway.className} text-gray-500 font-semibold`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <textarea
        {...props}
        id={props.id}
        className={`p-4 w-full outline-none text-xs md:text-sm placeholder:text-[10px] placeholder:uppercase placeholder:tracking-[2px] placeholder:text-nirvaya-dark/30 border border-nirvaya-dark ${raleway.className}`}
      />
      {props.error && (
        <p className={`text-admin-danger text-xs mt-1 ${raleway.className}`}>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default InputTextarea;
