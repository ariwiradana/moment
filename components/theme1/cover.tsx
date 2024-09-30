import Image from "next/image";
import React from "react";
import Layout from "../layout";
import { comforta, montserrat, tangerine } from "@/lib/fonts";
import Button from "./button";
import { MdArrowOutward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

const Cover = () => {
  return (
    <div className="relative w-full h-screen">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide className="relative w-full h-screen">
          <Image
            alt="cover-image"
            priority
            sizes="1080px"
            fill
            className="object-cover w-full"
            src="https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/EKA_0972-emxmltCMg6nHL7oVv3dBpq1dRvc3ud.jpg"
          />
        </SwiperSlide>
        <SwiperSlide className="relative w-full h-screen">
          <Image
            alt="cover-image"
            priority
            sizes="1080px"
            fill
            className="object-cover w-full"
            src="https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/EKA_0972-emxmltCMg6nHL7oVv3dBpq1dRvc3ud.jpg"
          />
        </SwiperSlide>
        <SwiperSlide className="relative w-full h-screen">
          <Image
            alt="cover-image"
            priority
            sizes="1080px"
            fill
            className="object-cover w-full"
            src="https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/EKA_0972-emxmltCMg6nHL7oVv3dBpq1dRvc3ud.jpg"
          />
        </SwiperSlide>
        <SwiperSlide className="relative w-full h-screen">
          <Image
            alt="cover-image"
            priority
            sizes="1080px"
            fill
            className="object-cover w-full"
            src="https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/EKA_0972-emxmltCMg6nHL7oVv3dBpq1dRvc3ud.jpg"
          />
        </SwiperSlide>
      </Swiper>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
      <div className="relative w-full h-full flex flex-col justify-end px-10 pb-24">
        <p className={`text-white text-base mb-1 ${comforta.className}`}>
          The Wedding
        </p>
        <h1 className={`${tangerine.className} text-6xl text-white`}>
          Ari & Julia
        </h1>
        <p
          className={`text-white mt-2 font-light text-sm ${montserrat.className}`}
        >
          Yth. Bpk/Ibu/Saudara/i
        </p>
        <h2
          className={`text-white font-normal text-2xl ${montserrat.className}`}
        >
          Ari Wiradana
        </h2>
        <div className="mt-4">
          <Button icon={<MdArrowOutward />} title="Buka Undangan" />
        </div>
      </div>
    </div>
  );
};

export default Cover;
