import { redhat } from "@/lib/fonts";
import React, { ReactNode, useId, useState } from "react";
import { BsChevronRight } from "react-icons/bs";

interface AccordionProps {
  title: string;
  content?: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const buttonId = `accordion-button-${id}`;
  const panelId = `accordion-panel-${id}`;

  return (
    <div
      className={`overflow-hidden ${redhat.className} border border-zinc-200 p-4 transition-colors duration-300`}
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-base font-medium flex justify-between text-left"
      >
        <span>{title}</span>
        <BsChevronRight
          className={`${
            isOpen ? "rotate-90" : "rotate-0"
          } transform transition-transform duration-300 text-sm mt-1`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[200vh] mt-4" : "max-h-0"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
