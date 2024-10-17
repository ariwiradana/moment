import React, { FC } from "react";
import { engagement, marcellus } from "@/lib/fonts";
import ImageShimmer from "../../../image.shimmer";
import Title from "../elements/title";
import { useSamaya } from "@/hooks/themes/useSamaya";
import { Participant } from "@/lib/types";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import Image from "next/image";

interface Props {
  state: useSamaya["state"];
}

const ParticipantsComponent: FC<Props> = (props) => {
  if (
    props.state.client?.participants &&
    props.state.client?.participants.length > 0
  )
    return (
      <section className="relative bg-samaya-dark z-10 pb-4 pt-16 md:py-16">
        <div className="w-full h-full px-6 md:px-12 relative z-40 max-w-screen-xl mx-auto">
          <div className="mb-8" data-aos="fade-up">
            <Title title={props.state.client?.opening_title as string} />
          </div>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className={`${marcellus.className} text-base md:text-lg text-center leading-5 text-white mb-12 max-w-screen-md mx-auto`}
          >
            {props.state.client?.opening_description}
          </p>

          <div className="grid lg:grid-cols-2 w-full gap-20 py-8">
            {props.state.groom && (
              <ParticipantComponent data={props.state?.groom as Participant} />
            )}
            {props.state.bride && (
              <ParticipantComponent data={props.state?.bride as Participant} />
            )}
          </div>
        </div>
      </section>
    );
};

interface ComponentProps {
  data: Participant;
}
const ParticipantComponent: FC<ComponentProps> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {props.data.image && (
        <div
          data-aos="zoom-in"
          className="relative w-[260px] aspect-square rounded-full"
        >
          <ImageShimmer
            height={260}
            width={260}
            priority
            sizes="260px"
            className="object-cover rounded-full aspect-square overflow-hidden"
            src={props.data.image as string}
            alt={props.data.name}
          />
          <Image
            data-aos="zoom-in-up"
            className="absolute inset-x-0 -top-5 z-20"
            alt="floral-top-corner"
            src="/images/samaya/circle-frame-image.svg"
            height={260}
            width={260}
          />
        </div>
      )}
      <h1
        data-aos="fade-up"
        className={`text-4xl lg:text-5xl font-semibold text-samaya-primary relative mt-10 ${engagement.className}`}
      >
        {props.data.name}
      </h1>
      <div className={`${marcellus.className} text-center`} data-aos="fade-up">
        {props.data.role !== "participant" && (
          <>
            <p className="text-gray-300 text-sm md:text-lg mt-4 capitalize font-italic">
              {props.data.gender === "female" ? "Putri" : "Putra"}{" "}
              {props.data.child} dari pasangan
            </p>
            <h2 className="text-base md:text-xl text-white mt-2">
              Bapak {props.data.parents_male} & Ibu {props.data.parents_female}
            </h2>
          </>
        )}
      </div>
      <div
        className="w-[1px] h-7 bg-samaya-primary my-3"
        data-aos="fade-up"
      ></div>
      <p
        className={`text-samaya-primary text-base md:text-xl ${marcellus.className}`}
        data-aos="fade-up"
      >
        {props.data.address}
      </p>
      <div
        className="flex mt-4 gap-x-2 text-samaya-primary text-2xl md:text-3xl"
        data-aos="fade-up"
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
  );
};

export default ParticipantsComponent;
