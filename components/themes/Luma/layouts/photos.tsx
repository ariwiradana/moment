"use client";

import useLightbox from "@/hooks/themes/useLightbox";
import { rubik } from "@/lib/fonts";
import { memo, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { NextPage } from "next";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

const Photos: NextPage = () => {
  const {
    state: { images, isOpen, imageIndex },
    actions: { handleToggleLightbox, setIsOpen },
  } = useLightbox();

  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!images.length) return null;

  return (
    <>
      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          index={imageIndex}
          plugins={[Zoom]}
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={images}
          aria-label={`Galeri foto ${imageIndex + 1} dari ${images.length}`}
        />
      )}

      <section className="h-dvh snap-start w-full relative">
        <div className="absolute z-20 inset-0 bg-gradient-to-b lg:px-20 from-luma-dark/50 to-luma-dark/80 flex flex-col justify-center items-center">
          {/* Header */}
          <div className="w-full px-8 flex items-center justify-between lg:justify-center gap-12 mb-6">
            <h2
              className="font-bigilla leading-[40px] text-white text-[40px] md:text-5xl lg:text-7xl"
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

          {/* Swiper Gallery */}
          <div className="w-full overflow-x-hidden px-1">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              modules={[Navigation, Grid]}
              breakpoints={{
                0: {
                  slidesPerView: 2, // mobile
                },
                640: {
                  slidesPerView: 3, // tablet
                },
                1024: {
                  slidesPerView: 4, // desktop
                },
                1280: {
                  slidesPerView: 5, // large device
                },
              }}
              grid={{ rows: 2, fill: "row" }}
              speed={300}
              spaceBetween={4}
            >
              {images.map((image, index) => (
                <SwiperSlide key={`Foto Galeri ${index + 1}`}>
                  <div
                    className="h-full w-full cursor-pointer"
                    onClick={() => handleToggleLightbox(image.src)}
                    aria-label={`Buka Lightbox foto ${index + 1}`}
                  >
                    <div className="aspect-square w-full h-full relative">
                      <Image
                        alt={`Foto Galeri ${index + 1}`}
                        src={image.src}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        quality={80}
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

          {/* Footer */}
          <div className="w-full px-8 pt-6 max-w-md mx-auto">
            <p
              className={`${rubik.className} text-[10px] md:text-xs lg:text-sm font-light lg:text-center text-justify text-white`}
            >
              <span className="inline-block w-5 h-[1px] bg-white/50 mr-2 mb-1 lg:hidden"></span>
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
