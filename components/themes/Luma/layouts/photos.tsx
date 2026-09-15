"use client";

import useLightbox from "@/hooks/themes/useLightbox";
import { rubik } from "@/lib/fonts";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Autoplay } from "swiper/modules";
import { NextPage } from "next";
import useClientStore from "@/store/useClientStore";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import YoutubeEmbed from "../../youtube.embed";
import { getParticipantNames } from "@/utils/getParticipantNames";
import FsLightbox from "fslightbox-react";

const Photos: NextPage = () => {
  const { client } = useClientStore();
  const {
    state: { images, isOpen, imageIndex },
    actions: { handleToggleLightbox },
  } = useLightbox();
  const { videos = [], participants = [] } = client || {};

  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isShowVideo, setIsShowVideo] = useState(false);

  // ✅ Gunakan memo agar filtering YouTube tidak re-run terus
  const youtubeVideos = useMemo(() => {
    if (!videos?.length) return [];
    return (videos as string[]).filter(isYoutubeVideo).map((url) => ({
      url,
      youtubeId: getYouTubeVideoId(url),
    }));
  }, [videos]);

  const participantNames = useMemo(
    () => getParticipantNames(participants),
    [participants],
  );

  // ✅ Resize throttled dan cleanup aman
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const checkDevice = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        setIsShowVideo(width < 1024 && youtubeVideos.length > 0);
      }, 200); // throttle 200ms
    };

    checkDevice(); // run awal
    window.addEventListener("resize", checkDevice, { passive: true });
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", checkDevice);
    };
  }, [youtubeVideos.length]);

  if (!images || images.length === 0) return null; // ✅ Cegah render jika tidak ada gambar

  return (
    <>
      <FsLightbox toggler={isOpen} sources={images} slide={imageIndex} />

      <section className="h-dvh snap-start w-full relative">
        <div className="absolute z-20 inset-0 bg-gradient-to-b lg:px-20 from-luma-dark/50 to-luma-dark/80 flex flex-col justify-center items-center">
          <div className="w-full px-6 flex items-center justify-between lg:justify-center gap-3 lg:gap-12 mb-6">
            <h2
              className="font-butler leading-[40px] text-white text-[40px] md:text-5xl lg:text-7xl"
              aria-label="Judul galeri foto kami"
            >
              Galeri <span className="font-italic">Kami</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                disabled={isBeginning}
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Slide sebelumnya"
                className="p-2 rounded-full border border-white/50 text-white aspect-square disabled:opacity-50 disabled:pointer-events-none"
              >
                <HiArrowLeft />
              </button>
              <button
                disabled={isEnd}
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Slide selanjutnya"
                className="p-2 rounded-full border border-white/50 text-white aspect-square disabled:opacity-50 disabled:pointer-events-none"
              >
                <HiArrowRight />
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-hidden px-1">
            {isShowVideo && (
              <div className="w-full pb-1 lg:hidden">
                {youtubeVideos.map(({ youtubeId }) => (
                  <YoutubeEmbed
                    key={youtubeId}
                    youtubeId={youtubeId}
                    title={participantNames}
                  />
                ))}
              </div>
            )}

            <Swiper
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              modules={[Navigation, Grid, Autoplay]}
              grid={{ rows: isShowVideo ? 1 : 2, fill: "row" }}
              speed={300}
              spaceBetween={4}
              breakpoints={{
                0: { slidesPerView: 3 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="h-full w-full cursor-pointer"
                    onClick={() => handleToggleLightbox(src)}
                    aria-label={`Buka Lightbox foto ${index + 1}`}
                  >
                    <div className="aspect-square w-full h-full relative">
                      <Image
                        alt={`Foto Galeri ${index + 1}`}
                        src={src}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        quality={70} // ✅ turunkan sedikit untuk performa
                        className="object-cover shimmer-dark object-center transition-transform"
                        priority={index < 2}
                        loading={index >= 2 ? "lazy" : "eager"}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ✅ Footer text tetap */}
          <div className="w-full px-6 pt-6 max-w-md mx-auto">
            <p
              className={`${rubik.className} text-[10px] md:text-xs lg:text-sm font-light lg:text-center text-justify text-white`}
            >
              Setiap kisah cinta layak diabadikan, bukan hanya dalam ingatan,
              tapi juga dalam gambar yang tak pernah pudar.
            </p>
            <p
              className={`text-white/70 mt-4 text-[10px] md:text-xs lg:text-sm lg:text-center uppercase tracking-[3px] ${rubik.className}`}
            >
              Rayhan Malik
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Photos);
