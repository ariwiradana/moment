import React, { FC } from "react";
import { balthazar, italiana } from "@/lib/fonts";
import moment from "moment";
import Button from "../elements/button";
import { BiCalendar, BiMap } from "react-icons/bi";
import { useNirvaya } from "@/hooks/themes/useNirvaya";
import Link from "next/link";

interface Props {
  state: useNirvaya["state"];
  actions: useNirvaya["actions"];
}

const EventsComponent: FC<Props> = ({ state, actions }) => {
  const { events = [] } = state.client || {};

  if (events.length > 0) {
    return (
      <section className="relative overflow-hidden z-0">
        <div className="absolute bg-nirvaya-dark/70 inset-0"></div>
        <div className="flex flex-col z-10 items-center justify-center px-8 py-[60px] md:py-[100px] max-w-screen-xl mx-auto">
          <div
            className={`flex flex-wrap justify-center gap-[60px] lg:gap-[100px] relative z-20 divide-y-[0.5px] lg:divide-y-0`}
          >
            {events.map((event, index) => (
              <div
                data-aos="fade-up"
                key={`event-${event.id}`}
                className={`text-center ${index > 0 && "pt-[60px] lg:pt-0"}`}
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
