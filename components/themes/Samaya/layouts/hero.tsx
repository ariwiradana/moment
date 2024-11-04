import ImageShimmer from "@/components/image.shimmer";
import { useSamaya } from "@/hooks/themes/useSamaya";
import { marcellus } from "@/lib/fonts";
import moment from "moment";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  state: useSamaya["state"];
}

const HeroComponent: FC<Props> = (props) => {
  const events = props.state.client?.events || [];
  const gallery: string[] = (props.state.client?.gallery || []) as string[];

  const images = gallery.filter((g) => g !== props.state.client?.cover);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);

  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
          setFade(true);
        }, 500);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [events.length]);

  return (
    <section className="h-svh">
      {images.length > 0 && (
        <div className="fixed inset-0" data-aos="zoom-out">
          <Swiper
            loop
            effect="fade"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={3000}
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
                    fill
                    quality={100}
                    alt={`hero-img-${index}`}
                    priority
                    sizes="100vw"
                    className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform"
                    src={image as string}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {props.state.open && (
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-samaya-dark to-[90%] h-svh flex flex-col justify-end items-center py-8"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <h1
            data-aos="fade-up"
            data-aos-delay="1000"
            className={`font-tan-pearl text-white text-[28px] md:text-4xl my-2 lg:mb-6 text-center`}
          >
            {props.state.groom?.nickname} & {props.state.bride?.nickname}
          </h1>
          <div
            className="w-full flex justify-center"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            <div
              className={`w-full justify-center flex items-center gap-x-3 transform transition-all duration-500 ease-in-out ${
                fade ? "opacity-100 translate-y-0" : "opacity-10 translate-y-1"
              }`}
            >
              <p
                className={`${marcellus.className} text-white text-sm md:text-base`}
              >
                {events[currentIndex].name}
              </p>
              <div className="h-1 w-1 min-h-1 min-w-1 rounded-full bg-white"></div>
              <p
                className={`${marcellus.className} text-white text-sm md:text-base`}
              >
                {moment(events[currentIndex].date).format("DD / MMMM / YYYY")}
              </p>
            </div>
          </div>
          <div
            className="h-12 lg:h-16 aspect-video relative m-4"
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

export default HeroComponent;
