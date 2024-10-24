import React, { FC } from "react";
import { afacad, marcellus } from "@/lib/fonts";
import Image from "next/image";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Title from "../elements/title";
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
  if (
    props.state.client?.closing_title &&
    props.state.client.closing_description
  )
    return (
      <section className="px-4 py-8 relative bg-samaya-dark">
        <div className="flex justify-center">
          <div
            className="h-12 lg:h-16 aspect-video relative m-4"
            data-aos="zoom-in-up"
          >
            <Image
              fill
              alt="floral-top-corner"
              src="/images/samaya/leaf-primary.svg"
              className="object-contain"
            />
          </div>
        </div>
        <div className="max-w-screen-sm mx-auto">
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className={`${marcellus.className} text-sm md:text-lg text-center leading-5 text-white mb-12 max-w-screen-md mx-auto`}
          >
            {props.state.client?.closing_description}
          </p>
          <div data-aos="fade-up">
            <Title
              className="text-2xl mt-8"
              title={props.state.client?.closing_title as string}
            />
          </div>
          <div className="flex justify-center my-4" data-aos="fade-up">
            <div className="w-[0.5px] h-8 bg-samaya-primary"></div>
          </div>
          <p
            data-aos="fade-up"
            className={`${marcellus.className} text-sm md:text-lg mt-6 text-white text-center`}
          >
            Kami yang berbahagia
          </p>
          <p
            data-aos="fade-up"
            className={`${marcellus.className} text-base md:text-xl text-center mt-3 leading-7 text-white font-medium mb-8`}
          >
            Kel. Bapak {props.state.groom?.parents_male} <br /> & <br /> Kel.
            Bapak {props.state.bride?.parents_male}
          </p>
        </div>
        <ul
          className="flex flex-col justify-center gap-2 items-center relative z-30 mt-24"
          data-aos="zoom-in-up"
          data-aos-offset="20"
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
              Designed with ❤️ by Moment Invitations
            </span>
          </li>
        </ul>
      </section>
    );
};

export default ThankyouComponent;
