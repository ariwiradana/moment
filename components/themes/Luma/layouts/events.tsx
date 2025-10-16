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
          <div className="absolute z-20 inset-0 flex flex-col justify-center items-center bg-luma-dark/50 py-[60px] px-8">
            <div className="max-w-xl w-full mb-4 lg:mb-4 relative">
              <div className="flex justify-between items-end gap-x-4">
                <p
                  className={`text-white/70 whitespace-nowrap text-[10px] md:text-xs lg:text-sm lg:text-center uppercase tracking-[3px] ${rubik.className}`}
                >
                  Menuju Hari
                </p>
                <div className="w-full h-[1px] bg-white/20 mb-2.5 hidden lg:block"></div>
                <h2
                  className="font-bigilla leading-[40px] lg:text-center relative -mb-1 lg:-mb-2 text-white text-[40px] md:text-5xl lg:text-7xl"
                  aria-label={`Judul acara ${event.name}`}
                >
                  {event?.name}
                </h2>
              </div>

              {/* {quotes[index] && (
                <p
                  className={`${rubik.className} mt-2 lg:mt-6 max-w-md mx-auto lg:text-center text-[10px] md:text-xs lg:text-sm font-light text-white`}
                  aria-label={`Kutipan untuk acara ${event.name}`}
                >
                  {quotes[index]}
                </p>
              )} */}
            </div>

            <div
              className="bg-luma-primary/60 p-6 md:p-8 max-w-xl w-full"
              aria-label={`Detail acara ${event.name}`}
            >
              <div className="flex gap-x-2 mb-3 items-center">
                <BiCalendarEvent className="text-sm lg:text-base text-white" />
                <p
                  className={`${rubik.className} text-xs md:text-sm lg:text-base font-light text-white`}
                >
                  {formatDate(event.date)}
                </p>
              </div>
              <div className="flex gap-x-2 mb-3 items-center">
                <BiTime className="text-sm lg:text-base text-white" />
                <p
                  className={`${rubik.className} text-xs md:text-sm lg:text-base font-light text-white`}
                >
                  {event.start_time} WITA - {event.end_time}{" "}
                  {event.end_time !== "Selesai" ? "WITA" : ""}
                </p>
              </div>
              <div className="flex gap-x-2 mb-4 items-center">
                <BiMap className="text-sm lg:text-base text-white" />
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
              className={`p-6 md:p-8 bg-white/80 mt-4 max-w-xl w-full ${rubik.className}`}
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
      className="text-xl md:text-2xl lg:text-3xl"
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
