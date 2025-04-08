import { redhat } from "@/lib/fonts";
import { Client } from "@/lib/types";
import { NextPage } from "next";
import Link from "next/link";
import { BsEye } from "react-icons/bs";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useRef } from "react";
import ButtonOutlinedLight from "../elements/button.outlined.white";
import { BiPlayCircle, BiStar } from "react-icons/bi";

interface Props {
  client: Client;
  bestSeller: string;
}

const ThemeCard: NextPage<Props> = ({ client, bestSeller }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <div className="px-4 py-6 md:p-8 bg-gradient-to-b from-transparent via-transparent to-white/[0.015] relative">
        <div
          className="relative"
          onMouseEnter={handlePlay}
          onMouseLeave={handlePause}
        >
          <video
            ref={videoRef}
            poster={client.theme?.phone_thumbnail || ""}
            className="min-w-full min-h-full rounded-lg md:rounded-3xl lg:rounded-[36px] shimmer-dark"
            src={`/video/themes/${client.theme?.slug}.mp4`}
            muted
            loop
            playsInline
          ></video>
        </div>
        <div className="flex flex-col items-center mt-3 md:mt-5">
          {bestSeller === client.theme?.slug || client.theme?.cover_video ? (
            <div className="flex justify-center flex-wrap gap-3 mb-2">
              {bestSeller === client.theme?.slug && (
                <div
                  className={`${redhat.className} flex items-center gap-x-1 rounded-full bg-dashboard-primary font-medium text-dashboard-dark text-[10px] md:text-xs px-2 py-[2px]`}
                >
                  <BiStar />
                  Favorit
                </div>
              )}
              {client.theme?.cover_video && (
                <div
                  className={`${redhat.className} flex items-center gap-x-1 rounded-full bg-white font-medium text-dashboard-dark text-[10px] md:text-xs px-2 py-[2px]`}
                >
                  <BiPlayCircle />
                  Cover Video
                </div>
              )}
            </div>
          ) : null}
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
    </>
  );
};

export default ThemeCard;
