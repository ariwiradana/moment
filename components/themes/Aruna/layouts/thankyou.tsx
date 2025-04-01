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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import ImageShimmer from "@/components/image.shimmer";

const ThankyouComponent = () => {
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();
  return (
    <section className="relative flex flex-col justify-center">
      <div
        className="absolute inset-0 bg-aruna-dark/70 z-10"
        data-aos="fade-up"
      ></div>
      <div className="absolute inset-0" data-aos="fade-up">
        <Swiper
          loop
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          effect="fade"
          speed={2000}
          className="w-full transition-transform min-h-[600px] h-lvh"
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay, EffectFade]}
        >
          <>
            {Array.isArray(client?.gallery) && client?.gallery.length > 0
              ? client.gallery
                  .filter(
                    (image) => image !== client?.cover && image !== client?.seo
                  )
                  .map((image, index) => (
                    <SwiperSlide
                      className="relative w-full h-full"
                      key={`thankyou-img-${index}`}
                    >
                      <div className="absolute inset-0 z-0">
                        <ImageShimmer
                          fill
                          quality={100}
                          alt={`thankyou-img-${index}`}
                          priority
                          sizes="100vw"
                          className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform grayscale"
                          src={image}
                        />
                      </div>
                    </SwiperSlide>
                  ))
              : null}
          </>
        </Swiper>
      </div>
      <div className="max-w-screen-sm mx-auto py-[60px] h-svh md:py-[100px] px-8 flex flex-col justify-center relative z-30">
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

export default memo(ThankyouComponent);
