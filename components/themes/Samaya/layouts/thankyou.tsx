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
import { Swiper, SwiperSlide } from "swiper/react";
import usePhotos from "@/hooks/themes/usePhotos";
import { Autoplay, EffectCube } from "swiper/modules";
import Image from "next/image";

const ThankyouComponent = () => {
  const { client } = useClientStore();
  const { state } = useParticipants();
  const {
    state: { images },
  } = usePhotos();

  return (
    <section className="relative bg-samaya-dark z-20">
      <div className="max-w-screen-sm mx-auto px-6 md:px-12 lg:px-4 py-[60px] md:py-[100px]">
        <div className="flex justify-center w-full" data-aos="zoom-out">
          <Swiper
            loop
            effect="cube"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={2000}
            className="w-96 h-[500px] md:h-[550px]"
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, EffectCube]}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide
                className="relative w-full h-full"
                key={`thankyou-img-${index}`}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    fill
                    alt={`hero-img-${index}`}
                    priority
                    sizes="600px"
                    className="object-cover transform bg-white/5 translate-y-0 lg:translate-y-0 transition-transform"
                    src={image as string}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <p
          data-aos="fade-up"
          className={`text-white/50 text-center tracking-[1px] text-[10px] lg:text-xs mt-12 max-w-lg mx-auto ${raleway.className}`}
        >
          {client?.closing_description}
        </p>

        <h1
          data-aos="fade-up"
          className={`text-white text-center leading-8 text-xl md:text-2xl font-tan-pearl mt-6`}
        >
          {client?.closing_title}
        </h1>

        <p
          data-aos="fade-up"
          className={`${raleway.className} text-[10px] md:text-xs text-center mt-20 lg:mt-32 tracking-[2px] uppercase leading-5 text-white/80`}
        >
          Kami Yang Berbahagia
        </p>
        <h1
          data-aos="fade-up"
          className={`font-tan-pearl text-2xl md:text-3xl 2xl:text-4xl text-center mt-4 leading-7 text-white font-medium mb-24`}
        >
          {state.groom?.nickname} & {state.bride?.nickname}
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
              className={`${raleway.className} text-center text-white text-[10px] md:text-xs`}
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
