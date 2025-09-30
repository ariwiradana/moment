"use client";

import useLightbox from "@/hooks/themes/useLightbox";
import { rubik } from "@/lib/fonts";
import { NextPage } from "next";
import Image from "next/image";
import { useRef, useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import type { Swiper as SwiperType } from "swiper";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

const Photos: NextPage = () => {
  const {
    state: { images, isOpen, imageIndex },
    actions: { handleToggleLightbox, setIsOpen },
  } = useLightbox();

  const swiperRef = useRef<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (images.length > 0)
    return (
      <>
        {isOpen && (
          <Lightbox
            index={imageIndex}
            plugins={[Zoom]}
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={images}
          />
        )}
        <section className="h-dvh snap-start w-full relative">
          <div className="absolute z-20 inset-0 bg-gradient-to-b from-luma-dark/90 to-luma-dark/80 flex flex-col justify-center items-center">
            {/* Header */}
            <div className="w-full px-8 flex items-center justify-between mb-6">
              <h2 className="font-bigilla leading-[40px] text-white text-4xl">
                Galeri <span className="font-italic">Kami</span>
              </h2>
              <div className="flex items-center gap-2">
                <button
                  disabled={isBeginning}
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="p-2 rounded-full border border-white/50 text-white aspect-square disabled:opacity-50 disabled:pointer-events-none"
                >
                  <HiArrowLeft />
                </button>
                <button
                  disabled={isEnd}
                  onClick={() => swiperRef.current?.slideNext()}
                  className="p-2 rounded-full border border-white/50 text-white aspect-square disabled:opacity-50 disabled:pointer-events-none"
                >
                  <HiArrowRight />
                </button>
              </div>
            </div>

            {/* Swiper Gallery */}
            <div className="w-full overflow-x-hidden">
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
                slidesPerView={2}
                grid={{ rows: 2, fill: "row" }}
                speed={500}
                spaceBetween={4}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={`Foto Galeri ${index + 1}`}>
                    <div
                      className="h-full w-full cursor-pointer"
                      onClick={() => handleToggleLightbox(image.src)}
                    >
                      <div className="aspect-square w-full h-full relative">
                        <Image
                          priority
                          sizes="(max-width: 600px) 480px"
                          fill
                          alt={`Foto Galeri ${index + 1}`}
                          className="object-cover transition-transform shimmer-dark object-center"
                          src={image.src}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Footer */}
            <div className="w-full px-8 pt-6">
              <p
                className={`${rubik.className} text-[10px] md:text-xs font-light text-justify text-white`}
              >
                <span>
                  <div className="w-5 h-[1px] bg-white/50 mb-1 inline-block mr-2"></div>
                </span>
                Setiap kisah cinta layak diabadikan, bukan hanya dalam ingatan,
                tapi juga dalam gambar yang tak pernah pudar.
              </p>
              <p
                className={`text-white/70 mt-4 text-[8px] md:text-[10px] uppercase tracking-[3px] ${rubik.className}`}
              >
                Rayhan Malik
              </p>
            </div>
          </div>
        </section>
      </>
    );
};

export default Photos;
