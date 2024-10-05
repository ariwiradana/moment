import React, { FC } from "react";
import { comforta, playfair } from "@/lib/fonts";
import moment from "moment";
import Title from "../elements/title";
import Image from "next/image";
import Button from "../elements/button";
import { BiSolidCalendarCheck } from "react-icons/bi";
import { UseEarthlyEleganceTheme } from "@/hooks/themes/useEarthlyEleganceTheme";
import ImageShimmer from "@/components/image.shimmer";

interface Props {
  state: UseEarthlyEleganceTheme["state"];
  actions: UseEarthlyEleganceTheme["actions"];
}

const CountdownComponent: FC<Props> = (props) => {
  const bgImage = Array.isArray(props.state.client?.gallery)
    ? props.state.client.gallery.length > 4
      ? props.state.client.gallery[3]
      : props.state.client.gallery.length > 1
      ? props.state.client.gallery[1]
      : props.state.client.gallery[0] || ""
    : "";

  return (
    <section>
      <div
        data-aos="fade-up"
        className="relative w-full h-[600px] lg:h-[650px]"
      >
        <ImageShimmer
          sizes="100vw"
          priority
          alt="bg-countdown"
          fill
          className="object-cover grayscale-[30%]"
          src={bgImage}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col z-10 py-16 items-center h-[600px] lg:h-[650px] justify-center">
          <div data-aos="zoom-in-up">
            <Image
              alt="leaf-datetime"
              src="/images/theme1/leaf5.svg"
              width={110}
              height={50}
              className="mb-4"
            />
          </div>
          <div data-aos="fade-up" className="text-center">
            <Title title="Hitung Mundur" className="text-white" />
            <h4
              className={`text-white mt-2 text-sm md:text-base ${comforta.className}`}
            >
              {moment(props.state.client?.date).format("DD MMMM YYYY")}
            </h4>
          </div>
          <div className="flex flex-col text-center gap-8 mt-12 h-full">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div
                data-aos="fade-up"
                className={`text-white ${playfair.className} border border-white p-2 rounded-xl aspect-square h-24 w-24 flex flex-col justify-center items-center`}
              >
                <h1 className="text-white text-6xl">
                  {props.state.countdown.days}
                </h1>
                <p
                  className={`text-sm font-semibold mt-1 ${comforta.className}`}
                >
                  Hari
                </p>
              </div>
              <div
                data-aos="fade-up"
                className={`text-white ${playfair.className} border border-white p-2 rounded-xl aspect-square h-24 w-24 flex flex-col justify-center items-center`}
              >
                <h1 className="text-white text-6xl">
                  {props.state.countdown.hours}
                </h1>
                <p
                  className={`text-sm font-semibold mt-1 ${comforta.className}`}
                >
                  Jam
                </p>
              </div>
              <div
                data-aos="fade-up"
                className={`text-white ${playfair.className} border border-white p-2 rounded-xl aspect-square h-24 w-24 flex flex-col justify-center items-center`}
              >
                <h1 className="text-white text-6xl">
                  {props.state.countdown.minutes}
                </h1>
                <p
                  className={`text-sm font-semibold mt-1 ${comforta.className}`}
                >
                  Menit
                </p>
              </div>
              <div
                data-aos="fade-up"
                className={`text-white ${playfair.className} border border-white p-2 rounded-xl aspect-square h-24 w-24 flex flex-col justify-center items-center`}
              >
                <h1 className="text-white text-6xl">
                  {props.state.countdown.seconds}
                </h1>
                <p
                  className={`text-sm font-semibold mt-1 ${comforta.className}`}
                >
                  Detik
                </p>
              </div>
            </div>
            <div className="flex justify-center" data-aos="fade-up">
              <Button
                type="button"
                onClick={props.actions.handleAddEvent}
                title="Save The Date"
                icon={<BiSolidCalendarCheck />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownComponent;
