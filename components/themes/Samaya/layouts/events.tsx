import React, { memo } from "react";
import { raleway } from "@/lib/fonts";
import moment from "moment";
import { BiSolidCalendar, BiSolidMap } from "react-icons/bi";
import Link from "next/link";
import useEvents from "@/hooks/themes/useEvents";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import ImageShimmer from "@/components/image.shimmer";
import ButtonPrimary from "../elements/button.primary";

const EventsComponent = () => {
  const { state, actions } = useEvents();

  if (state.events.length > 0) {
    return (
      <section className="relative overflow-hidden z-20">
        <div className="inset-0 absolute" data-aos="zoom-out">
          <Swiper
            loop
            effect="fade"
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={2000}
            className="w-full transition-transform h-full"
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, EffectFade]}
          >
            {state.events.map((event, index) => (
              <SwiperSlide
                className="relative w-full h-full"
                key={`hero-img-${index}`}
              >
                <div className="absolute inset-0 z-0">
                  <ImageShimmer
                    fill
                    quality={100}
                    alt={`hero-img-${index}`}
                    priority
                    sizes="100vw"
                    className="object-cover grayscale transform translate-y-0 lg:translate-y-0 transition-transform"
                    src={event.image as string}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="absolute bg-samaya-dark/60 inset-0"></div>
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
                className={`text-center md:min-w-[400px] border-[0.7px] border-white p-8 md:p-16 ${raleway.className}`}
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
                    <div className="flex flex-col border-[0.7px] border-white aspect-square justify-center">
                      <h2 className="text-base md:text-lg">
                        {state.timeRemainings[index].days}
                      </h2>
                      <h4 className="text-[10px] md:text-xs uppercase tracking-[1px]">Hari</h4>
                    </div>
                    <div className="flex flex-col border-[0.7px] border-white aspect-square justify-center">
                      <h2 className="text-base md:text-lg">
                        {state.timeRemainings[index].hours}
                      </h2>
                      <h4 className="text-[10px] md:text-xs uppercase tracking-[1px]">Jam</h4>
                    </div>
                    <div className="flex flex-col border-[0.7px] border-white aspect-square justify-center">
                      <h2 className="text-base md:text-lg">
                        {state.timeRemainings[index].minutes}
                      </h2>
                      <h4 className="text-[10px] md:text-xs uppercase tracking-[1px]">Menit</h4>
                    </div>
                    <div className="flex flex-col border-[0.7px] border-white aspect-square justify-center">
                      <h2 className="text-base md:text-lg">
                        {state.timeRemainings[index].seconds}
                      </h2>
                      <h4 className="text-[10px] md:text-xs uppercase tracking-[1px]">Detik</h4>
                    </div>
                  </div>
                )}
                <div className="inline-flex flex-wrap justify-center gap-3">
                  <Link target="_blank" href={event.address_url}>
                    <ButtonPrimary
                      icon={<BiSolidMap className="lg:text-lg" />}
                      title="Petunjuk Lokasi"
                    />
                  </Link>
                  <div>
                    <ButtonPrimary
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
