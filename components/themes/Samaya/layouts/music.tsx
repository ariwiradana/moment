import { useSamaya } from "@/hooks/themes/useSamaya";
import Image from "next/image";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { BiPause, BiPlay } from "react-icons/bi";

interface Props {
  actions: useSamaya["actions"];
  state: useSamaya["state"];
  refs: useSamaya["refs"];
  className?: string;
}

const MusicComponent: FC<Props> = (props) => {
  const musicSrc = props.state.client?.music as string;

  if (musicSrc) {
    return (
      <div
        className={`fixed bottom-4 right-4 md:right-8 md:bottom-8 z-50 w-10 h-10 md:h-12 md:w-12 ${
          props.className ?? ""
        }`}
        data-aos="zoom-in-up"
        data-aos-offset="80"
      >
        <button
          aria-label={props.state.isPlaying ? "Pause music" : "Play music"}
          onClick={props.actions.handlePlayPause}
          className="w-10 h-10 md:h-12 md:w-12 bg-samaya-dark border border-samaya-primary rounded-full overflow-hidden flex justify-center items-center text-white text-2xl relative shadow-sm md:text-2xl lg:text-3xl"
        >
          <Image
            fill
            alt="cover-music"
            priority
            sizes="50px"
            className={`object-cover w-full rounded-full transition-all ease-in-out delay-200 grayscale-[60%] ${
              props.state.isPlaying ? "animate-spin-slow" : "animate-none"
            }`}
            src={props.state.client?.cover as string}
          />
          <div className="relative z-20 w-full h-full rounded-full flex justify-center items-center">
            {props.state.isPlaying ? <BiPause /> : <BiPlay />}
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 w-[80%] h-[80%] rounded-full flex justify-center items-center border border-white/30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 w-[50%] h-[50%] rounded-full flex justify-center items-center border border-white/30"></div>
        </button>

        <audio
          ref={props.refs.audioRef}
          controls={false}
          onPlay={() => props.actions.setIsPlaying(true)}
          onPause={() => props.actions.setIsPlaying(false)}
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

export default MusicComponent;
