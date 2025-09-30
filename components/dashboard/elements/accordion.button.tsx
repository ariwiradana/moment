import { redhat } from "@/lib/fonts";
import React, { ReactNode, useState } from "react";
import { BsChevronRight } from "react-icons/bs";

interface AccordionProps {
  title: string;
  content?: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={`overflow-hidden ${redhat.className} border border-zinc-200 p-4 transition-colors ease-in-out duration-500`}
    >
      <button
        type="button"
        aria-label={`btn-${title.replace(" ", "-").toLowerCase()}`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-base font-medium flex justify-between text-left"
      >
        <span>{title}</span>
        <span>
          <BsChevronRight
            className={`${
              isOpen ? "rotate-90" : "rotate-0"
            } transform transition-all ease-in-out duration-300 text-sm mt-1`}
          />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all ease-in-out duration-300  ${
          isOpen ? "max-h-[200vh] mt-2" : "max-h-0"
        }`}
      >
        {content ? <div className={`mt-4`}>{content}</div> : <></>}
      </div>
    </div>
  );
};

export default Accordion;
