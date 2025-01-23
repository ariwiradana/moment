import React, { memo } from "react";
import "yet-another-react-lightbox/styles.css";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import dynamic from "next/dynamic";
import VideoPlayer from "../elements/video.player";
import { getParticipantNames } from "@/utils/getParticipantNames";
import useClientStore from "@/store/useClientStore";

const YoutubeEmbed = dynamic(() => import("../elements/youtube.embed"), {
  ssr: false,
});

const VideoComponent = () => {
  const { client } = useClientStore();
  const { videos = [], participants = [] } = client || {};

  if (videos.length > 0)
    return (
      <section className="relative bg-aruna-dark overflow-hidden">
        <div className="grid gap-2">
          {(videos as string[]).map((url) => {
            if (isYoutubeVideo(url)) {
              const youtubeId = getYouTubeVideoId(url);
              return (
                <YoutubeEmbed
                  title={getParticipantNames(participants)}
                  key={youtubeId}
                  youtubeId={youtubeId}
                />
              );
            } else {
              return <VideoPlayer key={url} videoUrl={url} />;
            }
          })}
        </div>
      </section>
    );
};

export default memo(VideoComponent);
