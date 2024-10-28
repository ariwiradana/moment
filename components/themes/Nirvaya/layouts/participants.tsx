import React, { FC } from "react";
import { engagement, marcellus } from "@/lib/fonts";
import ImageShimmer from "../../../image.shimmer";
import { useNirvaya } from "@/hooks/themes/useNirvaya";
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
  state: useNirvaya["state"];
}

const ParticipantsComponent: FC<Props> = (props) => {
  if (
    props.state.client?.participants &&
    props.state.client?.participants.length > 0
  )
    return (
      <section className="relative bg-samaya-dark z-10 py-16 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-repeat bg-center bg-cover bg-blend-lighten"
          style={{
            backgroundImage: "url('/images/samaya/texture.jpg')",
          }}
        ></div>
        <Image
          className="absolute -bottom-[250px] left-1/2 transform -translate-x-1/2 z-30 opacity-5"
          alt="mandala-bottom-participant"
          src="/images/samaya/mandala.svg"
          height={500}
          width={500}
        />

        <div className="w-full h-full px-4 md:px-12 relative z-40 max-w-screen-xl mx-auto">
          <h1
            data-aos="fade-up"
            className={`${marcellus.className} text-3xl md:text-4xl text-center text-samaya-primary`}
          >
            {props.state.client.opening_title}
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className={`${marcellus.className} text-sm md:text-lg text-center leading-5 text-white mt-8 mb-12 max-w-screen-md mx-auto`}
          >
            {props.state.client?.opening_description}
          </p>

          <div className="grid md:grid-cols-2 w-full gap-20 pt-8">
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
        <div data-aos="zoom-in" className="relative w-[277px] h-[368px]">
          <ImageShimmer
            fill
            priority
            sizes="600px"
            className="object-cover w-full h-full overflow-hidden p-[10px]"
            src={props.data.image as string}
            alt={props.data.name}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <Image
            className="absolute inset-0 z-30 transform scale-[1.03]"
            alt="floral-top-corner"
            src="/images/samaya/frame-primary.svg"
            height={277}
            width={368}
          />
        </div>
      )}
      <h1
        data-aos="fade-up"
        className={`text-4xl font-semibold text-samaya-primary relative mt-10 ${engagement.className}`}
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
            <h2 className="text-sm md:text-lg text-white mt-2">
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
        className={`text-samaya-primary text-sm md:text-lg text-center ${marcellus.className}`}
        data-aos="fade-up"
      >
        {props.data.address}
      </p>
      <div
        className="flex mt-4 gap-x-6 text-samaya-primary text-xl md:text-2xl text-center"
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
