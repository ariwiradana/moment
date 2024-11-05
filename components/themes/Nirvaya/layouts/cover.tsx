import React, { FC } from "react";
import { balthazar, italiana } from "@/lib/fonts";
import { useNirvaya } from "@/hooks/themes/useNirvaya";
import { BiEnvelopeOpen } from "react-icons/bi";
import { getEventNames } from "@/utils/getEventNames";
import ButtonPrimary from "../elements/button.primary";

interface Props {
  state: useNirvaya["state"];
  actions: useNirvaya["actions"];
  untuk: string;
}

const Cover: FC<Props> = (props) => {
  return (
    <>
      <div
        className={`w-full h-dvh fixed inset-x-0 transition-all ease-in-out duration-1000 delay-500 z-50 ${
          props.state.open
            ? "-bottom-full invisible opacity-0"
            : "bottom-0 visible"
        }`}
      >
        <div
          data-aos="zoom-out-up"
          className="flex h-dvh flex-col items-center justify-end relative z-30 py-[60px] md:py-[100px] px-8 bg-gradient-to-b from-transparent via-nirvaya-dark/50 via-[50%] md:via-[30%] to-[70%] md:to-[80%] to-nirvaya-dark"
        >
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className={`${balthazar.className} text-white md:text-base text-sm mt-8 uppercase text-center`}
          >
            Undangan {getEventNames(props.state.client?.events || [])}
          </p>
          <h1
            data-aos="fade-up"
            data-aos-delay="600"
            className={`${italiana.className} text-white text-center text-[40px] md:text-5xl`}
          >
            {props.state.groom?.nickname} & {props.state.bride?.nickname}
          </h1>
          <div data-aos="fade-up" data-aos-delay="800">
            <p
              className={`${balthazar.className} text-white text-sm md:text-base mt-4 md:mt-6 text-center`}
            >
              Yth. Bapak/Ibu/Saudara/i
            </p>
            <p
              className={`${balthazar.className} text-white text-xl md:text-2xl mt-1 md:mt-3 text-center`}
            >
              {props.untuk}
            </p>
          </div>
          <p
            data-aos="fade-up"
            data-aos-delay="1000"
            className={`${balthazar.className} text-white text-sm md:text-base mt-2 md:mt-4 max-w-sm mx-auto text-center`}
          >
            Tanpa mengurangi rasa hormat, kami mengundang anda untuk menghadiri
            acara{" "}
            <span className="lowercase">
              {getEventNames(props.state.client?.events || [])}
            </span>{" "}
            kami
          </p>
          <div
            className="mt-6 md:mt-8"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            <ButtonPrimary
              onClick={() => {
                props.actions.handleOpenCover();
                props.actions.handlePlayPause();
              }}
              icon={<BiEnvelopeOpen />}
              title="Buka Undangan"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cover;
