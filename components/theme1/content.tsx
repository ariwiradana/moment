import React, { FC } from "react";
import {
  satisfy,
  comforta,
  montserrat,
  playfair,
  tangerine,
} from "@/lib/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import moment from "moment";
import ImageShimmer from "../image.shimmer";
import { UseApp } from "@/hooks/theme1/useApp";
import Title from "./elements/title";
import { Brides } from "@/lib/types";

interface Props {
  dateEvent: string;
  brides: Brides;
  location: string;
  state: UseApp["state"];
  actions: UseApp["actions"];
}

const Content: FC<Props> = (props) => {
  return (
    <>
      <section>
        <div className="relative w-full h-[115dvh] md:h-[105vh] lg:h-[120dvh]">
          <Swiper
            loop
            autoplay={{
              delay: 5000,
            }}
            speed={10000}
            className="w-full h-[115dvh] md:h-[105vh] lg:h-[120dvh]"
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
          >
            {props.state.blobs.map((blob, index) => (
              <SwiperSlide
                className="relative w-full h-full"
                key={`hero-img-${index}`}
              >
                <ImageShimmer
                  fill
                  alt={`hero-img-${index}`}
                  priority
                  sizes="720px"
                  className="object-cover"
                  src={blob.url}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute inset-x-0 top-0 h-[115dvh] md:h-[105vh] lg:h-[120dvh] bg-gradient-to-b from-transparent to-black z-10"></div>
          <div className="absolute inset-0 w-full h-full flex flex-col justify-end px-8 md:px-24 lg:px-32 pb-48 md:pb-44 lg:pb-[32vh] z-20">
            <p
              className={`text-white text-sm md:text-base tracking-widest mb-1 md:mb-3 ${comforta.className}`}
            >
              The Wedding of
            </p>
            <h1
              className={`${tangerine.className} text-6xl lg:text-7xl text-white`}
            >
              {props.brides.male.nickname} & {props.brides.female.nickname}
            </h1>
            <div
              className={`text-white mt-2 lg:mt-4 font-light text-sm md:text-base flex items-center gap-x-3 ${montserrat.className}`}
            >
              {props.location}{" "}
              <span>
                <div className="h-1 w-1 rounded-full bg-white"></div>
              </span>{" "}
              {moment(props.dateEvent).format("ddd, DD MMM YYYY")}
            </div>
            <div className="flex items-center gap-x-6 md:gap-x-8 lg:gap-x-16 mt-6 text-white">
              <div className="flex items-center gap-x-4 md:gap-x-6 lg:gap-x-8">
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.days}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm md:text-base`}
                  >
                    Hari
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.hours}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm md:text-base`}
                  >
                    Jam
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.minutes}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm md:text-base`}
                  >
                    Menit
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.seconds}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm md:text-base`}
                  >
                    Detik
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-white"></div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-white relative z-10 h-full">
          <div className="transform -translate-y-16 lg:-translate-y-48 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="relative z-20"
            >
              <path
                fill="#ffff"
                fill-opacity="1"
                d="M0,32L60,37.3C120,43,240,53,360,64C480,75,600,85,720,90.7C840,96,960,96,1080,85.3C1200,75,1320,53,1380,42.7L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg>
            <svg
              className="absolute -top-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#f3f4f5"
                fill-opacity="0.8"
                d="M0,128L60,128C120,128,240,128,360,128C480,128,600,128,720,133.3C840,139,960,149,1080,149.3C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div className="w-full h-full p-6 md:px-12 -mt-20 lg:-mt-56 relative z-40">
            <div>
              <Title title="Om Swastiastu" />
              <p
                className={`${playfair.className} text-base md:text-lg text-center mt-2 leading-7`}
              >
                Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan
                Yang Maha Esa kami bermaksud mengundang Bapak/Ibu/Saudara/i pada
                Upacara Manusa Yadnya Pawiwahan (Pernikahan) Putra dan Putri
                kami.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center mt-12 gap-10 md:gap-16">
              <div className="flex flex-col justify-center items-center">
                <div className="w-60 h-60 rounded-full bg-gray-200 relative">
                  <ImageShimmer
                    priority
                    sizes="320px"
                    alt="male"
                    fill
                    src={props.brides.male.imageURL}
                    className="object-cover rounded-full"
                  />
                  <div className="w-60 h-60 rounded-full border border-theme1-gold absolute top-0 -left-2"></div>
                  <div className="w-60 h-60 rounded-full border border-theme1-gold absolute top-0 -right-2"></div>
                </div>
                <div className="mt-6 flex flex-col text-center gap-y-2">
                  <h2
                    className={`${satisfy.className} text-2xl text-theme1-gold md:text-3xl`}
                  >
                    {props.brides.male.name}
                  </h2>
                  <p
                    className={`${playfair.className} text-sm md:text-base text-center italic`}
                  >
                    Putra {props.brides.male.child} dari pasangan
                  </p>
                  <div>
                    <h3
                      className={`${playfair.className} text-lg md:text-xl font-semibold mt-2`}
                    >
                      {props.brides.male.parents.male}
                    </h3>
                    <p
                      className={`${playfair.className} text-lg md:text-xl font-semibold`}
                    >
                      &
                    </p>
                    <h3
                      className={`${playfair.className} text-lg md:text-xl font-semibold`}
                    >
                      {props.brides.male.parents.female}
                    </h3>
                  </div>
                  <p
                    className={`${playfair.className} text-base md:text-lg text-center italic`}
                  >
                    {props.brides.male.address}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="w-60 h-60 rounded-full bg-gray-200 relative">
                  <ImageShimmer
                    priority
                    sizes="320px"
                    alt="female"
                    fill
                    src={props.brides.female.imageURL}
                    className="object-cover rounded-full"
                  />
                  <div className="w-60 h-60 rounded-full border border-theme1-gold absolute top-0 -left-2"></div>
                  <div className="w-60 h-60 rounded-full border border-theme1-gold absolute top-0 -right-2"></div>
                </div>
                <div className="mt-6 flex flex-col text-center gap-y-2">
                  <h2
                    className={`${satisfy.className} text-2xl text-theme1-gold md:text-3xl`}
                  >
                    {props.brides.female.name}
                  </h2>
                  <p
                    className={`${playfair.className} text-sm md:text-base text-center italic`}
                  >
                    Putri {props.brides.female.child} dari pasangan
                  </p>
                  <div>
                    <h3
                      className={`${playfair.className} text-lg md:text-xl font-semibold mt-2`}
                    >
                      {props.brides.female.parents.male}
                    </h3>
                    <p
                      className={`${playfair.className} text-lg md:text-xl font-semibold`}
                    >
                      &
                    </p>
                    <h3
                      className={`${playfair.className} text-lg md:text-xl font-semibold`}
                    >
                      {props.brides.female.parents.female}
                    </h3>
                  </div>
                  <p
                    className={`${playfair.className} text-base md:text-lg text-center italic`}
                  >
                    {props.brides.female.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;
