import React, { FC } from "react";
import Layout from "../layout";
import PreviewNav from "../preview.nav";
import useAruna from "@/hooks/themes/useAruna";
import Image from "next/image";
import { roboto } from "@/lib/fonts";
import { getParticipantNames } from "@/utils/getParticipantNames";
import { getEventNames } from "@/utils/getEventNames";
import dynamic from "next/dynamic";

const Cover = dynamic(() => import("./layouts/cover"));
const HeroComponent = dynamic(() => import("./layouts/hero"), {
  ssr: false,
});
const VideoComponent = dynamic(() => import("./layouts/video"), {
  ssr: false,
});
const FotoComponent = dynamic(() => import("./layouts/foto"), {
  ssr: false,
});
const ThankyouComponent = dynamic(() => import("./layouts/thankyou"));
const RSVPWishes = dynamic(() => import("./layouts/rsvp.wishes"), {
  ssr: false,
});
const MusicComponent = dynamic(() => import("./layouts/music"));
const EventsComponent = dynamic(() => import("./layouts/events"));
const ParticipantsComponent = dynamic(() => import("./layouts/participants"));
const GiftComponent = dynamic(() => import("./layouts/gift"));

interface Props {
  untuk: string;
}

const Aruna: FC<Props> = (props) => {
  const { state, actions, refs } = useAruna();

  return (
    <Layout>
      <>
        <MusicComponent
          className={!state.open ? "invisible" : "visible"}
          actions={actions}
          refs={refs}
          state={state}
        />
        {state.open && <PreviewNav state={state} />}
        <Cover actions={actions} state={state} untuk={props.untuk} />
        {state.open && (
          <div className="flex justify-between">
            <div className="fixed inset-0 hidden xl:block">
              <div className="relative xl:w-[60vw] 2xl:w-[70vw] h-dvh">
                <div className="bg-gradient-to-b from-aruna-dark/40 from-[5%] via-aruna-dark/20 to-[95%] to-aruna-dark absolute inset-0 z-20 flex flex-col justify-end p-[100px]">
                  <p
                    data-aos="fade-up"
                    data-aos-delay="600"
                    className={`${roboto.className} text-white/80 md:text-xs text-[10px] tracking-[4px] mb-3 uppercase`}
                  >
                    Undangan {getEventNames(state.client?.events || [])}
                  </p>
                  <h1
                    data-aos="fade-up"
                    data-aos-delay="800"
                    className={`font-high-summit text-white text-4xl md:text-5xl leading-10 2xl:text-6xl mb-2`}
                  >
                    {state.client?.theme_category?.name === "Pernikahan" ? (
                      <>
                        {state.groom?.nickname}
                        <br />& {state.bride?.nickname}
                      </>
                    ) : (
                      <>
                        {getParticipantNames(state.client?.participants || [])}
                      </>
                    )}
                  </h1>
                </div>
                {state.client?.cover && (
                  <Image
                    priority
                    quality={100}
                    sizes="100vw"
                    src={state.client?.cover as string}
                    fill
                    className="object-cover"
                    alt="cover"
                  />
                )}
              </div>
            </div>
            <div
              className={`relative w-full xl:max-w-[40vw] 2xl:max-w-[30vw] ml-auto`}
            >
              <HeroComponent state={state} />
              <ParticipantsComponent state={state} />
              <EventsComponent actions={actions} state={state} />
              <VideoComponent state={state} />
              <FotoComponent state={state} />
              <GiftComponent actions={actions} state={state} />
              <RSVPWishes />
              <ThankyouComponent state={state} />
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Aruna;
