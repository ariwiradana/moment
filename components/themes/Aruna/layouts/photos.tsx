import React, { memo, useMemo, useState, useCallback } from "react";
import { roboto } from "@/lib/fonts";
import useClientStore from "@/store/useClientStore";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import useLightbox from "@/hooks/themes/useLightbox";

const LightboxDynamic = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

const GalleryComponent = () => {
  const { client } = useClientStore();
  const { participants = [] } = client || {};

  const {
    state: { images, imageIndex, isOpen },
    actions: { handleToggleLightbox, setIsOpen },
  } = useLightbox();

  const [dragging, setDragging] = useState(false);

  const gridImages = useMemo(() => images.slice(0, 6), [images]);
  const slideImages = useMemo(() => images.slice(6), [images]);

  const participantNames = useMemo(
    () => participants.map((p) => p.nickname).join(" & "),
    [participants]
  );

  const gridSpan = useCallback((index: number) => {
    switch (index) {
      case 0:
        return "col-span-2 row-span-2 aspect-square";
      case 1:
        return "col-span-2 row-span-4";
      case 6:
        return "col-span-2 row-span-2 aspect-square";
      case 7:
        return "col-span-2 row-span-2 aspect-square";
      default:
        return "col-span-1 row-span-1 aspect-square";
    }
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <>
      {isOpen && (
        <LightboxDynamic
          index={imageIndex}
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={images}
          plugins={[Zoom]}
        />
      )}

      <section
        className="relative bg-aruna-dark overflow-hidden"
        style={{ marginTop: 0 }}
      >
        <div className="w-full h-full relative z-20 pt-[60px] md:pt-[100px] pb-2">
          <p
            data-aos="fade-up"
            className={`${roboto.className} text-[10px] md:text-xs tracking-[1px] text-center text-white/80 max-w-screen-sm mx-auto mb-8 px-6`}
          >
            Setiap langkah adalah kebahagiaan, setiap senyum adalah kenangan. Di
            sini, kami mengabadikan momen cinta dan janji yang akan dikenang
            selamanya.
          </p>

          {client?.theme_category?.slug === "pernikahan" && (
            <p
              data-aos="fade-up"
              className={`text-white/60 text-[8px] md:text-[10px] uppercase text-center tracking-[6px] ${roboto.className}`}
            >
              Galeri {participantNames}
            </p>
          )}

          {/* Grid Images */}
          <div
            data-aos="zoom-out-up"
            className="mt-10 grid grid-cols-4 gap-2 px-2 grid-rows-4"
          >
            {gridImages.map((img, index) => (
              <div
                key={`grid-img-${index}`}
                className={`${gridSpan(index)} relative overflow-hidden`}
                onClick={() => handleToggleLightbox(img.src)}
              >
                <Image
                  src={img.src}
                  alt={`grid-img-${index + 1}`}
                  fill
                  loading={index < 2 ? "eager" : "lazy"}
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Swiper Slider */}
          {slideImages.length > 0 && (
            <div className="mt-2 px-2">
              <Swiper
                modules={[Autoplay]}
                slidesPerView={2}
                spaceBetween={8}
                loop
                lazyPreloadPrevNext={3}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                onTouchStart={() => setDragging(true)}
                onTouchEnd={() => setDragging(false)}
              >
                {slideImages.map((img, index) => (
                  <SwiperSlide key={`slide-img-${index}`}>
                    <div
                      className="aspect-square w-full relative"
                      onClick={() => {
                        if (!dragging) handleToggleLightbox(img.src);
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={`slide-img-${index + 1}`}
                        fill
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default memo(GalleryComponent);
