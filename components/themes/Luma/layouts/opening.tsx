import { rubik } from "@/lib/fonts";
import { Participant } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import { getParticipantNames } from "@/utils/getParticipantNames";
import { NextPage } from "next";
import { memo, useMemo } from "react";

const Opening: NextPage = () => {
  const { client } = useClientStore();

  const participantNames = useMemo(
    () => getParticipantNames(client?.participants as Participant[]),
    [client]
  );

  return (
    <section className="h-dvh snap-start w-full relative">
      <div className="absolute z-20 inset-0 bg-gradient-to-b from-luma-dark/60 via-luma-dark/60 to-luma-dark/70 flex flex-col justify-end items-center py-[60px] px-8">
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
    </section>
  );
};

export default memo(Opening);
