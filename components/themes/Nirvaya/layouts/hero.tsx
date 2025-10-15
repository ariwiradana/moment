import React, { useMemo } from "react";
import { raleway } from "@/lib/fonts";
import useCoverStore from "@/store/useCoverStore";
import useParticipants from "@/hooks/themes/useParticipants";
import useEvents from "@/hooks/themes/useEvents";
import usePhotos from "@/hooks/themes/usePhotos";
import { getEventNames } from "@/utils/getEventNames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";

const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const Hero = () => {
  const { isOpen } = useCoverStore();
  const { state: participantsState } = useParticipants();
  const { state: eventState } = useEvents();
  const {
    state: { images },
  } = usePhotos();

  const eventNames = useMemo(
    () => getEventNames(eventState.events || []),
    [eventState.events]
  );

  const countdownData = useMemo(() => {
    if (!eventState.events.length || !eventState.timeRemainings.length)
      return null;
    const currentEvent = eventState.events[eventState.currentIndex];
    const currentRemaining = eventState.timeRemainings[eventState.currentIndex];
    return { currentEvent, currentRemaining };
  }, [eventState]);

  return (
    <section className={`relative bg-nirvaya-dark ${raleway.className}`}>
      <Swiper
        modules={[Autoplay, EffectFade]}
        speed={2000}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="h-lvh w-full"
        fadeEffect={{ crossFade: true }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`hero-slide-${index}`}>
            <Image
              fill
              quality={80}
              alt={`hero-img-${index}`}
              priority={index === 0}
              className="object-cover shimmer-dark bg-nirvaya-dark"
              src={image}
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-gradient-to-b from-nirvaya-dark/60 via-nirvaya-dark/0 to-nirvaya-dark/90 to-[90%] z-10">
        {isOpen && countdownData && (
          <div className="flex flex-col justify-between items-center py-16 px-8 h-svh relative z-20">
            <div>
              <p
                data-aos="fade-up"
                className="text-white text-center tracking-[2px] font-medium text-[10px] lg:text-xs uppercase"
              >
                Undangan {eventNames}
              </p>
              <h2
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-white font-edensor mt-1 lg:mt-2 leading-10 text-4xl lg:text-5xl text-center"
              >
                <span>{participantsState.groom?.nickname}</span>
                <span className="italic"> dan </span>
                <span>{participantsState.bride?.nickname}</span>
              </h2>
              <p
                data-aos="fade-up"
                data-aos-delay="400"
                className="text-white text-[10px] lg:mt-2 text-center mt-[10px] lg:text-xs max-w-md"
              >
                Wahai pasangan suami-isteri, kembangkanlah cinta kasih di dalam
                dirimu, tekun dan tetaplah berkarma dalam menggapai kebahagiaan.
                Karena hanya orang yang bersungguh-sungguhlah mendapatkan
                keberhasilan dalam berkeluarga.
              </p>
            </div>

            <div
              className={`duration-500 ease-in-out transition-all ${
                eventState.fade
                  ? "opacity-100 translate-y-0"
                  : "opacity-10 translate-y-3"
              }`}
            >
              <p
                data-aos="fade-down"
                data-aos-delay="1000"
                className="text-white text-center tracking-[3px] font-medium text-[10px] lg:text-xs uppercase transform transition-all duration-300 ease-in-out opacity-100 translate-y-0"
              >
                {countdownData.currentEvent.name}
              </p>
              <p
                data-aos="fade-down"
                data-aos-delay="800"
                className="text-white text-center tracking-[3px] font-medium text-[10px] lg:text-xs uppercase mt-2 transform transition-all duration-300 ease-in-out opacity-100 translate-y-0"
              >
                {formatEventDate(countdownData.currentEvent.date)}
              </p>
              <div
                className="flex justify-center gap-x-14 mt-4"
                data-aos="fade-down"
                data-aos-delay="600"
              >
                {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
                  <div key={idx} className="text-center">
                    <h6 className="font-edensor leading-none text-2xl lg:text-3xl text-white">
                      {
                        countdownData.currentRemaining[
                          unit as keyof typeof countdownData.currentRemaining
                        ]
                      }
                    </h6>
                    <p className="text-[10px] lg:text-xs text-white mt-1 font-edensor">
                      {unit === "days"
                        ? "Hari"
                        : unit === "hours"
                        ? "Jam"
                        : unit === "minutes"
                        ? "Menit"
                        : "Detik"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Hero);
