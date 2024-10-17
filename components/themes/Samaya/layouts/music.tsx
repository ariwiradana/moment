import { useSamaya } from "@/hooks/themes/useSamaya";
import React, { FC } from "react";
import { BiPause, BiPlay } from "react-icons/bi";

interface Props {
  actions: useSamaya["actions"];
  state: useSamaya["state"];
  refs: useSamaya["refs"];
}

const MusicComponent: FC<Props> = (props) => {
  if (props.state.client?.music)
    return (
      <div
        className="fixed bottom-4 right-4 md:right-8 md:bottom-8 z-50"
        data-aos="zoom-in-up"
        data-aos-offset="50"
      >
        <button
          aria-label="music-button"
          onClick={props.actions.handlePlayPause}
          className="w-8 h-8 md:h-12 md:w-12 bg-samaya-dark border border-samaya-primary rounded-full overflow-hidden flex justify-center items-center text-samaya-primary text-xl relative shadow-sm md:text-2xl lg:text-3xl"
        >
          {props.state.isPlaying ? <BiPause /> : <BiPlay />}
        </button>
        <audio
          ref={props.refs.audioRef}
          src={props.state.client?.music as string}
          autoPlay
          loop
        />
      </div>
    );
};

export default MusicComponent;
