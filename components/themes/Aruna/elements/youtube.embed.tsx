import React, { memo, useEffect, useRef } from "react";

interface YouTubeEmbedProps {
  youtubeId: string | null;
}
const YoutubeEmbed = ({ youtubeId }: YouTubeEmbedProps) => {
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const loadVideo = () => {
    if (videoContainerRef.current && !iframeRef.current) {
      const iframe = document.createElement("iframe");
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&playlist=${youtubeId}&loop=1&modestbranding=1&showinfo=0&rel=0&vq=hd1080&mute=1`
      );
      iframe.setAttribute("class", "absolute top-0 left-0 w-full h-full");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute(
        "allow",
        "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      );
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("loading", "lazy");
      iframeRef.current = iframe;
      videoContainerRef.current.appendChild(iframe);
    }
  };

  const controlVideo = (action: "playVideo" | "pauseVideo") => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: action }),
        "*"
      );
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadVideo();
            controlVideo("playVideo");
          } else {
            controlVideo("pauseVideo");
          }
        });
      },
      { rootMargin: "0px 0px 300px 0px" }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full aspect-video overflow-hidden"
      ref={videoContainerRef}
    ></div>
  );
};

export default memo(YoutubeEmbed);
