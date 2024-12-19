import React, { FC, memo } from "react";
import { roboto } from "@/lib/fonts";
import moment from "moment";
import { BiCalendar, BiMap } from "react-icons/bi";
import { useAruna } from "@/hooks/themes/useAruna";
import Link from "next/link";
import ImageShimmer from "@/components/image.shimmer";
import ButtonDark from "../elements/button.dark";
import useEvents from "@/hooks/themes/Aruna/useEvents";
import { Client } from "@/lib/types";

interface Props {
  state: useAruna["state"];
  actions: useAruna["actions"];
}

const EventsComponent: FC<Props> = ({ state, actions }) => {
  const { events = [] } = state.client || {};
  const { state: eventState } = useEvents(state.client as Client);

  if (events.length > 0) {
    return (
      <section className="relative overflow-hidden z-0">
        <div className="absolute bg-gradient-to-b from-aruna-dark/40 via-aruna-dark/70 to-aruna-dark to-[90%] inset-0"></div>
        <div className="flex flex-col z-10 items-center justify-center px-8 py-[60px] md:p-[100px] max-w-screen-xl mx-auto">
          <div
            className={`flex flex-wrap justify-center gap-[60px] relative z-20`}
          >
            {events.map((event, index) => (
              <div
                data-aos="zoom-out-up"
                className="rounded-t-[100px] overflow-hidden"
                key={`event-${event.id}`}
              >
                <div className="w-full h-[228px] md:h-[280px] relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/0 from-[50%] to-white z-10"></div>
                  {event.image && (
                    <ImageShimmer
                      priority
                      alt={`Acara ${event.name}`}
                      fill
                      className="object-cover"
                      src={event.image as string}
                    />
                  )}
                </div>
                <div className="bg-white pb-8 md:pb-12 pt-3 px-6 md:px-12 rounded-b-3xl text-center">
                  <h2
                    data-aos="fade-up"
                    className={`font-high-summit text-4xl  text-aruna-dark`}
                  >
                    {event.name}
                  </h2>
                  <p
                    style={{ lineHeight: "24px" }}
                    data-aos="fade-up"
                    className={`text-xs md:text-sm tracking-[4px] mt-8 md:mt-10 uppercase text-aruna-dark/60 ${roboto.className}`}
                  >
                    {moment(event.date).format("dddd")} <br />
                    {moment(event.date).format("DD / MMM / YYYY")}
                  </p>
                  <div
                    data-aos="fade-up"
                    className="flex flex-col justify-center items-center gap-6 my-9 md:my-10 h-auto"
                  >
                    <div className={`text-center ${roboto.className}`}>
                      <h2 className="text-4xl text-aruna-dark mb-1">
                        {eventState.timeRemainings[index].days}
                      </h2>
                      <h4 className="text-[8px] md:text-xs text-aruna-dark/60 uppercase tracking-[4px]">
                        Hari
                      </h4>
                    </div>
                    <div className={`text-center ${roboto.className}`}>
                      <h2 className="text-4xl text-aruna-dark mb-1">
                        {eventState.timeRemainings[index].hours}
                      </h2>
                      <h4 className="text-[8px] md:text-xs text-aruna-dark/60 uppercase tracking-[4px]">
                        Jam
                      </h4>
                    </div>
                    <div className={`text-center ${roboto.className}`}>
                      <h2 className="text-4xl text-aruna-dark mb-1">
                        {eventState.timeRemainings[index].minutes}
                      </h2>
                      <h4 className="text-[8px] md:text-xs text-aruna-dark/60 uppercase tracking-[4px]">
                        Menit
                      </h4>
                    </div>
                    <div className={`text-center ${roboto.className}`}>
                      <h2 className="text-4xl text-aruna-dark mb-1">
                        {eventState.timeRemainings[index].seconds}
                      </h2>
                      <h4 className="text-[8px] md:text-xs text-aruna-dark/60 uppercase tracking-[4px]">
                        Detik
                      </h4>
                    </div>
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
                    <div>
                      <ButtonDark
                        onClick={() => actions.handleAddToCalendar(event)}
                        icon={<BiCalendar />}
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

export default memo(EventsComponent);
