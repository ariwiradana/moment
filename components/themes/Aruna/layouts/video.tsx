import React, { memo } from "react";
import { useAruna } from "@/hooks/themes/useAruna";
import "yet-another-react-lightbox/styles.css";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import dynamic from "next/dynamic";

const YoutubeEmbed = dynamic(() => import("../elements/youtube.embed"), {
  ssr: false,
});

interface Props {
  state: useAruna["state"];
}

const VideoComponent = ({ state }: Props) => {
  const { client } = state;
  const { videos = [] } = client || {};

  if (videos.length > 0)
    return (
      <section className="relative bg-aruna-dark overflow-hidden">
        <div className="grid gap-2">
          {(videos as string[]).map((v) => {
            const youtubeId = getYouTubeVideoId(v);
            if (isYoutubeVideo(v))
              return <YoutubeEmbed key={youtubeId} youtubeId={youtubeId} />;
          })}
        </div>
      </section>
    );
};

export default memo(VideoComponent);
