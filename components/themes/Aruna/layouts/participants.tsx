import React, { FC } from "react";
import { italiana, lora } from "@/lib/fonts";
import ImageShimmer from "../../../image.shimmer";
import { Participant } from "@/lib/types";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import { useAruna } from "@/hooks/themes/useAruna";

interface Props {
  state: useAruna["state"];
}

const ParticipantsComponent: FC<Props> = (props) => {
  if (
    props.state.client?.participants &&
    props.state.client?.participants.length > 0
  )
    return (
      <section className="relative z-10 overflow-hidden bg-aruna-background">
        {props.state.groom && (
          <ParticipantComponent data={props.state?.groom as Participant} />
        )}
        {props.state.bride && (
          <ParticipantComponent data={props.state?.bride as Participant} />
        )}
      </section>
    );
};

interface ComponentProps {
  data: Participant;
}
const ParticipantComponent: FC<ComponentProps> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center overflow-hidden">
      <div
        className="h-dvh w-full relative"
        data-aos="zoom-out"
        data-aos-duration="1000"
      >
        {props.data.image && (
          <ImageShimmer
            priority
            src={props.data.image as string}
            fill
            className="object-cover"
            alt={props.data.name}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aruna-dark/20 to-aruna-dark/80 to-[90%]"></div>
        <div className="absolute inset-0 z-20 h-dvh w-full flex flex-col justify-end px-8 py-[60px] md:p-[100px] max-w-screen-sm lg:max-w-screen-lg mx-auto">
          <div
            className="flex items-center mt-2 md:mt-4 gap-x-3"
            data-aos="fade-up"
          >
            <div className="h-[0.5px] w-6 md:w-8 bg-white/80"></div>
            <p
              className={`text-white/80 text-sm md:text-base uppercase ${lora.className}`}
            >
              {props.data.role === "groom"
                ? "Mempelai Pria"
                : props.data.role === "bride"
                ? "Mempelai Wanita"
                : ""}
            </p>
          </div>
          <h1
            data-aos="fade-up"
            className={`text-3xl md:text-4xl font-semibold text-white relative mb-3 ${italiana.className}`}
          >
            {props.data.name}
          </h1>
          <div data-aos="fade-up">
            {props.data.role !== "participant" && (
              <>
                <p
                  className={`text-white/80 font-italic text-sm md:text-base mb-1 ${lora.className}`}
                >
                  {props.data.gender === "female" ? "Putri" : "Putra"}{" "}
                  {props.data.child} dari pasangan
                </p>
                <h2
                  className={`text-white text-base md:text-lg ${lora.className}`}
                >
                  Bapak {props.data.parents_male} & Ibu{" "}
                  {props.data.parents_female}
                </h2>
              </>
            )}
          </div>
          <p
            data-aos="fade-up"
            className={`text-white text-sm md:text-lg mt-3 md:mt-5 ${lora.className}`}
          >
            {props.data.address}
          </p>
          <div
            data-aos="fade-up"
            className="flex items-center mt-5 md:mt-7 gap-x-4 text-white text-xl md:text-2xl"
          >
            {props.data.facebook && (
              <Link
                aria-label="sosmed-facebook-link"
                target="_blank"
                href={props.data.facebook}
              >
                <BiLogoFacebook />
              </Link>
            )}
            {props.data.twitter && (
              <Link
                aria-label="sosmed-twitter-link"
                target="_blank"
                href={props.data.twitter}
              >
                <BiLogoTwitter />
              </Link>
            )}
            {props.data.instagram && (
              <Link
                aria-label="sosmed-instagram-link"
                target="_blank"
                href={props.data.instagram}
              >
                <BiLogoInstagram />
              </Link>
            )}
            {props.data.tiktok && (
              <Link
                aria-label="sosmed-tiktok-link"
                target="_blank"
                href={props.data.tiktok}
              >
                <BiLogoTiktok />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsComponent;
