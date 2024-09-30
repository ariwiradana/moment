import React, { FC } from "react";
import { comforta, montserrat, tangerine } from "@/lib/fonts";
import Button from "./elements/button";
import { MdArrowOutward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import ImageShimmer from "../image.shimmer";
import { UseApp } from "@/hooks/theme1/useApp";

interface Props {
  recipient: string;
  brides: string;
  state: UseApp["state"];
  actions: UseApp["actions"];
}

const Cover: FC<Props> = (props) => {
  return (
    <div
      className={`w-full h-dvh fixed inset-x-0 z-30 transition-all ease-in-out delay-500 duration-1000 ${
        props.state.open ? "-top-full invisible opacity-0" : "top-0 visible"
      }`}
    >
      <Swiper
        loop
        autoplay={{
          delay: 4000,
        }}
        speed={4000}
        effect={"fade"}
        className="w-full h-dvh"
        spaceBetween={0}
        slidesPerView={1}
        modules={[EffectFade, Autoplay]}
      >
        {props.state.blobs.map((blob, index) => (
          <SwiperSlide
            className="relative w-full h-full"
            key={`cover-img-${index}`}
          >
            <ImageShimmer
              fill
              alt={`cover-img-${index}`}
              priority
              sizes="1080px"
              className={`object-cover`}
              src={blob.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
      <div className="absolute inset-0 w-full h-full flex flex-col justify-end px-8 md:px-24 lg:px-32 pb-16 md:pb-32 z-20">
        <p
          className={`text-white text-sm lg:text-base tracking-widest mb-1 md:mb-3 ${comforta.className}`}
        >
          The Wedding of
        </p>
        <h1 className={`${tangerine.className} text-6xl lg:text-7xl text-white`}>
          {props.brides}
        </h1>
        <p
          className={`text-white mt-2 lg:mt-4 font-light text-sm lg:text-base ${montserrat.className}`}
        >
          Yth. Bpk/Ibu/Saudara/i
        </p>
        <h2
          className={`text-white font-normal text-2xl lg:text-3xl mt-1 ${montserrat.className}`}
        >
          {props.recipient}
        </h2>
        <div className="mt-4 lg:mt-6">
          <Button
            onClick={props.actions.handleOpenCover}
            icon={<MdArrowOutward className="lg:text-lg"/>}
            title="Buka Undangan"
          />
        </div>
      </div>
    </div>
  );
};

export default Cover;
