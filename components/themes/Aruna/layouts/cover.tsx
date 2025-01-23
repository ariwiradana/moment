import React, { FC, memo } from "react";
import { roboto } from "@/lib/fonts";
import Button from "../elements/button";
import { BiEnvelopeOpen } from "react-icons/bi";
import Image from "next/image";
import { getEventNames } from "@/utils/getEventNames";
import { UseMusic } from "@/hooks/themes/useMusic";
import useCoverStore from "@/store/useCoverStore";
import useClientStore from "@/store/useClientStore";
import useParticipants from "@/hooks/themes/useParticipants";
import { Participant } from "@/lib/types";

interface Props {
  actions: UseMusic["actions"];
  untuk: string;
}

const Cover: FC<Props> = (props) => {
  const { isOpen, toggleIsOpen } = useCoverStore();
  const { client } = useClientStore();
  const { state: participant } = useParticipants();
  return (
    <>
      <div
        className={`w-full h-dvh fixed inset-x-0 transition-all ease-in-out duration-1000 delay-500 z-50 ${
          isOpen ? "-bottom-full invisible opacity-0" : "bottom-0 visible"
        }`}
      >
        {client?.cover && (
          <Image
            quality={100}
            priority
            sizes="100vw"
            src={client?.cover as string}
            fill
            className="object-cover"
            alt="cover"
          />
        )}
        <div
          data-aos="fade-in"
          className="relative z-40 bg-gradient-to-b from-aruna-dark/40 from-[5%] via-aruna-dark/20 to-[95%] to-aruna-dark"
        >
          <div className="flex h-dvh flex-col justify-between md:justify-center py-[60px] md:py-[100px] px-8 max-w-screen-sm lg:max-w-screen-lg mx-auto z-30">
            <div>
              <h1
                data-aos="fade-up"
                data-aos-delay="400"
                className={`font-high-summit text-white ${
                  (participant.groom as Participant)?.nickname.split(" ")
                    .length > 1 ||
                  (participant.bride as Participant)?.nickname.split(" ")
                    .length > 1
                    ? "text-4xl"
                    : "text-5xl"
                } md:text-5xl leading-10 2xl:text-6xl`}
              >
                {client?.theme_category?.name === "Pernikahan" ? (
                  <>
                    {participant.groom?.nickname}
                    <br />& {participant.bride?.nickname}
                  </>
                ) : (
                  <>
                    Undangan
                    <br />
                    {getEventNames(client?.events || [])}
                  </>
                )}
              </h1>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-delay="1000"
              className="h-full md:h-[40vh] lg:h-[30vh] w-[1px] bg-white/50 my-8"
            ></div>
            <div>
              <div data-aos="fade-down" data-aos-delay="800">
                <p
                  className={`${roboto.className} text-white text-[10px] md:text-xs uppercase tracking-[2px] mb-1`}
                >
                  Yth. Bapak/Ibu/Saudara/i
                </p>
                <p
                  className={`${roboto.className} text-white text-2xl md:text-3xl`}
                >
                  {props.untuk}
                </p>
              </div>
              <div
                className="mt-6 md:mt-8"
                data-aos="fade-down"
                data-aos-delay="600"
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
      </div>
    </>
  );
};

export default memo(Cover);
