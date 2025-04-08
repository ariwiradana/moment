import useParticipants from "@/hooks/themes/useParticipants";
import { rubik } from "@/lib/fonts";
import { Participant } from "@/lib/types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";

const Participants: NextPage = () => {
  const {
    state: { bride, groom },
  } = useParticipants();

  return (
    <>
      <ParticipantItem data={groom as Participant} />
      <ParticipantItem data={bride as Participant} />
    </>
  );
};

interface ParticipantProps {
  data: Participant;
}
const ParticipantItem = ({ data }: ParticipantProps) => {
  return (
    <section className="h-dvh snap-start w-full bg-luma-dark relative">
      <div className="absolute z-20 inset-0 bg-gradient-to-b from-luma-dark/0 to-luma-dark/70 flex flex-col justify-end py-[60px] px-8">
        <p
          className={`text-white/70 mb-3 text-[8px] md:text-[10px] uppercase tracking-[3px] ${rubik.className}`}
        >
          Mempelai {data.gender === "male" ? "Pria" : "Wanita"}
        </p>
        <h2 className="font-bigilla leading-[40px] text-white text-4xl mb-4">
          {data?.name}
        </h2>
        <p
          className={`${rubik.className} text-[10px] md:text-xs mb-1 font-light text-white`}
        >
          {data.gender === "male" ? "Putra" : "Putri"} {data?.child} dari
          pasangan <br />
          Bapak {data?.parents_male} dan Ibu {data?.parents_female}
        </p>
        <div className={`flex gap-x-5 text-white text-lg mt-6`}>
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
      <Image
        key={`Opening Image`}
        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
        fill
        quality={100}
        alt={`${data.role} Image`}
        priority
        className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark"
        src={data?.image as string}
      />
    </section>
  );
};

export default memo(Participants);
