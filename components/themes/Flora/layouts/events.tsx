import React, { FC } from "react";
import { marcellus } from "@/lib/fonts";
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
  const { events = [], gallery = [] } = state.client || {}; // Default to empty arrays

  if (events.length > 0) {
    return (
      <section className="relative overflow-hidden z-0">
        <div className="fixed inset-0 z-0">
          <div className="relative h-full w-full">
            {gallery.length > 0 && (
              <ImageShimmer
                sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
                priority
                alt="bg-countdown"
                fill
                className="object-cover grayscale"
                src={gallery[gallery.length - 1] as string}
                style={{ transform: "translateZ(0)" }}
              />
            )}
          </div>
        </div>
        <div className="absolute inset-0 bg-samaya-dark bg-opacity-60"></div>
        <div className="flex flex-col z-10 items-center justify-center py-4 md:py-28 lg:py-40">
          <div
            className={`px-4 grid lg:${
              events.length > 1 ? "grid-cols-2" : "grid-cols-1"
            } gap-4 md:gap-20 relative z-20`}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="flex even:flex-row-reverse bg-samaya-dark bg-opacity-80 items-center justify-center rounded-xl overflow-hidden backdrop-blur-sm"
                data-aos="zoom-in-up"
              >
                <div className="flex items-center justify-center w-20 md:w-32 bg-samaya-dark h-full">
                  <h1
                    className={`${marcellus.className} text-2xl md:text-3xl text-samaya-primary text-center transform uppercase -rotate-90`}
                  >
                    {event.name}
                  </h1>
                </div>
                <div
                  className={`min-h-60 text-white p-8 md:p-16 ${marcellus.className}`}
                >
                  <h1 className={`text-3xl lg:text-5xl md:mb-2`}>
                    {moment(event.date).format("dddd")}
                  </h1>
                  <p className="text-base md:text-xl mt-1">
                    {moment(event.date).format("DD / MMMM / YYYY")}
                  </p>
                  <div className="w-full h-[1px] bg-samaya-primary my-3 lg:my-5"></div>
                  <p className="text-base md:text-xl">
                    {event.start_time} - {event.end_time}
                  </p>
                  <p className="text-base md:text-xl">{event.address}</p>
                  <div className="w-full h-[1px] bg-samaya-primary my-3 lg:my-5"></div>
                  <div className="mt-2 inline-flex flex-col gap-4">
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
