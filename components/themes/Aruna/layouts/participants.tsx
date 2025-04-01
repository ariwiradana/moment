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
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();

  return (
    <section className="relative z-10 bg-aruna-dark md:px-16">
      <div className="relative grid">
        <>
          {participantState.groom && (
            <ParticipantComponent
              index={0}
              role="mempelai"
              data={participantState?.groom as Participant}
            />
          )}
          {participantState.bride && (
            <ParticipantComponent
              index={1}
              role="mempelai"
              data={participantState?.bride as Participant}
            />
          )}
          {client?.participants
            .filter(
              (participant) =>
                participant.role !== "bride" && participant.role !== "groom"
            )
            .map((participant, index) => (
              <ParticipantComponent
                index={index}
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
  index: number;
}
const ParticipantComponent: FC<ComponentProps> = (props) => {
  const odd = props.index % 2 !== 0;
  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="relative" data-aos={odd ? "fade-left" : "fade-right"}>
        <div className="w-[100vw] h-svh lg:w-[400px] md:h-auto md:aspect-[2/3] relative rounded-tl-[140px]">
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
        data-aos={odd ? "fade-up-right" : "fade-up-left"}
        className="bg-white absolute left-6 right-6 -bottom-[5vh] z-20 p-8"
      >
        <div>
          {props.data.role !== "participant" && (
            <p
              className={`text-aruna-dark/60 text-[8px] md:text-[10px] uppercase tracking-[6px] ${roboto.className}`}
            >
              {props.data.role === "groom"
                ? "Mempelai Pria"
                : props.data.role === "bride"
                ? "Mempelai Wanita"
                : null}
            </p>
          )}
        </div>
        <h1
          className={`text-xl md:text-2xl text-aruna-dark leading-6 tracking-[2px] relative mb-8 ${roboto.className} mt-4 md:mt-6`}
        >
          {props.data.name}
        </h1>
        <p
          className={`text-aruna-dark/60 text-[10px] md:text-xs tracking-[1px] mb-10 ${roboto.className}`}
        >
          {props.data.gender === "female" ? "Putri" : "Putra"}{" "}
          {props.data.child} dari pasangan
          <br />
          Bapak {props.data.parents_male} & Ibu {props.data.parents_female}
        </p>
        <p className={`text-aruna-dark text-xs md:text-sm ${roboto.className}`}>
          {props.data.address}
        </p>
        <div className="flex">
          <div className="flex items-center py-[6px] px-3 mt-8 gap-x-4 text-aruna-dark text-xl bg-aruna-dark/5">
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

export default memo(ParticipantsComponent);
