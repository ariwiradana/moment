import { useEffect, useState, useRef } from "react";

export interface UseMusic {
  refs: {
    audioRef: React.RefObject<HTMLAudioElement> | null;
  };
  state: {
    isPlaying: boolean;
  };
  actions: {
    handlePlayPause: () => void;
    setIsPlaying: (isPlaying: boolean) => void;
  };
}

const useMusic = (): UseMusic => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play failed:", err);
        });
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.visibilityState === "hidden") {
        if (!audio.paused) audio.pause();
      } else if (document.visibilityState === "visible" && isPlaying) {
        audio.play().catch((err) => console.warn("Audio play failed:", err));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  return {
    refs: { audioRef },
    state: { isPlaying },
    actions: { handlePlayPause, setIsPlaying },
  };
};

export default useMusic;
