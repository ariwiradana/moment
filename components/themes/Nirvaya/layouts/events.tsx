import useEvents from "@/hooks/themes/Nirvaya/useEvents";
import { raleway } from "@/lib/fonts";
import moment from "moment";
import Image from "next/image";
import React, { memo } from "react";
import ButtonLight from "../elements/button.light";
import { BiCalendar, BiMap } from "react-icons/bi";
import Link from "next/link";

const Events = () => {
  const { state: eventState } = useEvents();

  return (
    <section className="relative">
      {eventState.events?.length > 0 && (
        <Image
          sizes="50vw"
          fill
          alt="Background Event"
          className="object-cover grayscale"
          src={
            (eventState.images[0] as string) ||
            "https://res.cloudinary.com/dsbmvj2s3/image/upload/v1737459771/flower-bg_uz5uaf.jpg"
          }
        />
      )}
      <div className={`w-full relative ${raleway.className}`}>
        <div className="bg-nirvaya-primary/80 backdrop-blur-sm z-10 grid lg:grid-cols-2 py-4 lg:py-24 justify-center items-center divide-y lg:divide-x lg:divide-y-0 divide-white/15 w-full">
          {eventState.events?.length > 0 &&
            eventState?.events.map((event) => (
              <div
                key={`Event ${event.name}`}
                className="text-center py-11 px-8 w-full relative z-20"
              >
                <h4
                  data-aos="fade-up"
                  className="text-white text-3xl lg:text-4xl leading-8 font-edensor"
                >
                  {event.name?.replaceAll("&", "dan")}
                </h4>
                <div className="mt-2 lg:mt-3" data-aos="fade-up">
                  <h6 className="uppercase font-edensor text-xs lg:text-sm text-white tracking-[3px]">
                    {moment(event.date).format("dddd, DD MMMM YYYY")}
                  </h6>
                  <h6 className="uppercase font-edensor text-xs lg:text-sm text-white tracking-[3px]">
                    {event.start_time} Wita - {event.end_time}
                  </h6>
                </div>
                <p
                  data-aos="fade-up"
                  className="mt-4 lg:mt-5 text-[10px] lg:text-xs text-white"
                >
                  Bertempat di <br />
                  {event.address}
                </p>
                <div
                  data-aos="fade-up"
                  className="flex flex-col justify-center items-center gap-y-2 lg:gap-y-3 mt-6 lg:mt-7"
                >
                  <Link href={event.address_url} target="_blank">
                    <ButtonLight title="Petunjuk Lokasi" icon={<BiMap />} />
                  </Link>
                  <ButtonLight title="Simpan Tanggal" icon={<BiCalendar />} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Events);
