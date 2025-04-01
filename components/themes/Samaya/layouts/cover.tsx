import React, { FC, memo } from "react";
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

const Cover: FC<Props> = (props) => {
  const { isOpen, toggleIsOpen } = useCoverStore();
  const { client } = useClientStore();
  const { state: participantsState } = useParticipants();

  return (
    <>
      <div
        className={`w-full h-dvh fixed inset-x-0 transition-all ease-in-out duration-1000 delay-500 z-50 ${
          isOpen ? "invisible opacity-0 scale-105" : "visible"
        }`}
      >
        <div
          data-aos="fade-in"
          className="flex h-dvh flex-col items-center justify-between md:justify-center gap-8 relative bg-gradient-to-b from-transparent to-samaya-dark to-[90%]"
        >
          {client?.cover && (
            <div
              data-aos="zoom-out"
              className="h-dvh w-full absolute inset-0 z-10"
            >
              <Image
                sizes="100vw"
                priority
                fill
                src={client?.cover as string}
                alt="cover"
                className="object-cover"
              />
            </div>
          )}
          <div className="bg-gradient-to-b relative z-10 h-dvh w-full py-[60px] md:py-[100px] px-8 flex flex-col justify-end">
            <div className="md:mb-6 mb-3">
              <h1
                data-aos="fade-up"
                data-aos-delay="600"
                className={`font-tan-pearl text-white text-center text-2xl md:text-3xl 2xl:text-4xl mt-2`}
              >
                {participantsState.groom?.nickname} &{" "}
                {participantsState.bride?.nickname}
              </h1>
            </div>
            <div data-aos="fade-up" data-aos-delay="800">
              <p
                className={`${raleway.className} text-white text-[10px] md:text-xs tracking-[1px] max-w-md mx-auto text-center`}
              >
                Tanpa mengurangi rasa hormat, kami mengundang anda untuk
                menghadiri acara{" "}
                <span className="lowercase">
                  {getEventNames(client?.events || [])}
                </span>{" "}
                kami.
              </p>
              <p
                className={`${marcellus.className} text-samaya-primary text-xl md:text-2xl text-center mt-3`}
              >
                {props.untuk}
              </p>
            </div>
            <div
              className="flex justify-center mt-4 md:mt-6"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              <Button
                onClick={() => {
                  toggleIsOpen();
                  props.actions.handlePlayPause();
                }}
                icon={<BiEnvelopeOpen />}
                title="Buka Undangan"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Cover);
