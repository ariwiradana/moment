import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import HeroComponent from "./layouts/hero";
import { Client } from "@/lib/types";
import GalleryComponent from "./layouts/foto.video";
import ThankyouComponent from "./layouts/thankyou";
import RSVPWishes from "./layouts/rsvp.wishes";
import MusicComponent from "./layouts/music";
import EventsComponent from "./layouts/events";
import ParticipantsComponent from "./layouts/participants";
import GiftComponent from "./layouts/gift";
import PreviewNav from "../preview.nav";
import useAruna from "@/hooks/themes/useAruna";
import Image from "next/image";
import { roboto } from "@/lib/fonts";
interface Props {
  untuk: string;
  client: Client;
}

const Aruna: FC<Props> = (props) => {
  const { state, actions, refs } = useAruna(props.client);

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
          <div className="flex justify-between overflow-hidden">
            <div className="fixed inset-0 hidden xl:block">
              <div className="relative xl:w-[60vw] 2xl:w-[70vw] h-dvh">
                <div className="bg-gradient-to-b from-aruna-dark/40 from-[5%] via-aruna-dark/20 to-[95%] to-aruna-dark absolute inset-0 z-20 flex flex-col justify-end p-[100px]">
                  <p
                    data-aos="fade-up"
                    data-aos-delay="600"
                    className={`${roboto.className} text-white/80 md:text-xs text-[10px] tracking-[4px] mb-3 uppercase`}
                  >
                    Undangan {state.client?.theme_category?.name}
                  </p>
                  <h1
                    data-aos="fade-up"
                    data-aos-delay="800"
                    className={`font-high-summit text-white text-5xl md:text-6xl leading-10 2xl:text-7xl mb-2`}
                  >
                    {state.groom?.nickname}
                    <br />& {state.bride?.nickname}
                  </h1>
                </div>
                {state.client?.cover && (
                  <Image
                    src={state.client?.cover as string}
                    fill
                    className="object-cover"
                    alt="cover"
                  />
                )}
              </div>
            </div>
            <div
              className={`relative xl:max-w-[40vw] 2xl:max-w-[30vw] overflow-auto ml-auto`}
            >
              <HeroComponent state={state} />
              <ParticipantsComponent state={state} />
              <EventsComponent actions={actions} state={state} />
              <GalleryComponent state={state} />
              <GiftComponent actions={actions} state={state} />
              <RSVPWishes actions={actions} state={state} />
              <ThankyouComponent state={state} />
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Aruna;
