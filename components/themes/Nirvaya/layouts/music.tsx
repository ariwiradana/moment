import { UseMusic } from "@/hooks/themes/useMusic";
import useClientStore from "@/store/useClientStore";
import useCoverStore from "@/store/useCoverStore";
import Image from "next/image";
import React, { memo, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { BiPause, BiPlay } from "react-icons/bi";

const MusicComponent = ({ state, actions, refs }: UseMusic) => {
  const { client } = useClientStore();
  const { isOpen } = useCoverStore();

  const musicSrc = useMemo(() => client?.music || "", [client?.music]);
  const coverSrc = useMemo(() => client?.cover || "", [client?.cover]);

  useEffect(() => {
    const audio = refs.audioRef?.current;
    if (!audio) return;

    const handleError = () =>
      toast.error("Audio tidak dapat diputar. Coba lagi nanti.");
    audio.addEventListener("error", handleError);

    return () => audio.removeEventListener("error", handleError);
  }, [refs.audioRef]);

  if (!musicSrc) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 md:right-8 md:bottom-8 z-50 w-12 h-12 ${
        !isOpen ? "invisible" : "visible"
      }`}
      data-aos="zoom-in-up"
      data-aos-offset="80"
    >
      <button
        aria-label={state.isPlaying ? "Pause music" : "Play music"}
        onClick={actions.handlePlayPause}
        className="w-full h-full bg-samaya-dark rounded-full flex justify-center items-center text-white shadow-lg overflow-hidden relative"
      >
        {coverSrc && (
          <Image
            fill
            src={coverSrc}
            alt="cover music"
            priority
            className={`object-cover w-full h-full rounded-full transition-all p-2 ${
              state.isPlaying ? "animate-spin-slow" : ""
            }`}
          />
        )}

        <div className="absolute z-10 flex justify-center items-center w-full h-full">
          {state.isPlaying ? (
            <BiPause className="text-xl md:text-2xl" />
          ) : (
            <BiPlay className="text-xl md:text-2xl" />
          )}
        </div>
      </button>

      <audio loop ref={refs.audioRef} controls={false}>
        <source src={musicSrc as string} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default memo(MusicComponent);
