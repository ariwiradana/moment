import { marcellus, raleway } from "@/lib/fonts";
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
        className={`bg-samaya-dark bg-opacity-5 w-4 h-4 outline-none accent-samaya-dark focus:border focus:border-gray-200 text-sm font-medium text-admin-dark rounded-xl ${marcellus.className}`}
      />
      <p
        className={`${raleway.className} text-samaya-dark text-[10px] md:text-xs tracking-[1px] mt-[2px]`}
      >
        {props.label}
      </p>
    </div>
  );
};

export default InputCheckbox;
