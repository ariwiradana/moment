import { redhat } from "@/lib/fonts";
import React, { ReactNode, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface AccordionProps {
  title: string;
  content?: ReactNode;
  isExpanded?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  content,
  isExpanded = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isExpanded);

  return (
    <div className={`overflow-hidden ${redhat.className} border p-4`}>
      <button
        type="button"
        aria-label={`btn-${title.replace(" ", "-").toLowerCase()}`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-sm font-semibold flex justify-between items-center"
      >
        <span>{title}</span>
        <span>
          <BiChevronDown
            className={`${
              isOpen ? "rotate-180" : "rotate-0"
            } transform transition-all ease-in-out duration-300`}
          />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all ease-in-out duration-300 ${
          isOpen ? "max-h-[200vh]" : "max-h-0"
        }`}
      >
        {content ? <div className="mt-4 p-[1px]">{content}</div> : <></>}
      </div>
    </div>
  );
};

export default Accordion;
