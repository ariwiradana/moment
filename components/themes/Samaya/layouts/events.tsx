import React, {  memo } from "react";
import { marcellus } from "@/lib/fonts";
import moment from "moment";
import Button from "../elements/button";
import { BiSolidCalendar, BiSolidMap } from "react-icons/bi";
import Link from "next/link";
import useEvents from "@/hooks/themes/useEvents";

const EventsComponent = () => {
  const { state, actions } = useEvents();

  if (state.events.length > 0) {
    return (
      <section className="relative overflow-hidden z-20">
        <div className="absolute bg-samaya-dark/70 inset-0"></div>
        <div className="flex flex-col z-10 items-center justify-center px-8 py-20 md:py-28 lg:py-40">
          <div
            className={`grid lg:${
              state.events.length > 1 ? "grid-cols-2" : "grid-cols-1"
            } gap-20 lg:gap-40 relative z-20`}
          >
            {state.events.map((event, index) => (
              <div
                key={`event-${event.id}`}
                data-aos="fade-up"
                className={`text-center md:min-w-[400px] ${marcellus.className}`}
              >
                <h1
                  className={`font-tan-pearl text-2xl md:text-3xl text-white uppercase`}
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
                {state.timeRemainings.length > 0 && (
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
                )}
                <div className="inline-flex flex-wrap justify-center gap-3">
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

export default memo(EventsComponent);
