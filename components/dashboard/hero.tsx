import React from "react";
import ButtonPrimary from "./elements/button.primary";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Blob } from "@/lib/types";
import { Autoplay, EffectCards } from "swiper/modules";
import { dm } from "@/lib/fonts";

const HeroComponent = () => {
  const { data } = useSWR("/api/images?pathname=Themes/Dashboard", fetcher);
  const images: Blob[] = data?.blobs || [];
  const thumbnails: string[] = images.map((theme) => theme.url);

  const slicedThumbnails =
    thumbnails.length > 3 ? thumbnails.slice(0, 3) : thumbnails;

  return (
    <section
      id="section1"
      className={`w-full select-none pt-16 md:pt-20 lg:pt-24 bg-gray-50 overflow-x-hidden`}
    >
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 pt-16 pb-32 relative px-6 md:px-12 lg:px-24">
        <div className="h-full flex justify-center">
          <div className="w-[180px] lg:w-[260px]">
            <Swiper
              initialSlide={1}
              speed={2000}
              autoplay
              effect="cards"
              grabCursor={false}
              modules={[Autoplay, EffectCards]}
              spaceBetween={0}
              slidesPerView={1}
              allowTouchMove={false}
              preventInteractionOnTransition={false}
              preventClicks={false}
              cardsEffect={{
                slideShadows: false,
                perSlideOffset: 15,
                perSlideRotate: 5,
              }}
            >
              {slicedThumbnails.map((thumb, index) => (
                <SwiperSlide className="select-none" key={`thumbnail-${index}`}>
                  <Image
                    priority
                    sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 260px, 260px"
                    src={thumb ?? ""}
                    alt={`thumbnail-${index}`}
                    width={260}
                    height={80}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="h-full flex flex-col justify-center">
          <div className="mb-4 text-dashboard-secondary uppercase text-sm flex items-center gap-x-2">
            <span className="pr-3">Simple</span>
            <span>
              <div className="w-1 h-1 bg-dashboard-secondary rounded"></div>
            </span>
            <span className="px-3">Minimalis</span>
            <span>
              <div className="w-1 h-1 bg-dashboard-secondary rounded"></div>
            </span>
            <span className="pl-3">Elegan</span>
          </div>
          <h1
            className={`mb-8 text-dashboard-secondary text-4xl lg:text-6xl flex flex-wrap gap-x-4 ${dm.className}`}
          >
            Bagikan{" "}
            <span className="flex items-center">
              m
              <span>
                <Image
                  sizes="40px"
                  className="animate-spin-slow lg:mt-3"
                  src="/icon.png"
                  alt="font-moment"
                  width={40}
                  height={40}
                />
              </span>
              men
            </span>{" "}
            <span>tak terlupakan bersama kami!</span>
          </h1>

          <div>
            <ButtonPrimary icon={<BiEdit />} title="Buat Sekarang" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
