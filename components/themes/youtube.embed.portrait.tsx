import React from "react";

interface Props {
  youtubeId: string;
  title: string;
}

const YoutubeEmbedPortrait = ({ title, youtubeId }: Props) => {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      <div className="absolute inset-0 z-10 bg-transparent"></div>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&rel=0&playlist=${youtubeId}`}
        title={title}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        className="absolute top-1/2 left-1/2 w-[177.78vh] h-screen -translate-x-1/2 -translate-y-1/2 scale-[1.25]"
      ></iframe>
    </div>
  );
};

export default YoutubeEmbedPortrait;
