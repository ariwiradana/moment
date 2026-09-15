"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import useClientStore from "@/store/useClientStore";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import YoutubeEmbed from "../../youtube.embed";
import { getParticipantNames } from "@/utils/getParticipantNames";

const Video: NextPage = () => {
  const { client } = useClientStore();
  const { videos = [], participants = [] } = client || {};

  const [isShowVideo, setIsShowVideo] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  const youtubeVideos = useMemo(() => {
    if (!videos?.length) return [];
    return (videos as string[]).filter(isYoutubeVideo).map((url) => ({
      url,
      youtubeId: getYouTubeVideoId(url),
    }));
  }, [videos]);

  const participantNames = useMemo(
    () => getParticipantNames(participants),
    [participants]
  );

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        setIsShowVideo(width >= 1024);
      }, 200);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isShowVideo || youtubeVideos.length === 0) return null;

  return (
    <section className="h-dvh snap-start w-full relative bg-gradient-to-b bg-luma-dark/80">
      <div className="absolute z-20 inset-0 max-w-[80vw] mx-auto flex flex-col justify-center items-center">
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

export default memo(Video);
