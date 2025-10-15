import { redhat } from "@/lib/fonts";
import React, { ReactNode } from "react";
import { BiChevronDown } from "react-icons/bi";

interface AccordionProps {
  title: string;
  content: ReactNode;
  isExpanded: boolean;
  setIsExpanded?: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  content,
  isExpanded = false,
  setIsExpanded,
}) => {
  return (
    <div
      className={`overflow-hidden ${redhat.className} border border-dashboard-dark/10 p-4`}
    >
      <button
        style={{
          cursor: setIsExpanded ? "pointer" : "auto",
        }}
        type="button"
        aria-label={`btn-${title.replace(" ", "-").toLowerCase()}`}
        onClick={setIsExpanded}
        className="w-full text-base font-semibold flex justify-between items-center"
      >
        <span>{title}</span>
        {setIsExpanded && (
          <span>
            <BiChevronDown
              className={`${
                isExpanded ? "rotate-180" : "rotate-0"
              } transform transition-all ease-in-out duration-300`}
            />
          </span>
        )}
      </button>
      <div
        className={`overflow-hidden transition-all ease-in-out duration-300 ${
          isExpanded ? "max-h-[200vh]" : "max-h-0"
        }`}
      >
        {content ? <div className="mt-4 p-[1px]">{content}</div> : <></>}
      </div>
    </div>
  );
};

export default Accordion;
