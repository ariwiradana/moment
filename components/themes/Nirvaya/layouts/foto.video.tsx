import React, { FC, useState } from "react";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { marcellus, windsong } from "@/lib/fonts";
import YouTubePlayer from "@/components/admin/elements/youtube.player";
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
    <section className="relative bg-samaya-dark overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 bg-repeat bg-center bg-blend-lighten"
        style={{
          backgroundImage: "url('/images/samaya/texture.jpg')",
        }}
      ></div>
      <Image
        className="absolute -top-[250px] left-1/2 transform -translate-x-1/2 z-30 opacity-5"
        alt="mandala-top-img-video"
        src="/images/samaya/mandala.svg"
        height={500}
        width={500}
      />
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
        className="w-full h-full relative py-16 lg:py-24 px-4 z-20 bg-gradient-to-b from-transparent to-samaya-primary/5"
      >
        <div className="text-center" data-aos="fade-up">
          <h1
            className={`${marcellus.className} text-white text-4xl lg:text-5xl mr-8`}
          >
            Jejak
          </h1>
          <h1
            className={`${windsong.className} text-samaya-primary text-5xl lg:text-6xl transform -translate-y-3`}
          >
            Kisah
          </h1>
        </div>
        <div
          className="mt-10 md:max-w-screen-sm lg:max-w-screen-lg mx-auto flex flex-col gap-4 md:gap-8"
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
            <div className="grid gap-4" data-aos="zoom-in-up">
              {videos.map((v, index) => {
                const youtubeId = getYouTubeVideoId(v);
                return (
                  <div key={`video-${index + 1}`}>
                    <YouTubePlayer
                      key={`video-${index}`}
                      youtubeId={youtubeId as string}
                    />
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
