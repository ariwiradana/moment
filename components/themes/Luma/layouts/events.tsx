import useEvents from "@/hooks/themes/useEvents";
import { rubik } from "@/lib/fonts";
import { NextPage } from "next";
import { BiCalendarEvent, BiMap, BiTime } from "react-icons/bi";
import ButtonPrimary from "../elements/button.primary";
import Link from "next/link";
import ButtonDark from "../elements/button.dark";
import { HiArrowLongRight } from "react-icons/hi2";
import { memo } from "react";

const Events: NextPage = () => {
  const {
    state: { events, timeRemainings },
    actions,
  } = useEvents();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      return new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      {events.map((event, index) => (
        <section
          className="h-dvh snap-start w-full relative"
          key={`Acara-${event.name}`}
        >
          <div className="absolute z-20 inset-0 flex flex-col justify-center items-center bg-luma-dark/50 py-[60px] px-6">
            <h2 className="font-bigilla leading-[40px] mb-4 whitespace-nowrap relative text-white text-[40px] md:text-5xl lg:text-7xl">
              <span className="italic">Save</span> The Date
            </h2>
            <div
              className="bg-luma-primary/30 backdrop-blur-sm p-6 md:p-8 max-w-xl w-full"
              aria-label={`Detail acara ${event.name}`}
            >
              <h2
                className={`whitespace-nowrap relative text-white mb-4 text-base md:text-lg lg:text-xl font-light uppercase tracking-[3px] ${rubik.className}`}
                aria-label={`Judul acara ${event.name}`}
              >
                {event?.name}
              </h2>
              <div className="flex gap-x-2 mb-3">
                <BiCalendarEvent className="text-sm lg:text-base text-white min-w-5 mt-1" />
                <p
                  className={`${rubik.className} text-xs md:text-sm lg:text-base font-light text-white`}
                >
                  {formatDate(event.date)}
                </p>
              </div>
              <div className="flex gap-x-2 mb-3">
                <BiTime className="text-sm lg:text-base text-white min-w-5 mt-1" />
                <p
                  className={`${rubik.className} text-xs md:text-sm lg:text-base font-light text-white`}
                >
                  {event.start_time} WITA - {event.end_time}{" "}
                  {event.end_time !== "Selesai" ? "WITA" : ""}
                </p>
              </div>
              <div className="flex gap-x-2 mb-4">
                <BiMap className="text-sm lg:text-base text-white min-w-5 mt-1" />
                <p
                  className={`${rubik.className} text-xs md:text-sm lg:text-base font-light text-white`}
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
              className={`p-6 md:p-8 bg-white/70 backdrop-blur-sm mt-4 max-w-xl w-full ${rubik.className}`}
              aria-label={`Countdown acara ${event.name}`}
            >
              <div className="grid grid-cols-4 text-luma-primary divide-x divide-luma-dark/10">
                <TimeBox
                  label="Hari"
                  value={timeRemainings[index]?.days ?? 0}
                />
                <TimeBox
                  label="Jam"
                  value={timeRemainings[index]?.hours ?? 0}
                />
                <TimeBox
                  label="Menit"
                  value={timeRemainings[index]?.minutes ?? 0}
                />
                <TimeBox
                  label="Detik"
                  value={timeRemainings[index]?.seconds ?? 0}
                />
              </div>
              <div className="mt-6">
                <ButtonDark
                  onClick={() => actions.handleAddToCalendar(event)}
                  icon={<HiArrowLongRight />}
                  title="Simpan Tanggal"
                  aria-label={`Simpan tanggal acara ${event.name}`}
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

const TimeBox = ({ label, value }: { label: string; value: number }) => (
  <div className="flex px-2 flex-col justify-center items-center">
    <h2
      className="text-xl md:text-2xl lg:text-2xl"
      aria-label={`${value} ${label}`}
    >
      {value}
    </h2>
    <h4
      className="text-xs md:text-sm lg:text-base uppercase tracking-[1px] text-luma-dark/70 font-light"
      aria-label={label}
    >
      {label}
    </h4>
  </div>
);

export default memo(Events);
