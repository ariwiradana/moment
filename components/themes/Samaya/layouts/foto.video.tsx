import React, { FC, useState } from "react";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { marcellus, windsong } from "@/lib/fonts";
import {
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import YouTubePlayer from "@/components/admin/elements/youtube.player";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";

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

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const getCols = () => {
    if (isSmallScreen) return 2;
    if (isMediumScreen) return 3;
    if (isLargeScreen) return 4;
  };

  return (
    <section className="relative bg-samaya-dark overflow-hidden">
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
        className="w-full h-full relative py-16 lg:py-24 p-4 z-20"
      >
        <div className="text-center" data-aos="fade-up">
          <h1
            className={`${marcellus.className} text-white text-4xl lg:text-5xl mr-8`}
          >
            Potret
          </h1>
          <h1
            className={`${windsong.className} text-samaya-primary text-5xl lg:text-6xl transform -translate-y-3`}
          >
            Momen
          </h1>
        </div>
        <div className="mt-4 max-w-screen-xl mx-auto">
          {images.length > 0 && (
            <ImageList variant="masonry" cols={getCols()} gap={16}>
              {images.map((img, index) => (
                <ImageListItem
                  onClick={() => {
                    setOpen(() => true);
                    setImageIndex(() => index);
                  }}
                  data-aos="zoom-in-up"
                  key={img}
                  className="w-full a aspect-square"
                >
                  <Image
                    src={img}
                    alt={`gallery-image-${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          {videos.length > 0 && (
            <div className="grid gap-2">
              {videos.map((v, index) => {
                const youtubeId = getYouTubeVideoId(v);
                return (
                  <div key={`video-${index + 1}`} data-aos="zoom-in-up">
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
