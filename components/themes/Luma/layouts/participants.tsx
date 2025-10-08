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
      {groom && <ParticipantItem data={groom} />}
      {bride && <ParticipantItem data={bride} />}
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
          className={`${rubik.className} text-white/70 mb-3 text-[8px] md:text-[10px] uppercase tracking-[3px]`}
        >
          Mempelai {data?.gender === "male" ? "Pria" : "Wanita"}
        </p>
        <h2
          className="font-bigilla text-white text-4xl md:text-5xl mb-4 leading-[40px] md:leading-[50px]"
          aria-label={`Nama mempelai ${data?.name}`}
        >
          {data?.name}
        </h2>
        <p
          className={`${rubik.className} text-[10px] md:text-xs mb-1 font-light text-white`}
          aria-label={`Informasi orang tua dari ${data?.name}`}
        >
          {data?.gender === "male" ? "Putra" : "Putri"} {data?.child} dari
          pasangan <br />
          Bapak {data?.parents_male} dan Ibu {data?.parents_female}
        </p>
        <div className="flex gap-x-5 text-white text-lg mt-6">
          {data?.facebook && (
            <Link
              aria-label={`Facebook ${data?.name}`}
              target="_blank"
              href={data?.facebook}
            >
              <BiLogoFacebook />
            </Link>
          )}
          {data?.twitter && (
            <Link
              aria-label={`Twitter ${data?.name}`}
              target="_blank"
              href={data?.twitter}
            >
              <BiLogoTwitter />
            </Link>
          )}
          {data?.instagram && (
            <Link
              aria-label={`Instagram ${data?.name}`}
              target="_blank"
              href={data?.instagram}
            >
              <BiLogoInstagram />
            </Link>
          )}
          {data?.tiktok && (
            <Link
              aria-label={`Tiktok ${data?.name}`}
              target="_blank"
              href={data?.tiktok}
            >
              <BiLogoTiktok />
            </Link>
          )}
        </div>
      </div>
      <Image
        key={`participant-image-${data?.name}`}
        src={data?.image as string}
        alt={`Foto mempelai ${data?.name}`}
        fill
        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
        quality={90}
        className="object-cover shimmer-dark transition-transform transform"
        priority={data?.role === "groom"} // prioritas untuk groom
        loading={data?.role !== "groom" ? "lazy" : "eager"} // lazy load untuk yang tidak hero
      />
    </section>
  );
};

export default memo(Participants);
