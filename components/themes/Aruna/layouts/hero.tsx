import ImageShimmer from "@/components/image.shimmer";
import { useAruna } from "@/hooks/themes/useAruna";
import { lora } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import React, { FC } from "react";
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

  return (
    <section className="relative h-dvh overflow-hidden">
      <div className="fixed top-0 right-0 w-full xl:w-[40vw] 2xl:w-[30vw]">
        {video && video?.length > 0 ? (
          <div
            className="h-dvh w-full"
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
        className={`absolute inset-0 z-10 bg-gradient-to-b from-[5%] from-aruna-dark/50 via-aruna-dark/30 to-[95%] to-aruna-dark/40 transition-opacity ease-in-out duration-1000 delay-500 ${
          props.state.open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {props.state.open && (
          <div className="h-dvh flex flex-col justify-center items-center max-w-screen-sm lg:max-w-screen-lg mx-auto py-[60px] md:py-[100px] px-8 w-full">
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className={`${lora.className} text-white/80 md:text-base uppercase tracking-[4px] text-sm mb-2`}
            >
              Undangan {props.state.client?.theme?.category}
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              style={{ lineHeight: "normal" }}
              className={`font-tan-pearl text-white text-3xl md:text-4xl 2xl:text-5xl`}
            >
              {props.state.client?.opening_title}
            </h1>
            <div
              data-aos="zoom-in"
              data-aos-delay="1200"
              className="h-full w-[1px] bg-white/50 my-8"
            ></div>
            <div
              className="max-w-md"
              data-aos="fade-down"
              data-aos-delay="1000"
            >
              <p
                className={`${lora.className} text-white text-sm md:text-base text-center`}
              >
                {props.state.client?.opening_description}
              </p>
            </div>
            <div
              className="flex mt-6"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              <h1
                style={{ lineHeight: "normal" }}
                className={`font-tan-pearl text-white/40 text-3xl md:text-4xl 2xl:text-5xl -mr-2`}
              >
                {getInitial(props.state.groom?.nickname as string)}
              </h1>
              <h1
                style={{ lineHeight: "normal" }}
                className={`font-tan-pearl text-white/40 text-3xl md:text-4xl 2xl:text-5xl mt-4 -ml-2`}
              >
                {getInitial(props.state.bride?.nickname as string)}
              </h1>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroComponent;
