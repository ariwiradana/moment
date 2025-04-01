import { raleway } from "@/lib/fonts";
import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputCheckbox: FC<Props> = (props) => {
  return (
    <div className="inline-flex items-center justify-start w-auto gap-x-2">
      <input
        {...props}
        type="checkbox"
        id={props.id}
        className={`bg-white bg-opacity-5 w-4 h-4 outline-none accent-white focus:border focus:border-gray-200 text-sm font-medium text-nirvaya-dark ${raleway.className}`}
      />
      <p
        className={`text-base ${raleway.className} text-white text-xs md:text-sm mt-[1px]`}
      >
        {props.label}
      </p>
    </div>
  );
};

export default InputCheckbox;
