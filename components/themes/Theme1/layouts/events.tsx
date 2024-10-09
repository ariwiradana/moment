import React, { FC, useEffect, useState } from "react";
import { afacad, marcellus } from "@/lib/fonts";
import moment from "moment";
import Title from "../elements/title";
import Image from "next/image";
import Button from "../elements/button";
import {
  BiCalendarAlt,
  BiMap,
  BiSolidCalendarCheck,
  BiTime,
} from "react-icons/bi";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import ImageShimmer from "@/components/image.shimmer";
import Link from "next/link";

interface Props {
  state: useTheme1["state"];
  actions: useTheme1["actions"];
}

const EventsComponent: FC<Props> = ({ state, actions }) => {
  const [randomGalleryImage, setRandomGalleryImage] = useState("");

  useEffect(() => {
    const gallery = state.client?.gallery;

    if (Array.isArray(gallery) && gallery.length > 0) {
      const randomIndex = Math.floor(Math.random() * gallery.length);
      setRandomGalleryImage(gallery[randomIndex]);
    } else {
      setRandomGalleryImage("");
    }
  }, [state.client?.gallery]);

  return (
    <section className="relative overflow-hidden z-0">
      <div className="fixed inset-0 z-0">
        <div className="relative h-full w-full">
          {randomGalleryImage && (
            <ImageShimmer
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
              priority
              alt="bg-countdown"
              fill
              className="object-cover scale-110 grayscale-[50%]"
              src={randomGalleryImage}
              style={{ transform: "translateZ(0)" }}
            />
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0000008f] from-[70%] to-white"></div>
      <div className="flex flex-col z-10 items-center justify-center min-h-screen py-16">
        <div className="w-full mb-8">
          <div data-aos="zoom-in-up" className="relative h-12 lg:h-16 w-full">
            <Image
              alt="leaf-datetime"
              src="/images/theme1/leaf.svg"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div data-aos="fade-up" className="text-center">
          <Title
            white
            title="Tempat & Waktu"
            caption={
              state.client?.events && state.client?.events.length > 2
                ? state.client.events
                    .slice(0, 2)
                    .map((e) => e.name)
                    .join(", ") + ` & ${state.client.events[2].name}`
                : state.client?.events.map((e) => e.name).join(" & ")
            }
          />
        </div>
        <div className="mt-16 p-4">
          <div className="grid gap-16 w-full">
            {state.client?.events.map((event) => (
              <div
                key={event.id}
                data-aos="fade-up"
                className="border border-white p-8 lg:p-16 text-white"
              >
                <h1 className={`${marcellus.className} text-2xl text-center`}>
                  {event.name}
                </h1>

                <div
                  className={`border-y border-y-white py-4 lg:px-12 mt-8 ${afacad.className} text-center text-lg flex flex-col gap-y-2`}
                >
                  <div className="flex items-center gap-x-2">
                    <BiCalendarAlt />
                    <p>{moment(event.date).format("dddd, DD MMMM YYYY")}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BiTime />
                    <p>
                      {event.start_time} - {event.end_time}
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-6 flex flex-col justify-center items-center text-lg ${afacad.className}`}
                >
                  <p>Bertempat di</p>
                  <p>{event.address}</p>
                </div>
                <div className={`flex justify-center mt-8 ${afacad.className}`}>
                  <Link href={event.address_url} target="_blank">
                    <button className="outline-none border border-white px-4 py-2 flex justify-center gap-x-2 items-center">
                      <span>Peta Lokasi</span> <BiMap />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16" data-aos="fade-up">
            <Button
              type="button"
              onClick={actions.handleAddEvents}
              title="Save The Date"
              icon={<BiSolidCalendarCheck />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsComponent;
