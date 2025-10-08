"use client";
import React, { memo, useMemo } from "react";
import { raleway } from "@/lib/fonts";
import useEvents from "@/hooks/themes/useEvents";
import usePhotos from "@/hooks/themes/usePhotos";
import useParticipants from "@/hooks/themes/useParticipants";
import useCoverStore from "@/store/useCoverStore";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { formatDate } from "@/utils/formatDate";

const HeroComponent = () => {
  const { state: eventState } = useEvents();
  const {
    state: { images },
  } = usePhotos();
  const { isOpen } = useCoverStore();
  const { state: participantState } = useParticipants();

  // Memoize slides supaya tidak rerender setiap render parent
  const slides = useMemo(
    () =>
      images.map((image, index) => (
        <SwiperSlide key={`hero-slide-${index}`}>
          <Image
            src={image as string}
            alt={`Hero Slide ${index + 1}`}
            fill
            sizes="100vw"
            className="object-cover"
            quality={80} // sedikit lebih ringan tapi tetap tajam
            priority={index === 0} // preload hanya slide pertama
            loading={index === 0 ? "eager" : "lazy"}
          />
        </SwiperSlide>
      )),
    [images]
  );

  return (
    <section
      className="relative bg-samaya-dark h-lvh w-full overflow-hidden"
      aria-label="Hero Section"
    >
      {images.length > 0 && (
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          slidesPerView={1}
          className="w-full h-full"
        >
          {slides}
        </Swiper>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent via-[40%] to-samaya-dark to-[90%]" />

      {/* Text overlay */}
      {isOpen && (
        <div className="absolute inset-0 z-20 flex flex-col justify-end items-center py-8 px-6">
          <h1
            data-aos="fade-up"
            className="font-tan-pearl text-white text-2xl md:text-3xl 2xl:text-4xl mb-2 lg:mb-4 text-center"
          >
            {participantState.groom?.nickname} &{" "}
            {participantState.bride?.nickname}
          </h1>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="w-full flex justify-center mt-4"
          >
            <div
              className={`flex items-center gap-x-3 transition-all duration-500 ease-in-out ${
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
              <div className="h-1 w-1 rounded-full bg-white"></div>
              <p
                className={`${raleway.className} text-white text-xs md:text-sm tracking-[1px]`}
              >
                {formatDate(eventState.events[eventState.currentIndex].date)}
              </p>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="h-12 lg:h-16 aspect-video relative mt-4"
          >
            <Image
              src="/images/samaya/leaf-primary.svg"
              alt="floral-top-corner"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(HeroComponent);
