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
                className="object-cover scale-110 grayscale"
                src={gallery[gallery.length - 1] as string}
                style={{ transform: "translateZ(0)" }}
              />
            )}
          </div>
        </div>
        <div className="absolute inset-0 bg-samaya-dark bg-opacity-60"></div>
        <div className="flex flex-col z-10 items-center justify-center py-16 md:py-28 lg:py-16">
          <div className="px-6 grid md:grid-cols-2 gap-6 md:gap-20 relative z-20">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex even:flex-row-reverse even:text-right bg-samaya-dark bg-opacity-80 items-center justify-center rounded-2xl overflow-hidden backdrop-blur-sm"
                data-aos="zoom-in-up"
              >
                <div className="flex items-center justify-center w-20 bg-samaya-dark h-full">
                  <h1
                    className={`${marcellus.className} text-2xl text-samaya-primary transform uppercase -rotate-90 even:rotate-90`}
                  >
                    {event.name}
                  </h1>
                </div>
                <div
                  className={`min-h-60 text-white p-10 ${marcellus.className}`}
                >
                  <h1 className="text-4xl">
                    {moment(event.date).format("dddd")}
                  </h1>
                  <p className="text-lg mt-1">
                    {moment(event.date).format("DD / MMMM / YYYY")}
                  </p>
                  <div className="w-full h-[1px] bg-samaya-primary my-3"></div>
                  <p className="text-lg">
                    {event.start_time} - {event.end_time}
                  </p>
                  <p className="text-lg">{event.address}</p>
                  <div className="mt-6 inline-flex flex-col gap-4">
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
