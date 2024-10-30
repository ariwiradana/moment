import React, { FC } from "react";
import { balthazar, italiana } from "@/lib/fonts";
import moment from "moment";
import Button from "../elements/button";
import { BiCalendar, BiMap } from "react-icons/bi";
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
        <div className="fixed inset-0 z-0" data-aos="zoom-out-up">
          <div className="relative h-full w-full">
            {gallery.length > 0 && (
              <ImageShimmer
                sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
                priority
                alt="bg-countdown"
                fill
                className="object-cover grayscale"
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
        <div className="absolute bg-nirvaya-dark/70 inset-0"></div>
        <div className="flex flex-col z-10 items-center justify-center px-8 py-[60px] md:py-[100px] max-w-screen-xl mx-auto">
          <div
            className={`flex flex-wrap justify-center gap-[60px] md:gap-[100px] relative z-20 divide-y-[0.5px] md:divide-y-0`}
          >
            {events.map((event, index) => (
              <div
                data-aos="fade-up"
                key={`event-${event.id}`}
                className={`text-center ${index > 0 && "pt-[60px] md:pt-0"}`}
              >
                <h1
                  data-aos="fade-up"
                  className={`${italiana.className} text-4xl md:text-5xl text-white uppercase`}
                >
                  {event.name}
                </h1>
                <div data-aos="fade-up" data-aos-delay="200">
                  <p
                    className={`text-base md:text-lg mt-2 md:mt-5 text-white ${balthazar.className} uppercase`}
                  >
                    {moment(event.date).format("dddd, DD MMMM YYYY")}
                  </p>
                  <p
                    className={`text-base md:text-lg mt-1 text-white ${balthazar.className}`}
                  >
                    {event.start_time} - {event.end_time}
                  </p>
                  <div className="flex justify-center gap-7 md:gap-10 mt-3 md:mt-6">
                    <div
                      className={`flex flex-col justify-center ${balthazar.className}`}
                    >
                      <h2 className="text-2xl md:text-3xl text-white">
                        {state.timeRemainings[index].days}
                      </h2>
                      <h4 className="text-sm md:text-base text-white/80">
                        Hari
                      </h4>
                    </div>
                    <div
                      className={`flex flex-col justify-center ${balthazar.className}`}
                    >
                      <h2 className="text-2xl md:text-3xl text-white">
                        {state.timeRemainings[index].hours}
                      </h2>
                      <h4 className="text-sm md:text-base text-white/80">
                        Jam
                      </h4>
                    </div>
                    <div
                      className={`flex flex-col justify-center ${balthazar.className}`}
                    >
                      <h2 className="text-2xl md:text-3xl text-white">
                        {state.timeRemainings[index].minutes}
                      </h2>
                      <h4 className="text-sm md:text-base text-white/80">
                        Menit
                      </h4>
                    </div>
                    <div
                      className={`flex flex-col justify-center ${balthazar.className}`}
                    >
                      <h2 className="text-2xl md:text-3xl text-white">
                        {state.timeRemainings[index].seconds}
                      </h2>
                      <h4 className="text-sm md:text-base text-white/80">
                        Detik
                      </h4>
                    </div>
                  </div>

                  <p
                    className={`text-sm md:text-base text-white mt-3 md:mt-6 ${balthazar.className}`}
                  >
                    Bertempat di
                    <br />
                    {event.address}
                  </p>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-delay="400"
                  className="inline-flex flex-wrap justify-center gap-4 mt-4 md:mt-7"
                >
                  <Link target="_blank" href={event.address_url}>
                    <Button icon={<BiMap />} title="Petunjuk Lokasi" />
                  </Link>
                  <div>
                    <Button
                      onClick={() => actions.handleAddToCalendar(event)}
                      icon={<BiCalendar />}
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
