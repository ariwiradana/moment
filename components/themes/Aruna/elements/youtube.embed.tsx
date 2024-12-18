import React, { memo } from "react";

interface YouTubeEmbedProps {
  youtubeId: string | null;
}
const YoutubeEmbed = ({ youtubeId }: YouTubeEmbedProps) => {
  if (youtubeId)
    return (
      <div className="relative w-full aspect-video overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&showinfo=0&rel=0`}
          title={`video-${youtubeId}`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
};

export default memo(YoutubeEmbed);
