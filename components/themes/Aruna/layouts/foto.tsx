import React, { memo, useCallback, useMemo, useState } from "react";
import "yet-another-react-lightbox/styles.css";
import { roboto } from "@/lib/fonts";
import { getParticipantNames } from "@/utils/getParticipantNames";
import Image from "next/image";
import Lightbox from "react-spring-lightbox";
import { HiChevronLeft, HiChevronRight, HiOutlineXMark } from "react-icons/hi2";
import useClientStore from "@/store/useClientStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Component = () => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const { client } = useClientStore();
  const { gallery = [], cover, seo, participants = [] } = client || {};

  const images = useMemo(
    () => (gallery as string[])?.filter((g) => g !== cover && g !== seo),
    [gallery, cover, seo]
  );
  const lightboxImage = useMemo(
    () =>
      images?.map((img, index) => ({ src: img, alt: `gallery-${index + 1}` })),
    [images]
  );
  const gridImages = useMemo(() => images.slice(0, 12), [images]);
  const slideImages = useMemo(() => images?.slice(12), [images]);

  const gotoPrevious = useCallback(() => {
    if (imageIndex > 0) setImageIndex((prev) => prev - 1);
  }, [imageIndex]);

  const gotoNext = useCallback(() => {
    if (imageIndex < images?.length - 1) setImageIndex((prev) => prev + 1);
  }, [imageIndex, images?.length]);

  const handleToggleLightbox = useCallback(
    (img: string) => {
      if (images.length > 0) {
        const idx = images.indexOf(img);
        setImageIndex(idx);
        setOpen((prev) => !prev);
      }
    },
    [images]
  );

  const gridSpan = (index: number) => {
    switch (index) {
      case 0:
        return "col-span-2 row-span-2 aspect-square";
      case 1:
        return "col-span-2 row-span-4";
      case 6:
        return "col-span-2 row-span-2 aspect-square";
      case 7:
        return "col-span-2 row-span-2 aspect-square";
      case 9:
        return "col-span-2 row-span-2 aspect-square";
      case 10:
        return "col-span-1 row-span-2";
      default:
        return "col-span-1 row-span-1 aspect-square";
    }
  };

  return (
    <>
      <Lightbox
        isOpen={open}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={lightboxImage}
        currentIndex={imageIndex}
        onClose={() => setOpen(false)}
        className="bg-black/80"
        renderHeader={() => (
          <div className="flex justify-between items-center z-10 fixed top-0 inset-x-0">
            <p className={`text-white relative z-10 p-2 ${roboto.className}`}>
              {imageIndex + 1} / {lightboxImage?.length}
            </p>
            <button
              onClick={() => {
                setOpen(false);
                setImageIndex(0);
              }}
              className="text-white/90 text-2xl p-2 relative z-10 disabled:opacity-30 bg-black/30 hover:bg-black/40 disabled:hover:bg-black/30 flex justify-center items-center md:ml-2 transition-colors ease-in-out backdrop-blur-sm"
            >
              <HiOutlineXMark />
            </button>
          </div>
        )}
        renderPrevButton={() => (
          <button
            disabled={imageIndex === 0}
            onClick={gotoPrevious}
            className="text-white text-2xl p-2 relative z-10 disabled:opacity-30 bg-black/30 hover:bg-black/40 disabled:hover:bg-black/30 flex justify-center items-center md:ml-2 transition-colors ease-in-out backdrop-blur-sm"
          >
            <HiChevronLeft />
          </button>
        )}
        renderNextButton={() => (
          <button
            disabled={imageIndex === lightboxImage.length - 1}
            onClick={gotoNext}
            className="text-white text-2xl p-2 relative z-10 disabled:opacity-30 bg-black/30 hover:bg-black/40 disabled:hover:bg-black/30 flex items-center justify-center md:mr-2 transition-colors ease-in-out backdrop-blur-sm"
          >
            <HiChevronRight />
          </button>
        )}
        pageTransitionConfig={{
          from: { opacity: 0 },
          enter: { opacity: 1 },
          leave: { opacity: 0 },
        }}
      />
      <section className="relative bg-aruna-dark overflow-hidden">
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
              Galeri {getParticipantNames(participants)}
            </p>
          )}
          <div
            className={`mt-10 grid grid-cols-4 px-2 ${
              slideImages?.length > 0 ? "grid-rows-8" : "grid-rows-6"
            } gap-2`}
            data-aos="zoom-out-up"
          >
            {gridImages?.map((img, index) => (
              <div
                key={`gallery-${index + 1}`}
                onClick={() => handleToggleLightbox(img)}
                className={`${gridSpan(index)} w-full relative overflow-hidden`}
              >
                <Image
                  sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                  priority={index < 2}
                  src={img}
                  fill
                  alt={`gallery-${index + 1}`}
                  className="object-cover hover:scale-105 transition-transform ease-in-out duration-500 bg-white/5"
                />
              </div>
            ))}
          </div>
          <div className="mt-2 px-2" data-aos="zoom-out-up">
            <Swiper
              spaceBetween={8}
              modules={[Autoplay]}
              speed={2000}
              autoplay={{
                delay: 2000,
              }}
            >
              {slideImages.map((img, index) => (
                <SwiperSlide
                  onClick={() => handleToggleLightbox(img)}
                  key={`Slide Image ${index}`}
                >
                  <div className="w-full relative aspect-[4/2] overflow-hidden">
                    <Image
                      sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                      src={img}
                      fill
                      alt={`slide-${index + 1}`}
                      className="object-cover hover:scale-105 transition-transform ease-in-out duration-500 bg-white/5"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Component);
