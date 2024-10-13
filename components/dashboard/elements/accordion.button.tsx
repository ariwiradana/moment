import { afacad } from "@/lib/fonts";
import React, { ReactNode, useState } from "react";
import { BiChevronRight } from "react-icons/bi";

interface AccordionProps {
  title: string;
  content?: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={`overflow-hidden ${
        afacad.className
      } border rounded-lg p-4 transition-colors ease-in-out duration-500 ${
        isOpen && "border-gray-600"
      }`}
    >
      <button
        type="button"
        aria-label={`btn-${title.replace(" ", "-").toLowerCase()}`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-lg lg:text-xl font-medium flex justify-between text-left"
      >
        <span>{title}</span>
        <span>
          <BiChevronRight
            className={`${
              isOpen ? "rotate-90" : "rotate-0"
            } transform transition-all ease-in-out duration-300 text-2xl mt-1`}
          />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all ease-in-out duration-300 ${
          isOpen ? "max-h-[200vh]" : "max-h-0"
        }`}
      >
        {content ? <div className="mt-4">{content}</div> : <></>}
      </div>
    </div>
  );
};

export default Accordion;
