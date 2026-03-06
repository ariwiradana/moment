import React, { memo, useEffect, useRef, useState } from "react";

interface YouTubeEmbedProps {
  youtubeId: string | null;
  title: string;
}

const YoutubeEmbed = ({ youtubeId, title }: YouTubeEmbedProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // IntersectionObserver untuk lazy load
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { rootMargin: "0px 0px 300px 0px" },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!youtubeId) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden bg-black/20"
    >
      <iframe
        src={
          isVisible
            ? `https://www.youtube.com/embed/${youtubeId}?playlist=${youtubeId}&autoplay=1&mute=1&loop=1&modestbranding=1&rel=0`
            : undefined
        }
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        onLoad={() => setVideoLoaded(true)}
      />
      {!videoLoaded && isVisible && (
        <div className="absolute w-full h-full bg-black/40 flex items-center justify-center animate-pulse text-white text-xs">
          Loading Video...
        </div>
      )}
    </div>
  );
};

export default memo(YoutubeEmbed);
