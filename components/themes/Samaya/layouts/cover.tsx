import React, { FC } from "react";
import { marcellus } from "@/lib/fonts";
import Button from "../elements/button";
import { useSamaya } from "@/hooks/themes/useSamaya";
import { BiEnvelopeOpen } from "react-icons/bi";
import Image from "next/image";

interface Props {
  state: useSamaya["state"];
  actions: useSamaya["actions"];
  untuk: string;
}

const Cover: FC<Props> = (props) => {
  return (
    <>
      <div
        className={`w-full h-dvh fixed inset-x-0 transition-all ease-in-out duration-1000 delay-500 z-50 ${
          props.state.open ? "invisible opacity-0 scale-105" : "visible"
        }`}
      >
        <div
          data-aos="fade-in"
          className="flex h-dvh flex-col items-center justify-between md:justify-center gap-8 md:gap-[60px] 2xl:gap-[100px] relative z-30 py-[60px] md:py-[100px] px-8 bg-gradient-to-b from-samaya-dark/90 via-samaya-dark/80 to-samaya-dark to-[90%]"
        >
          <div>
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className={`${marcellus.className} text-white md:text-base text-sm uppercase text-center`}
            >
              Undangan {props.state.client?.theme?.category}
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className={`font-tan-pearl text-white text-center text-[28px] md:text-4xl mt-3`}
            >
              {props.state.groom?.nickname} & {props.state.bride?.nickname}
            </h1>
          </div>
          <div
            data-aos="zoom-out-up"
            data-aos-delay="800"
            className="w-[160px] md:w-[180px] lg:w-[200px] 2xl:w-[240px] relative aspect-square rounded-full"
          >
            <Image
              sizes="360px"
              priority
              fill
              src={props.state.client?.cover as string}
              alt="cover"
              className="object-cover rounded-full overflow-hidden bg-samaya-dark/40"
            />
            <Image
              sizes="360px"
              fill
              src="/images/samaya/frame-circle.svg"
              alt="cover-frame"
              className="object-contain w-full h-full transform scale-[1.4]"
            />
          </div>
          <div>
            <div data-aos="fade-up" data-aos-delay="1000">
              <p
                className={`${marcellus.className} text-white text-sm md:text-base text-center`}
              >
                Yth. Bapak/Ibu/Saudara/i
              </p>
              <p
                className={`${marcellus.className} text-samaya-primary text-2xl md:text-3xl mt-1 md:mt-3 text-center`}
              >
                {props.untuk}
              </p>
            </div>
            <p
              data-aos="fade-up"
              data-aos-delay="1200"
              className={`${marcellus.className} text-white text-sm md:text-base mt-4 md:mt-6 max-w-sm mx-auto text-center`}
            >
              Tanpa mengurangi rasa hormat, kami mengundang anda untuk
              menghadiri acara pernikahan kami
            </p>
            <div
              className="flex justify-center mt-6 md:mt-8"
              data-aos="fade-up"
              data-aos-delay="1400"
            >
              <Button
                onClick={() => {
                  props.actions.handleOpenCover();
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

export default Cover;
