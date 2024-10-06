import React, { FC } from "react";
import { afacad } from "@/lib/fonts";
import moment from "moment";
import Title from "../elements/title";
import Image from "next/image";
import Button from "../elements/button";
import { BiSolidCalendarCheck } from "react-icons/bi";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import ImageShimmer from "@/components/image.shimmer";

interface Props {
  state: useTheme1["state"];
  actions: useTheme1["actions"];
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
        className="relative w-full h-[650px] lg:h-[750px] 2xl:h-[800px]"
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
        <div className="absolute inset-0 flex flex-col z-10 py-16 lg:py-24 2xl:py-28 items-center h-[650px] lg:h-[750px] 2xl:h-[800px] justify-center">
          <div className="w-full">
            <div
              data-aos="zoom-in-up"
              className="relative h-12 lg:h-16 w-full mb-8"
            >
              <Image
                alt="leaf-datetime"
                src="/images/theme1/leaf.svg"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div data-aos="fade-up" className="text-center">
            <Title
              white
              title="Hitung Mundur"
              caption={moment(props.state.client?.date).format("DD MMMM YYYY")}
            />
          </div>
          <div className="flex flex-col text-center gap-8 mt-12 h-full">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div
                data-aos="fade-up"
                className={`text-white ${afacad.className} border border-white p-2 aspect-square h-24 w-24 flex flex-col justify-center items-center`}
              >
                <h1 className="text-white text-6xl">
                  {props.state.countdown.days}
                </h1>
                <p className={`text-base mt-1 ${afacad.className}`}>Hari</p>
              </div>
              <div
                data-aos="fade-up"
                className={`text-white ${afacad.className} border border-white p-2 aspect-square h-24 w-24 flex flex-col justify-center items-center`}
              >
                <h1 className="text-white text-6xl">
                  {props.state.countdown.hours}
                </h1>
                <p className={`text-base mt-1 ${afacad.className}`}>Jam</p>
              </div>
              <div
                data-aos="fade-up"
                className={`text-white ${afacad.className} border border-white p-2 aspect-square h-24 w-24 flex flex-col justify-center items-center`}
              >
                <h1 className="text-white text-6xl">
                  {props.state.countdown.minutes}
                </h1>
                <p className={`text-base mt-1 ${afacad.className}`}>Menit</p>
              </div>
              <div
                data-aos="fade-up"
                className={`text-white ${afacad.className} border border-white p-2 aspect-square h-24 w-24 flex flex-col justify-center items-center`}
              >
                <h1 className="text-white text-6xl">
                  {props.state.countdown.seconds}
                </h1>
                <p className={`text-base mt-1 ${afacad.className}`}>Detik</p>
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
