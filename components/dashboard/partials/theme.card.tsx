import { redhat } from "@/lib/fonts";
import { Client } from "@/lib/types";
import { NextPage } from "next";
import Link from "next/link";
import { BsEye } from "react-icons/bs";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useRef } from "react";
import ButtonOutlinedLight from "../elements/button.outlined.white";

interface Props {
  client: Client;
}

const ThemeCard: NextPage<Props> = ({ client }) => {
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
    <div>
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
        {client.packages && (
          <h6
            className={`${redhat.className} text-lg text-white font-medium mb-2 md:mb-4 leading-6`}
          >
            {formatToRupiah(
              client.packages.find((p) => p.name === "Basic")?.price || 0
            )}
          </h6>
        )}

        <Link
          href={`/${client.slug}`}
          aria-label={`Link Preview ${client.theme?.name}`}
          target="_blank"
        >
          <ButtonOutlinedLight
            size="small"
            title="Live Preview"
            icon={<BsEye />}
          />
        </Link>
      </div>
    </div>
  );
};

export default ThemeCard;
