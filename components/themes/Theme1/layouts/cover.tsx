import React, { FC } from "react";
import { afacad, marcellus } from "@/lib/fonts";
import Button from "../elements/button";
import { MdArrowOutward } from "react-icons/md";
import ImageShimmer from "../../../image.shimmer";
import { useTheme1 } from "@/hooks/themes/useTheme1";

interface Props {
  state: useTheme1["state"];
  actions: useTheme1["actions"];
  to: string;
}

const Cover: FC<Props> = (props) => {
  return (
    <div
      className={`w-full h-dvh fixed inset-x-0 z-30 transition-all ease-in-out delay-500 duration-1000 ${
        props.state.open ? "-top-full invisible opacity-0" : "top-0 visible"
      }`}
    >
      <div className="h-dvh w-dvw relative">
        {props.state.client?.cover && (
          <ImageShimmer
            fill
            alt={`cover-img-image`}
            priority
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
            className="object-cover"
            src={props.state.client?.cover as string}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000045] to-[#000000ca] z-10"></div>
      <div className="absolute inset-0 w-full h-full flex flex-col justify-end px-8 md:px-24 lg:px-32 pb-16 md:pb-32 z-20">
        <p
          data-aos="fade-up"
          className={`text-white text-base mb-1 md:mb-3 ${afacad.className}`}
        >
          The Wedding of
        </p>
        <h1
          data-aos="fade-up"
          data-aos-delay="300"
          className={`${marcellus.className} text-4xl lg:text-5xl text-white`}
        >
          {props.state.groom?.nickname} & {props.state.bride?.nickname}
        </h1>
        <div data-aos="fade-up" data-aos-delay="600">
          <p
            className={`text-white mt-2 lg:mt-4 text-base ${afacad.className}`}
          >
            Yth. Bpk/Ibu/Saudara/i
          </p>

          <h2
            className={`text-white font-light text-2xl lg:text-3xl my-2 ${afacad.className}`}
          >
            {props.to}
          </h2>
        </div>
        <div data-aos="fade-up" data-aos-delay="900" className="mt-4 lg:mt-6">
          <Button
            onClick={props.actions.handleOpenCover}
            icon={<MdArrowOutward className="lg:text-lg" />}
            title="Buka Undangan"
          />
        </div>
      </div>
    </div>
  );
};

export default Cover;
