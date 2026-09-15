import { NextPage } from "next";
import { memo, useMemo } from "react";
import useEvents from "@/hooks/themes/useEvents";
import useParticipants from "@/hooks/themes/useParticipants";
import useCoverStore from "@/store/useCoverStore";
import { rubik } from "@/lib/fonts";
import useClientStore from "@/store/useClientStore";

const Hero: NextPage = () => {
  const { isOpen } = useCoverStore();
  const {
    state: { events, fade, currentIndex },
  } = useEvents();
  const {
    state: { bride, groom },
  } = useParticipants();
  const { client } = useClientStore();

  const currentEvent = useMemo(
    () => events?.[currentIndex],
    [events, currentIndex]
  );

  // Format tanggal tanpa moment.js
  const { dayMonth, year } = useMemo(() => {
    if (!currentEvent?.date) return { dayMonth: "", year: "" };
    const date = new Date(currentEvent.date);
    const formatter = new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const [day, month, fullYear] = formatter.format(date).split("/");
    return { dayMonth: `${day}/${month}`, year: fullYear };
  }, [currentEvent?.date]);

  if (!currentEvent) return null;

  return (
    <section className="h-dvh snap-start w-full relative">
      <div className="absolute inset-0 z-10 bg-luma-dark/50 py-[60px] px-6 flex flex-col justify-between">
        <div>
          <div
            data-aos="fade-down"
            data-aos-delay="400"
            className="flex justify-between w-full max-w-xl mx-auto"
          >
            <div
              className={`transform transition-all flex justify-center items-center ease-in-out duration-200 ${
                fade
                  ? "opacity-100 translate-y-0"
                  : "opacity-10 translate-y-[4px]"
              }`}
            >
              <p
                className={`${rubik.className} uppercase text-xs md:text-sm lg:text-xl tracking-[4px] font-light text-white`}
              >
                {dayMonth}
              </p>
            </div>
            <div
              className={`transform transition-all flex justify-center items-center ease-in-out duration-200 ${
                fade
                  ? "opacity-100 translate-y-0"
                  : "opacity-10 translate-y-[4px]"
              }`}
            >
              <p
                className={`${rubik.className} uppercase text-xs md:text-sm lg:text-xl tracking-[4px] font-light text-white`}
              >
                {year}
              </p>
            </div>
          </div>

          <div data-aos="fade-down" data-aos-delay="200">
            <div
              className={`transform mt-10 transition-all flex justify-center items-center ease-in-out duration-200 delay-100 ${
                fade
                  ? "opacity-100 translate-y-0"
                  : "opacity-10 translate-y-[4px]"
              }`}
            >
              <p
                className={`${rubik.className} uppercase text-[10px] md:text-sm lg:text-base tracking-[4px] font-light text-white delay-200`}
              >
                Undangan {currentEvent.name}
              </p>
            </div>
          </div>
          <h1
            data-aos="fade-down"
            className="font-butler leading-[46px] md:leading-[56px] lg:leading-[76px] text-center text-white text-6xl md:text-7xl lg:text-8xl mb-3 mt-5 lg:mt-8"
          >
            <span aria-label={`Pengantin pria: ${groom?.nickname}`}>
              {groom?.nickname}
            </span>
            <br />&{" "}
            <span aria-label={`Pengantin wanita: ${bride?.nickname}`}>
              {bride?.nickname}
            </span>
          </h1>

          <div data-aos="fade-up" data-aos-delay="600"></div>
        </div>

        {isOpen && (
          <div>
            <p
              data-aos="fade-up"
              className={`text-white/70 mb-4 text-[10px] text-center md:text-xs lg:text-base uppercase tracking-[3px] ${rubik.className}`}
            >
              {client?.opening_title}
            </p>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className={`${rubik.className} max-w-md mx-auto text-[10px] md:text-xs lg:text-sm text-center font-light text-white`}
            >
              {client?.opening_description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Hero);
