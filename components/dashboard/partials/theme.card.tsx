import { redhat } from "@/lib/fonts";
import { ThemeUsage } from "@/lib/types";
import { NextPage } from "next";
import Link from "next/link";
import { BsEye } from "react-icons/bs";
import { formatToRupiah } from "@/utils/formatToRupiah";
import ButtonOutlinedLight from "../elements/button.outlined.white";
import { BiPlayCircle, BiSolidStar } from "react-icons/bi";
import { useRef, useCallback } from "react";

interface Props {
  theme: ThemeUsage;
  bestSeller: string;
  index: number;
}

const ThemeCard: NextPage<Props> = ({ theme, bestSeller, index }) => {
  const { name, slug, phone_thumbnail, packages, cover_video } = theme;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = useCallback(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const basicPrice = packages?.find((p) => p.name === "Basic")?.price || 0;
  const showLabel = bestSeller === slug || cover_video || index === 0;

  return (
    <div className="px-4 py-6 md:p-8 bg-gradient-to-b from-transparent via-transparent to-white/[0.015] relative">
      <div
        className="relative"
        onMouseEnter={handlePlay}
        onMouseLeave={handlePause}
      >
        <video
          ref={videoRef}
          poster={phone_thumbnail || ""}
          className="min-w-full min-h-full rounded-lg md:rounded-3xl lg:rounded-[36px] shimmer-dark"
          src={`/video/themes/${slug}.mp4`}
          muted
          loop
          playsInline
          preload="metadata" // ✅ Lazy load video metadata
        />
      </div>

      <div className="flex flex-col items-center mt-3 md:mt-5">
        {showLabel && (
          <div className="flex justify-center flex-wrap gap-3 mb-2">
            {bestSeller === slug && (
              <div
                className={`${redhat.className} flex items-center gap-x-1 rounded-full bg-dashboard-primary font-medium text-dashboard-dark text-xs md:text-sm px-2 py-[2px]`}
              >
                <BiSolidStar /> Favorit
              </div>
            )}
            {cover_video && (
              <div
                className={`${redhat.className} flex items-center gap-x-1 rounded-full bg-white font-medium text-dashboard-dark text-xs md:text-sm px-2 py-[2px]`}
              >
                <BiPlayCircle /> Cover Video
              </div>
            )}
          </div>
        )}

        <h5
          className={`${redhat.className} text-xl text-white font-semibold mb-2 md:mb-3`}
        >
          {name}
        </h5>
        <p className={`${redhat.className} text-sm text-white/70`}>
          Mulai dari
        </p>
        <h6
          className={`${redhat.className} text-xl text-white font-medium mb-2 md:mb-4 leading-6`}
        >
          {formatToRupiah(basicPrice)}
        </h6>

        <Link
          href={`/${theme.client_slug}`}
          target="_blank"
          aria-label={`Link Preview ${name}`}
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
