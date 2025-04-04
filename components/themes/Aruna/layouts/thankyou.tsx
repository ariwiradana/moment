import React, { memo } from "react";
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
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import { BiMusic } from "react-icons/bi";

const ThankyouComponent = () => {
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();

  const settings: Settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 6000,
    speed: 3000,
    cssEase: "ease-in-out",
  };
  return (
    <section className="relative flex flex-col justify-center">
      <div className="absolute inset-0 bg-aruna-dark/80 z-10"></div>
      <div className="absolute inset-0 z-0">
        <Slider {...settings} className="h-svh">
          {Array.isArray(client?.gallery) && client?.gallery.length > 0
            ? client.gallery
                .filter(
                  (image) => image !== client?.cover && image !== client?.seo
                )
                .map((image, index) => (
                  <Image
                    key={`thankyou-img-${index}`}
                    fill
                    quality={100}
                    alt={`thankyou-img-${index}`}
                    priority
                    sizes="100vw"
                    className="object-cover shine-dark transform translate-y-0 lg:translate-y-0 transition-transform grayscale"
                    src={image}
                  />
                ))
            : null}
        </Slider>
      </div>
      <div className="max-w-screen-sm mx-auto py-[60px] h-svh md:py-[100px] px-6 flex flex-col justify-center relative z-30">
        <h1
          data-aos="fade-up"
          className={`font-high-summit text-3xl md:text-4xl text-white mb-8 text-center`}
        >
          {client?.closing_title}
        </h1>
        <p
          data-aos="fade-up"
          className={`${roboto.className} text-[10px] md:text-xs tracking-[1px] text-center text-white/80 max-w-screen-sm my-8`}
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
          {client?.music_title && (
            <li>
              <div
                className={`flex justify-center items-center gap-x-2 ${roboto.className} text-center uppercase text-white text-[8px] md:text-[10px] tracking-[2px]`}
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
