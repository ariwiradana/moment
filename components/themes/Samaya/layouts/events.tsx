import React, { FC } from "react";
import { italiana, marcellus } from "@/lib/fonts";
import moment from "moment";
import Button from "../elements/button";
import { BiSolidCalendar, BiSolidMap } from "react-icons/bi";
import { useSamaya } from "@/hooks/themes/useSamaya";
import ImageShimmer from "@/components/image.shimmer";
import Link from "next/link";

interface Props {
  state: useSamaya["state"];
  actions: useSamaya["actions"];
}

const EventsComponent: FC<Props> = ({ state, actions }) => {
  const { events = [], gallery = [] } = state.client || {};

  if (events.length > 0) {
    return (
      <section className="relative overflow-hidden z-0">
        <div className="fixed inset-0 z-0" data-aos="zoom-in">
          <div className="relative h-full w-full">
            {gallery.length > 0 && (
              <ImageShimmer
                sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
                priority
                alt="bg-countdown"
                fill
                className="object-cover"
                src={
                  gallery.length > 2
                    ? (gallery[gallery.length - 2] as string)
                    : (gallery[gallery.length - 1] as string)
                }
                style={{ transform: "translateZ(0)" }}
              />
            )}
          </div>
        </div>
        <div className="absolute bg-samaya-dark/20 inset-0 md:bg-gradient-to-r from-samaya-dark/70 via-transparent to-samaya-dark/70"></div>
        <div className="absolute bg-samaya-dark/20 inset-0 md:bg-gradient-to-b from-samaya-dark/20 via-samaya-dark/60 to-samaya-dark"></div>
        <div className="flex flex-col z-10 items-center justify-center px-8 py-12 md:py-28 lg:py-40">
          <div
            className={`grid lg:${
              events.length > 1 ? "grid-cols-2" : "grid-cols-1"
            } gap-6 md:gap-28 lg:gap-40 relative z-20`}
          >
            {events.map((event, index) => (
              <div
                key={`event-${event.id}`}
                data-aos="fade-up"
                className={`px-6 py-12 md:p-12 bg-samaya-dark/80 rounded-3xl text-center md:min-w-[400px] ${marcellus.className}`}
              >
                <h1
                  className={`${italiana.className} text-3xl md:text-4xl text-white uppercase`}
                >
                  {event.name}
                </h1>
                <p className="text-sm md:text-base mt-6 text-white">
                  {moment(event.date).format("DD / MMMM / YYYY")}
                </p>
                <p className="text-sm md:text-base text-white">
                  {event.start_time} - {event.end_time}
                </p>

                <p className="text-sm md:text-base text-white mt-4">
                  Bertempat di
                  <br />
                  {event.address}
                </p>
                <div className="grid grid-cols-4 text-white my-6 gap-3 md:gap-4">
                  <div className="flex flex-col border-[0.7px] border-white aspect-square justify-center rounded-xl md:rounded-2xl">
                    <h2 className="text-lg md:text-xl">
                      {state.timeRemainings[index].days}
                    </h2>
                    <h4 className="text-sm">Hari</h4>
                  </div>
                  <div className="flex flex-col border-[0.7px] border-white aspect-square justify-center rounded-xl md:rounded-2xl">
                    <h2 className="text-lg md:text-xl">
                      {state.timeRemainings[index].hours}
                    </h2>
                    <h4 className="text-sm">Jam</h4>
                  </div>
                  <div className="flex flex-col border-[0.7px] border-white aspect-square justify-center rounded-xl md:rounded-2xl">
                    <h2 className="text-lg md:text-xl">
                      {state.timeRemainings[index].minutes}
                    </h2>
                    <h4 className="text-sm">Menit</h4>
                  </div>
                  <div className="flex flex-col border-[0.7px] border-white aspect-square justify-center rounded-xl md:rounded-2xl">
                    <h2 className="text-lg md:text-xl">
                      {state.timeRemainings[index].seconds}
                    </h2>
                    <h4 className="text-sm">Detik</h4>
                  </div>
                </div>
                <div className="inline-flex flex-wrap justify-center gap-4">
                  <Link target="_blank" href={event.address_url}>
                    <Button
                      icon={<BiSolidMap className="lg:text-lg" />}
                      title="Petunjuk Lokasi"
                    />
                  </Link>
                  <div>
                    <Button
                      onClick={() => actions.handleAddToCalendar(event)}
                      icon={<BiSolidCalendar className="lg:text-lg" />}
                      title="Simpan Tanggal"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default EventsComponent;
