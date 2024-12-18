import React, { FC, memo, useCallback, useState } from "react";
import { useAruna } from "@/hooks/themes/useAruna";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { roboto } from "@/lib/fonts";
import { getParticipantNames } from "@/utils/getParticipantNames";
import ImageShimmer from "@/components/image.shimmer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import YoutubeEmbed from "../elements/youtube.embed";
import Image from "next/image";

interface Props {
  state: useAruna["state"];
}

const GalleryComponent: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images =
    Array.isArray(props.state.client?.gallery) &&
    props.state.client?.gallery.length > 0
      ? props.state.client?.gallery.filter(
          (g) =>
            g !== props.state.client?.cover && g !== props.state.client?.seo
        )
      : [];

  const lightboxImage = images.map((img) => ({ src: img }));

  const videos =
    Array.isArray(props.state.client?.videos) &&
    props.state.client.videos.length > 0
      ? props.state.client.videos
      : [];

  const gridImages = images.length > 6 ? images.slice(0, 6) : images;
  const slideImages = images.length > 6 ? images.slice(6) : [];

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
    }
  };

  const handleToggleLightbox = useCallback(
    (image: string) => {
      const imageIndex = images.findIndex((img) => img === image) as number;
      setImageIndex(imageIndex);
      setOpen(!open);
    },
    [images, open]
  );

  return (
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
      <Lightbox
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)" } }}
        close={() => setOpen(false)}
        slides={lightboxImage}
        index={imageIndex}
        open={open}
        plugins={[Fullscreen, Zoom]}
        on={{
          view({ index }) {
            setImageIndex(index);
          },
        }}
      />

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
            slideImages.length > 0 ? "grid-rows-6" : "grid-rows-4"
          } gap-2`}
          data-aos="zoom-out-up"
        >
          {gridImages.map((img, index) => (
            <div
              key={`gallery-${index + 1}`}
              onClick={() => handleToggleLightbox(img)}
              className={`${gridSpan(index)} w-full relative overflow-hidden`}
            >
              <Image
                sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                priority
                src={img}
                fill
                alt={`gallery-${index + 1}`}
                className="object-cover hover:scale-105 transition-transform ease-in-out duration-500 bg-white/5"
              />
            </div>
          ))}

          {slideImages.length > 0 && (
            <div className="col-span-4 row-span-2 w-full">
              <Swiper
                autoplay
                speed={2000}
                spaceBetween={8}
                modules={[Autoplay]}
                className="w-full h-full"
              >
                {slideImages.length > 0 &&
                  slideImages.map((image, index) => (
                    <SwiperSlide
                      key={`gallery-${index + 6}`}
                      className="relative flex justify-center items-center h-full"
                    >
                      <div
                        onClick={() => handleToggleLightbox(image)}
                        className="relative h-full w-full"
                      >
                        <Image
                          priority
                          sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
                          src={image}
                          alt={`galeri-${index + 6}`}
                          fill
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
  );
};

export default memo(GalleryComponent);
