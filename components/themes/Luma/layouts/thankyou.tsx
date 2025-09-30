import React, { memo } from "react";
import { rubik } from "@/lib/fonts";
import Link from "next/link";
import { sosmedURLs } from "@/constants/sosmed";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";
import useClientStore from "@/store/useClientStore";
import useParticipants from "@/hooks/themes/useParticipants";
import { BiMusic } from "react-icons/bi";

const ThankyouComponent = () => {
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();
  return (
    <section className="h-dvh snap-start w-full overflow-hidden relative flex flex-col justify-center">
      <div className="absolute inset-0 bg-luma-dark/80 z-10"></div>
      <div className="max-w-screen-sm mx-auto py-[60px] h-svh md:py-[100px] px-8 flex flex-col justify-center relative z-30">
        <p
          className={`text-white mt-4 text-xs md:text-sm uppercase tracking-[3px] text-center ${rubik.className}`}
        >
          {client?.closing_title}
        </p>

        <p
          className={`mt-6 text-center max-w-xl mx-auto text-[10px] md:text-xs font-light text-white my-16 ${rubik.className}`}
        >
          {client?.closing_description}
        </p>

        {client?.theme_category?.name === "Pernikahan" && (
          <>
            <p
              className={`text-white/70 mt-4 text-[8px] md:text-[10px] uppercase tracking-[3px] text-center ${rubik.className}`}
            >
              Kami Yang Berbahagia
            </p>
            <h1 className="font-bigilla leading-[40px] text-white text-5xl mb-3 mt-5 text-center">
              {participantState.groom?.nickname} <br />&{" "}
              {participantState.bride?.nickname}
            </h1>
          </>
        )}
        <ul className="flex flex-col justify-center gap-2 items-center relative z-30 mt-[100px] justify-self-end">
          <li
            className={`flex items-center justify-center gap-2 text-base text-white mt-2`}
          >
            <Link
              aria-label="footer-whatsapp-link"
              target="_blank"
              href={sosmedURLs.whatsapp}
            >
              <AiOutlineWhatsApp />
            </Link>
            <Link
              aria-label="footer-instagram-link"
              target="_blank"
              href={sosmedURLs.instagram}
            >
              <AiOutlineInstagram />
            </Link>
            <Link
              aria-label="footer-email-link"
              target="_blank"
              href={sosmedURLs.email}
            >
              <AiOutlineMail />
            </Link>
            <Link
              aria-label="footer-youtube-link"
              target="_blank"
              href={sosmedURLs.youtube}
            >
              <AiOutlineYoutube />
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/" target="_blank">
              <p
                className={`${rubik.className} text-center uppercase text-white text-[8px] md:text-[10px] tracking-[2px]`}
              >
                Undangan Digital © 2024 | Moment Invitation
              </p>
            </Link>
          </li>
          {client?.music_title && (
            <li>
              <div
                className={`flex justify-center items-center gap-x-2 ${rubik.className} text-center uppercase text-white text-[8px] md:text-[10px] tracking-[2px]`}
              >
                <BiMusic className="animate-pulse" />
                <p>{client?.music_title}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default memo(ThankyouComponent);
