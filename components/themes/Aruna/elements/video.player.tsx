import React, { memo } from "react";

interface VideoPlayerProps {
  videoUrl: string | null;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  if (!videoUrl) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      src={videoUrl}
      className="w-full h-auto aspect-video"
    />
  );
};

export default memo(VideoPlayer);
