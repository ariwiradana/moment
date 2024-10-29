import React, { FC } from "react";
import { balthazar, italiana, marcellus } from "@/lib/fonts";
import Button from "../elements/button";
import { useNirvaya } from "@/hooks/themes/useNirvaya";
import Image from "next/image";
import { BiSolidEnvelopeOpen } from "react-icons/bi";

interface Props {
  state: useNirvaya["state"];
  actions: useNirvaya["actions"];
  untuk: string;
}

const Cover: FC<Props> = (props) => {
  return (
    <>
      <div
        className={`w-full h-dvh fixed inset-x-0 transition-all ease-in-out duration-1000 bg-gradient-to-b from-nirvaya-dark/70 to-nirvaya-dark z-50 ${
          props.state.open ? "-top-full invisible opacity-0" : "top-0 visible"
        }`}
      >
        <div className="flex h-dvh flex-col items-center justify-center relative z-30">
          {props.state.client?.cover && (
            <div
              className="relative w-[134px] h-[171px] md:w-[154px] md:h-[191px] rounded-t-[100px] overflow-hidden rounded-b-[20px]"
              data-aos="zoom-in-up"
              data-aos-delay="200"
            >
              <Image
                fill
                alt={`cover-img-image`}
                priority
                sizes="280px"
                quality={90}
                className="object-cover"
                src={props.state.client?.cover as string}
              />
            </div>
          )}
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className={`${balthazar.className} text-white md:text-base text-sm mt-8 uppercase text-center`}
          >
            Undangan {props.state.client?.theme?.category}
          </p>
          <h1
            data-aos="fade-up"
            data-aos-delay="600"
            className={`${italiana.className} text-white text-[40px] md:text-5xl`}
          >
            {props.state.groom?.nickname} & {props.state.bride?.nickname}
          </h1>
          <div data-aos="fade-up" data-aos-delay="800">
            <p className={`${balthazar.className} text-white text-xs md:text-sm mt-4 md:mt-6`}>
              Yth. Bapak/Ibu/Saudara/i
            </p>
            <p
              className={`${marcellus.className} text-white text-lg md:text-xl mt-1 md:mt-3 text-center`}
            >
              {props.untuk}
            </p>
          </div>
          <p
            data-aos="fade-up"
            data-aos-delay="1000"
            className={`${balthazar.className} text-white text-xs md:text-sm mt-2 md:mt-4 w-[200px] mx-auto text-center`}
          >
            Tanpa mengurangi rasa hormat, kami mengundang anda untuk menghadiri
            acara pernikahan kami
          </p>
          <div className="mt-6 md:mt-8" data-aos="fade-up" data-aos-delay="1200">
            <Button
              onClick={() => {
                props.actions.handleOpenCover();
                props.actions.handlePlayPause();
              }}
              icon={<BiSolidEnvelopeOpen className="lg:text-lg" />}
              title="Buka Undangan"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cover;
