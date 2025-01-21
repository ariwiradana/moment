import React, { useEffect } from "react";
import Button from "../elements/button";
import { BiEnvelopeOpen } from "react-icons/bi";
import { raleway } from "@/lib/fonts";
import useCoverStore from "@/store/Nirvaya/useCoverStore";

interface Props {
  to: string;
}

const Cover = ({ to }: Props) => {
  const { toggleIsOpen, isOpen } = useCoverStore();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.classList.add("no-scroll");
  }, []);

  return (
    <section
      className={`fixed h-svh transition-all ease-in-out duration-700 ${
        isOpen ? "-bottom-full opacity-0" : "bottom-0 opacity-100"
      } inset-x-0 bg-gradient-to-b from-nirvaya-dark/30 via-nirvaya-light-brown/10 to-nirvaya-light-brown/90 to-[80%] z-20 pb-16 ${
        raleway.className
      }`}
    >
      <div className="flex flex-col justify-end items-center h-full w-full">
        <p
          data-aos="fade-down"
          data-aos-delay="1000"
          className="text-nirvaya-primary tracking-[1px] font-medium text-[10px] lg:text-xs text-center"
        >
          YTH. BAPAK / IBU / SAUDARA / i
        </p>
        <h4
          data-aos="fade-down"
          data-aos-delay="800"
          className="text-center mt-1 lg:mt-2 text-nirvaya-primary font-medium text-lg lg:text-xl mb-3 lg:mb-4"
        >
          {to}
        </h4>
        <div data-aos="fade-down" data-aos-delay="600">
          <Button
            onClick={toggleIsOpen}
            title="Buka Undangan"
            icon={<BiEnvelopeOpen />}
          />
        </div>
      </div>
    </section>
  );
};

export default Cover;
