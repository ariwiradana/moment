import useEvents from "@/hooks/themes/useEvents";
import { rubik } from "@/lib/fonts";
import { NextPage } from "next";
import Image from "next/image";
import { BiCalendarEvent, BiMap, BiTime } from "react-icons/bi";
import ButtonPrimary from "../elements/button.primary";
import Link from "next/link";
import ButtonDark from "../elements/button.dark";
import { HiArrowLongRight } from "react-icons/hi2";
import { memo } from "react";

const Events: NextPage = () => {
  const {
    state: { events, timeRemainings },
  } = useEvents();

  const quotes = [
    "Ketika dua hati dipertemukan oleh cinta dan restu semesta, kami percaya bahwa inilah awal dari cerita yang tak akan pernah usai.",
    "Tak ada yang lebih indah dari menyatukan dua jiwa yang saling mencinta. Ini adalah awal dari bab baru yang penuh harapan.",
    "Di bawah langit yang sama, dua insan dipertemukan. Kini mereka melangkah dalam satu janji suci, dengan cinta yang tumbuh dan doa yang mengiringi.",
  ];

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      {events.map((event, index) => (
        <section
          className="h-dvh snap-start w-full relative bg-luma-dark"
          key={`Acara-${event.name}`}
        >
          <div className="absolute z-20 inset-0 flex flex-col justify-center items-center bg-gradient-to-b from-luma-dark/50 via-luma-dark/70 to-luma-dark/20 py-[60px] px-8">
            <div className="w-full mb-4">
              <h2 className="font-bigilla leading-[40px] md:leading-[50px] text-white text-4xl md:text-5xl mb-1">
                {event?.name}
              </h2>
              {quotes[index] && (
                <p
                  className={`${rubik.className} text-[10px] md:text-xs font-light text-justify text-white`}
                >
                  <span className="inline-block w-5 h-[1px] bg-white/50 mr-2 mb-1"></span>
                  {quotes[index]}
                </p>
              )}
            </div>

            <div
              className="bg-luma-primary/70 p-6 md:p-8 w-full rounded-md"
              aria-label={`Detail acara ${event.name}`}
            >
              <div className="flex gap-x-2 mb-3 items-center">
                <BiCalendarEvent className="text-sm text-white" />
                <p
                  className={`${rubik.className} text-xs md:text-sm font-light text-white`}
                >
                  {formatDate(event.date)}
                </p>
              </div>
              <div className="flex gap-x-2 mb-3 items-center">
                <BiTime className="text-sm text-white" />
                <p
                  className={`${rubik.className} text-xs md:text-sm font-light text-white`}
                >
                  {event.start_time} WITA - {event.end_time} WITA
                </p>
              </div>
              <div className="flex gap-x-2 mb-4 items-center">
                <BiMap className="text-sm text-white" />
                <p
                  className={`${rubik.className} text-xs md:text-sm font-light text-white`}
                >
                  {event.address}
                </p>
              </div>
              <Link
                href={event.address_url}
                target="_blank"
                aria-label={`Petunjuk lokasi ${event.name}`}
              >
                <ButtonPrimary
                  icon={<HiArrowLongRight />}
                  title="Petunjuk Lokasi"
                />
              </Link>
            </div>

            <div
              className={`p-6 md:p-8 bg-white/80 mt-4 w-full rounded-md ${rubik.className}`}
              aria-label={`Countdown acara ${event.name}`}
            >
              <div className="grid grid-cols-4 text-luma-primary divide-x divide-luma-dark/10 border-x border-x-luma-dark/10">
                <TimeBox label="Hari" value={timeRemainings[index].days} />
                <TimeBox label="Jam" value={timeRemainings[index].hours} />
                <TimeBox label="Menit" value={timeRemainings[index].minutes} />
                <TimeBox label="Detik" value={timeRemainings[index].seconds} />
              </div>
              <div className="mt-6">
                <ButtonDark
                  icon={<HiArrowLongRight />}
                  title="Simpan Tanggal"
                  aria-label={`Simpan tanggal acara ${event.name}`}
                />
              </div>
            </div>
          </div>

          <Image
            key={`Event-${event.name}-image`}
            src={event?.image as string}
            alt={`${event.name} pada tanggal ${formatDate(event.date)}`}
            fill
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
            quality={90}
            className="object-cover shimmer-dark transition-transform"
            priority={index === 0} // hanya event pertama yang priority
            loading={index !== 0 ? "lazy" : "eager"}
          />
        </section>
      ))}
    </>
  );
};

const TimeBox = ({ label, value }: { label: string; value: number }) => (
  <div className="flex px-2 flex-col justify-center items-center">
    <h2 className="text-lg md:text-xl">{value}</h2>
    <h4 className="text-[10px] md:text-xs uppercase tracking-[1px] text-luma-dark/70 font-light">
      {label}
    </h4>
  </div>
);

export default memo(Events);
