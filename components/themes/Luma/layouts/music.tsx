import { UseMusic } from "@/hooks/themes/useMusic";
import useClientStore from "@/store/useClientStore";
import useCoverStore from "@/store/useCoverStore";
import Image from "next/image";
import React, { memo, useMemo } from "react";
import toast from "react-hot-toast";
import { BiPause, BiPlay } from "react-icons/bi";

const Music = ({ state, actions, refs }: UseMusic) => {
  const { client } = useClientStore();
  const { isOpen } = useCoverStore();
  const musicSrc = client?.music as string;

  // Memoize classNames
  const wrapperClass = useMemo(
    () =>
      `fixed z-50 w-10 h-10 md:h-12 md:w-12 transition-all ease-in-out duration-1000 delay-1000 ${
        !isOpen
          ? "invisible opacity-0 -bottom-4 right-4 md:right-8 md:-bottom-8 scale-0"
          : "visible bottom-4 right-4 md:right-8 md:bottom-8 opacity-100 -scale-80"
      }`,
    [isOpen]
  );

  const spinClass = useMemo(
    () =>
      `object-cover w-full rounded-full transition-all ease-in-out delay-200 grayscale-[60%] p-2 ${
        state.isPlaying ? "animate-spin-slow" : "animate-none"
      }`,
    [state.isPlaying]
  );

  // Render nothing if no music
  if (!musicSrc) return null;

  // Generate concentric borders dynamically to reduce repetition
  const borders = [90, 80, 70, 60, 50];

  return (
    <div className={wrapperClass}>
      <button
        aria-label={state.isPlaying ? "Pause music" : "Play music"}
        onClick={actions.handlePlayPause}
        className="w-10 h-10 md:h-12 md:w-12 bg-luma-dark rounded-full overflow-hidden flex justify-center items-center text-white text-2xl relative shadow-sm md:text-2xl lg:text-3xl"
      >
        {client?.cover && (
          <Image
            fill
            alt="cover-music"
            priority
            sizes="50px"
            className={spinClass}
            src={client.cover}
          />
        )}

        <div className="relative z-20 flex justify-center items-center w-full h-full">
          {state.isPlaying ? <BiPause /> : <BiPlay />}
        </div>

        {borders.map((size) => (
          <div
            key={size}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 rounded-full border border-white/10"
            style={{ width: `${size}%`, height: `${size}%` }}
          />
        ))}
      </button>

      <audio
        loop
        ref={refs.audioRef}
        controls={false}
        onPlay={() => actions.setIsPlaying(true)}
        onPause={() => actions.setIsPlaying(false)}
        onError={() => {
          console.error("Error loading audio");
          toast.error("Audio tidak dapat diputar. Coba lagi nanti.");
        }}
      >
        <source src={musicSrc} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default memo(Music);
