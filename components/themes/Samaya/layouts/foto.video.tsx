import React, { FC, useState } from "react";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { marcellus, windsong } from "@/lib/fonts";
import YouTubePlayer from "@/components/admin/elements/youtube.player";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import { ImageList, ImageListItem } from "@mui/material";
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
        className="w-full h-full relative py-16 lg:py-24 px-4 z-20"
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
        <div className="mt-10 md:max-w-screen-sm lg:max-w-screen-lg mx-auto flex flex-col gap-2">
          {videos.length > 0 && (
            <div className="grid gap-4">
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
          <ImageList variant="masonry" cols={2} gap={8}>
            {images.map((img, index) => (
              <ImageListItem key={img}>
                <Image
                  onClick={() => {
                    setOpen(() => true);
                    setImageIndex(() => index);
                  }}
                  className="rounded"
                  src={img}
                  alt={`gallery-img-${index + 1}`}
                  width={248}
                  height={248}
                  layout="responsive"
                  objectFit="cover"
                  priority
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
    </section>
  );
};

export default GalleryComponent;
