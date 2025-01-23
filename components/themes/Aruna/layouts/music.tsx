import { UseMusic } from "@/hooks/themes/useMusic";
import useClientStore from "@/store/useClientStore";
import useCoverStore from "@/store/useCoverStore";
import Image from "next/image";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { BiPause, BiPlay } from "react-icons/bi";

const MusicComponent = ({ state, actions, refs }: UseMusic) => {
  const { client } = useClientStore();
  const { isOpen } = useCoverStore();
  const musicSrc = client?.music as string;

  if (musicSrc) {
    return (
      <div
        className={`fixed bottom-4 right-4 md:right-8 md:bottom-8 z-50 w-10 h-10 md:h-12 md:w-12 ${
          !isOpen ? "invisible" : "visible"
        }`}
        data-aos="zoom-in-up"
        data-aos-offset="80"
      >
        <button
          aria-label={state.isPlaying ? "Pause music" : "Play music"}
          onClick={actions.handlePlayPause}
          className="w-10 h-10 md:h-12 md:w-12 bg-samaya-dark rounded-full overflow-hidden flex justify-center items-center text-white text-2xl relative shadow-sm md:text-2xl lg:text-3xl"
        >
          <Image
            fill
            alt="cover-music"
            priority
            sizes="50px"
            className={`object-cover w-full rounded-full transition-all ease-in-out delay-200 grayscale-[60%] p-2 ${
              state.isPlaying ? "animate-spin-slow" : "animate-none"
            }`}
            src={client?.cover as string}
          />
          <div className="relative z-20 w-full h-full rounded-full flex justify-center items-center">
            {state.isPlaying ? <BiPause /> : <BiPlay />}
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 w-[90%] h-[90%] rounded-full flex justify-center items-center border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 w-[80%] h-[80%] rounded-full flex justify-center items-center border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 w-[70%] h-[70%] rounded-full flex justify-center items-center border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 w-[60%] h-[60%] rounded-full flex justify-center items-center border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 w-[50%] h-[50%] rounded-full flex justify-center items-center border border-white/10"></div>
        </button>

        <audio
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
  }

  return null;
};

export default memo(MusicComponent);
