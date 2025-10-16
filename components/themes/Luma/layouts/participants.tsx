import useParticipants from "@/hooks/themes/useParticipants";
import { rubik } from "@/lib/fonts";
import { Participant } from "@/lib/types";
import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import { NextPage } from "next";
import CurvedLoop from "../elements/curved.loop.text";

const Participants: NextPage = () => {
  const {
    state: { bride, groom },
  } = useParticipants();

  // Memoize participant list supaya tidak dire-render terus
  const participants = useMemo(
    () => [groom, bride].filter(Boolean),
    [groom, bride]
  );

  return (
    <>
      {participants.map((p) => (
        <ParticipantItem key={p?.name} data={p!} />
      ))}
    </>
  );
};

interface ParticipantProps {
  data: Participant;
}

const ParticipantItem = memo(({ data }: ParticipantProps) => {
  return (
    <section className="h-dvh snap-start w-full relative">
      <CurvedLoop
        marqueeText={`The ✦ ${data.gender === "male" ? "Groom" : "Bride"}`}
        speed={2}
        curveAmount={100}
        direction={data.gender === "male" ? "right" : "left"}
        interactive={false}
      />

      <div className="absolute z-20 inset-0 bg-gradient-to-b from-transparent to-luma-dark/50 lg:from-luma-dark/50 lg:to-luma-dark/50 flex flex-col justify-end py-[60px] px-8">
        <div className="lg:m-auto flex items-end gap-x-8">
          <div className="h-[70vh] hidden lg:block aspect-[4/5] relative">
            <Image
              src={data.image as string}
              alt={`Foto desktop mempelai ${data.name}`}
              fill
              className="object-cover shimmer-dark transition-transform transform hover:scale-105 duration-500 ease-in-out"
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80} // tetap tajam tapi lebih ringan
              priority={data.role === "groom"}
              loading={data.role !== "groom" ? "lazy" : "eager"}
            />
          </div>
          <div className="mb-8">
            <p
              className={`${rubik.className} text-white/70 mb-3 text-[8px] md:text-[10px] lg:text-base uppercase tracking-[3px]`}
            >
              Mempelai {data.gender === "male" ? "Pria" : "Wanita"}
            </p>
            <h2
              className="font-bigilla text-white text-4xl md:text-5xl lg:text-7xl mb-4 leading-[36px] md:leading-[50px]"
              aria-label={`Nama mempelai ${data.name}`}
            >
              {data.name}
            </h2>
            <p
              className={`${rubik.className} text-[10px] md:text-xs lg:text-sm mb-1 font-light text-white`}
              aria-label={`Informasi orang tua dari ${data.name}`}
            >
              {data.gender === "male" ? "Putra" : "Putri"} {data.child} dari
              pasangan <br />
              Bapak {data.parents_male} dan Ibu {data.parents_female}
            </p>
            <div className="flex gap-x-5 text-white text-xl lg:text-2xl mt-6">
              {data.facebook && (
                <Link
                  aria-label={`Facebook ${data.name}`}
                  target="_blank"
                  href={data.facebook}
                >
                  <BiLogoFacebook />
                </Link>
              )}
              {data.twitter && (
                <Link
                  aria-label={`Twitter ${data.name}`}
                  target="_blank"
                  href={data.twitter}
                >
                  <BiLogoTwitter />
                </Link>
              )}
              {data.instagram && (
                <Link
                  aria-label={`Instagram ${data.name}`}
                  target="_blank"
                  href={data.instagram}
                >
                  <BiLogoInstagram />
                </Link>
              )}
              {data.tiktok && (
                <Link
                  aria-label={`Tiktok ${data.name}`}
                  target="_blank"
                  href={data.tiktok}
                >
                  <BiLogoTiktok />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Image
        src={data.image as string}
        alt={`Foto mempelai ${data.name}`}
        fill
        className="object-cover shimmer-dark transition-transform transform lg:grayscale lg:hidden block lg:opacity-50"
        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={80} // tetap tajam tapi lebih ringan
        priority={data.role === "groom"}
        loading={data.role !== "groom" ? "lazy" : "eager"}
      />
    </section>
  );
});

ParticipantItem.displayName = "ParticipantItem";

export default memo(Participants);
