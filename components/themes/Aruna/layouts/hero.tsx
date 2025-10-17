import useEvents from "@/hooks/themes/useEvents";
import useParticipants from "@/hooks/themes/useParticipants";
import { roboto } from "@/lib/fonts";
import useClientStore from "@/store/useClientStore";
import useCoverStore from "@/store/useCoverStore";
import { getEventNames } from "@/utils/getEventNames";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import moment from "moment";
import Image from "next/image";
import React, { memo, useMemo, useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

const HeroComponent = () => {
  const { client } = useClientStore();
  const { isOpen } = useCoverStore();
  const {
    state: { events, fade, currentIndex },
  } = useEvents();
  const { state: participant } = useParticipants();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const video = useMemo(() => {
    return Array.isArray(client?.videos) && client.videos.length > 0
      ? client.videos.filter((v) => !isYoutubeVideo(v))
      : [];
  }, [client?.videos]);

  const eventNames = useMemo(() => getEventNames(events), [events]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setVideoPlaying(true))
        .catch(() => setVideoPlaying(false));
    }
  }, [videoRef.current]);

  return (
    <section className="relative min-h-[600px] h-lvh overflow-hidden bg-aruna-dark">
      {video.length > 0 && (
        <video
          ref={videoRef}
          src={video[0]}
          poster={client?.cover || ""}
          className="absolute w-full h-full object-cover top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {video.length === 0 &&
      !videoPlaying &&
      Array.isArray(client?.gallery) &&
      client.gallery.length > 0 ? (
        <Swiper
          modules={[Autoplay, EffectFade]}
          slidesPerView={1}
          effect="fade"
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          lazyPreloadPrevNext={2}
          className="absolute inset-0 h-lvh"
        >
          {client.gallery
            .filter((img) => img !== client?.cover && img !== client?.seo)
            .map((img, index) => (
              <SwiperSlide key={`slide-${index}`}>
                <Image
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  fill
                  quality={70}
                  sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                  loading="lazy"
                  className="object-cover shimmer-dark"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      ) : null}

      <div
        className={`absolute inset-0 z-10 bg-gradient-to-b from-aruna-dark/50 from-[5%] via-aruna-dark/20 to-[85%] to-aruna-dark transition-opacity ease-in-out duration-1000 delay-500 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {isOpen && (
          <div className="relative h-svh z-40 flex flex-col py-[60px] md:py-[100px] px-6 justify-between items-center">
            <div className="text-center">
              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className={`text-white/70 text-[10px] md:text-xs uppercase text-center tracking-[3px] ${roboto.className}`}
              >
                Undangan {eventNames}
              </p>
              <h1
                data-aos="fade-up"
                data-aos-delay="400"
                className={`font-high-summit text-white text-4xl md:text-5xl 2xl:text-6xl leading-10 mt-4`}
              >
                {participant.groom?.nickname} & {participant.bride?.nickname}
              </h1>
            </div>
            <div className="text-center flex flex-col items-center">
              <div data-aos="fade-down" data-aos-delay="1000">
                <div
                  className={`w-full flex items-center gap-x-5 md:gap-x-6 transform transition-all duration-500 ease-in-out ${
                    fade
                      ? "opacity-100 translate-y-0"
                      : "opacity-10 translate-y-1"
                  }`}
                >
                  <p
                    className={`${roboto.className} text-white text-[10px] md:text-xs tracking-[4px] uppercase`}
                  >
                    {events[currentIndex].name}
                  </p>
                  <div className="h-[2px] w-[2px] min-h-[2px] min-w-[2px] rounded-full bg-white"></div>
                  <p
                    className={`${roboto.className} text-white text-[10px] md:text-xs tracking-[4px] uppercase`}
                  >
                    {moment(events[currentIndex].date).format(
                      "DD / MMM / YYYY"
                    )}
                  </p>
                </div>
              </div>
              <p
                data-aos="fade-down"
                data-aos-delay="800"
                className={`text-white/70 text-[10px] md:text-xs text-center mt-4 max-w-sm mx-auto ${roboto.className}`}
              >
                {client?.opening_title}, {client?.opening_description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(HeroComponent);
