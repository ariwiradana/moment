import { redhat } from "@/lib/fonts";
import { Client } from "@/lib/types";
import { NextPage } from "next";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { sosmedURLs } from "@/constants/sosmed";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useRef } from "react";
import ButtonOutlinedLight from "../elements/button.outlined.white";

interface Props {
  client: Client;
}

const ThemeCard: NextPage<Props> = ({ client }) => {
  const message = `Halo, saya tertarik untuk memilih tema undangan ${client.theme?.name}`;
  const whatsappLink = `${sosmedURLs.whatsapp}?text=${encodeURIComponent(
    message
  )}`;

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      href={`/${client.slug}`}
      target="_blank"
      aria-label={`Link Preview Tema ${client.theme?.name}`}
    >
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          poster={`/images/${client.theme?.slug}/thumbnail.png`}
          className="min-w-full min-h-full"
          src={`/video/themes/${client.theme?.slug}.mp4`}
          muted
          loop
          playsInline
        ></video>
      </div>
      <div className="flex flex-col items-center mt-2 md:mt-4">
        <h5
          className={`${redhat.className} text-lg text-white font-semibold mb-1 md:mb-2`}
        >
          {client.theme?.name}
        </h5>
        <p className={`${redhat.className} text-xs text-white/70`}>
          Mulai dari
        </p>
        {client.package && (
          <h6
            className={`${redhat.className} text-lg text-white font-medium mb-2 md:mb-4 leading-6`}
          >
            {formatToRupiah(client.package.price)}
          </h6>
        )}

        <Link href={whatsappLink} target="_blank">
          <ButtonOutlinedLight
            size="small"
            title="Pesan Sekarang"
            icon={<BsCart />}
          />
        </Link>
      </div>
    </Link>
  );
};

export default ThemeCard;
