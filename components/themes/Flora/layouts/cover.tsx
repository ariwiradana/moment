import React, { FC, useEffect, useState } from "react";
import { italiana, marcellus, windsong } from "@/lib/fonts";
import Button from "../elements/button";
import Image from "next/image";
import { BiSolidEnvelopeOpen } from "react-icons/bi";
import { useFlora } from "@/hooks/themes/useFlora";
import moment from "moment";

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
      className={`w-full h-dvh fixed inset-x-0 z-30 transition-all ease-in-out delay-500 duration-1000 bg-flora-dark flex flex-col justify-center items-center p-8 md:p-16 ${
        props.state.open ? "-top-full invisible opacity-0" : "top-0 visible"
      }`}
    >
      <p
        className={`${marcellus.className} text-white text-base lg:text-lg relative`}
        data-aos="fade-up"
      >
        Undangan Pernikahan
        <Image
          width={65}
          height={90}
          alt="leaf"
          src="/images/flora/leaf.svg"
          className="absolute -top-12 left-1/2 transform -translate-x-1/2"
        />
      </p>

      <h1
        className={`${windsong.className} text-white text-[40px] lg:text-5xl mb-5 lg:mt-3`}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {props.state.groom?.nickname} & {props.state.bride?.nickname}
      </h1>
      <div
        className="relative h-[330px] w-[173px]"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <Image
          alt="cover-image"
          src={props.state.client?.cover as string}
          fill
          className="object-cover rounded-t-full rounded-b-full"
        />
        <Image
          alt="cover-frame"
          src="/images/flora/cover-frame.svg"
          fill
          className="absolute w-full object-contain transform scale-[1.4]"
        />
      </div>
      <p
        className={`${marcellus.className} text-white text-base lg:text-lg mt-9`}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Kepada Yth Bapak/Ibu/Saudara/i
      </p>
      <h2
        className={`${italiana.className} text-white text-3xl mt-1 mb-4`}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {props.untuk}
      </h2>
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        className={`border-y border-y-white w-full flex justify-between max-w-sm`}
      >
        <div
          className={`transform transition-all duration-500 ease-in-out w-full ${
            fade ? "opacity-100 translate-y-0" : "opacity-10 translate-y-1"
          }`}
        >
          <p
            className={`${marcellus.className} text-white text-center p-[10px]`}
          >
            {events[currentIndex].name}
          </p>
        </div>
        <div className="w-[1px] h-full bg-white"></div>
        <div
          className={`transform transition-all duration-500 ease-in-out w-full delay-200 ${
            fade ? "opacity-100 translate-y-0" : "opacity-10 translate-y-1"
          }`}
        >
          <p
            className={`${marcellus.className} text-white text-center p-[10px]`}
          >
            {moment(events[currentIndex].date).format("DD / MMMM / YYYY")}
          </p>
        </div>
      </div>
      <div className="mt-6" data-aos="fade-up" data-aos-delay="600">
        <Button
          onClick={props.actions.handleOpenCover}
          icon={<BiSolidEnvelopeOpen className="lg:text-lg" />}
          title="Buka Undangan"
        />
      </div>
    </div>
  );
};

export default Cover;
