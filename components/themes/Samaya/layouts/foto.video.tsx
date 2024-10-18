import React, { FC, useState } from "react";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { marcellus, windsong } from "@/lib/fonts";
import YouTubePlayer from "@/components/admin/elements/youtube.player";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import ImageShimmer from "@/components/image.shimmer";

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
        <div className="mt-10 md:max-w-screen-sm lg:max-w-screen-lg mx-auto">
          <div className="grid grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-4">
            {images.map((img, index) => (
              <div
                onClick={() => {
                  setOpen(() => true);
                  setImageIndex(() => index);
                }}
                key={img}
                className={`${
                  index % 3 === 0 || index === images.length - 1
                    ? "col-span-2"
                    : "col-span-1"
                } lg:min-h-96 md:min-h-72 min-h-80 w-full relative rounded-lg overflow-hidden`}
              >
                <ImageShimmer
                  sizes="300px"
                  priority
                  src={img}
                  alt={`gallery-img-${index + 1}`}
                  fill
                  className="object-cover rounded-lg hover:scale-[1.01] ease-in-out duration-500 w-full h-full"
                />
              </div>
            ))}
          </div>
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
        </div>
      </div>
    </section>
  );
};

export default GalleryComponent;
