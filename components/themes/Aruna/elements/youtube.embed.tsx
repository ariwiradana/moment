import Script from "next/script";
import React, { memo, useEffect, useRef, useState, useCallback } from "react";

interface YouTubeEmbedProps {
  youtubeId: string | null;
  title: string;
}

const YoutubeEmbed = ({ youtubeId, title }: YouTubeEmbedProps) => {
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const loadVideo = useCallback(() => {
    if (youtubeId && videoContainerRef.current && !iframeRef.current) {
      const iframe = document.createElement("iframe");
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&playlist=${youtubeId}&loop=1&modestbranding=1&showinfo=0&rel=0&vq=hd1080&mute=1`
      );

      iframe.setAttribute("class", "absolute top-0 left-0 w-full h-full");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.setAttribute("title", `${title} Video`);
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("loading", "lazy");
      iframe.onload = () => setVideoLoaded(true);
      iframeRef.current = iframe;
      videoContainerRef.current.appendChild(iframe);
    }
  }, [youtubeId]);

  const controlVideo = useCallback(
    (action: "playVideo" | "pauseVideo") => {
      if (videoLoaded && iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: action }),
          "*"
        );
      }
    },
    [videoLoaded]
  );

  useEffect(() => {
    if (youtubeId) {
      loadVideo();
    }
  }, [youtubeId, loadVideo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controlVideo("playVideo");
          } else {
            controlVideo("pauseVideo");
          }
        });
      },
      { rootMargin: "0px 0px 200px 0px" }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, [videoLoaded, controlVideo]);

  if (!youtubeId) return null;

  return (
    <div>
      <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      <div
        className="relative w-full aspect-video overflow-hidden"
        ref={videoContainerRef}
      ></div>
    </div>
  );
};

export default memo(YoutubeEmbed);
