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
import ImageShimmer from "../../image.shimmer";
import Title from "../elements/title";
import { Brides } from "@/lib/types";
import { UseTheme1 } from "@/hooks/useTheme1";

interface Props {
  dateEvent: string;
  brides: Brides;
  location: string;
  state: UseTheme1["state"];
  actions: UseTheme1["actions"];
}

const Content: FC<Props> = (props) => {
  return (
    <>
      <section>
        <div className="relative w-full h-[105dvh] lg:h-[110dvh]">
          <Swiper
            loop
            autoplay={{
              delay: 5000,
            }}
            speed={10000}
            className="w-full h-[105dvh] lg:h-[110dvh]"
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

          <div className="absolute inset-x-0 top-0 h-[105dvh] lg:h-[110dvh] bg-gradient-to-b from-transparent to-black z-10"></div>
          <div className="absolute inset-0 w-full h-full flex flex-col justify-end px-8 md:px-24 lg:px-32 pb-28 md:pb-44 lg:pb-[24vh] z-20">
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
                    className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                  >
                    Hari
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.hours}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                  >
                    Jam
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.minutes}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
                  >
                    Menit
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h2 className={`${comforta.className} text-xl lg:text-2xl`}>
                    {props.state.countdown.seconds}
                  </h2>
                  <p
                    className={`${montserrat.className} text-xs md:text-sm lg:text-base`}
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
          <div className="transform relative -translate-y-6 md:-translate-y-12 lg:-translate-y-32">
            <svg
              id="wave"
              viewBox="0 0 1440 100"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffff"
                d="M0,60L20,56.7C40,53,80,47,120,40C160,33,200,27,240,23.3C280,20,320,20,360,28.3C400,37,440,53,480,63.3C520,73,560,77,600,66.7C640,57,680,33,720,25C760,17,800,23,840,33.3C880,43,920,57,960,63.3C1000,70,1040,70,1080,58.3C1120,47,1160,23,1200,20C1240,17,1280,33,1320,38.3C1360,43,1400,37,1440,31.7C1480,27,1520,23,1560,23.3C1600,23,1640,27,1680,38.3C1720,50,1760,70,1800,70C1840,70,1880,50,1920,48.3C1960,47,2000,63,2040,73.3C2080,83,2120,87,2160,78.3C2200,70,2240,50,2280,46.7C2320,43,2360,57,2400,58.3C2440,60,2480,50,2520,43.3C2560,37,2600,33,2640,36.7C2680,40,2720,50,2760,55C2800,60,2840,60,2860,60L2880,60L2880,100L2860,100C2840,100,2800,100,2760,100C2720,100,2680,100,2640,100C2600,100,2560,100,2520,100C2480,100,2440,100,2400,100C2360,100,2320,100,2280,100C2240,100,2200,100,2160,100C2120,100,2080,100,2040,100C2000,100,1960,100,1920,100C1880,100,1840,100,1800,100C1760,100,1720,100,1680,100C1640,100,1600,100,1560,100C1520,100,1480,100,1440,100C1400,100,1360,100,1320,100C1280,100,1240,100,1200,100C1160,100,1120,100,1080,100C1040,100,1000,100,960,100C920,100,880,100,840,100C800,100,760,100,720,100C680,100,640,100,600,100C560,100,520,100,480,100C440,100,400,100,360,100C320,100,280,100,240,100C200,100,160,100,120,100C80,100,40,100,20,100L0,100Z"
              ></path>
            </svg>
            <svg
              className="absolute -top-1"
              id="wave"
              viewBox="0 0 1440 100"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffff"
                fillOpacity={0.7}
                d="M0,20L20,28.3C40,37,80,53,120,51.7C160,50,200,30,240,21.7C280,13,320,17,360,20C400,23,440,27,480,36.7C520,47,560,63,600,66.7C640,70,680,60,720,46.7C760,33,800,17,840,15C880,13,920,27,960,40C1000,53,1040,67,1080,63.3C1120,60,1160,40,1200,36.7C1240,33,1280,47,1320,55C1360,63,1400,67,1440,58.3C1480,50,1520,30,1560,26.7C1600,23,1640,37,1680,46.7C1720,57,1760,63,1800,68.3C1840,73,1880,77,1920,76.7C1960,77,2000,73,2040,66.7C2080,60,2120,50,2160,41.7C2200,33,2240,27,2280,26.7C2320,27,2360,33,2400,31.7C2440,30,2480,20,2520,26.7C2560,33,2600,57,2640,68.3C2680,80,2720,80,2760,75C2800,70,2840,60,2860,55L2880,50L2880,100L2860,100C2840,100,2800,100,2760,100C2720,100,2680,100,2640,100C2600,100,2560,100,2520,100C2480,100,2440,100,2400,100C2360,100,2320,100,2280,100C2240,100,2200,100,2160,100C2120,100,2080,100,2040,100C2000,100,1960,100,1920,100C1880,100,1840,100,1800,100C1760,100,1720,100,1680,100C1640,100,1600,100,1560,100C1520,100,1480,100,1440,100C1400,100,1360,100,1320,100C1280,100,1240,100,1200,100C1160,100,1120,100,1080,100C1040,100,1000,100,960,100C920,100,880,100,840,100C800,100,760,100,720,100C680,100,640,100,600,100C560,100,520,100,480,100C440,100,400,100,360,100C320,100,280,100,240,100C200,100,160,100,120,100C80,100,40,100,20,100L0,100Z"
              ></path>
            </svg>
          </div>

          <div className="w-full h-full p-6 md:px-12 relative z-40 max-w-screen-lg mx-auto">
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

            <div className="flex flex-col lg:flex-row justify-center items-center mt-12 gap-10 md:gap-16">
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
      <section className="py-12 bg-white">
        <Title title="Waktu & Tempat" />
      </section>
    </>
  );
};

export default Content;
