import React, { FC, memo, useCallback, useMemo } from "react";
import { marcellus, raleway } from "@/lib/fonts";
import Button from "../elements/button";
import { BiEnvelopeOpen } from "react-icons/bi";
import Image from "next/image";
import useCoverStore from "@/store/useCoverStore";
import useClientStore from "@/store/useClientStore";
import useParticipants from "@/hooks/themes/useParticipants";
import { UseMusic } from "@/hooks/themes/useMusic";
import { getEventNames } from "@/utils/getEventNames";

interface Props {
  untuk: string;
  state: UseMusic["state"];
  actions: UseMusic["actions"];
}

const Cover: FC<Props> = ({ untuk, actions }) => {
  const { isOpen, toggleIsOpen } = useCoverStore();
  const { client } = useClientStore();
  const { state: participantsState } = useParticipants();

  const handleOpen = useCallback(() => {
    toggleIsOpen();
    actions.handlePlayPause();
  }, [toggleIsOpen, actions]);

  const eventNames = useMemo(
    () => getEventNames(client?.events || []),
    [client?.events]
  );

  return (
    <div
      className={`w-full h-dvh fixed inset-0 z-50 transition-all duration-1000 ease-in-out ${
        isOpen ? "invisible opacity-0 scale-105" : "visible opacity-100"
      }`}
    >
      <div
        data-aos="fade-in"
        className="relative flex h-dvh flex-col justify-end items-center bg-gradient-to-b from-transparent to-samaya-dark to-[90%]"
      >
        {client?.cover && (
          <div data-aos="zoom-out" className="absolute inset-0 z-10">
            <Image
              src={client.cover}
              alt="cover"
              fill
              priority
              quality={85} // turunkan sedikit dari 100
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20" />
          </div>
        )}

        <div className="relative z-20 h-dvh w-full py-[60px] md:py-[100px] px-8 flex flex-col justify-end items-center">
          <h1
            data-aos="fade-up"
            data-aos-delay="600"
            className="font-tan-pearl text-white text-center text-2xl md:text-3xl 2xl:text-4xl mb-3"
          >
            {participantsState.groom?.nickname} &{" "}
            {participantsState.bride?.nickname}
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="700"
            className={`${raleway.className} text-white text-[10px] md:text-xs tracking-[1px] max-w-md text-center`}
          >
            Tanpa mengurangi rasa hormat, kami mengundang anda untuk menghadiri
            acara <span className="lowercase">{eventNames}</span> kami.
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="800"
            className={`${marcellus.className} text-samaya-primary text-xl md:text-2xl text-center mt-3`}
          >
            {untuk}
          </p>

          <div className="mt-4 md:mt-6" data-aos="fade-up" data-aos-delay="900">
            <Button
              onClick={handleOpen}
              icon={<BiEnvelopeOpen />}
              title="Buka Undangan"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Cover);
