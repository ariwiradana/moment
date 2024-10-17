import React, { FC } from "react";
import { marcellus, windsong } from "@/lib/fonts";
import Button from "../elements/button";
import { MdArrowOutward } from "react-icons/md";
import ImageShimmer from "../../../image.shimmer";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Image from "next/image";

interface Props {
  state: useSamaya["state"];
  actions: useSamaya["actions"];
  untuk: string;
}

const Cover: FC<Props> = (props) => {
  return (
    <div
      className={`w-full h-dvh fixed inset-x-0 z-30 transition-all ease-in-out delay-500 duration-1000 bg-samaya-dark flex flex-col items-center p-4 md:p-16 ${
        props.state.open ? "-top-full invisible opacity-0" : "top-0 visible"
      }`}
    >
      <div
        className="absolute bottom-0 right-0 w-[200px] lg:w-[260px] aspect-square"
        data-aos="fade-up-left"
      >
        <Image
          className="object-contain"
          alt="floral-bottom-corner"
          src="/images/samaya/floral-corner-bottom.svg"
          fill
        />
      </div>
      <div className="absolute top-0 left-0 w-[200px] lg:w-[260px] aspect-square">
        <Image
          data-aos="fade-down-right"
          className="object-contain"
          data-aos-delay="200"
          alt="floral-top-corner"
          src="/images/samaya/floral-corner-top.svg"
          fill
        />
      </div>

      <div className="flex h-dvh flex-col items-center justify-center relative z-20">
        {props.state.client?.cover && (
          <div
            className="relative w-[240px] aspect-square rounded-full"
            data-aos="fade-up"
          >
            <ImageShimmer
              height={240}
              width={240}
              alt={`cover-img-image`}
              priority
              sizes="200px"
              className="object-cover rounded-full aspect-square"
              src={props.state.client?.cover as string}
            />
            <Image
              data-aos="zoom-in"
              data-aos-delay="100"
              className="absolute inset-x-0 -top-4"
              alt="floral-top-corner"
              src="/images/samaya/circle-frame-image.svg"
              height={240}
              width={240}
            />
          </div>
        )}
        <p
          className={`${marcellus.className} text-white text-lg lg:text-xl mt-10`}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Undangan Pernikahan
        </p>
        <h1
          data-aos="fade-up"
          data-aos-delay="200"
          className={`${windsong.className} text-samaya-primary text-[40px] lg:text-6xl mt-2 lg:mt-6`}
        >
          {props.state.groom?.nickname} & {props.state.bride?.nickname}
        </h1>
        <p
          className={`${marcellus.className} text-white text-base mt-4 lg:text-lg`}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Kepada
        </p>
        <p
          className={`${marcellus.className} text-white text-lg mt-1 lg:text-lg`}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Bapak/Ibu/Saudara/i
        </p>
        <h2
          className={`${marcellus.className} text-samaya-primary text-2xl mt-3 lg:text-3xl`}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {props.untuk}
        </h2>
        <div className="mt-8" data-aos="fade-up" data-aos-delay="600">
          <Button
            onClick={props.actions.handleOpenCover}
            icon={<MdArrowOutward className="lg:text-lg" />}
            title="Buka Undangan"
          />
        </div>
      </div>
    </div>
  );
};

export default Cover;
