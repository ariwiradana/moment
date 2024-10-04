import ImageShimmer from "@/components/image.shimmer";
import { UseEarthlyEleganceTheme } from "@/hooks/themes/useEarthlyEleganceTheme";
import { comforta, montserrat, tangerine } from "@/lib/fonts";
import moment from "moment";
import React, { FC } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  state: UseEarthlyEleganceTheme["state"];
}

const HeroComponent: FC<Props> = (props) => {
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
          {Array.isArray(props.state.client?.gallery) &&
          props.state.client?.gallery.length > 0
            ? props.state.client?.gallery.map((image, index) => (
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
                    src={image}
                  />
                </SwiperSlide>
              ))
            : null}
        </Swiper>

        <div className="absolute inset-x-0 top-0 h-[107dvh] lg:h-[112dvh] bg-gradient-to-b from-transparent via-[#00000045] to-[#000000ca] z-10"></div>
        <div className="absolute inset-0 w-full h-full flex flex-col justify-end px-8 md:px-24 lg:px-32 pb-32 md:pb-44 lg:pb-[27vh] z-20">
          <p
            className={`text-white text-sm md:text-base tracking-widest mb-1 md:mb-3 ${comforta.className}`}
          >
            The Wedding of
          </p>
          <h1
            className={`${tangerine.className} text-6xl lg:text-7xl text-white`}
          >
            {props.state.groom?.nickname} & {props.state.bride?.nickname}
          </h1>
          <div
            className={`text-white mt-2 lg:mt-4 font-light text-sm md:text-base flex items-center gap-x-3 ${montserrat.className}`}
          >
            {props.state.client?.address}{" "}
            <span>
              <div className="h-1 w-1 rounded-full bg-white"></div>
            </span>{" "}
            {moment(props.state.client?.date).format("dddd, DD MMM YYYY")}
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
  );
};

export default HeroComponent;
