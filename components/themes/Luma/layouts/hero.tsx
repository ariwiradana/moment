import { NextPage } from "next";
import { memo } from "react";
import useEvents from "@/hooks/themes/useEvents";
import useParticipants from "@/hooks/themes/useParticipants";
import useCoverStore from "@/store/useCoverStore";
import { rubik } from "@/lib/fonts";

const Hero: NextPage = () => {
  const { isOpen } = useCoverStore();
  const {
    state: { events, fade, currentIndex },
  } = useEvents();
  const {
    state: { bride, groom },
  } = useParticipants();

  const currentEvent = events?.[currentIndex];

  // Format tanggal tanpa moment.js → lebih ringan
  const formattedDate = currentEvent?.date
    ? new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(currentEvent.date))
    : "";

  if (!currentEvent) return null; // prevent crash jika events kosong

  return (
    <section className="h-dvh snap-start w-full relative">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-luma-dark/40 via-luma-dark/30 to-luma-dark/50 py-[60px] px-8 flex flex-col justify-between">
        <div>
          <h1
            data-aos="fade-up"
            data-aos-delay="400"
            className="font-bigilla leading-[1.1] text-white text-5xl md:text-6xl mb-3 mt-5"
          >
            <span aria-label={`Pengantin pria: ${groom?.nickname}`}>
              {groom?.nickname}
            </span>{" "}
            &{" "}
            <span aria-label={`Pengantin wanita: ${bride?.nickname}`}>
              {bride?.nickname}
            </span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className={`transform transition-all flex items-center ease-in-out duration-200 ${
              fade
                ? "opacity-100 translate-y-0"
                : "opacity-10 translate-y-[4px]"
            }`}
          >
            <p
              className={`${rubik.className} uppercase text-[10px] md:text-xs tracking-[1px] font-light text-white`}
            >
              {currentEvent.name}
            </p>
            <div className="w-[2px] h-[2px] aspect-square rounded-full bg-white mx-3" />
            <time
              className={`${rubik.className} uppercase text-[10px] md:text-xs tracking-[1px] font-light text-white`}
              dateTime={currentEvent.date}
            >
              {formattedDate}
            </time>
          </div>
        </div>

        {isOpen && (
          <div data-aos="fade-in">
            <p
              className={`${rubik.className} text-[10px] md:text-xs font-light text-white`}
            >
              Wahai pasangan suami-isteri, kembangkanlah cinta kasih di dalam
              dirimu, tekun dan tetaplah berkarma dalam menggapai kebahagiaan.
              Karena hanya orang yang bersungguh-sungguhlah mendapatkan
              keberhasilan dalam berkeluarga.
            </p>
            <p
              className={`text-white/70 mt-4 text-[8px] md:text-[10px] uppercase tracking-[3px] ${rubik.className}`}
            >
              Rgveda : X.85.42
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Hero);
