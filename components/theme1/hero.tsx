import React, { FC } from "react";
import { comforta, montserrat, tangerine } from "@/lib/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import moment from "moment";
import ImageShimmer from "../image.shimmer";
import { UseApp } from "@/hooks/theme1/useApp";

interface Props {
  dateEvent: string;
  brides: string;
  location: string;
  state: UseApp["state"];
  actions: UseApp["actions"];
}

const Hero: FC<Props> = (props) => {
  return (
    <div className="relative w-full max-w-screen-md h-[95dvh]">
      <Swiper
        loop
        autoplay={{
          delay: 5000,
        }}
        speed={5000}
        effect={"fade"}
        className="w-full h-[95dvh]"
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[EffectFade, Autoplay]}
      >
        {props.state.blobs.map((blob, index) => (
          <SwiperSlide
            className="relative w-full h-full"
            key={`hero-img-${index}`}
          >
            <ImageShimmer
              fill
              alt={`hero-img-${index}`}
              priority
              sizes="720px"
              className="object-cover"
              src={blob.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-x-0 top-0 h-[95dvh] bg-gradient-to-b from-transparent to-black z-10"></div>
      <div className="absolute inset-0 w-full h-full flex flex-col justify-end px-8 pb-20 z-20">
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
        <div className="flex items-center gap-x-6 mt-6 text-white">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center flex-col">
              <h2 className={`${comforta.className} text-xl`}>
                {props.state.countdown.days}
              </h2>
              <p className={`${montserrat.className} text-xs`}>Hari</p>
            </div>
            <div className="flex items-center flex-col">
              <h2 className={`${comforta.className} text-xl`}>
                {props.state.countdown.hours}
              </h2>
              <p className={`${montserrat.className} text-xs`}>Jam</p>
            </div>
            <div className="flex items-center flex-col">
              <h2 className={`${comforta.className} text-xl`}>
                {props.state.countdown.minutes}
              </h2>
              <p className={`${montserrat.className} text-xs`}>Menit</p>
            </div>
            <div className="flex items-center flex-col">
              <h2 className={`${comforta.className} text-xl`}>
                {props.state.countdown.seconds}
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
