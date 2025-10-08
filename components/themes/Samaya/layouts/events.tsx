import React, { memo, useMemo } from "react";
import { raleway } from "@/lib/fonts";
import moment from "moment";
import { BiSolidCalendar, BiSolidMap } from "react-icons/bi";
import Link from "next/link";
import useEvents from "@/hooks/themes/useEvents";
import Image from "next/image";
import ButtonDark from "../elements/button.dark";

const EventsComponent = () => {
  const { state, actions } = useEvents();

  // Memoize event slides untuk mencegah re-render tidak perlu
  const eventSlides = useMemo(
    () =>
      state.events.map((event, index) => (
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="grid md:grid-cols-2"
          key={event.id}
        >
          {/* Image */}
          <div className="w-full h-full aspect-square md:aspect-auto relative">
            <Image
              src={event.image as string}
              alt={`Foto Acara ${event.name} ${index + 1}`}
              fill
              quality={80} // optimize sedikit
              loading={index === 0 ? "eager" : "lazy"} // preload hanya pertama
              className="object-cover bg-white/5"
            />
          </div>

          {/* Info */}
          <div
            className={`bg-white text-samaya-dark backdrop-blur-lg p-8 md:p-16 ${raleway.className}`}
          >
            <h1 className="font-tan-pearl text-2xl md:text-3xl">
              {event.name}
            </h1>
            <p className="text-xs md:text-sm mt-6">
              {moment(event.date).format("DD / MMMM / YYYY")}
            </p>
            <p className="text-xs md:text-sm">
              {event.start_time} - {event.end_time}
            </p>
            <p className="text-xs md:text-sm mt-4 font-medium max-w-sm">
              {event.address}
            </p>

            {/* Countdown */}
            {state.timeRemainings.length > 0 && (
              <div className="grid grid-cols-4 text-samaya-dark my-6 divide-x divide-samaya-dark/10 border-x border-x-samaya-dark/10">
                {["days", "hours", "minutes", "seconds"].map((unit) => (
                  <div className="flex px-2 flex-col justify-center" key={unit}>
                    <h2 className="text-base md:text-lg font-medium">
                      {
                        state.timeRemainings[index][
                          unit as keyof (typeof state.timeRemainings)[0]
                        ]
                      }
                    </h2>
                    <h4 className="text-[10px] md:text-xs uppercase tracking-[1px] text-samaya-dark/50">
                      {unit === "days"
                        ? "Hari"
                        : unit === "hours"
                        ? "Jam"
                        : unit === "minutes"
                        ? "Menit"
                        : "Detik"}
                    </h4>
                  </div>
                ))}
              </div>
            )}

            <div className="inline-flex flex-wrap gap-3">
              <Link target="_blank" href={event.address_url}>
                <ButtonDark
                  icon={<BiSolidMap className="lg:text-lg" />}
                  title="Petunjuk Lokasi"
                />
              </Link>
              <ButtonDark
                onClick={() => actions.handleAddToCalendar(event)}
                icon={<BiSolidCalendar className="lg:text-lg" />}
                title="Simpan Tanggal"
              />
            </div>
          </div>
        </div>
      )),
    [state.events, state.timeRemainings, actions]
  );

  if (!state.events.length) return null;

  return (
    <section className="relative overflow-hidden bg-samaya-dark z-20">
      {/* Background cards */}
      <div className="inset-0 absolute" data-aos="zoom-out">
        <div className="flex flex-col h-full relative">
          {state.events.map((event, index) => (
            <div
              key={`FotoCard-${event.name}`}
              className="inset-0 z-0 w-full aspect-[1/${state.events.length}]"
            >
              <Image
                fill
                src={event.image as string}
                alt={`Foto Card ${event.name}`}
                priority={index === 0} // preload slide pertama
                loading={index === 0 ? "eager" : "lazy"}
                quality={80} // optimize
                className="object-cover grayscale shimmer-dark transform transition-transform opacity-30"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bg-samaya-dark/40 inset-0" />

      <div className="flex flex-col z-10 items-center justify-center px-6 md:px-12 lg:px-4 py-20 lg:py-40">
        <div className="grid gap-20">{eventSlides}</div>
      </div>
    </section>
  );
};

export default memo(EventsComponent);
