import React, { FC, memo } from "react";
import { raleway } from "@/lib/fonts";
import { Participant } from "@/lib/types";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import Image from "next/image";
import useParticipants from "@/hooks/themes/useParticipants";
import useClientStore from "@/store/useClientStore";
import CircularText from "../../circular.text";

const ParticipantsComponent = () => {
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();

  return (
    <section
      className={`py-[60px] md:py-[100px] bg-samaya-dark px-6 md:px-12 lg:px-4 ${raleway.className}`}
    >
      <h2
        data-aos="fade-up"
        className="text-white text-center leading-8 text-xl md:text-2xl xl:text-3xl font-tan-pearl"
      >
        {client?.opening_title}
      </h2>
      <p
        data-aos="fade-up"
        className="text-white/50 text-center tracking-[1px] text-[10px] lg:text-xs mt-4 max-w-lg mx-auto"
      >
        {client?.opening_description}
      </p>

      <div className="flex md:grid md:grid-cols-2 flex-col gap-8 md:gap-4 lg:gap-12 mt-20 max-w-screen-lg mx-auto">
        <ParticipantComponent
          data={participantState?.groom as Participant}
          index={0}
        />
        <ParticipantComponent
          data={participantState?.bride as Participant}
          index={1}
        />
      </div>
    </section>
  );
};

interface ComponentProps {
  data: Participant;
  index: number;
}

const ParticipantComponent: FC<ComponentProps> = memo(({ data, index }) => {
  const odd = index % 2 !== 0;

  return (
    <div>
      <div
        className="w-full aspect-[3/4] relative bg-white/5"
        data-aos="zoom-in"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-samaya-dark/30 via-transparent to-samaya-dark/80 z-10"></div>

        {/* Circular Text */}
        <div
          data-aos={odd ? "fade-up-right" : "fade-up-left"}
          className={`absolute top-0 w-10 h-10 flex justify-center items-center z-20 ${
            odd ? "right-2" : "left-2"
          }`}
        >
          <CircularText
            text={`the ${data?.role} the ${data?.role} `}
            onHover="slowDown"
            spinDuration={20}
            className={raleway.className}
          />
        </div>

        {/* Participant Image */}
        {data.image && (
          <Image
            quality={80} // optimize kualitas
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
            alt={`Foto Partisipan ${index + 1}`}
            src={data?.image as string}
            fill
            loading="lazy"
            className={`object-cover border-[4px] border-samaya-dark ${
              odd
                ? "rounded-tr-[100px] lg:rounded-tr-[200px]"
                : "rounded-tl-[100px] lg:rounded-tl-[200px]"
            }`}
          />
        )}

        {/* Participant Info */}
        <div className="absolute bottom-0 left-0 p-8 z-20">
          <p
            className={`${raleway.className} text-[10px] md:text-xs tracking-[2px] uppercase leading-5 text-white/80`}
          >
            Mempelai {data?.gender === "male" ? "Pria" : "Wanita"}
          </p>
          <h2 className="font-tan-pearl text-white text-xl md:text-2xl mt-4">
            {data?.name}
          </h2>
        </div>
      </div>

      {/* Parent Info */}
      <p
        data-aos="fade-up"
        className={`${raleway.className} ml-1 tracking-[1px] text-[10px] md:text-xs leading-4 text-white/50 mt-8`}
      >
        {data?.gender === "male" ? "Putra" : "Putri"} {data?.child} dari
        pasangan Bapak {data?.parents_male} dan Ibu {data?.parents_female}
      </p>

      {/* Social Links */}
      <div
        data-aos="fade-up"
        className="flex mt-6 ml-1 gap-x-4 text-samaya-primary text-base md:text-lg text-center"
      >
        {data?.facebook && (
          <Link
            aria-label="sosmed-facebook-link"
            target="_blank"
            href={data?.facebook}
          >
            <BiLogoFacebook />
          </Link>
        )}
        {data?.twitter && (
          <Link
            aria-label="sosmed-twitter-link"
            target="_blank"
            href={data?.twitter}
          >
            <BiLogoTwitter />
          </Link>
        )}
        {data?.instagram && (
          <Link
            aria-label="sosmed-instagram-link"
            target="_blank"
            href={data?.instagram}
          >
            <BiLogoInstagram />
          </Link>
        )}
        {data?.tiktok && (
          <Link
            aria-label="sosmed-tiktok-link"
            target="_blank"
            href={data?.tiktok}
          >
            <BiLogoTiktok />
          </Link>
        )}
      </div>
    </div>
  );
});

ParticipantComponent.displayName = "ParticipantComponent";

export default ParticipantsComponent;
