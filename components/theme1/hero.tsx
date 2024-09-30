import Image from "next/image";
import React, { FC } from "react";
import { comforta, montserrat, tangerine } from "@/lib/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import useHero from "@/hooks/theme1/useHero";
import moment from "moment";

interface Props {
  dateEvent: string;
  brides: string;
  location: string;
}

const Hero: FC<Props> = (props) => {
  const { state } = useHero(props.dateEvent);
  return (
    <div className="relative w-full max-w-screen-md h-[95vh]">
      <Swiper
        loop
        autoplay={{
          delay: 5000,
        }}
        speed={5000}
        effect={"fade"}
        className="w-full h-[90vh]"
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[EffectFade, Autoplay]}
      >
        <SwiperSlide className="relative w-full h-full">
          <Image
            fill
            alt="cover-image"
            priority
            sizes="1080px"
            className="object-cover"
            src="https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/destination/images/image_1727370257816_ol1y6zy3-aXZByTlvApuMPlUcWJXBwZqNUVDRIr.jpeg"
          />
        </SwiperSlide>
        <SwiperSlide className="relative w-full h-full">
          <Image
            fill
            alt="cover-image"
            priority
            sizes="1080px"
            className="object-cover"
            src="https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/destination/images/image_1727370262861_t38ox9g8-MaKdHpxJBIdPwNF6TSsXqGc5iScswe.jpeg"
          />
        </SwiperSlide>
      </Swiper>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10"></div>
      <div className="absolute inset-0 w-full h-full flex flex-col justify-end px-10 pb-24 z-20">
        <p className={`text-white text-base mb-1 ${comforta.className}`}>
          The Wedding
        </p>
        <h1 className={`${tangerine.className} text-6xl text-white`}>
          {props.brides}
        </h1>
        <div
          className={`text-white mt-2 font-light text-sm flex items-center gap-x-3 ${montserrat.className}`}
        >
          {props.location}{" "}
          <span>
            <div className="h-1 w-1 rounded-full bg-white"></div>
          </span>{" "}
          {moment(props.dateEvent).format("ddd, DD MMM YYYY")}
        </div>
        <div className="flex items-center gap-x-6 mt-6">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center flex-col">
              <h2 className={`${comforta.className} text-xl`}>
                {state.countdown.days}
              </h2>
              <p className={`${montserrat.className} text-xs`}>Hari</p>
            </div>
            <div className="flex items-center flex-col">
              <h2 className={`${comforta.className} text-xl`}>
                {state.countdown.hours}
              </h2>
              <p className={`${montserrat.className} text-xs`}>Jam</p>
            </div>
            <div className="flex items-center flex-col">
              <h2 className={`${comforta.className} text-xl`}>
                {state.countdown.minutes}
              </h2>
              <p className={`${montserrat.className} text-xs`}>Menit</p>
            </div>
            <div className="flex items-center flex-col">
              <h2 className={`${comforta.className} text-xl`}>
                {state.countdown.seconds}
              </h2>
              <p className={`${montserrat.className} text-xs`}>Detik</p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
