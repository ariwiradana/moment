import React from "react";
import { raleway } from "@/lib/fonts";
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
import Image from "next/image";
import { BiMusic } from "react-icons/bi";

const ThankyouComponent = () => {
  const { client } = useClientStore();
  const { state } = useParticipants();

  return (
    <section className="relative bg-samaya-dark z-20">
      {/* Cover Image */}
      <div className="max-w-screen-sm mx-auto px-6 md:px-12 lg:px-4 py-[60px] md:py-[100px]">
        {client?.cover && (
          <div data-aos="fade-up" className="flex justify-center">
            <div className="relative w-[80vw] md:w-[400px] aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-samaya-dark z-10 to-[90%]"></div>
              <Image
                sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                alt="Foto Cover Last"
                fill
                priority
                className="object-cover transform bg-white/5 translate-y-0 lg:translate-y-0 transition-transform"
                src={client?.cover as string}
              />
            </div>
          </div>
        )}

        {/* Closing Description */}
        <p
          data-aos="fade-up"
          className={`${raleway.className} text-white/50 text-center tracking-[1px] text-[10px] lg:text-xs mt-12 max-w-lg mx-auto`}
        >
          {client?.closing_description}
        </p>

        {/* Closing Title */}
        <h1
          data-aos="fade-up"
          className={`${raleway.className} text-[10px] md:text-xs text-center mt-8 tracking-[2px] uppercase leading-5 text-white/80`}
        >
          {client?.closing_title}
        </h1>

        {/* Bride & Groom */}
        <p
          data-aos="fade-up"
          className={`${raleway.className} text-[10px] md:text-xs text-center mt-20 lg:mt-32 tracking-[2px] uppercase leading-5 text-white/80`}
        >
          Kami Yang Berbahagia
        </p>
        <h1
          data-aos="fade-up"
          className="font-tan-pearl text-2xl md:text-3xl xl:text-4xl text-center mt-4 leading-7 text-white font-medium mb-24"
        >
          {state.groom?.nickname} & {state.bride?.nickname}
        </h1>
      </div>

      {/* Sosial Media & Footer */}
      <ul
        className="flex flex-col justify-center gap-2 items-center relative z-30 pb-12 mt-24"
        data-aos="zoom-in-up"
      >
        <li className="flex items-center justify-center gap-2 text-base text-white mt-2">
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

        {/* Footer Text */}
        <li className="mt-2">
          <Link href="/" target="_blank">
            <p
              className={`${raleway.className} text-center text-white text-[10px] md:text-xs`}
            >
              Undangan Digital © 2025 | Moment Invitation
            </p>
          </Link>
        </li>

        {/* Music Info */}
        {client?.music_title && (
          <li>
            <div
              className={`${raleway.className} flex justify-center items-center gap-x-2 text-center uppercase text-white text-[8px] md:text-[10px] tracking-[2px]`}
            >
              <BiMusic className="animate-pulse" />
              <p>{client?.music_title}</p>
            </div>
          </li>
        )}
      </ul>
    </section>
  );
};

export default ThankyouComponent;
