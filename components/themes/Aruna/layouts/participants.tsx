import React, { FC, memo } from "react";
import { roboto } from "@/lib/fonts";
import ImageShimmer from "../../../image.shimmer";
import { Participant } from "@/lib/types";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import { getEventNames } from "@/utils/getEventNames";
import useClientStore from "@/store/useClientStore";
import useParticipants from "@/hooks/themes/useParticipants";


const ParticipantsComponent = () => {
  const { client} = useClientStore()
  const { state: participantState} = useParticipants()

  return (
    <section className="relative z-10 overflow-hidden bg-white py-[100px] px-8 md:px-16">
      <h2
        data-aos="fade-up"
        className="font-high-summit text-4xl md:text-5xl text-aruna-dark mb-8 text-center"
      >
        {client?.opening_title}
      </h2>
      <h2
        data-aos="fade-up"
        className={`${roboto.className} text-xs md:text-sm text-center text-aruna-dark/60 max-w-screen-sm`}
      >
        {client?.opening_description}
      </h2>

      <div className="bg-white relative overflow-hidden grid gap-[60px] mt-[72px]">
        <>
          {participantState.groom && (
            <ParticipantComponent
              role="mempelai"
              data={participantState?.groom as Participant}
            />
          )}
          {participantState.bride && (
            <ParticipantComponent
              role="mempelai"
              data={participantState?.bride as Participant}
            />
          )}
          {client?.participants
            .filter(
              (participant) =>
                participant.role !== "bride" && participant.role !== "groom"
            )
            .map((participant) => (
              <ParticipantComponent
                role={getEventNames(client?.events || [])}
                key={participant.id}
                data={participant as Participant}
              />
            ))}
        </>
      </div>
    </section>
  );
};

interface ComponentProps {
  data: Participant;
  role: string;
}
const ParticipantComponent: FC<ComponentProps> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center overflow-hidden">
      <div className="relative" data-aos="zoom-out-up">
        <div className="w-[260px] h-[378px] relative rounded-tl-[24px] rounded-br-[100px] overflow-hidden shadow-lg shadow-aruna-dark/30">
          {props.data.image && (
            <ImageShimmer
              priority
              src={props.data.image as string}
              fill
              className="object-cover"
              alt={props.data.name}
            />
          )}
        </div>
      </div>

      <div
        className="flex items-center mt-12 md:mt-14 gap-x-3"
        data-aos="fade-up"
      >
        <p
          className={`text-aruna-dark/60 text-[8px] md:text-[10px] uppercase tracking-[6px] ${roboto.className}`}
        >
          {props.data.role === "groom"
            ? "Mempelai Pria"
            : props.data.role === "bride"
            ? "Mempelai Wanita"
            : `${props.role}`}
        </p>
      </div>
      <h1
        data-aos="fade-up"
        className={`text-3xl md:text-4xl text-center text-aruna-dark relative mb-8 font-high-summit mt-4 md:mt-6`}
      >
        {props.data.name}
      </h1>
      <p
        data-aos="fade-up"
        className={`text-aruna-dark/60 text-center text-xs md:text-sm mb-10 ${roboto.className}`}
      >
        {props.data.gender === "female" ? "Putri" : "Putra"} {props.data.child}{" "}
        dari pasangan
        <br />
        Bapak {props.data.parents_male} & Ibu {props.data.parents_female}
      </p>
      <p
        data-aos="fade-up"
        className={`text-aruna-dark text-xs md:text-sm text-center ${roboto.className}`}
      >
        {props.data.address}
      </p>
      <div data-aos="fade-up">
        <div className="flex items-center py-[6px] px-3 rounded-full mt-8 gap-x-4 text-aruna-dark text-xl bg-aruna-dark/5">
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
  );
};

export default memo(ParticipantsComponent);
