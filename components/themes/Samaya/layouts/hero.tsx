import ImageShimmer from "@/components/image.shimmer";
import useEvents from "@/hooks/themes/useEvents";
import useParticipants from "@/hooks/themes/useParticipants";
import { raleway } from "@/lib/fonts";
import useCoverStore from "@/store/useCoverStore";
import moment from "moment";
import Image from "next/image";
import React, { memo } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import usePhotos from "@/hooks/themes/usePhotos";

const HeroComponent = () => {
  const { state: eventState } = useEvents();
  const {
    state: { images },
  } = usePhotos();
  const { isOpen } = useCoverStore();
  const { state: participantState } = useParticipants();

  return (
    <section className="h-svh">
      {images.length > 0 && (
        <div className="inset-0" data-aos="zoom-out" data-aos-delay="1000">
          <Swiper
            loop
            effect="fade"
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={2000}
            className="w-full transition-transform h-lvh"
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, EffectFade]}
          >
            {images.map((image, index) => (
              <SwiperSlide
                className="relative w-full h-full"
                key={`hero-img-${index}`}
              >
                <div className="absolute inset-0 z-0">
                  <ImageShimmer
                    sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                    fill
                    quality={100}
                    alt={`hero-img-${index}`}
                    priority
                    className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform"
                    src={image as string}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {isOpen && (
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent via-[40%] to-samaya-dark to-[90%] h-svh flex flex-col justify-end items-center py-8"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <h1
            data-aos="fade-up"
            data-aos-delay="1000"
            className={`font-tan-pearl text-white text-2xl md:text-3xl 2xl:text-4xl mb-2 lg:mb-4 text-center`}
          >
            {participantState.groom?.nickname} &{" "}
            {participantState.bride?.nickname}
          </h1>
          <div
            className="w-full flex justify-center"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            <div
              className={`w-full justify-center flex items-center gap-x-3 transform transition-all duration-500 ease-in-out ${
                eventState.fade
                  ? "opacity-100 translate-y-0"
                  : "opacity-10 translate-y-1"
              }`}
            >
              <p
                className={`${raleway.className} text-white text-xs md:text-sm tracking-[1px]`}
              >
                {eventState.events[eventState.currentIndex].name}
              </p>
              <div className="h-1 w-1 min-h-1 min-w-1 rounded-full bg-white"></div>
              <p
                className={`${raleway.className} text-white text-xs md:text-sm tracking-[1px]`}
              >
                {moment(eventState.events[eventState.currentIndex].date).format(
                  "DD / MMMM / YYYY"
                )}
              </p>
            </div>
          </div>
          <div
            className="h-12 lg:h-16 aspect-video relative m-2"
            data-aos="zoom-in-up"
            data-aos-delay="1400"
          >
            <Image
              fill
              alt="floral-top-corner"
              src="/images/samaya/leaf-primary.svg"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(HeroComponent);
