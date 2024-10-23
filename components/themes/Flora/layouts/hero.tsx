import ImageShimmer from "@/components/image.shimmer";
import { useSamaya } from "@/hooks/themes/useSamaya";
import { italiana, marcellus } from "@/lib/fonts";
import moment from "moment";
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
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [events.length]);

  return (
    <section>
      <div className="relative h-dvh w-full overflow-hidden z-20 bg-samaya-dark">
        <div className="h-dvh relative">
          <Swiper
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={10000}
            className="w-full transition-transform h-dvh"
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
                        quality={100}
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
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent md:max-w-[70dvw] lg:max-w-[40dvw] 2xl:max-w-[30dvw] via-[#252015]/20 to-flora-dark flex flex-col justify-end px-8 lg:px-32 py-16 lg:py-32">
            <h1
              className={`${italiana.className} text-white text-5xl md:text-6xl leading-[40px]`}
            >
              {props.state.groom?.nickname}
              <br />& {props.state.bride?.nickname}
            </h1>
            <div className="py-2 border-y border-y-white w-full my-6 md:my-12">
              <div
                className={`flex justify-center items-center gap-x-5 transform transition-all ease-in-out duration-700 ${
                  fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                }`}
              >
                <p
                  className={`${marcellus.className} text-white text-sm md:text-base`}
                >
                  {events[currentIndex].name}
                </p>
                <div className="w-[5px] h-[5px] rounded-full bg-white"></div>

                <p
                  className={`${marcellus.className} text-white text-sm md:text-base`}
                >
                  {moment(events[currentIndex].date).format(
                    "dddd, DD / MM / YYYY"
                  )}
                </p>
              </div>
            </div>
            <p
              className={`${marcellus.className} text-white text-xs md:text-sm`}
            >
              Wahai pasangan suami-isteri, semoga kalian tetap bersatu dan tidak
              pernah terpisahkan. Semoga kalian mencapai hidup penuh
              kebahagiaan, tinggal di rumah yang penuh kegembiraan bersama
              seluruh keturunanmu.
            </p>
            <div className="flex items-center mt-4 gap-x-2 md:gap-x-4">
              <div className="h-[0.5px] w-4 bg-white"></div>
              <p
                className={`${marcellus.className} text-white text-sm md:text-base`}
              >
                Rgveda X.85.42
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
