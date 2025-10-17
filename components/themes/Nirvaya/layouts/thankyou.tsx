import React, { memo } from "react";
import { raleway } from "@/lib/fonts";
import Link from "next/link";
import Image from "next/image";
import { sosmedURLs } from "@/constants/sosmed";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineTikTok,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BiMusic } from "react-icons/bi";
import useClientStore from "@/store/useClientStore";
import useParticipants from "@/hooks/themes/useParticipants";
import usePhotos from "@/hooks/themes/usePhotos";

const ThankyouComponent = () => {
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();
  const {
    state: { images },
  } = usePhotos();

  // Limit render images to prevent heavy load
  const visibleImages = images?.slice(0, 10) ?? [];

  return (
    <section className="relative flex flex-col justify-center h-svh">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-nirvaya-dark from-[5%] via-nirvaya-dark/80 to-nirvaya-dark/90 z-10" />

      {/* Background images */}
      <div className="absolute inset-0 grid grid-cols-2">
        {visibleImages.map((image, index) => (
          <div
            className="w-full h-[20vh] overflow-hidden bg-white/5 relative"
            key={image ?? index}
          >
            <Image
              src={image}
              alt={`Foto Thankyou ${index + 1}`}
              fill
              className="object-cover grayscale"
              sizes="50vw"
              loading={index < 2 ? "eager" : "lazy"} // prioritize first 2 images
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-screen-sm mx-auto py-[60px] md:py-[100px] px-8 flex flex-col justify-center relative z-30">
        {/* Closing Title */}
        {client?.closing_title && (
          <h1
            data-aos="fade-up"
            className="text-white text-center tracking-[2px] font-medium text-[10px] md:text-xs lg:text-sm uppercase mb-6"
          >
            {client.closing_title}
          </h1>
        )}

        {/* Closing Description */}
        {client?.closing_description && (
          <p
            data-aos="fade-up"
            className={`text-white/50 mt-6 text-center tracking-[2px] max-w-xl mx-auto md:text-xs text-[10px] lg:text-sm my-16 ${raleway.className}`}
          >
            {client.closing_description}
          </p>
        )}

        {/* Bride & Groom */}
        {client?.theme_category?.name === "Pernikahan" && (
          <>
            <p
              data-aos="fade-up"
              className={`text-white text-[8px] md:text-[10px] lg:text-xs uppercase text-center tracking-[6px] ${raleway.className}`}
            >
              Kami Yang Berbahagia
            </p>
            <h2
              data-aos="fade-up"
              className="text-white text-center leading-8 text-4xl lg:text-6xl font-edensor mt-2"
            >
              {participantState.groom?.nickname ?? "-"}{" "}
              <span className="font-italic">dan </span>
              {participantState.bride?.nickname ?? "-"}
            </h2>
          </>
        )}

        {/* Social & Footer */}
        <ul
          data-aos="zoom-in-up"
          className="flex flex-col justify-center gap-2 items-center relative z-30 mt-[100px]"
        >
          <li className="flex items-center justify-center gap-2 text-base lg:text-lg text-white mt-2">
            <Link
              aria-label="Hubungi kami via WhatsApp"
              target="_blank"
              href={sosmedURLs.whatsapp}
            >
              <AiOutlineWhatsApp />
            </Link>
            <Link
              aria-label="Lihat galeri kami di Instagram"
              target="_blank"
              href={sosmedURLs.instagram}
            >
              <AiOutlineInstagram />
            </Link>
            <Link
              aria-label="Lihat video kami di TikTok"
              target="_blank"
              href={sosmedURLs.tiktok}
            >
              <AiOutlineTikTok />
            </Link>
            <Link
              aria-label="Kirim email ke Moment Invitation"
              target="_blank"
              href={sosmedURLs.email}
            >
              <AiOutlineMail />
            </Link>
          </li>

          {/* Footer copyright */}
          <li className="mt-2">
            <Link href="/" target="_blank">
              <p
                className={`${raleway.className} text-center uppercase text-white text-[8px] md:text-[10px] lg:text-xs tracking-[2px]`}
              >
                Undangan Digital © 2025 | Moment Invitation
              </p>
            </Link>
          </li>

          {/* Music title */}
          {client?.music_title && (
            <li>
              <div
                className={`flex justify-center items-center gap-x-2 ${raleway.className} text-center uppercase text-white text-[8px] md:text-[10px] lg:text-xs tracking-[2px]`}
              >
                <BiMusic className="animate-pulse" />
                <p>{client.music_title}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default memo(ThankyouComponent);
