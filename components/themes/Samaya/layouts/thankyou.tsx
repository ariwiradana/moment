import React, { FC } from "react";
import { balthazar, italiana, marcellus, windsong } from "@/lib/fonts";
import Image from "next/image";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Link from "next/link";
import { sosmedURLs } from "@/constants/sosmed";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";

interface Props {
  state: useSamaya["state"];
}

const ThankyouComponent: FC<Props> = (props) => {
  return (
    <section className="relative bg-gradient-to-b from-samaya-dark/70 to-samaya-dark to-[90%] z-20">
      <div className="max-w-screen-sm mx-auto px-4 py-16">
        <div className="flex justify-center w-full">
          <div className="w-96 h-[500px] md:h-[550px] relative">
            {props.state.client?.cover && (
              <Image
                className="rounded-3xl hover:scale-[0.99] transition-transform ease-in-out duration-500 object-cover"
                src={props.state.client?.cover as string}
                alt={`thankyou-img`}
                fill
                priority
              />
            )}
          </div>
        </div>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className={`${marcellus.className} text-sm md:text-base text-center leading-5 text-white max-w-screen-md mx-auto mt-12`}
        >
          {props.state.client?.closing_description}
        </p>

        <div className="flex justify-center my-4" data-aos="fade-up">
          <div className="w-[0.5px] h-8 bg-samaya-primary"></div>
        </div>
        <p
          data-aos="fade-up"
          className={`${marcellus.className} text-sm md:text-base text-white text-center`}
        >
          Kami yang berbahagia
        </p>
        <h1
          data-aos="fade-up"
          className={`${windsong.className} text-4xl md:text-5xl text-center mt-8 leading-7 text-white font-medium mb-24`}
        >
          {props.state.groom?.nickname} & {props.state.bride?.nickname}
        </h1>
        <h1
          data-aos="fade-up"
          className={`${italiana.className} text-4xl md:text-5xl text-center text-samaya-primary`}
        >
          {props.state.client?.closing_title}
        </h1>
      </div>
      <ul
        className="flex flex-col justify-center gap-2 items-center relative z-30 pb-12 mt-24"
        data-aos="zoom-in-up"
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
    </section>
  );
};

export default ThankyouComponent;
