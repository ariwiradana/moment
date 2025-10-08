import { memo } from "react";
import { roboto } from "@/lib/fonts";
import { BiMusic } from "react-icons/bi";
import useClientStore from "@/store/useClientStore";
import useParticipants from "@/hooks/themes/useParticipants";
import Image from "next/image";
import usePhotos from "@/hooks/themes/usePhotos";
import Link from "next/link";
import { sosmedURLs } from "@/constants/sosmed";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";

const ThankyouComponent = () => {
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();

  const {
    state: { images },
  } = usePhotos();

  return (
    <section
      style={{ marginTop: 0 }}
      className="relative flex flex-col justify-center h-screen bg-aruna-dark"
    >
      <div className="absolute inset-0 z-10 bg-aruna-dark/80"></div>
      <div className="absolute top-0 inset-x-0 grid" data-aos="zoom-out">
        {images.map((image, idx) => (
          <div
            key={`FotoEvent-${idx}`}
            className="w-full h-[10vh] relative overflow-hidden opacity-30"
          >
            <Image
              src={image}
              alt={`Foto Event ${idx + 1}`}
              fill
              className="object-cover grayscale"
              loading="lazy"
              quality={70}
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
            />
          </div>
        ))}
      </div>

      <div className="relative z-20 max-w-screen-sm mx-auto py-[60px] md:py-[100px] px-6 flex flex-col items-center text-center">
        <h1 className="font-high-summit text-3xl md:text-4xl text-white mb-8">
          {client?.closing_title}
        </h1>
        <p
          className={`${roboto.className} text-xs md:text-sm text-white/80 mb-16`}
        >
          {client?.closing_description}
        </p>

        {client?.theme_category?.name === "Pernikahan" && (
          <>
            <p
              className={`${roboto.className} text-white/60 text-[8px] md:text-[10px] uppercase tracking-[6px] mb-6`}
            >
              Kami Yang Berbahagia
            </p>
            <h2 className="font-high-summit text-white text-4xl mt-2">
              {participantState.groom?.nickname} &{" "}
              {participantState.bride?.nickname}
            </h2>
          </>
        )}
      </div>
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
              className={`${roboto.className} text-center text-white text-[10px] md:text-xs`}
            >
              Undangan Digital © 2025 | Moment Invitation
            </p>
          </Link>
        </li>

        {/* Music Info */}
        {client?.music_title && (
          <li>
            <div
              className={`${roboto.className} flex justify-center items-center gap-x-2 text-center uppercase text-white text-[8px] md:text-[10px] tracking-[2px]`}
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

export default memo(ThankyouComponent);
