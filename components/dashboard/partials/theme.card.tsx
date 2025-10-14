import { redhat } from "@/lib/fonts";
import { ThemeUsage } from "@/lib/types";
import { NextPage } from "next";
import Link from "next/link";
import { BsCart, BsEye } from "react-icons/bs";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useRef, useCallback } from "react";
import { TbNewSection, TbSettingsAutomation, TbStar } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ButtonTetiary from "../elements/button.tetiary";

interface Props {
  theme: ThemeUsage;
  bestSeller: boolean;
  newest: boolean;
  index: number;
}

const ThemeCard: NextPage<Props> = ({
  theme,
  bestSeller = false,
  newest = false,
}) => {
  const { name, slug, phone_thumbnail, packages, features } = theme;

  console.log(features);
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
          preload="metadata"
          aria-label={`Tema undangan digital Bali: ${theme.name}`}
        />
        {bestSeller && (
          <div
            className={`absolute top-[14px] -right-5 md:top-6 md:-right-7 bg-gradient-to-r from-[#C98C30] via-dashboard-primary to-[#C98C30] gap-x-1 px-4 md:px-8 py-0.5 rotate-45 z-10 flex justify-center items-center text-xs md:text-sm`}
          >
            <TbStar />
            <span>Terlaris</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center mt-3 md:mt-5">
        <Swiper
          modules={[Autoplay]}
          autoplay
          slidesPerView={1}
          grabCursor
          className="!overflow-visible mb-3"
        >
          {newest && (
            <SwiperSlide className="!w-auto">
              <div
                className={`${redhat.className} flex items-center gap-x-1 rounded-full bg-white font-medium text-dashboard-dark text-xs md:text-sm px-2 py-[2px]`}
              >
                <TbNewSection /> Desain Baru
              </div>
            </SwiperSlide>
          )}

          {features.map((feature) => (
            <SwiperSlide
              key={`Fitur Tambahan Tema ${name}`}
              className="!w-auto"
            >
              <div
                className={`${redhat.className} flex items-center gap-x-1 rounded-full bg-white font-medium text-dashboard-dark text-xs md:text-sm px-2 py-[2px]`}
              >
                <TbSettingsAutomation /> {feature}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <h5
          className={`${redhat.className} text-xl text-white font-semibold mb-2 md:mb-3`}
        >
          {name}
        </h5>
        <p className={`${redhat.className} text-sm text-white/70`}>
          Mulai dari
        </p>
        <h6
          className={`${redhat.className} text-xl text-white font-medium mb-3 md:mb-5 leading-6`}
        >
          {formatToRupiah(basicPrice)}
        </h6>

        <Link
          href={`/${theme.slug}`}
          target="_blank"
          className="w-full lg:w-3/4"
          aria-label={`Link Preview Tema ${name}`}
        >
          <ButtonTetiary size="small" title="Live Preview" icon={<BsEye />} />
        </Link>
        <Link
          href={`/${theme.slug}/order`}
          target="_blank"
          aria-label={`Link Pesan Tema ${name}`}
          className="mt-3 w-full lg:w-3/4"
        >
          <ButtonTetiary size="small" title="Pesan Tema" icon={<BsCart />} />
        </Link>
      </div>
    </div>
  );
};

export default ThemeCard;
