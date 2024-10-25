import ImageShimmer from "@/components/image.shimmer";
import { useSamaya } from "@/hooks/themes/useSamaya";
import { marcellus, windsong } from "@/lib/fonts";
import moment from "moment";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  state: useSamaya["state"];
}

const HeroComponent: FC<Props> = (props) => {
  const events = props.state.client?.events || [];

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
    <section>
      <div className="relative h-dvh w-full overflow-hidden z-20 bg-samaya-dark">
        <div
          className="h-[95dvh] relative"
          data-aos="zoom-out"
          data-aos-delay="300"
        >
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
                        quality={100}
                        alt={`hero-img-${index}`}
                        priority
                        sizes="100vw"
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
              <div
                className={`w-full justify-center flex items-center gap-x-3 transform transition-all duration-500 ease-in-out ${
                  fade
                    ? "opacity-100 translate-y-0"
                    : "opacity-10 translate-y-1"
                }`}
              >
                <p
                  className={`${marcellus.className} text-white text-sm md:text-lg lg:text-xl`}
                >
                  {events[currentIndex].name}
                </p>
                <div className="h-1 w-1 min-h-1 min-w-1 rounded-full bg-white"></div>
                <p
                  className={`${marcellus.className} text-white text-sm lg:text-xl`}
                >
                  {moment(events[currentIndex].date).format("DD / MMMM / YYYY")}
                </p>
              </div>
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
