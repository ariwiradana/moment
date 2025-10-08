import React, { memo, useMemo } from "react";
import { roboto } from "@/lib/fonts";
import moment from "moment";
import { BiCalendar, BiMap } from "react-icons/bi";
import Link from "next/link";
import ButtonDark from "../elements/button.dark";
import useEvents from "@/hooks/themes/useEvents";
import usePhotos from "@/hooks/themes/usePhotos";
import Image from "next/image";
import { Event, TimeRemaining } from "@/lib/types";

const EventsComponent = () => {
  const { state: eventState, actions: eventActions } = useEvents();
  const {
    state: { images },
  } = usePhotos();

  if (eventState.events.length === 0) return null;

  return (
    <section
      style={{ marginTop: 0 }}
      className="relative overflow-hidden z-0 bg-aruna-dark py-[60px] md:py-[100px]"
    >
      <div className="relative z-20 text-center">
        <p
          data-aos="fade-up"
          className={`${roboto.className} text-[10px] md:text-xs tracking-[1px] text-white/80 max-w-screen-sm mx-auto mb-8 px-6`}
        >
          Hari yang dinanti telah tiba, sebuah kisah baru akan dimulai. Jadilah
          bagian dari kebahagiaan kami
        </p>
        <p
          data-aos="fade-up"
          className={`text-white/60 text-[8px] md:text-[10px] uppercase tracking-[6px] ${roboto.className}`}
        >
          Acara Kami
        </p>
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-aruna-dark/90 from-[20%] via-transparent via-[60%] to-aruna-dark/90 to-[80%]"></div>

      {/* Background images */}
      <div className="absolute top-0 inset-x-0 grid" data-aos="zoom-out">
        {images.map((image, idx) => (
          <div
            key={`FotoEvent-${idx}`}
            className="w-full h-[20vh] relative overflow-hidden opacity-30"
          >
            <Image
              src={image}
              alt={`Foto Event ${idx + 1}`}
              fill
              className="object-cover grayscale"
              loading="lazy"
              quality={70}
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col z-10 items-center justify-center">
        <div className="flex gap-12 flex-wrap justify-center relative z-20 px-6 py-12">
          {eventState.events.map((event, index) => (
            <MemoizedEventCard
              key={`Acara-${event.name}`}
              event={event}
              timeRemaining={eventState.timeRemainings[index]}
              handleAddToCalendar={() =>
                eventActions.handleAddToCalendar(event)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface EventCardProps {
  event: Event;
  timeRemaining: TimeRemaining;
  handleAddToCalendar: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  timeRemaining,
  handleAddToCalendar,
}) => {
  const formattedDate = useMemo(
    () => ({
      dayName: moment(event.date).format("dddd"),
      fullDate: moment(event.date).format("DD / MMM / YYYY"),
    }),
    [event.date]
  );

  return (
    <div data-aos="zoom-out-up" className="rounded-t-2xl">
      <div className="w-full aspect-[3/2] relative overflow-hidden rounded-t-full">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 from-[50%] to-white z-10"></div>
        {event.image && (
          <Image
            src={event.image as string}
            alt={`Acara ${event.name}`}
            fill
            className="object-cover rounded-t-full bg-white"
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
            quality={70}
            loading="lazy"
          />
        )}
      </div>
      <div className="bg-white pb-8 md:pb-12 pt-3 px-6 md:px-12 text-center rounded-b-2xl">
        <h2
          data-aos="fade-up"
          className="font-high-summit text-4xl text-aruna-dark"
        >
          {event.name}
        </h2>

        <p
          style={{ lineHeight: "24px" }}
          data-aos="fade-up"
          className={`text-xs md:text-sm tracking-[4px] mt-8 md:mt-10 uppercase text-aruna-dark/60 ${roboto.className}`}
        >
          {formattedDate.dayName} <br /> {formattedDate.fullDate}
        </p>

        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center gap-6 my-9 md:my-10"
        >
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className={`text-center ${roboto.className}`}>
              <h2 className="text-4xl text-aruna-dark mb-1">
                {timeRemaining[unit as keyof TimeRemaining]}
              </h2>
              <h4 className="text-[8px] md:text-xs text-aruna-dark/60 uppercase tracking-[4px]">
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

        <p
          style={{ lineHeight: "24px" }}
          data-aos="fade-up"
          className={`text-xs md:text-sm tracking-[4px] uppercase text-aruna-dark/60 ${roboto.className}`}
        >
          {event.start_time} - {event.end_time}
        </p>
        <p
          data-aos="fade-up"
          className={`text-xs md:text-sm text-aruna-dark mt-4 md:mt-6 ${roboto.className}`}
        >
          {event.address}
        </p>

        <div
          data-aos="fade-up"
          className="inline-flex flex-wrap justify-center gap-2 mt-8"
        >
          <Link target="_blank" href={event.address_url}>
            <ButtonDark icon={<BiMap />} title="Petunjuk Lokasi" />
          </Link>
          <ButtonDark
            onClick={handleAddToCalendar}
            icon={<BiCalendar />}
            title="Simpan Tanggal"
          />
        </div>
      </div>
    </div>
  );
};

const MemoizedEventCard = memo(EventCard);

export default memo(EventsComponent);
