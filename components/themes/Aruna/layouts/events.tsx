import React, { memo } from "react";
import { roboto } from "@/lib/fonts";
import moment from "moment";
import { BiCalendar, BiMap } from "react-icons/bi";
import Link from "next/link";
import ImageShimmer from "@/components/image.shimmer";
import ButtonDark from "../elements/button.dark";
import useEvents from "@/hooks/themes/useEvents";
import usePhotos from "@/hooks/themes/usePhotos";
import Image from "next/image";

const EventsComponent = () => {
  const { state: eventState, actions: eventActions } = useEvents();
  const {
    state: { images },
  } = usePhotos();

  if (eventState.events.length > 0) {
    return (
      <section className="relative overflow-hidden z-0 bg-aruna-dark py-[60px] md:py-[100px]">
        <div className="relative z-20">
          <p
            data-aos="fade-up"
            className={`${roboto.className} text-[10px] md:text-xs tracking-[1px] text-center text-white/80 max-w-screen-sm mx-auto mb-8 px-6`}
          >
            Hari yang dinanti telah tiba, sebuah kisah baru akan dimulai.
            Jadilah bagian dari kebahagiaan kami
          </p>

          <p
            data-aos="fade-up"
            className={`text-white/60 text-[8px] md:text-[10px] uppercase text-center tracking-[6px] ${roboto.className}`}
          >
            Acara Kami
          </p>
        </div>
        <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-aruna-dark via-aruna-dark/50 to-transparent z-10"></div>
        <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-b from-transparent via-transparent to-aruna-dark z-10"></div>
        <div className="absolute top-0 inset-x-0 grid" data-aos="zoom-out">
          {images.map((image, index) => (
            <div
              className="w-full h-[20vh] overflow-hidden relative opacity-30"
              key={`Foto Event ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Foto Event ${index + 1}`}
                fill
                className="object-cover grayscale"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col z-10 items-center justify-center">
          <div
            className={`flex gap-12 flex-wrap justify-center relative z-20 px-6 py-12`}
          >
            {eventState.events.map((event, index) => (
              <div
                data-aos="zoom-out-up"
                className="rounded-t-2xl"
                key={`Acara ${event.name}`}
              >
                <div className="w-full aspect-[3/2] relative overflow-hidden ">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/0 from-[50%] to-white z-10"></div>
                  {event.image && (
                    <ImageShimmer
                      quality={100}
                      sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                      priority
                      alt={`Acara ${event.name}`}
                      fill
                      className="object-cover rounded-t-[150px]"
                      src={event.image as string}
                    />
                  )}
                </div>
                <div className="bg-white pb-8 md:pb-12 pt-3 px-6 md:px-12 text-center rounded-b-2xl">
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
                        onClick={() => eventActions.handleAddToCalendar(event)}
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
