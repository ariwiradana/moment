import { rubik } from "@/lib/fonts";
import { Participant } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import { getParticipantNames } from "@/utils/getParticipantNames";
import { NextPage } from "next";
import Image from "next/image";
import { memo, useMemo } from "react";

const Opening: NextPage = () => {
  const { client } = useClientStore();

  const participantNames = useMemo(
    () => getParticipantNames(client?.participants as Participant[]),
    [client]
  );

  return (
    <section className="h-dvh snap-start w-full relative">
      <div className="absolute z-20 inset-0 bg-gradient-to-b from-luma-dark/0 to-luma-dark/70 flex flex-col justify-end items-center py-[60px] px-8">
        <h2 className="font-bigilla leading-[40px] text-white text-4xl mb-2">
          {client?.opening_title}
        </h2>
        <p
          className={`${rubik.className} text-[10px] md:text-xs font-light text-white text-center`}
        >
          {client?.opening_description}
        </p>
        <p
          className={`text-white/70 mt-6 text-[8px] md:text-[10px] uppercase text-center tracking-[3px] ${rubik.className}`}
        >
          {participantNames}
        </p>
      </div>
      <Image
        key={`Opening Image`}
        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
        fill
        quality={100}
        alt={`Opening Image`}
        priority
        className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark"
        src={client?.cover as string}
      />
    </section>
  );
};

export default memo(Opening);
