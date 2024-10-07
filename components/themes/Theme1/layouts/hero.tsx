import ImageShimmer from "@/components/image.shimmer";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import { afacad, marcellus, montserrat } from "@/lib/fonts";
import moment from "moment";
import React, { FC } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  state: useTheme1["state"];
}

const HeroComponent: FC<Props> = (props) => {
  return (
    <section>
      <div className="relative w-full h-[107dvh] lg:h-[112dvh] overflow-hidden z-20">
        <div>
          <Swiper
            loop
            autoplay={{
              delay: 5000,
            }}
            speed={10000}
            className="w-full h-[107dvh] lg:h-[112dvh] transition-transform"
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
                    {/* Adding a parallax effect */}
                    <div className="absolute inset-0">
                      <ImageShimmer
                        fill
                        alt={`hero-img-${index}`}
                        priority
                        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
                        className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform"
                        src={image}
                        style={{ transform: "translateZ(0)" }}
                      />
                    </div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>

        <div className="absolute inset-x-0 top-0 h-[107dvh] lg:h-[112dvh] bg-gradient-to-b from-[#0000003b] via-[#0000004d] via-[70%] to-white z-10"></div>

        <div className="absolute top-0 inset-x-0 w-full h-full flex flex-col justify-end px-8 md:px-24 lg:px-32 pb-32 md:pb-44 lg:pb-[27vh] z-20">
          <p
            data-aos="fade-up"
            className={`text-white text-base mb-1 md:mb-3 ${afacad.className}`}
          >
            The Wedding of
          </p>
          <h1
            data-aos="fade-up"
            data-aos-delay="300"
            className={`${marcellus.className} text-4xl lg:text-5xl text-white`}
          >
            {props.state.groom?.nickname} & {props.state.bride?.nickname}
          </h1>
          <div data-aos="fade-up" data-aos-delay="600">
            <div
              className={`text-white mt-2 lg:mt-4 text-base flex items-center gap-x-3 ${afacad.className}`}
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
                  <h2 className={`${afacad.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.days}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                  >
                    Hari
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${afacad.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.hours}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                  >
                    Jam
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${afacad.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.minutes}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                  >
                    Menit
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${afacad.className} text-xl lg:text-2xl`}>
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
      </div>
    </section>
  );
};

export default HeroComponent;
