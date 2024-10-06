import React from "react";
import ButtonPrimary from "./elements/button.primary";
import { josefin } from "@/lib/fonts";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Theme } from "@/lib/types";

const Hero = () => {
  const { data } = useSWR("/api/themes", fetcher);
  const themes: Theme[] = data?.data;

  return (
    <div className={`w-full select-none pt-16 md:pt-20 lg:pt-24 bg-gray-50`}>
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 gap-x-8 pt-16 pb-32 relative px-6 md:px-12 lg:px-24">
        <div className="h-full flex justify-end">
          <div className="w-2/3">
            {themes && themes.length ? (
              <Swiper spaceBetween={0} slidesPerView={1}>
                {themes.map((theme) => (
                  <SwiperSlide key={`thumbnail-${theme.name}`}>
                    <Image
                      sizes="240px"
                      src={theme.thumbnail ?? ""}
                      alt={`thumbnail-${theme.name}`}
                      width={240}
                      height={80}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
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
            className={`mb-8 text-dashboard-secondary text-6xl flex flex-wrap gap-x-4 ${josefin.className}`}
          >
            Bagikan{" "}
            <span className="flex items-center">
              m
              <span>
                <Image
                  className="animate-spin-slow mt-3"
                  src="/icon.png"
                  alt="font-moment"
                  width={40}
                  height={40}
                />
              </span>
              men
            </span>{" "}
            tak terlupakan bersama kami!
          </h1>
          <div>
            <ButtonPrimary icon={<BiEdit />} title="Buat Sekarang" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
