import React, { FC } from "react";
import {  italiana, marcellus } from "@/lib/fonts";
import ImageShimmer from "../../../image.shimmer";
import { useSamaya } from "@/hooks/themes/useSamaya";
import { Participant } from "@/lib/types";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";

interface Props {
  state: useSamaya["state"];
}

const ParticipantsComponent: FC<Props> = (props) => {
  if (
    props.state.client?.participants &&
    props.state.client?.participants.length > 0
  )
    return (
      <section className="relative bg-white z-10">
        {props.state.groom && <ParticipantComponent data={props.state.groom} />}
        {props.state.bride && <ParticipantComponent data={props.state.bride} />}
      </section>
    );
};

interface ComponentProps {
  data: Participant;
}
const ParticipantComponent: FC<ComponentProps> = (props) => {
  return (
    <div
      className={`flex flex-col py-12 px-8 ${
        props.data.role === "groom"
          ? "bg-flora-primary/40"
          : "bg-flora-primary/60"
      }`}
    >
      {props.data.image && (
        <div className="relative w-full aspect-[3/4] shadow-lg self-center">
          <ImageShimmer
            fill
            priority
            sizes="311px"
            className="object-cover w-full h-full"
            src={props.data.image as string}
            alt={props.data.name}
          />
        </div>
      )}
      <p
        className={`${marcellus.className} uppercase mt-9 text-sm text-flora-dark/40 border-b border-b-flora-dark/20 pb-1`}
      >
        The Groom
      </p>
      <h1
        className={`text-[28px] text-flora-dark relative mt-3 ${italiana.className}`}
      >
        {props.data.name}
      </h1>
      <div
        className={`${marcellus.className} mt-4 mb-6 border-b border-b-flora-dark/20 pb-6`}
      >
        {props.data.role !== "participant" && (
          <>
            <p className="text-xs text-flora-dark/40 mb-1">
              {props.data.gender === "female" ? "Putri" : "Putra"}{" "}
              {props.data.child} dari pasangan
            </p>
            <h2 className="text-sm text-flora-dark">
              Bapak {props.data.parents_male} & Ibu {props.data.parents_female}
            </h2>
          </>
        )}
      </div>
      <div className="flex gap-x-2 text-flora-dark text-lg">
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
  );
};

export default ParticipantsComponent;
