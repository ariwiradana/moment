import React, { FC } from "react";
import { comforta, montserrat, tangerine } from "@/lib/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
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

const Content: FC<Props> = (props) => {
  return (
    <>
      <section>
        <div className="relative w-full h-[110dvh]">
          <Swiper
            loop
            autoplay={{
              delay: 5000,
            }}
            speed={10000}
            className="w-full h-[110dvh]"
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
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

          <div className="absolute inset-x-0 top-0 h-[110dvh] bg-gradient-to-b from-transparent to-black z-10"></div>
          <div className="absolute inset-0 w-full h-full flex flex-col justify-end px-8 md:px-32 pb-36 md:pb-32 z-20">
            <p
              className={`text-white text-sm lg:text-base tracking-widest mb-1 md:mb-3 ${comforta.className}`}
            >
              The Wedding of
            </p>
            <h1
              className={`${tangerine.className} text-6xl lg:text-7xl text-white`}
            >
              {props.brides}
            </h1>
            <div
              className={`text-white mt-2 lg:mt-4 font-light text-sm lg:text-base flex items-center gap-x-3 ${montserrat.className}`}
            >
              {props.location}{" "}
              <span>
                <div className="h-1 w-1 rounded-full bg-white"></div>
              </span>{" "}
              {moment(props.dateEvent).format("ddd, DD MMM YYYY")}
            </div>
            <div className="flex items-center gap-x-6 md:gap-x-8 lg:gap-x-16 mt-6 text-white">
              <div className="flex items-center gap-x-4 md:gap-x-6 lg:gap-x-8">
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.days}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                  >
                    Hari
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.hours}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                  >
                    Jam
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.minutes}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                  >
                    Menit
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.seconds}
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
      <section>
        <div className="h-[40vh] bg-white relative z-10">
          <div className="transform -translate-y-16 relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#ffff"
                fill-opacity="1"
                d="M0,32L60,37.3C120,43,240,53,360,64C480,75,600,85,720,90.7C840,96,960,96,1080,85.3C1200,75,1320,53,1380,42.7L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;
