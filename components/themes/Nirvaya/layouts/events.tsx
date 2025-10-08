import React, { useMemo } from "react";
import useEvents from "@/hooks/themes/useEvents";
import { raleway } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { BiCalendar, BiMap } from "react-icons/bi";
import ButtonOutlinedLight from "../elements/button.outlined.light";
import ButtonOutlinedPrimary from "../elements/button.outlined.primary";
import useScreenSize from "@/hooks/useScreenSize";

const Events = () => {
  const { state: eventState, actions } = useEvents();
  const { isDesktop } = useScreenSize();

  const eventsWithPrimary = useMemo(
    () =>
      eventState.events.map((event, index) => {
        const isPrimary = isDesktop
          ? (Math.floor(index / 2) + (index % 2)) % 2 === 0
          : index % 2 === 0;
        return { ...event, isPrimary };
      }),
    [eventState.events, isDesktop]
  );

  return (
    <section className={`relative ${raleway.className}`}>
      {eventState.events?.length > 0 && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={
              (eventState.images[0] as string) ||
              "https://res.cloudinary.com/dsbmvj2s3/image/upload/v1737459771/flower-bg_uz5uaf.jpg"
            }
            alt="Background Event"
            sizes="(max-width: 768px) 100vw, 50vw"
            fill
            className="object-cover grayscale"
            priority
          />
        </div>
      )}

      <div className="w-full relative">
        <div className="z-10">
          <div
            className={`${
              eventState.events.length > 1
                ? "grid lg:grid-cols-2"
                : "flex flex-col"
            } justify-center items-center p-8 lg:py-20 max-w-screen-lg mx-auto gap-6`}
          >
            {eventsWithPrimary.map((event) => (
              <div
                key={`Event ${event.name}`}
                data-aos="fade-up"
                className={`p-8 lg:p-16 relative z-20 rounded-lg ${
                  event.isPrimary
                    ? "bg-nirvaya-primary/90 text-white"
                    : "bg-nirvaya-light-brown/90 text-nirvaya-dark"
                }`}
              >
                <h4 className="text-3xl lg:text-4xl leading-8 font-edensor">
                  {event.name?.replaceAll("&", "dan")}
                </h4>

                <div className="mt-2 lg:mt-3">
                  <h6 className="uppercase font-edensor text-xs lg:text-sm tracking-[3px]">
                    {new Intl.DateTimeFormat("id-ID", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(event.date))}
                  </h6>
                  <h6 className="uppercase font-edensor text-xs lg:text-sm tracking-[3px]">
                    {event.start_time} Wita - {event.end_time} Wita
                  </h6>
                </div>

                <p className="mt-6 lg:mt-7 text-[8px] lg:text-[10px] tracking-[3px] lg:text-xs uppercase">
                  Bertempat di
                </p>
                <p className="mt-1 lg:mt-2 text-[10px] lg:text-xs tracking-[1px]">
                  {event.address}
                </p>

                <div className="flex flex-col items-start gap-y-2 lg:gap-y-3 mt-6 lg:mt-7">
                  <Link href={event.address_url} target="_blank">
                    {event.isPrimary ? (
                      <ButtonOutlinedLight
                        title="Petunjuk Lokasi"
                        icon={<BiMap />}
                      />
                    ) : (
                      <ButtonOutlinedPrimary
                        title="Petunjuk Lokasi"
                        icon={<BiMap />}
                      />
                    )}
                  </Link>
                  {event.isPrimary ? (
                    <ButtonOutlinedLight
                      onClick={() => actions.handleAddToCalendar(event)}
                      title="Simpan Tanggal"
                      icon={<BiCalendar />}
                    />
                  ) : (
                    <ButtonOutlinedPrimary
                      onClick={() => actions.handleAddToCalendar(event)}
                      title="Simpan Tanggal"
                      icon={<BiCalendar />}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Events);
