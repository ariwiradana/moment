import React, { FC, useEffect, useState } from "react";
import { italiana, marcellus } from "@/lib/fonts";
import Button from "../elements/button";
import { BiSolidEnvelopeOpen } from "react-icons/bi";
import { useFlora } from "@/hooks/themes/useFlora";
import moment from "moment";
import ImageShimmer from "@/components/image.shimmer";

interface Props {
  state: useFlora["state"];
  actions: useFlora["actions"];
  untuk: string;
}

const Cover: FC<Props> = (props) => {
  const events = props.state.client?.events || [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);

  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
          setFade(true);
        }, 500);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [events.length]);

  return (
    <div
      className={`w-full h-dvh fixed inset-x-0 z-30 transition-all ease-in-out delay-500 duration-1000 bg-flora-dark flex flex-col items-center justify-center${
        props.state.open ? "-top-full invisible opacity-0" : "top-0 visible"
      }`}
    >
      <div className="flex h-dvh w-dvw items-center justify-between flex-col relative py-20 lg:py-40">
        <div className="fixed inset-0">
          {props.state.client?.cover && (
            <ImageShimmer
              fill
              alt={`cover-img-image`}
              priority
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
              className="object-cover fixed inset-0"
              src={props.state.client?.cover as string}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#252015] via-[#252015]/20 to-[#252015]"></div>
        <div className="flex justify-between items-center relative w-full gap-8 lg:gap-20">
          <div
            className={`transform transition-all duration-500 ease-in-out flex items-center gap-x-6 lg:gap-x-12 pl-12 lg:pl-40 ${
              fade ? "opacity-100 translate-y-0" : "opacity-10 translate-y-1"
            }`}
          >
            <p
              className={`${marcellus.className} text-white text-xs lg:text-lg text-center whitespace-nowrap`}
            >
              {events[currentIndex].name}
            </p>
            <div className="w-[2px] h-[2px] lg:h-1 lg:w-1 rounded-full bg-white"></div>
            <p
              className={`${marcellus.className} text-white text-xs lg:text-lg text-center whitespace-nowrap`}
            >
              {moment(events[currentIndex].date).format("DD / MMM / YYYY")}
            </p>
          </div>
          <div className="h-[0.5px] w-full bg-white"></div>
        </div>

        <div className="relative flex flex-col w-full px-12 lg:px-40">
          <h1
            className={`${italiana.className} text-white text-[40px] lg:text-7xl leading-[40px] mb-8 lg:mb-12`}
          >
            {props.state.groom?.nickname}
            <br />& {props.state.bride?.nickname}
          </h1>
          <p
            className={`${marcellus.className} text-white text-xs lg:text-xl mb-2 lg:mb-4`}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <h2
            className={`${italiana.className} text-white text-2xl lg:text-5xl`}
          >
            {props.untuk}
          </h2>
          <div className="mt-6 lg:mt-10">
            <Button
              onClick={props.actions.handleOpenCover}
              icon={<BiSolidEnvelopeOpen className="lg:text-lg" />}
              title="Buka Undangan"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
