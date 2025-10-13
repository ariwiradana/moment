import React, { memo } from "react";
import useEvents from "@/hooks/themes/useEvents";
import useParticipants from "@/hooks/themes/useParticipants";
import useClientStore from "@/store/useClientStore";
import { raleway } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import { Participant } from "@/lib/types";

const Participants = () => {
  const { client } = useClientStore();
  const { state: eventState } = useEvents();
  const { state: participantState } = useParticipants();

  return (
    <section className={`bg-nirvaya-light-brown ${raleway.className}`}>
      <div className="py-16 px-8 max-w-screen-lg mx-auto">
        <p
          data-aos="fade-up"
          className="text-nirvaya-dark/50 text-center tracking-[2px] font-medium text-[10px] lg:text-xs uppercase"
        >
          {client?.opening_title}
        </p>
        <h2
          data-aos="fade-up"
          className="text-nirvaya-dark text-center leading-8 text-4xl font-edensor mt-4"
        >
          Selamat Datang di Acara{" "}
          {eventState.events.length > 0 && (
            <span
              className={`transition-all ease-in-out duration-500 transform italic ${
                eventState.fade
                  ? "opacity-100 translate-y-0"
                  : "opacity-10 translate-y-3"
              }`}
            >
              {eventState.events[eventState.currentIndex].name}
            </span>
          )}
        </h2>
        <p
          data-aos="fade-up"
          className="text-nirvaya-dark/50 my-6 text-center tracking-[2px] font-medium text-[10px] lg:text-xs uppercase"
        >
          {participantState.groom?.nickname} &{" "}
          {participantState.bride?.nickname}
        </p>
        <p
          data-aos="fade-up"
          className="text-nirvaya-dark/50 mt-6 text-center tracking-[2px] max-w-xl mx-auto lg:text-xs text-[10px]"
        >
          {client?.opening_description}
        </p>

        <div className="flex flex-col lg:flex-row mt-16 gap-16">
          {client?.participants.map((participant, index) => (
            <ParticipantItem
              key={`Participant ${participant.name}`}
              participant={participant}
              order={index % 2 !== 0 ? "odd" : "even"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ParticipantItem = ({
  participant,
  order = "odd",
}: {
  participant: Participant;
  order: "odd" | "even";
}) => {
  return (
    <div>
      <div
        data-aos="zoom-out-up"
        className={`w-full h-[430px] lg:h-[500px] relative drop-shadow-xl overflow-hidden ${
          order === "odd"
            ? "rounded-tl-[150px] rounded-br-[150px]"
            : "rounded-tr-[150px] rounded-bl-[150px]"
        }`}
      >
        {participant.image && (
          <Image
            priority={
              participant.role === "groom" || participant.role === "bride"
            }
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
            alt={`Participant ${participant.nickname}`}
            src={participant.image as string}
            fill
            className={`object-cover bg-nirvaya-dark/5 ${
              order === "odd"
                ? "rounded-tl-[150px] rounded-br-[150px]"
                : "rounded-tr-[150px] rounded-bl-[150px]"
            }`}
          />
        )}
      </div>

      <div className={`mt-8 ${order === "odd" ? "text-left" : "text-right"}`}>
        <p
          data-aos="fade-up"
          className="text-nirvaya-dark/50 tracking-[2px] font-medium text-[10px] lg:text-xs uppercase"
        >
          {participant?.role === "groom"
            ? "Mempelai Pria"
            : participant.role === "bride"
            ? "Mempelai Wanita"
            : participant.role}
        </p>
        <h3
          data-aos="fade-up"
          className="font-edensor text-4xl leading-8 text-nirvaya-dark mt-9"
        >
          {participant.name}
        </h3>
        <p
          data-aos="fade-up"
          className="text-nirvaya-dark/50 tracking-[2px] text-[10px] lg:text-xs mt-3"
        >
          {participant.role === "groom"
            ? "Putra"
            : participant.role === "bride"
            ? "Putri"
            : ""}{" "}
          {participant.child} dari pasangan Bapak {participant.parents_male} dan
          Ibu {participant.parents_female}
        </p>

        <div
          data-aos="fade-up"
          className={`flex mt-9 gap-x-5 text-nirvaya-dark/50 text-xl ${
            order === "odd" ? "justify-start" : "justify-end"
          }`}
        >
          {participant.facebook && (
            <Link
              aria-label="sosmed-facebook-link"
              target="_blank"
              href={participant.facebook}
            >
              <BiLogoFacebook />
            </Link>
          )}
          {participant.twitter && (
            <Link
              aria-label="sosmed-twitter-link"
              target="_blank"
              href={participant.twitter}
            >
              <BiLogoTwitter />
            </Link>
          )}
          {participant.instagram && (
            <Link
              aria-label="sosmed-instagram-link"
              target="_blank"
              href={participant.instagram}
            >
              <BiLogoInstagram />
            </Link>
          )}
          {participant.tiktok && (
            <Link
              aria-label="sosmed-tiktok-link"
              target="_blank"
              href={participant.tiktok}
            >
              <BiLogoTiktok />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Participants);
