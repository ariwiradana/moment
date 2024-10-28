import React, { FC } from "react";
import { marcellus } from "@/lib/fonts";
import moment from "moment";
import Button from "../elements/button";
import { BiSolidCalendar, BiSolidMap } from "react-icons/bi";
import { useNirvaya } from "@/hooks/themes/useNirvaya";
import ImageShimmer from "@/components/image.shimmer";
import Link from "next/link";

interface Props {
  state: useNirvaya["state"];
  actions: useNirvaya["actions"];
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
            } gap-12 md:gap-28 lg:gap-40 relative z-20`}
          >
            {events.map((event) => (
              <div
                key={`event-${event.id}`}
                data-aos="fade-up"
                className="p-12 bg-samaya-dark/80 rounded-3xl text-center md:min-w-[400px]"
              >
                <h1
                  className={`${marcellus.className} text-2xl md:text-3xl text-white uppercase`}
                >
                  {event.name}
                </h1>
                <p className="text-sm md:text-lg mt-4 text-white">
                  {moment(event.date).format("DD / MMMM / YYYY")}
                </p>
                <p className="text-sm md:text-lg text-white">
                  {event.start_time} - {event.end_time}
                </p>

                <p className="text-sm md:text-lg text-white mt-4">
                  Bertempat di
                  <br />
                  {event.address}
                </p>
                <div className="mt-8 inline-flex flex-wrap justify-center gap-4">
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
