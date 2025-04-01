import React, { memo } from "react";
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
import usePhotos from "@/hooks/themes/usePhotos";
import Image from "next/image";

const ThankyouComponent = () => {
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();
  const {
    state: { images },
  } = usePhotos();
  return (
    <section className="relative flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-nirvaya-dark from-[5%] via-nirvaya-dark/80 to-nirvaya-dark/90 z-10"></div>
      <div className="absolute inset-0 grid grid-cols-2">
        {images.slice(0, 10).map((image, index) => (
          <div
            className="w-full h-[20vh] overflow-hidden bg-white/5 relative"
            key={`Foto Thankyou ${index + 1}`}
          >
            <Image
              src={image}
              alt={`Foto Thankyou ${index + 1}`}
              fill
              className="object-cover grayscale"
            />
          </div>
        ))}
      </div>
      <div className="max-w-screen-sm mx-auto py-[60px] h-svh md:py-[100px] px-8 flex flex-col justify-center relative z-30">
        <h1
          data-aos="fade-up"
          className="text-white text-center tracking-[2px] font-medium text-[10px] lg:text-xs uppercase mb-6"
        >
          {client?.closing_title}
        </h1>
        <p
          data-aos="fade-up"
          className={`text-white/50 mt-6 text-center tracking-[2px] max-w-xl mx-auto lg:text-xs text-[10px] my-16 ${raleway.className}`}
        >
          {client?.closing_description}
        </p>

        {client?.theme_category?.name === "Pernikahan" && (
          <>
            <p
              data-aos="fade-up"
              className={`text-white text-[8px] md:text-[10px] uppercase text-center tracking-[6px] ${raleway.className}`}
            >
              Kami Yang Berbahagia
            </p>
            <h1
              data-aos="fade-up"
              className="text-white text-center leading-8 text-4xl font-edensor mt-2"
            >
              {participantState.groom?.nickname}{" "}
              <span className="font-italic">dan </span>
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
                className={`${raleway.className} text-center uppercase text-white text-[8px] md:text-[10px] tracking-[2px]`}
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

export default memo(ThankyouComponent);
