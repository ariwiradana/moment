import React, { FC} from "react";
import { italiana, marcellus } from "@/lib/fonts";
import Button from "../elements/button";
import { BiSolidEnvelopeOpen } from "react-icons/bi";
import { useFlora } from "@/hooks/themes/useFlora";
import ImageShimmer from "@/components/image.shimmer";

interface Props {
  state: useFlora["state"];
  actions: useFlora["actions"];
  untuk: string;
}

const Cover: FC<Props> = (props) => {
  return (
    <div
      className={`w-full h-dvh fixed inset-x-0 z-30 transition-all ease-in-out delay-500 duration-1000 bg-flora-dark flex flex-col items-center justify-center${
        props.state.open ? "-top-full invisible opacity-0" : "top-0 visible"
      }`}
    >
      <div className="flex h-dvh w-dvw items-center justify-between flex-col relative py-16 md:py-24 lg:py-32">
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
        <div className="flex justify-between items-center relative w-full gap-8 lg:gap-20 pl-8 md:pl-20 lg:pl-32">
          <p
            className={`${marcellus.className} text-white md:text-lg text-center whitespace-nowrap`}
          >
            Undangan Pernikahan
          </p>
          <div className="h-[0.5px] w-full bg-white"></div>
        </div>

        <div className="relative flex flex-col w-full px-8 md:px-20 lg:px-32">
          <h1
            className={`${italiana.className} text-white text-5xl md:text-6xl leading-[40px] mb-6 lg:mb-12`}
          >
            {props.state.groom?.nickname}
            <br />& {props.state.bride?.nickname}
          </h1>
          <p
            className={`${marcellus.className} text-white md:text-lg mb-1 md:mb-2`}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <h2
            className={`${italiana.className} text-white text-[32px] md:text-4xl`}
          >
            {props.untuk}
          </h2>
          <div className="mt-6 md:mt-10">
            <Button
              onClick={props.actions.handleOpenCover}
              icon={<BiSolidEnvelopeOpen className="md:text-lg" />}
              title="Buka Undangan"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
