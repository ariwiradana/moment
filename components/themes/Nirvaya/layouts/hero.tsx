import ImageShimmer from "@/components/image.shimmer";
import { useNirvaya } from "@/hooks/themes/useNirvaya";
import { balthazar, italiana } from "@/lib/fonts";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  state: useNirvaya["state"];
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

  const gallery: string[] = (props.state.client?.gallery as string[]) || [];
  const images: string[] = [
    ...(props.state.client?.cover ? [props.state.client.cover] : []),
    ...(gallery?.filter(
      (g) => g !== props.state.client?.cover && g !== props.state.client?.seo
    ) || []),
  ];

  return (
    <section className={`relative h-[calc(100svh+40px)]`}>
      {images.length > 0 && (
        <div className="fixed inset-0">
          <Swiper
            loop
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            effect="fade"
            speed={2000}
            className="w-full transition-transform h-lvh"
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, EffectFade]}
          >
            <>
              {props.state.client?.cover && (
                <SwiperSlide
                  className="relative w-full h-full"
                  key={`hero-cover`}
                >
                  <div className="absolute inset-0 z-0">
                    <ImageShimmer
                      fill
                      quality={100}
                      alt={`hero-cover`}
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 90vw"
                      className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform"
                      src={props.state.client.cover}
                    />
                  </div>
                </SwiperSlide>
              )}
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 90vw"
                      className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform"
                      src={image as string}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </>
          </Swiper>
        </div>
      )}
      <div
        className={`absolute h-[calc(100svh+40px)] inset-0 flex flex-col justify-between items-center z-10 bg-gradient-to-b from-nirvaya-dark/95 via-[30%] via-transparent to-nirvaya-dark/90 py-[60px] md:py-[100px] px-8 transition-opacity ease-in-out duration-1000 delay-500 ${
          props.state.open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {props.state.open && (
          <>
            <div>
              <p
                data-aos="fade-up"
                data-aos-delay="1200"
                className={`${balthazar.className} text-white md:text-base text-sm uppercase text-center`}
              >
                Undangan {props.state.client?.theme?.category}
              </p>
              <h1
                data-aos="fade-up"
                data-aos-delay="1400"
                className={`${italiana.className} text-white text-[40px] md:text-5xl`}
              >
                {props.state.groom?.nickname} & {props.state.bride?.nickname}
              </h1>
            </div>
            <div className="max-w-md mx-auto">
              <div
                data-aos="fade-up"
                data-aos-delay="1600"
                className="w-full flex justify-center border-y-[0.5px] border-y-white py-[10px] px-6"
              >
                <div
                  className={`w-full justify-center flex items-center gap-x-5 md:gap-x-7 transform transition-all duration-500 ease-in-out ${
                    fade
                      ? "opacity-100 translate-y-0"
                      : "opacity-10 translate-y-1"
                  }`}
                >
                  <p
                    className={`${balthazar.className} text-white text-base md:text-lg`}
                  >
                    {events[currentIndex].name}
                  </p>
                  <div className="h-1 w-1 min-h-1 min-w-1 rounded-full bg-white"></div>
                  <p
                    className={`${balthazar.className} text-white text-base md:text-lg`}
                  >
                    {moment(events[currentIndex].date).format(
                      "DD / MMMM / YYYY"
                    )}
                  </p>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="1800" className="pb-10">
                <p
                  className={`${balthazar.className} text-white text-sm md:text-base text-justify mt-4 md:mt-6`}
                >
                  Wahai pasangan suami-isteri, semoga kalian tetap bersatu dan
                  tidak pernah terpisahkan. Semoga kalian mencapai hidup penuh
                  kebahagiaan, tinggal di rumah yang penuh kegembiraan bersama
                  seluruh keturunanmu.
                </p>
                <div className="flex items-center gap-x-2 mt-4 md:mt-6">
                  <div className="h-[0.5px] w-4 bg-white"></div>
                  <p
                    className={`${balthazar.className} text-white text-base md:text-lg`}
                  >
                    Rgveda X.85.42
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroComponent;
