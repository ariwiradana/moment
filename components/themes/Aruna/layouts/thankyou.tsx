import React from "react";
import { roboto } from "@/lib/fonts";
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

const ThankyouComponent = () => {
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();
  return (
    <section className="relative flex flex-col justify-center bg-gradient-to-b from-aruna-dark via-[20%] via-aruna-dark/50 to-[80%] to-aruna-dark/90">
      <div className="max-w-screen-sm mx-auto py-[60px] h-svh md:py-[100px] px-8 flex flex-col justify-center">
        <h1
          data-aos="fade-up"
          className={`font-high-summit text-4xl md:text-5xl text-white mb-8 text-center`}
        >
          {client?.closing_title}
        </h1>
        <p
          data-aos="fade-up"
          className={`${roboto.className} text-xs md:text-sm text-center text-white/80 max-w-screen-sm my-8`}
        >
          {client?.closing_description}
        </p>

        {client?.theme_category?.name === "Pernikahan" && (
          <>
            <p
              data-aos="fade-up"
              className={`text-white/60 text-[8px] md:text-[10px] uppercase text-center tracking-[6px] ${roboto.className}`}
            >
              Kami Yang Berbahagia
            </p>
            <h1
              data-aos="fade-up"
              className={`font-high-summit text-white text-center text-4xl md:text-4xl mt-4`}
            >
              {participantState.groom?.nickname} &{" "}
              {participantState.bride?.nickname}
            </h1>
          </>
        )}
        <ul
          data-aos="zoom-in-up"
          className="flex flex-col justify-center gap-2 items-center relative z-30 mt-[100px] justify-self-end"
        >
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
                className={`${roboto.className} text-center uppercase text-white/60 text-[8px] md:text-[10px] tracking-[2px]`}
              >
                Undangan Digital © 2024 | Moment Invitation
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ThankyouComponent;
