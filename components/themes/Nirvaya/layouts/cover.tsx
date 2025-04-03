import React, { memo, useEffect } from "react";
import Button from "../elements/button";
import { BiEnvelopeOpen } from "react-icons/bi";
import { raleway } from "@/lib/fonts";
import useCoverStore from "@/store/useCoverStore";
import { getEventNames } from "@/utils/getEventNames";
import useEvents from "@/hooks/themes/useEvents";
import { UseMusic } from "@/hooks/themes/useMusic";
import useClientStore from "@/store/useClientStore";
import Image from "next/image";
import useParticipants from "@/hooks/themes/useParticipants";

interface Props {
  to: string;
  actions: UseMusic["actions"];
}

const Cover = ({ to, actions }: Props) => {
  const { toggleIsOpen, isOpen } = useCoverStore();
  const {
    state: { events },
  } = useEvents();
  const {
    state: { groom, bride },
  } = useParticipants();
  const { client } = useClientStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <section
      className={`fixed bg-nirvaya-dark transition-all ease-in-out duration-700 ${
        isOpen ? "-bottom-full opacity-0 h-dvh" : "bottom-0 opacity-100 h-svh"
      } inset-x-0 bg-gradient-to-b z-20 py-16 ${raleway.className}`}
    >
      {client?.cover && (
        <Image
          data-aos="zoom-out"
          quality={100}
          priority
          sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
          src={client?.cover as string}
          fill
          className="object-cover shine-dark"
          alt="cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-nirvaya-dark/30 via-nirvaya-dark/0 to-nirvaya-dark/70 to-[70%] z-20"></div>
      <div className="flex flex-col justify-between items-center h-full w-full relative z-30">
        <div>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-white text-center tracking-[2px] font-medium text-[10px] lg:text-xs uppercase"
          >
            Undangan {getEventNames(events || [])}
          </p>
          <h2
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-white font-edensor mt-1 lg:mt-2 leading-10 text-4xl lg:text-5xl text-center"
          >
            <span>{groom?.nickname}</span>
            <span className="italic"> dan </span>
            <span>{bride?.nickname}</span>
          </h2>
          {isOpen && (
            <p
              data-aos="fade-up"
              className="text-white text-[10px] lg:mt-2 text-center mt-[10px] lg:text-xs max-w-md"
            >
              Wahai pasangan suami-isteri, kembangkanlah cinta kasih di dalam
              dirimu, tekun dan tetaplah berkarma dalam menggapai kebahagiaan.
              Karena hanya orang yang bersungguh-sungguhlah mendapatkan
              keberhasilan dalam berkeluarga.
            </p>
          )}
        </div>

        <div>
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
            acara {getEventNames(events || [])} kami.
          </p>
          <div data-aos="fade-down" data-aos-delay="600">
            <Button
              onClick={() => {
                toggleIsOpen();
                actions.handlePlayPause();
              }}
              title="Buka Undangan"
              icon={<BiEnvelopeOpen />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Cover);
