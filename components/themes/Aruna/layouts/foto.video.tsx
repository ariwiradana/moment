import React, { FC, memo, useCallback, useMemo, useState } from "react";
import { useAruna } from "@/hooks/themes/useAruna";
import "yet-another-react-lightbox/styles.css";
import { roboto } from "@/lib/fonts";
import { getParticipantNames } from "@/utils/getParticipantNames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import YoutubeEmbed from "../elements/youtube.embed";
import Image from "next/image";
import Lightbox from "react-spring-lightbox";
import { HiChevronLeft, HiChevronRight, HiOutlineXMark } from "react-icons/hi2";

interface Props {
  state: useAruna["state"];
}

const GalleryComponent: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images = useMemo(() => {
    return Array.isArray(props.state.client?.gallery) &&
      props.state.client?.gallery.length > 0
      ? props.state.client?.gallery.filter(
          (g) =>
            g !== props.state.client?.cover && g !== props.state.client?.seo
        )
      : [];
  }, [
    props.state.client?.gallery,
    props.state.client?.cover,
    props.state.client?.seo,
  ]);

  const videos = useMemo(() => {
    return Array.isArray(props.state.client?.videos) &&
      props.state.client.videos.length > 0
      ? props.state.client.videos
      : [];
  }, [props.state.client?.videos]);

  const lightboxImage = images.map((img, index) => ({
    src: img,
    alt: `gallery-${index + 1}`,
  }));

  const gotoPrevious = useCallback(() => {
    if (imageIndex > 0) setImageIndex(imageIndex - 1);
  }, [imageIndex]);

  const gotoNext = useCallback(() => {
    if (imageIndex + 1 < images.length) setImageIndex(imageIndex + 1);
  }, [imageIndex, images.length]);

  const gridImages = images.length > 11 ? images.slice(0, 11) : images;
  const slideImages = images.length > 11 ? images.slice(11) : [];

  const gridSpan = (index: number) => {
    switch (index) {
      case 0:
        return "col-span-2 row-span-2 aspect-square";
      case 1:
        return "col-span-2 row-span-4";
      case 2:
        return "col-span-1 row-span-1 aspect-square";
      case 3:
        return "col-span-1 row-span-1 aspect-square";
      case 4:
        return "col-span-1 row-span-1 aspect-square";
      case 5:
        return "col-span-1 row-span-1 aspect-square";
      case 6:
        return "col-span-2 row-span-2 aspect-square";
      case 7:
        return "col-span-1 row-span-1 aspect-square";
      case 8:
        return "col-span-1 row-span-1 aspect-square";
      case 9:
        return "col-span-1 row-span-1 aspect-square";
      case 10:
        return "col-span-1 row-span-1 aspect-square";
    }
  };

  const handleToggleLightbox = useCallback(
    (idx: number) => {
      if (images.length === 0 || idx < 0 || idx >= images.length) return;
      setImageIndex(idx);
      setOpen((prev) => !prev);
    },
    [images, imageIndex]
  );

  return (
    <>
      <Lightbox
        isOpen={open}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={lightboxImage}
        currentIndex={imageIndex}
        onClose={() => setOpen(false)}
        className={`bg-black/70`}
        renderHeader={() => (
          <div className="flex justify-between items-center z-10 fixed top-0 inset-x-0">
            <p className={`text-white relative z-10 p-2 ${roboto.className}`}>
              {imageIndex + 1} / {lightboxImage.length}
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
        {videos.length > 0 && (
          <div className="grid gap-2">
            {videos.map((v) => {
              const youtubeId = getYouTubeVideoId(v);
              const youtubeVideo = isYoutubeVideo(v);
              if (youtubeVideo)
                return <YoutubeEmbed key={youtubeId} youtubeId={youtubeId} />;
            })}
          </div>
        )}

        <div className="w-full h-full relative z-20 pt-[60px] md:pt-[100px] pb-8 px-8">
          <h2
            data-aos="fade-up"
            className="font-high-summit text-4xl md:text-5xl text-white text-center whitespace-nowrap"
          >
            Galeri Kami
          </h2>
          <p
            data-aos="fade-up"
            className={`${roboto.className} text-xs md:text-sm text-center text-white/80 max-w-screen-sm mx-auto my-8`}
          >
            Setiap langkah adalah kebahagiaan, setiap senyum adalah kenangan. Di
            sini, kami mengabadikan momen cinta dan janji yang akan dikenang
            selamanya.
          </p>
          <p
            data-aos="fade-up"
            className={`text-white/60 text-[8px] md:text-[10px] uppercase text-center tracking-[6px] ${roboto.className}`}
          >
            {getParticipantNames(props.state.client?.participants || [])}
          </p>
          <div
            className={`mt-10 grid grid-cols-4 ${
              slideImages.length > 0 ? "grid-rows-8" : "grid-rows-6"
            } gap-2`}
            data-aos="zoom-out-up"
          >
            {gridImages.map((img, index) => (
              <div
                key={`gallery-${index + 1}`}
                onClick={() => handleToggleLightbox(index)}
                className={`${gridSpan(index)} w-full relative overflow-hidden`}
              >
                <Image
                  sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                  priority={index < 2}
                  src={img}
                  fill
                  quality={75}
                  alt={`gallery-${index + 1}`}
                  className="object-cover hover:scale-105 transition-transform ease-in-out duration-500 bg-white/5"
                />
              </div>
            ))}

            {slideImages.length > 0 && (
              <div className="col-span-4 row-span-2 w-full">
                <Swiper
                  autoplay
                  spaceBetween={8}
                  modules={[Autoplay]}
                  className="w-full h-full"
                >
                  {slideImages.map((image, index) => (
                    <SwiperSlide
                      onClick={() => handleToggleLightbox(index + 11)}
                      key={`gallery-${index + 11}`}
                      className="relative flex justify-center items-center h-full"
                    >
                      <div className="relative h-full w-full">
                        <Image
                          priority={index < 2}
                          sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
                          src={image}
                          alt={`galeri-${index + 6}`}
                          fill
                          quality={75}
                          className="object-cover hover:scale-105 transition-transform ease-in-out duration-500 bg-white/5"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(GalleryComponent);
