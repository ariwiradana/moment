import React, { FC, useState } from "react";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { marcellus } from "@/lib/fonts";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import {
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

interface Props {
  state: useSamaya["state"];
}

const GalleryComponent: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images =
    Array.isArray(props.state.client?.gallery) &&
    props.state.client?.gallery.length > 0
      ? props.state.client?.gallery
      : [];

  const lightboxImage = images.map((img) => ({ src: img }));

  const videos =
    Array.isArray(props.state.client?.videos) &&
    props.state.client.videos.length > 0
      ? props.state.client.videos
      : [];

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getCols = () => {
    if (isDesktop) return 3;
    if (isTablet) return 3;
    if (isMobile) return 1;
  };

  const getGap = () => {
    if (isDesktop) return 32;
    if (isTablet) return 32;
    if (isMobile) return 16;
  };

  return (
    <section className="relative bg-gradient-to-b from-samaya-dark to-samaya-dark/80 overflow-hidden z-20">
      <Lightbox
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .9)" } }}
        close={() => setOpen(false)}
        slides={lightboxImage}
        index={imageIndex}
        open={open}
        on={{
          view(props: { index: number }) {
            setImageIndex(props.index);
          },
        }}
      />

      <div
        data-aos="fade-up"
        className="w-full h-full relative pt-16 lg:pt-24 pb-4 md:pb-8 px-4 md:px-8 z-20"
      >
        <h1
          data-aos="fade-up"
          className={`font-tan-pearl text-2xl md:text-3xl text-center text-samaya-primary`}
        >
          Momen Bahagia
        </h1>
        <p
          data-aos="fade-up"
          className={`${marcellus.className} text-sm md:text-base text-center leading-5 text-white mt-2 mb-8 max-w-screen-md mx-auto`}
        >
          Foto {videos.length > 0 && "& Video "} dari Klien{" "}
          {props.state.groom?.nickname} & {props.state.bride?.nickname}
        </p>
        <div
          className="mt-10 flex flex-col gap-4 md:gap-8"
          data-aos="zoom-in-up"
        >
          <ImageList
            variant="masonry"
            cols={getCols()}
            gap={getGap()}
            className="overflow-hidden"
          >
            {images.map((img, index) => (
              <ImageListItem key={img}>
                <Image
                  onClick={() => {
                    setOpen(() => true);
                    setImageIndex(() => index);
                  }}
                  className="rounded-3xl hover:scale-[0.99] transition-transform ease-in-out duration-500"
                  src={img}
                  alt={`gallery-img-${index + 1}`}
                  width={360}
                  height={360}
                  layout="responsive"
                  objectFit="cover"
                  priority
                />
              </ImageListItem>
            ))}
          </ImageList>
          {videos.length > 0 && (
            <div className="grid gap-4 -mt-4 md:mt-0" data-aos="zoom-in-up">
              {videos.map((v) => {
                const youtubeId = getYouTubeVideoId(v);
                return (
                  <div
                    key={youtubeId}
                    className="relative w-full aspect-video rounded-3xl overflow-hidden"
                  >
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&showinfo=0&rel=0&vq=hd1080`}
                      title={v}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryComponent;
