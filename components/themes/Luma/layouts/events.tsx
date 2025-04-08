import useEvents from "@/hooks/themes/useEvents";
import { rubik } from "@/lib/fonts";
import moment from "moment";
import { NextPage } from "next";
import { BiCalendarEvent, BiMap, BiTime } from "react-icons/bi";
import ButtonPrimary from "../elements/button.primary";
import Link from "next/link";
import ButtonDark from "../elements/button.dark";
import { HiArrowLongRight } from "react-icons/hi2";

const Events: NextPage = () => {
  const {
    state: { events, timeRemainings },
  } = useEvents();

  const quotes = [
    "Ketika dua hati dipertemukan oleh cinta dan restu semesta, kami percaya bahwa inilah awal dari cerita yang tak akan pernah usai.",
    "Tak ada yang lebih indah dari menyatukan dua jiwa yang saling mencinta. Ini adalah awal dari bab baru yang penuh harapan.",
    "Di bawah langit yang sama, dua insan dipertemukan. Kini mereka melangkah dalam satu janji suci, dengan cinta yang tumbuh dan doa yang mengiringi.",
  ];

  return (
    <>
      {events.map((event, index) => (
        <section
          className="h-dvh snap-start w-full relative"
          key={`Acara ${event.name}`}
        >
          <div className="absolute z-20 inset-0 flex flex-col justify-center items-center bg-luma-dark/60 py-[60px] px-8">
            <div className="w-full mb-4">
              <h2 className="font-bigilla leading-[40px] text-white text-4xl mb-1">
                {event?.name}
              </h2>
              {quotes[index] && (
                <p
                  className={`${rubik.className} text-[10px] md:text-xs font-light text-justify text-white`}
                >
                  <span>
                    <div className="w-5 h-[1px] bg-white/50 mb-1 inline-block mr-2"></div>
                  </span>
                  {quotes[index]}
                </p>
              )}
            </div>
            <div className="bg-luma-primary/40 backdrop-blur p-8 w-full">
              <div className="flex gap-x-2 mb-3">
                <BiCalendarEvent className="text-sm text-white mt-[1px]" />
                <p
                  className={`${rubik.className} text-xs font-light text-white`}
                >
                  {moment(event.date).format("dddd, DD MMMM YYYY")}
                </p>
              </div>
              <div className="flex gap-x-2 mb-3">
                <BiTime className="text-sm text-white mt-[1px]" />
                <p
                  className={`${rubik.className} text-xs font-light text-white`}
                >
                  {event.start_time} WITA - {event.end_time} WITA
                </p>
              </div>
              <div className="flex gap-x-2 mb-4">
                <BiMap className="text-sm text-white mt-[1px]" />
                <p
                  className={`${rubik.className} text-xs font-light text-white`}
                >
                  {event.address}
                </p>
              </div>
              <Link href={event.address_url} target="_blank">
                <ButtonPrimary
                  icon={<HiArrowLongRight />}
                  title="Petunjuk Lokasi"
                />
              </Link>
            </div>
            <div
              className={`p-8 bg-white/80 backdrop-blur mt-4 w-full ${rubik.className}`}
            >
              <div className="grid grid-cols-4 text-luma-primary divide-x divide-luma-dark/10 border-x border-x-luma-dark/10">
                <div className="flex px-2 flex-col justify-center">
                  <h2 className="text-lg">{timeRemainings[index].days}</h2>
                  <h4 className="text-[10px] md:text-xs uppercase tracking-[1px] text-luma-dark/70 font-light">
                    Hari
                  </h4>
                </div>
                <div className="flex px-2 flex-col justify-center">
                  <h2 className="text-lg">{timeRemainings[index].hours}</h2>
                  <h4 className="text-[10px] md:text-xs uppercase tracking-[1px] text-luma-dark/70 font-light">
                    Jam
                  </h4>
                </div>
                <div className="flex px-2 flex-col justify-center">
                  <h2 className="text-lg">{timeRemainings[index].minutes}</h2>
                  <h4 className="text-[10px] md:text-xs uppercase tracking-[1px] text-luma-dark/70 font-light">
                    Menit
                  </h4>
                </div>
                <div className="flex px-2 flex-col justify-center">
                  <h2 className="text-lg">{timeRemainings[index].seconds}</h2>
                  <h4 className="text-[10px] md:text-xs uppercase tracking-[1px] text-luma-dark/70 font-light">
                    Detik
                  </h4>
                </div>
              </div>
              <div className="mt-6">
                <ButtonDark
                  icon={<HiArrowLongRight />}
                  title="Simpan Tanggal"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Events;
