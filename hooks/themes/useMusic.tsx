import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { BiCheck } from "react-icons/bi";

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
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (audioRef.current && !audioRef.current.paused) {
          setIsPlaying(true);
          audioRef.current.pause();
        } else {
          setIsPlaying(false);
        }
      } else if (document.visibilityState === "visible") {
        if (isPlaying && audioRef.current) {
          audioRef.current.play();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  return {
    refs: {
      audioRef,
    },
    state: {
      isPlaying,
    },
    actions: {
      handlePlayPause,
      setIsPlaying,
    },
  };
};

export default useMusic;
