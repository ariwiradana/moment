import ImageShimmer from "@/components/image.shimmer";
import { useAruna } from "@/hooks/themes/useAruna";
import { roboto } from "@/lib/fonts";
import { getEventNames } from "@/utils/getEventNames";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  state: useAruna["state"];
}

const HeroComponent: FC<Props> = (props) => {
  const video =
    Array.isArray(props.state.client?.videos) &&
    props.state.client.videos.length > 0
      ? props.state.client.videos.filter((v) => !isYoutubeVideo(v))
      : [];

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
    <section className="relative h-svh overflow-hidden">
      <div className="fixed top-0 right-0 w-full xl:w-[40vw] 2xl:w-[30vw] overflow-hidden">
        {video && video?.length > 0 ? (
          <div
            className="h-svh w-full"
            data-aos="zoom-out"
            data-aos-delay="500"
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
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
              delay: 2000,
              disableOnInteraction: false,
            }}
            effect="fade"
            speed={2000}
            className="w-full transition-transform h-svh"
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, EffectFade]}
          >
            <>
              {Array.isArray(props.state.client?.gallery) &&
              props.state.client?.gallery.length > 0
                ? props.state.client.gallery
                    .filter(
                      (image) =>
                        image !== props.state.client?.cover &&
                        image !== props.state.client?.seo
                    )
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
        className={`absolute inset-0 z-10 bg-gradient-to-b from-[5%] from-aruna-dark/70 via-aruna-dark/10 to-[95%] to-aruna-dark/70 transition-opacity ease-in-out duration-1000 delay-500 ${
          props.state.open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {props.state.open && (
          <div className="h-svh flex flex-col max-w-screen-sm lg:max-w-screen-lg mx-auto py-[60px] md:py-[100px] px-8 md:px-12 w-full">
            <div>
              <h1
                data-aos="fade-up"
                data-aos-delay="200"
                className={`font-high-summit text-white text-4xl md:text-5xl leading-10 2xl:text-6xl mb-2`}
              >
                {props.state.client?.theme_category?.name === "Pernikahan" ? (
                  <>
                    {props.state.groom?.nickname}
                    <br />& {props.state.bride?.nickname}
                  </>
                ) : (
                  <>
                    Undangan {getEventNames(props.state.client?.events || [])}
                  </>
                )}
              </h1>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-delay="1200"
              className="h-full w-[1px] bg-white/50 my-8"
            ></div>
            <div>
              <div data-aos="fade-down" data-aos-delay="800">
                <div
                  className={`w-full flex items-center gap-x-5 md:gap-x-6 transform transition-all duration-500 ease-in-out ${
                    fade
                      ? "opacity-100 translate-y-0"
                      : "opacity-10 translate-y-1"
                  }`}
                >
                  <p
                    className={`${roboto.className} text-white text-xs md:text-sm tracking-[3px] uppercase`}
                  >
                    {events[currentIndex].name}
                  </p>
                  <div className="h-[2px] w-[2px] min-h-[2px] min-w-[2px] rounded-full bg-white"></div>
                  <p
                    className={`${roboto.className} text-white text-xs md:text-sm tracking-[3px] uppercase`}
                  >
                    {moment(events[currentIndex].date).format(
                      "DD / MMM / YYYY"
                    )}
                  </p>
                </div>
              </div>
              <p
                data-aos="fade-down"
                data-aos-delay="600"
                className={`${roboto.className} text-white text-xs md:text-sm mt-8 max-w-screen-sm`}
              >
                {props.state.client?.theme_category?.name === "Pernikahan" ? (
                  <>
                    Wahai pasangan suami-isteri, semoga kalian tetap bersatu dan
                    tidak pernah terpisahkan. Semoga kalian mencapai hidup penuh
                    kebahagiaan, tinggal di rumah yang penuh kegembiraan bersama
                    seluruh keturunanmu.
                  </>
                ) : (
                  <>
                    Tanpa mengurangi rasa hormat, kami mengundang anda untuk
                    menghadiri acara{" "}
                    <span className="lowercase">
                      {getEventNames(props.state.client?.events || [])}
                    </span>{" "}
                    kami.
                  </>
                )}
              </p>
              {props.state.client?.theme_category?.name === "Pernikahan" && (
                <div
                  className="flex items-center gap-x-3 md:gap-x-5 mt-8"
                  data-aos="fade-down"
                  data-aos-delay="400"
                >
                  <div className="h-[0.5px] w-4 md:w-6 lg:w-8 bg-white"></div>
                  <p
                    className={`font-high-summit text-white text-base md:text-lg`}
                  >
                    Rgveda X.85.42
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroComponent;
