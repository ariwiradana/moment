import ImageShimmer from "@/components/image.shimmer";
import { useAruna } from "@/hooks/themes/useAruna";
import { lora } from "@/lib/fonts";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  state: useAruna["state"];
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

  const video =
    Array.isArray(props.state.client?.videos) &&
    props.state.client.videos.length > 0
      ? props.state.client.videos.filter((v) => !isYoutubeVideo(v))
      : [];

  return (
    <section className="relative h-dvh">
      <div className="fixed inset-0" data-aos="zoom-out" data-aos-delay="500">
        {video && video?.length > 0 ? (
          <div className="h-dvh w-full">
            <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
              <video
                className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 object-cover"
                src={video[0]}
                autoPlay
                muted
                loop
                playsInline
              ></video>
            </div>
          </div>
        ) : (
          <Swiper
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            effect="fade"
            speed={3000}
            className="w-full transition-transform h-dvh"
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
                      sizes="100vw"
                      className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform"
                      src={props.state.client.cover}
                    />
                  </div>
                </SwiperSlide>
              )}
              {Array.isArray(props.state.client?.gallery) &&
              props.state.client?.gallery.length > 0
                ? props.state.client.gallery
                    .filter((image) => image !== props.state.client?.cover)
                    .map((image, index) => (
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
                            src={image}
                          />
                        </div>
                      </SwiperSlide>
                    ))
                : null}
            </>
          </Swiper>
        )}
      </div>
      <div
        className={`absolute inset-0 z-10 bg-gradient-to-b from-[5%] from-aruna-dark/50 via-aruna-dark/20 to-[95%] to-aruna-dark/40 transition-opacity ease-in-out duration-1000 delay-500 ${
          props.state.open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {props.state.open && (
          <div className="h-dvh flex flex-col justify-between max-w-screen-xl mx-auto py-[60px] md:py-[100px] px-8">
            <div>
              <h1
                style={{ lineHeight: "normal" }}
                data-aos="fade-up"
                data-aos-delay="200"
                className={`font-tan-pearl text-white text-[32px] md:text-5xl`}
              >
                {props.state.groom?.nickname}
                <br />& {props.state.bride?.nickname}
              </h1>
              <div data-aos="fade-up" data-aos-delay="400" className="mt-2">
                <div
                  className={`w-full flex items-center gap-x-5 md:gap-x-7 transform transition-all duration-500 ease-in-out ${
                    fade
                      ? "opacity-100 translate-y-0"
                      : "opacity-10 translate-y-1"
                  }`}
                >
                  <p
                    className={`${lora.className} text-white text-sm md:text-base`}
                  >
                    {events[currentIndex].name}
                  </p>
                  <div className="h-1 w-1 min-h-1 min-w-1 rounded-full bg-white"></div>
                  <p
                    className={`${lora.className} text-white text-sm md:text-base`}
                  >
                    {moment(events[currentIndex].date).format(
                      "DD / MMMM / YYYY"
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-delay="1000"
              className="h-full w-[1px] bg-white/50 my-8"
            ></div>
            <div className="max-w-md">
              <div data-aos="fade-up" data-aos-delay="1800">
                <p
                  className={`${lora.className} text-white text-xs md:text-sm text-justify`}
                >
                  Wahai pasangan suami-isteri, semoga kalian tetap bersatu dan
                  tidak pernah terpisahkan. Semoga kalian mencapai hidup penuh
                  kebahagiaan, tinggal di rumah yang penuh kegembiraan bersama
                  seluruh keturunanmu.
                </p>
                <div className="flex items-center gap-x-2 mt-4 md:mt-6">
                  <div className="h-[0.5px] w-4 bg-white"></div>
                  <p
                    className={`${lora.className} text-white text-sm md:text-base`}
                  >
                    Rgveda X.85.42
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroComponent;
