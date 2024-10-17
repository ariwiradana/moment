import ImageShimmer from "@/components/image.shimmer";
import { useSamaya } from "@/hooks/themes/useSamaya";
import { marcellus, windsong } from "@/lib/fonts";
import moment from "moment";
import Image from "next/image";
import React, { FC } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  state: useSamaya["state"];
}

const HeroComponent: FC<Props> = (props) => {
  const events = props.state.client?.events || [];

  return (
    <section>
      <div className="relative h-dvh w-full overflow-hidden z-20 bg-samaya-dark">
        <div className="h-[95dvh] relative">
          <Swiper
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={10000}
            className="w-full transition-transform h-[95dvh]"
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
          <div
            className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-b from-transparent to-samaya-dark h-[400px] md:h-[800px] flex flex-col justify-end items-center"
            data-aos="fade-up"
          >
            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className={`${windsong.className} text-white text-[40px] mt-2 lg:text-6xl lg:mb-6`}
            >
              {props.state.groom?.nickname} & {props.state.bride?.nickname}
            </h1>
            <div
              className="w-full flex justify-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                speed={1000}
                effect={"fade"}
                modules={[EffectFade, Autoplay]}
                className="w-full"
              >
                {events.map((event) => (
                  <SwiperSlide key={event.id}>
                    <div className="w-full justify-center flex items-center gap-x-4">
                      <p
                        className={`${marcellus.className} text-white text-base md:text-lg lg:text-xl`}
                      >
                        {event.name}
                      </p>
                      <div className="h-1 w-1 min-h-1 min-w-1 rounded-full bg-white"></div>
                      <p
                        className={`${marcellus.className} text-white text-base lg:text-xl`}
                      >
                        {moment(event.date).format("DD / MMMM / YYYY")}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="h-12 lg:h-16 aspect-video relative m-4"
              data-aos="zoom-in-up"
              data-aos-delay="300"
            >
              <Image
                fill
                alt="floral-top-corner"
                src="/images/samaya/leaf-primary.svg"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
