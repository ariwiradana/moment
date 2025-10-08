import Script from "next/script";
import React, { memo, useEffect, useRef, useState, useCallback } from "react";

interface YouTubeEmbedProps {
  youtubeId: string | null;
  title: string;
}

const YoutubeEmbed = ({ youtubeId, title }: YouTubeEmbedProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const loadIframe = useCallback(() => {
    if (!youtubeId || !containerRef.current || iframeRef.current) return;

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&playlist=${youtubeId}&loop=1&modestbranding=1&rel=0&vq=hd1080&mute=1&controls=0&autoplay=0`;
    iframe.className = "absolute top-0 left-0 w-full h-full";
    iframe.title = `${title} Video`;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.loading = "lazy";
    iframe.onload = () => setVideoLoaded(true);

    iframeRef.current = iframe;
    containerRef.current.appendChild(iframe);
  }, [youtubeId, title]);

  const controlVideo = useCallback(
    (action: "playVideo" | "pauseVideo") => {
      if (videoLoaded && iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: action }),
          "*"
        );
      }
    },
    [videoLoaded]
  );

  // IntersectionObserver untuk lazy load
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            controlVideo("playVideo");
          } else {
            controlVideo("pauseVideo");
          }
        });
      },
      { rootMargin: "0px 0px 300px 0px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [controlVideo]);

  useEffect(() => {
    if (isVisible) loadIframe();
    return () => {
      if (iframeRef.current) {
        iframeRef.current.remove();
        iframeRef.current = null;
      }
    };
  }, [isVisible, loadIframe]);

  if (!youtubeId) return null;

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black/20 rounded-md">
      <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      <div
        ref={containerRef}
        className="w-full h-full relative flex items-center justify-center"
      >
        {!videoLoaded && (
          <div className="absolute w-full h-full bg-black/40 flex items-center justify-center animate-pulse text-white text-xs">
            Loading Video...
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(YoutubeEmbed);
