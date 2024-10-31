import React, { FC } from "react";
import { lora } from "@/lib/fonts";
import Button from "../elements/button";
import { useAruna } from "@/hooks/themes/useAruna";
import { BiEnvelopeOpen } from "react-icons/bi";

interface Props {
  state: useAruna["state"];
  actions: useAruna["actions"];
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
          data-aos="fade-in"
          className="relative z-30 bg-gradient-to-b from-aruna-dark/40 from-[5%] via-aruna-dark/20 to-[95%] to-aruna-dark"
        >
          <div className="flex h-dvh flex-col justify-between py-[60px] md:py-[100px] px-8 max-w-screen-xl mx-auto">
            <div>
              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className={`${lora.className} text-white md:text-base text-sm mb-2`}
              >
                Undangan {props.state.client?.theme?.category}
              </p>
              <h1
                style={{ lineHeight: "normal" }}
                data-aos="fade-up"
                data-aos-delay="400"
                className={`font-tan-pearl text-white text-[32px] md:text-5xl`}
              >
                {props.state.groom?.nickname}
                <br />& {props.state.bride?.nickname}
              </h1>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-delay="1000"
              className="h-full w-[1px] bg-white/50 my-8"
            ></div>
            <div>
              <div data-aos="fade-down" data-aos-delay="800">
                <p
                  className={`${lora.className} text-white text-sm md:text-base`}
                >
                  Yth. Bapak/Ibu/Saudara/i
                </p>
                <p
                  className={`${lora.className} text-white text-2xl md:text-3xl`}
                >
                  {props.untuk}
                </p>
              </div>
              <div
                className="mt-6 md:mt-8"
                data-aos="fade-down"
                data-aos-delay="600"
              >
                <Button
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
        </div>
      </div>
    </>
  );
};

export default Cover;
