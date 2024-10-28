import React, { FC } from "react";
import { marcellus, windsong } from "@/lib/fonts";
import Button from "../elements/button";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Image from "next/image";
import { BiSolidEnvelopeOpen } from "react-icons/bi";

interface Props {
  state: useSamaya["state"];
  actions: useSamaya["actions"];
  untuk: string;
}

const Cover: FC<Props> = (props) => {
  return (
    <div
      className={`w-full h-dvh fixed inset-x-0 z-30 transition-all ease-in-out delay-500 duration-1000 bg-gradient-to-b from-samaya-dark/90 to-samaya-dark flex flex-col items-center p-4 md:p-16 ${
        props.state.open ? "-top-full invisible opacity-0" : "top-0 visible"
      }`}
    >
      <div
        className="absolute bottom-0 right-0 w-[160px] lg:w-[260px] aspect-square"
        data-aos="fade-up-left"
      >
        <Image
          className="object-contain"
          alt="floral-bottom-corner"
          src="/images/samaya/floral-corner-bottom.svg"
          fill
        />
      </div>
      <div className="absolute top-0 left-0 w-[160px] lg:w-[260px] aspect-square">
        <Image
          data-aos="fade-down-right"
          data-aos-delay="200"
          className="object-contain"
          alt="floral-top-corner"
          src="/images/samaya/floral-corner-top.svg"
          fill
        />
      </div>

      <div className="flex h-dvh flex-col items-center justify-center relative z-20">
        {props.state.client?.cover && (
          <div
            className="relative w-[160px] sm:w-[210px] md:w-[260px] aspect-square rounded-full"
            data-aos="zoom-out"
            data-aos-delay="300"
          >
            <Image
              height={280}
              width={280}
              alt={`cover-img-image`}
              priority
              sizes="280px"
              quality={90}
              className="object-cover rounded-full aspect-square overflow-hidden"
              src={props.state.client?.cover as string}
            />
            <Image
              className="absolute inset-x-0 -top-4 md:-top-5 transform scale-105"
              alt="floral-top-corner"
              src="/images/samaya/circle-frame-image.svg"
              height={280}
              width={280}
            />
          </div>
        )}
        <p
          className={`${marcellus.className} text-white text-base lg:text-xl mt-10 md:mt-16`}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Undangan {props.state.client?.theme?.category}
        </p>
        <h1
          data-aos="fade-up"
          data-aos-delay="200"
          className={`${windsong.className} text-samaya-primary text-4xl sm:text-[40px] lg:text-6xl mt-2 lg:mt-6`}
        >
          {props.state.groom?.nickname} & {props.state.bride?.nickname}
        </h1>
        <p
          className={`${marcellus.className} text-white text-sm mt-2 lg:text-lg`}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Kepada
        </p>
        <p
          className={`${marcellus.className} text-white text-base mt-1 lg:text-lg`}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Bapak/Ibu/Saudara/i
        </p>
        <h2
          className={`${marcellus.className} text-samaya-primary text-xl sm:text-2xl mt-2 lg:text-3xl text-center`}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {props.untuk}
        </h2>
        <div className="mt-6" data-aos="fade-up" data-aos-delay="600">
          <Button
            onClick={props.actions.handleOpenCover}
            icon={<BiSolidEnvelopeOpen className="lg:text-lg" />}
            title="Buka Undangan"
          />
        </div>
      </div>
    </div>
  );
};

export default Cover;
