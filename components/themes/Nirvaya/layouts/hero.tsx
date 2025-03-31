import useEvents from "@/hooks/themes/useEvents";
import useParticipants from "@/hooks/themes/useParticipants";
import { raleway } from "@/lib/fonts";
import { Client } from "@/lib/types";
import useCoverStore from "@/store/useCoverStore";
import useClientStore from "@/store/useClientStore";
import { getEventNames } from "@/utils/getEventNames";
import moment from "moment";
import Image from "next/image";
import React, { memo } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Hero = () => {
  const { client } = useClientStore();
  const { isOpen } = useCoverStore();
  const { gallery } = (client as Client) || {};
  const { state: participantsState } = useParticipants();
  const { state: eventState } = useEvents();

  const images =
    (gallery &&
      (gallery as string[]).filter(
        (image) => client?.seo !== image && client?.cover !== image
      )) ||
    [];

  return (
    <section className={`relative ${raleway.className}`}>
      <div data-aos="zoom-out">
        {!isOpen && client?.cover ? (
          <Swiper
            loop
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            effect="fade"
            speed={2000}
            className={`w-full transition-transform min-h-[600px] h-lvh`}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, EffectFade]}
          >
            <SwiperSlide className="relative w-full h-full" key={`Hero Cover`}>
              <div className="absolute inset-0 z-0">
                <Image
                  fill
                  quality={100}
                  alt={`Hero Cover`}
                  priority
                  sizes="100vw"
                  className="object-cover bg-nirvaya-dark/5 transform translate-y-0 lg:translate-y-0 transition-transform"
                  src={client?.cover}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        ) : (
          <Swiper
            loop
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            effect="fade"
            speed={2000}
            className={`w-full transition-transform min-h-[600px] h-lvh`}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, EffectFade]}
          >
            {images.map((image, index) => (
              <SwiperSlide
                className="relative w-full h-full"
                key={`Hero Image ${index + 1}`}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    fill
                    quality={100}
                    alt={`Hero Image ${index + 1}`}
                    priority
                    sizes="100vw"
                    className="object-cover bg-nirvaya-dark/5 transform translate-y-0 lg:translate-y-0 transition-transform"
                    src={image}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* <Swiper
          loop
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          effect="fade"
          speed={2000}
          className={`w-full transition-transform min-h-[600px] h-lvh`}
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay, EffectFade]}
        >
          {client?.cover && (
            <SwiperSlide className="relative w-full h-full" key={`Hero Cover`}>
              <div className="absolute inset-0 z-0">
                <Image
                  fill
                  quality={100}
                  alt={`Hero Cover`}
                  priority
                  sizes="100vw"
                  className="object-cover bg-nirvaya-dark/5 transform translate-y-0 lg:translate-y-0 transition-transform"
                  src={client?.cover}
                />
              </div>
            </SwiperSlide>
          )}
          {images.map((image, index) => (
            <SwiperSlide
              className="relative w-full h-full"
              key={`Hero Image ${index + 1}`}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  fill
                  quality={100}
                  alt={`Hero Image ${index + 1}`}
                  priority
                  sizes="100vw"
                  className="object-cover bg-nirvaya-dark/5 transform translate-y-0 lg:translate-y-0 transition-transform"
                  src={image}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-b from-nirvaya-dark/60 via-nirvaya-dark/0 to-nirvaya-dark/90 to-[90%] z-10`}
      >
        <div className="flex flex-col justify-between items-center py-16 px-8 h-svh relative z-20">
          <div>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-white text-center tracking-[2px] font-medium text-[10px] lg:text-xs uppercase"
            >
              Undangan {getEventNames(eventState.events || [])}
            </p>
            <h2
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-white font-edensor mt-1 lg:mt-2 leading-10 text-4xl lg:text-5xl text-center"
            >
              <span>{participantsState.groom?.nickname}</span>
              <span className="italic"> dan </span>
              <span>{participantsState.bride?.nickname}</span>
            </h2>
            {isOpen && (
              <p
                data-aos="fade-up"
                className="text-white text-[10px] lg:mt-2 text-center mt-[10px] lg:text-xs max-w-md"
              >
                Wahai pasangan suami-isteri, kembangkanlah cinta kasih di dalam
                dirimu, tekun dan tetaplah berkarma dalam menggapai kebahagiaan.
                Karena hanya orang yang bersungguh-sungguhlah mendapatkan
                keberhasilan dalam berkeluarga.
              </p>
            )}
          </div>
          {isOpen && (
            <div>
              {eventState.events.length > 0 &&
              eventState.timeRemainings.length > 0 ? (
                <div data-aos="fade-down" data-aos-delay="200">
                  <p
                    className={`text-white text-center tracking-[3px] font-medium text-[10px] lg:text-xs uppercase transform transition-all ease-in-out duration-300 ${
                      eventState.fade
                        ? "opacity-100 translate-y-0"
                        : "opacity-10 translate-y-1"
                    }`}
                  >
                    {eventState.events[eventState.currentIndex].name}
                  </p>
                  <p
                    className={`text-white text-center tracking-[3px] font-medium text-[10px] lg:text-xs uppercase mt-2 transform transition-all ease-in-out duration-300 delay-100 ${
                      eventState.fade
                        ? "opacity-100 translate-y-0"
                        : "opacity-10 translate-y-1"
                    }`}
                  >
                    {moment(
                      eventState.events[eventState.currentIndex].date
                    ).format("dddd, DD/MM/YYYY")}
                  </p>
                  <div
                    className={`flex justify-center gap-x-14 mt-4 transform transition-all ease-in-out duration-300 delay-200 ${
                      eventState.fade
                        ? "opacity-100 translate-y-0"
                        : "opacity-10 translate-y-1"
                    }`}
                  >
                    <div className="text-center">
                      <h6 className="font-edensor leading-none text-2xl lg:text-3xl text-white">
                        {
                          eventState.timeRemainings[eventState.currentIndex]
                            .days
                        }
                      </h6>
                      <p className="text-[10px] lg:text-xs text-white mt-1 font-edensor">
                        Hari
                      </p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-edensor leading-none text-2xl lg:text-3xl text-white">
                        {
                          eventState.timeRemainings[eventState.currentIndex]
                            .hours
                        }
                      </h6>
                      <p className="text-[10px] lg:text-xs text-white mt-1 font-edensor">
                        Jam
                      </p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-edensor leading-none text-2xl lg:text-3xl text-white">
                        {
                          eventState.timeRemainings[eventState.currentIndex]
                            .minutes
                        }
                      </h6>
                      <p className="text-[10px] lg:text-xs text-white mt-1 font-edensor">
                        Menit
                      </p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-edensor leading-none text-2xl lg:text-3xl text-white">
                        {
                          eventState.timeRemainings[eventState.currentIndex]
                            .seconds
                        }
                      </h6>
                      <p className="text-[10px] lg:text-xs text-white mt-1 font-edensor">
                        Detik
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
