import React, { FC, useEffect, useState } from "react";
import Title from "../elements/title";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import Image from "next/image";
import "yet-another-react-lightbox/styles.css";

interface Props {
  state: useTheme1["state"];
  actions: useTheme1["actions"];
}

const VideoComponent: FC<Props> = (props) => {
  const videos =
    Array.isArray(props.state.client?.videos) &&
    props.state.client.videos.length > 0
      ? props.state.client.videos
      : [];

  const [randomGalleryImages, setRandomGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    const gallery = props.state.client?.gallery;
    if (Array.isArray(gallery) && gallery.length > 0) {
      const videoCount = videos.length;
      const selectedImages = new Set<string>();
      while (
        selectedImages.size < videoCount &&
        selectedImages.size < gallery.length
      ) {
        const randomIndex = Math.floor(Math.random() * gallery.length);
        selectedImages.add(gallery[randomIndex]);
      }
      setRandomGalleryImages(Array.from(selectedImages));
    } else {
      setRandomGalleryImages([]);
    }
  }, [props.state.client?.gallery, videos.length]);

  if (videos.length > 0)
    return (
      <section className="relative bg-white pt-8">
        <div
          className="relative z-10 h-full w-full p-6 lg:p-16"
          data-aos="zoom-out-up"
        >
          <div className="absolute inset-0 bg-repeat bg-contain opacity-10"></div>
          <div className="w-full h-full relative z-40">
            <div
              data-aos="zoom-in-up"
              className="relative h-12 lg:h-16 w-full mb-8"
            >
              <Image
                alt="leaf-datetime"
                src="/images/theme1/leaf.svg"
                fill
                className="object-contain"
              />
            </div>
            <div data-aos="fade-up" className="mb-12">
              <Title
                className="text-theme1-primary"
                title="Rekaman Momen"
                caption={`${props.state.groom?.nickname} & ${props.state.bride?.nickname} Video`}
              />
            </div>

            <div
              className={`grid gap-[2px] ${
                videos.length >= 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {videos.map((video, index) => (
                <video
                  key={video}
                  data-aos="fade-up"
                  width="100%"
                  controls
                  className="bg-gray-100 aspect-video object-cover rounded-2xl"
                  poster={randomGalleryImages[index]}
                >
                  <source src={video} />
                </video>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
};

export default VideoComponent;
