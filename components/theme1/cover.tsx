import React, { FC } from "react";
import { comforta, montserrat, tangerine } from "@/lib/fonts";
import Button from "./button";
import { MdArrowOutward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import ImageShimmer from "../image.shimmer";

interface Props {
  recipient: string;
  brides: string;
  open: boolean;
  images: string[];
  setOpen: (isOpen: boolean) => void;
}

const Cover: FC<Props> = (props) => {
  return (
    <div
      className={`w-full max-w-screen-md h-dvh fixed inset-x-0 z-30 transition-all ease-in-out delay-500 duration-1000 ${
        props.open ? "-top-full invisible opacity-0" : "top-0 visible"
      }`}
    >
      <Swiper
        loop
        autoplay={{
          delay: 5000,
        }}
        speed={5000}
        effect={"fade"}
        className="w-full h-dvh"
        spaceBetween={0}
        slidesPerView={1}
        modules={[EffectFade, Autoplay]}
      >
        {props.images.map((image, index) => (
          <SwiperSlide
            className="relative w-full h-full"
            key={`cover-img-${index}`}
          >
            <ImageShimmer
              fill
              alt={`cover-img-${index}`}
              priority
              sizes="720px"
              className="object-cover"
              src={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
      <div className="absolute inset-0 w-full h-full flex flex-col justify-end px-10 pb-24 z-20">
        <p className={`text-white text-base mb-1 ${comforta.className}`}>
          The Wedding
        </p>
        <h1 className={`${tangerine.className} text-6xl text-white`}>
          {props.brides}
        </h1>
        <p
          className={`text-white mt-2 font-light text-sm ${montserrat.className}`}
        >
          Yth. Bpk/Ibu/Saudara/i
        </p>
        <h2
          className={`text-white font-normal text-2xl mt-1 ${montserrat.className}`}
        >
          {props.recipient}
        </h2>
        <div className="mt-4">
          <Button
            onClick={() => props.setOpen(true)}
            icon={<MdArrowOutward />}
            title="Buka Undangan"
          />
        </div>
      </div>
    </div>
  );
};

export default Cover;
