import React, { FC, memo, useMemo } from "react";
import { roboto } from "@/lib/fonts";
import { Participant } from "@/lib/types";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import { getEventNames } from "@/utils/getEventNames";
import useClientStore from "@/store/useClientStore";
import useParticipants from "@/hooks/themes/useParticipants";
import Image from "next/image";

const ParticipantsComponent = () => {
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();

  const extraParticipants = useMemo(
    () =>
      client?.participants.filter(
        (p) => p.role !== "bride" && p.role !== "groom"
      ) || [],
    [client?.participants]
  );

  return (
    <section
      style={{ marginTop: 0 }}
      className="relative z-10 bg-aruna-dark px-6 pb-[60px] md:pb-[100px]"
    >
      <div className="relative flex flex-col items-center gap-12">
        {participantState.groom && (
          <MemoizedParticipant
            index={0}
            role="mempelai"
            data={participantState.groom}
          />
        )}
        {participantState.bride && (
          <MemoizedParticipant
            index={1}
            role="mempelai"
            data={participantState.bride}
          />
        )}
        {extraParticipants.map((participant, i) => (
          <MemoizedParticipant
            key={participant.id}
            index={i + 2}
            role={getEventNames(client?.events || [])}
            data={participant}
          />
        ))}
      </div>
    </section>
  );
};

interface ComponentProps {
  data: Participant;
  role: string;
  index: number;
}

const ParticipantComponent: FC<ComponentProps> = ({ data, index }) => {
  const odd = index % 2 !== 0;

  const socials = useMemo(() => {
    return [
      { icon: BiLogoFacebook, url: data.facebook },
      { icon: BiLogoTwitter, url: data.twitter },
      { icon: BiLogoInstagram, url: data.instagram },
      { icon: BiLogoTiktok, url: data.tiktok },
    ].filter((s) => s.url);
  }, [data.facebook, data.twitter, data.instagram, data.tiktok]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center relative">
      <div
        className="w-full aspect-square relative rounded-2xl overflow-hidden"
        data-aos={odd ? "fade-right" : "fade-left"}
      >
        {data.image && (
          <Image
            src={data.image as string}
            fill
            alt={data.name}
            className="object-cover rounded-2xl shimmer-dark"
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
            quality={70}
            loading="lazy"
          />
        )}
      </div>

      <div
        className={`bg-white z-20 p-8 w-full rounded-2xl`}
        data-aos={odd ? "fade-left" : "fade-right"}
      >
        {data.role !== "participant" && (
          <p
            className={`text-aruna-dark/60 text-[8px] md:text-[10px] uppercase tracking-[6px] ${roboto.className}`}
          >
            {data.role === "groom"
              ? "Mempelai Pria"
              : data.role === "bride"
              ? "Mempelai Wanita"
              : null}
          </p>
        )}
        <h1
          className={`text-xl md:text-2xl text-aruna-dark leading-6 tracking-[2px] relative mb-4 ${roboto.className} mt-4 md:mt-6`}
        >
          {data.name}
        </h1>
        <p
          className={`text-aruna-dark/60 text-[10px] md:text-xs tracking-[1px] mb-6 ${roboto.className}`}
        >
          {data.gender === "female" ? "Putri" : "Putra"} {data.child} dari
          pasangan <br />
          Bapak {data.parents_male} & Ibu {data.parents_female}
        </p>
        <p className={`text-aruna-dark text-xs md:text-sm ${roboto.className}`}>
          {data.address}
        </p>
        {socials.length > 0 && (
          <div className="inline-flex py-[6px] px-3 mt-6 gap-x-4 text-aruna-dark text-xl bg-aruna-dark/5">
            {socials.map((s, idx) => (
              <Link
                key={idx}
                target="_blank"
                href={s.url!}
                aria-label={`sosmed-link-${idx}`}
              >
                <s.icon />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MemoizedParticipant = memo(ParticipantComponent);

export default memo(ParticipantsComponent);
