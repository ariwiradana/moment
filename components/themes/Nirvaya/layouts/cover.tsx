import React, { memo } from "react";
import Button from "../elements/button";
import { BiEnvelopeOpen } from "react-icons/bi";
import { raleway } from "@/lib/fonts";
import useCoverStore from "@/store/Nirvaya/useCoverStore";
import { getEventNames } from "@/utils/getEventNames";
import useEvents from "@/hooks/themes/Nirvaya/useEvents";

interface Props {
  to: string;
}

const Cover = ({ to }: Props) => {
  const { toggleIsOpen, isOpen } = useCoverStore();
  const { state } = useEvents();

  return (
    <section
      data-aos="fade-in"
      className={`fixed h-dvh transition-all ease-in-out duration-700 ${
        isOpen ? "-bottom-full opacity-0" : "bottom-0 opacity-100"
      } inset-x-0 bg-gradient-to-b from-nirvaya-dark/30 via-nirvaya-dark/0 to-nirvaya-dark/70 to-[70%] z-20 pb-16 ${
        raleway.className
      }`}
    >
      <div className="flex flex-col justify-end items-center h-full w-full relative z-30">
        <p
          data-aos="fade-down"
          data-aos-delay="1200"
          className="text-white text-[10px] lg:text-xs text-center"
        >
          Yth. Bapak / Ibu / Saudara / i
        </p>
        <h4
          data-aos="fade-down"
          data-aos-delay="1000"
          className="text-center mt-1 lg:mt-2 text-white font-medium text-lg lg:text-xl my-1 lg:my-2"
        >
          {to}
        </h4>
        <p
          data-aos="fade-down"
          data-aos-delay="800"
          className="text-white text-[10px] lg:text-xs text-center max-w-[200px] lg:max-w-lg mx-auto mb-4 lg:mb-6"
        >
          Tanpa mengurangi rasa hormat, kami mengundang anda untuk menghadiri
          acara {getEventNames(state.events || [])} kami.
        </p>
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

export default memo(Cover);
