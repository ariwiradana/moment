import { useAakarshana } from "@/hooks/themes/useAakarshana";
import Image from "next/image";
import React, { FC } from "react";
import { BiPause, BiPlay } from "react-icons/bi";

interface Props {
  actions: useAakarshana["actions"];
  state: useAakarshana["state"];
  refs: useAakarshana["refs"];
}

const MusicComponent: FC<Props> = (props) => {
  if (props.state.client?.music)
    return (
      <div className="fixed bottom-4 right-4 z-50" data-aos="zoom-in-up">
        <button
          aria-label="music-button"
          onClick={props.actions.handlePlayPause}
          className="w-8 h-8 md:h-12 md:w-12 lg:h-16 lg:w-16 bg-aakarshana-primary rounded-full overflow-hidden flex justify-center items-center text-white text-xl relative shadow-sm md:text-2xl lg:text-3xl"
        >
          <Image
            sizes="100px"
            alt={`img-music`}
            src="/images/theme1/pattern2.png"
            fill
            className="w-full h-full object-cover opacity-20"
          />
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
