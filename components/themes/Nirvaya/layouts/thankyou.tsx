import React, { FC } from "react";
import { afacad, marcellus, windsong } from "@/lib/fonts";
import Image from "next/image";
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
  if (
    props.state.client?.closing_title &&
    props.state.client.closing_description
  )
    return (
      <section className="relative bg-samaya-dark py-8 md:py-16">
        <div
          className="absolute inset-0 opacity-20 bg-repeat bg-center bg-blend-lighten"
          style={{
            backgroundImage: "url('/images/samaya/texture.jpg')",
          }}
        ></div>
        <Image
          className="absolute -bottom-[250px] left-1/2 transform -translate-x-1/2 z-30 opacity-5"
          alt="mandala-bottom-participant"
          src="/images/samaya/mandala.svg"
          height={500}
          width={500}
        />
        <div className="max-w-screen-sm mx-auto px-4 py-16">
          <div className="flex justify-center w-full">
            <div className="w-96 h-[500px] md:h-[550px] relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-samaya-dark/20 to-samaya-dark z-10"></div>
              <Image
                className="rounded-3xl hover:scale-[0.99] transition-transform ease-in-out duration-500 object-cover"
                src={props.state.client.cover as string}
                alt={`thankyou-img`}
                fill
                priority
              />
            </div>
          </div>
          <p
            data-aos="fade-up"
            className={`${marcellus.className} text-sm md:text-lg text-center leading-5 text-white max-w-screen-md mx-auto -mt-8 relative z-20`}
          >
            {props.state.client?.closing_description}
          </p>

          <div className="flex justify-center my-4" data-aos="fade-up">
            <div className="w-[0.5px] h-8 bg-samaya-primary"></div>
          </div>
          <p
            data-aos="fade-up"
            className={`${marcellus.className} text-sm md:text-lg mt-6 text-white text-center`}
          >
            Kami yang berbahagia
          </p>
          <h1
            data-aos="fade-up"
            className={`${windsong.className} text-4xl text-center mt-8 leading-7 text-white font-medium mb-24`}
          >
            {props.state.groom?.nickname} & {props.state.bride?.nickname}
          </h1>
          <h1
            data-aos="fade-up"
            className={`${marcellus.className} text-3xl md:text-4xl text-center text-samaya-primary`}
          >
            {props.state.client.closing_title}
          </h1>
        </div>
        <ul
          className="flex flex-col justify-center gap-2 items-center relative z-30 mt-24"
          data-aos="zoom-in-up"
        >
          <li
            className={`flex items-center justify-center gap-2 text-base mt-2 text-white`}
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
          <li className="font-semibold text-white text-base flex items-center gap-x-1 z-30 relative">
            <span className={`${afacad.className} text-xs font-light`}>
              Designed with ❤️ by{" "}
              <Link target="_blank" href="/">
                Moment Invitations
              </Link>
            </span>
          </li>
        </ul>
      </section>
    );
};

export default ThankyouComponent;
