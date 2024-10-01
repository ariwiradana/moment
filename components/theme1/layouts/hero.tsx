import ImageShimmer from "@/components/image.shimmer";
import { comforta, montserrat, tangerine } from "@/lib/fonts";
import { Brides, Informations } from "@/lib/types";
import moment from "moment";
import React, { FC } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useTheme1 from "@/hooks/useTheme1";

interface Props {
  brides: Brides;
  informations: Informations;
}

const HeroComponent: FC<Props> = (props) => {
  const { blobs, countdown } = useTheme1(props.informations);

  return (
    <section>
      <div className="relative w-full h-[107dvh] lg:h-[112dvh]">
        <Swiper
          loop
          autoplay={{
            delay: 5000,
          }}
          speed={10000}
          className="w-full h-[107dvh] lg:h-[112dvh]"
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
        >
          {blobs.map((blob, index) => (
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

        <div className="absolute inset-x-0 top-0 h-[107dvh] lg:h-[112dvh] bg-gradient-to-b from-transparent to-[#000000c5] z-10"></div>
        <div className="absolute inset-0 w-full h-full flex flex-col justify-end px-8 md:px-24 lg:px-32 pb-32 md:pb-44 lg:pb-[27vh] z-20">
          <p
            className={`text-white text-sm md:text-base tracking-widest mb-1 md:mb-3 ${comforta.className}`}
          >
            The Wedding of
          </p>
          <h1
            className={`${tangerine.className} text-6xl lg:text-7xl text-white`}
          >
            {props.brides.male.nickname} & {props.brides.female.nickname}
          </h1>
          <div
            className={`text-white mt-2 lg:mt-4 font-light text-sm md:text-base flex items-center gap-x-3 ${montserrat.className}`}
          >
            {props.informations.location}{" "}
            <span>
              <div className="h-1 w-1 rounded-full bg-white"></div>
            </span>{" "}
            {moment(props.informations.date).format("dddd, DD MMM YYYY")}
          </div>
          <div className="flex items-center gap-x-6 md:gap-x-8 lg:gap-x-16 mt-6 text-white">
            <div className="flex items-center gap-x-4 md:gap-x-6 lg:gap-x-8">
              <div className="flex items-center flex-col">
                <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                  {countdown.days}
                </h2>
                <p
                  className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                >
                  Hari
                </p>
              </div>
              <div className="flex items-center flex-col">
                <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                  {countdown.hours}
                </h2>
                <p
                  className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                >
                  Jam
                </p>
              </div>
              <div className="flex items-center flex-col">
                <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                  {countdown.minutes}
                </h2>
                <p
                  className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                >
                  Menit
                </p>
              </div>
              <div className="flex items-center flex-col">
                <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                  {countdown.seconds}
                </h2>
                <p
                  className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                >
                  Detik
                </p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
