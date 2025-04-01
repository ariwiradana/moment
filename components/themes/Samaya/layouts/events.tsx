import React, { memo } from "react";
import { raleway } from "@/lib/fonts";
import moment from "moment";
import { BiSolidCalendar, BiSolidMap } from "react-icons/bi";
import Link from "next/link";
import useEvents from "@/hooks/themes/useEvents";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import ImageShimmer from "@/components/image.shimmer";
import Image from "next/image";
import ButtonDark from "../elements/button.dark";

const EventsComponent = () => {
  const { state, actions } = useEvents();

  if (state.events.length > 0) {
    return (
      <section className="relative overflow-hidden bg-samaya-dark z-20">
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
            {state.events.reverse().map((event, index) => (
              <SwiperSlide
                className="relative w-full h-full"
                key={`hero-img-${index}`}
              >
                <div className="absolute inset-0 z-0">
                  <ImageShimmer
                    fill
                    quality={100}
                    alt={`Foto Card ${event.name} ${index + 1}`}
                    priority
                    sizes="100vw"
                    className="object-cover grayscale transform translate-y-0 lg:translate-y-0 transition-transform bg-white/5"
                    src={(event.image as string) || ""}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="absolute backdrop-blur-sm inset-0"></div>
        <div className="flex flex-col z-10 items-center justify-center px-6 md:px-12 lg:px-4 py-20 lg:py-40">
          <div className={`grid gap-20`}>
            {state.events.map((event, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="grid md:grid-cols-2"
                key={`event-${event.id}`}
              >
                <div className="w-full h-full aspect-square md:aspect-auto relative">
                  <Image
                    src={(event.image as string) || ""}
                    alt={`Foto Acara ${event.name} ${index + 1}`}
                    fill
                    className="object-cover bg-white/5"
                  />
                </div>
                <div
                  className={` bg-white text-samaya-dark backdrop-blur-lg p-8 md:p-16 ${raleway.className}`}
                >
                  <h1 className={`font-tan-pearl text-2xl md:text-3xl`}>
                    {event.name}
                  </h1>
                  <p className="text-xs md:text-sm mt-6">
                    {moment(event.date).format("DD / MMMM / YYYY")}
                  </p>
                  <p className="text-xs md:text-sm">
                    {event.start_time} - {event.end_time}
                  </p>

                  <p className="text-xs md:text-sm mt-4 font-medium max-w-sm">
                    {event.address}
                  </p>
                  {state.timeRemainings.length > 0 && (
                    <div className="grid grid-cols-4 text-samaya-dark my-6 divide-x divide-samaya-dark/10 border-x border-x-samaya-dark/10">
                      <div className="flex px-2 flex-col justify-center">
                        <h2 className="text-base md:text-lg font-medium">
                          {state.timeRemainings[index].days}
                        </h2>
                        <h4 className="text-[10px] md:text-xs uppercase tracking-[1px] text-samaya-dark/50">
                          Hari
                        </h4>
                      </div>
                      <div className="flex px-2 flex-col justify-center">
                        <h2 className="text-base md:text-lg font-medium">
                          {state.timeRemainings[index].hours}
                        </h2>
                        <h4 className="text-[10px] md:text-xs uppercase tracking-[1px] text-samaya-dark/50">
                          Jam
                        </h4>
                      </div>
                      <div className="flex px-2 flex-col justify-center">
                        <h2 className="text-base md:text-lg font-medium">
                          {state.timeRemainings[index].minutes}
                        </h2>
                        <h4 className="text-[10px] md:text-xs uppercase tracking-[1px] text-samaya-dark/50">
                          Menit
                        </h4>
                      </div>
                      <div className="flex px-2 flex-col justify-center">
                        <h2 className="text-base md:text-lg font-medium">
                          {state.timeRemainings[index].seconds}
                        </h2>
                        <h4 className="text-[10px] md:text-xs uppercase tracking-[1px] text-samaya-dark/50">
                          Detik
                        </h4>
                      </div>
                    </div>
                  )}
                  <div className="inline-flex flex-wrap gap-3">
                    <Link target="_blank" href={event.address_url}>
                      <ButtonDark
                        icon={<BiSolidMap className="lg:text-lg" />}
                        title="Petunjuk Lokasi"
                      />
                    </Link>
                    <div>
                      <ButtonDark
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

export default memo(EventsComponent);
