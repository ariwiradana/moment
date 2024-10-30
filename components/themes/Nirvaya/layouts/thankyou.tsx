import React, { FC } from "react";
import { balthazar, italiana } from "@/lib/fonts";
import { useNirvaya } from "@/hooks/themes/useNirvaya";
import Link from "next/link";
import { sosmedURLs } from "@/constants/sosmed";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";

interface Props {
  state: useNirvaya["state"];
}

const ThankyouComponent: FC<Props> = (props) => {
  return (
    <section className="relative flex flex-col justify-center bg-gradient-to-b from-nirvaya-dark via-[20%] via-nirvaya-dark/50 to-[80%] to-nirvaya-dark">
      <div className="max-w-screen-sm mx-auto py-[60px] md:py-[100px] px-8 h-dvh flex flex-col justify-center">
        <h1
          data-aos="fade-up"
          className={`${italiana.className} text-4xl md:text-5xl text-center text-white`}
        >
          {props.state.client?.closing_title}
        </h1>
        <p
          data-aos="fade-up"
          className={`${balthazar.className} mt-8 md:mt-12 text-sm md:text-base text-white text-center max-w-screen-sm mx-auto`}
        >
          {props.state.client?.closing_description}
        </p>

        <p
          data-aos="fade-up"
          className={`${balthazar.className} text-white md:text-base text-sm mt-12 md:mt-16 uppercase text-center`}
        >
          Kami Yang Berbahagia
        </p>
        <h1
          data-aos="fade-up"
          className={`${italiana.className} text-white text-center text-[40px] md:text-5xl`}
        >
          {props.state.groom?.nickname} & {props.state.bride?.nickname}
        </h1>
        <ul
          data-aos="zoom-in-up"
          className="flex flex-col justify-center gap-2 items-center relative z-30 mt-[100px]"
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
                className={`${balthazar.className} text-center text-white text-xs md:text-sm`}
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
