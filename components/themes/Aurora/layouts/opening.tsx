import { rubik } from "@/lib/fonts";
import { Participant } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import { getParticipantNames } from "@/utils/getParticipantNames";
import { NextPage } from "next";
import { memo, useMemo } from "react";

const Opening: NextPage = () => {
  const { client } = useClientStore();

  const participantNames = useMemo(
    () => getParticipantNames((client?.participants as Participant[]) || []),
    [client?.participants]
  );

  return (
    <section className="h-dvh snap-start w-full relative">
      <div className="absolute inset-0 z-20 flex flex-col justify-end items-center py-[60px] px-6 bg-gradient-to-b from-luma-dark/50 via-luma-dark/30 to-luma-dark/60">
        <h2
          className="font-butler text-white text-4xl md:text-5xl mb-2 leading-[40px] md:leading-[50px]"
          aria-label={client?.opening_title}
        >
          {client?.opening_title}
        </h2>
        <p
          className={`${rubik.className} text-[10px] md:text-xs font-light text-white text-center`}
          aria-label={client?.opening_description}
        >
          {client?.opening_description}
        </p>
        {participantNames && (
          <p
            className={`text-white/70 mt-6 text-[8px] md:text-[10px] uppercase text-center tracking-[3px] ${rubik.className}`}
            aria-label={`Peserta: ${participantNames}`}
          >
            {participantNames}
          </p>
        )}
      </div>
    </section>
  );
};

export default memo(Opening);
