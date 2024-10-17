import React, { FC } from "react";
import Title from "../elements/title";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Image from "next/image";
import "yet-another-react-lightbox/styles.css";
import YouTubePlayer from "@/components/admin/elements/youtube.player";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";

interface Props {
  state: useSamaya["state"];
  actions: useSamaya["actions"];
}

const VideoComponent: FC<Props> = (props) => {
  const videos =
    Array.isArray(props.state.client?.videos) &&
    props.state.client.videos.length > 0
      ? props.state.client.videos
      : [];

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
                className="text-aakarshana-primary"
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
              {videos.map((video, index) => {
                const youtubeId = getYouTubeVideoId(video);
                return (
                  <YouTubePlayer
                    key={`video-${index}`}
                    youtubeId={youtubeId as string}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
};

export default VideoComponent;
