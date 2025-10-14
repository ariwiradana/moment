import React, { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import { getParticipantNames } from "@/utils/getParticipantNames";
import useClientStore from "@/store/useClientStore";

const YoutubeEmbed = dynamic(() => import("../../youtube.embed"), {
  ssr: false,
});

const VideoComponent = () => {
  const { client } = useClientStore();
  const { videos = [], participants = [] } = client || {};

  // Memoize YouTube videos with IDs
  const youtubeVideos = useMemo(
    () =>
      (videos as string[]).filter(isYoutubeVideo).map((url) => ({
        url,
        youtubeId: getYouTubeVideoId(url),
      })),
    [videos]
  );

  const participantNames = useMemo(
    () => getParticipantNames(participants),
    [participants]
  );

  if (youtubeVideos.length === 0) return null;

  return (
    <section
      style={{ marginTop: 0 }}
      className="relative bg-aruna-dark overflow-hidden"
    >
      <div className="grid gap-2">
        {youtubeVideos.map(({ youtubeId }) => (
          <YoutubeEmbed
            key={youtubeId}
            youtubeId={youtubeId}
            title={participantNames}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(VideoComponent);
