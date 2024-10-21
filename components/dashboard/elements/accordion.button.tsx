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
        isOpen && "border-transparent bg-dashboard-dark"
      }`}
    >
      <button
        type="button"
        aria-label={`btn-${title.replace(" ", "-").toLowerCase()}`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-lg lg:text-xl font-medium flex justify-between text-left"
      >
        <span className={isOpen ? "text-white" : ""}>{title}</span>
        <span>
          <BiChevronRight
            className={`${
              isOpen ? "rotate-90 text-white" : "rotate-0 text-dashboard-dark"
            } transform transition-all ease-in-out duration-300 text-2xl mt-1`}
          />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all ease-in-out duration-300  ${
          isOpen ? "max-h-[200vh] mt-2" : "max-h-0"
        }`}
      >
        {content ? (
          <div className={`mt-4 ${isOpen && "text-white"}`}>{content}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Accordion;
