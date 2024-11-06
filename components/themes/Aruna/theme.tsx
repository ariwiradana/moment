import React, { FC, useEffect, useState } from "react";
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
import { lora } from "@/lib/fonts";
import moment from "moment";
interface Props {
  untuk: string;
  client: Client;
}

const Aruna: FC<Props> = (props) => {
  const { state, actions, refs } = useAruna(props.client);
  const events = state.client?.events || [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);

  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
          setFade(true);
        }, 500);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [events.length]);

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
            <div className="fixed inset-0 hidden xl:block z-40">
              <div className="relative xl:w-[60vw] 2xl:w-[70vw] h-dvh">
                <div className="bg-gradient-to-b from-aruna-dark/40 from-[5%] via-aruna-dark/20 to-[95%] to-aruna-dark absolute inset-0 z-20 flex flex-col justify-end p-[100px]">
                  <h1
                    style={{ lineHeight: "normal" }}
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className={`font-tan-pearl text-white text-3xl md:text-4xl 2xl:text-5xl`}
                  >
                    {state.groom?.nickname} & {state.bride?.nickname}
                  </h1>
                  <div data-aos="fade-up" data-aos-delay="600" className="mt-3">
                    <div
                      className={`w-full flex items-center gap-x-5 md:gap-x-7 transform transition-all duration-500 ease-in-out ${
                        fade
                          ? "opacity-100 translate-y-0"
                          : "opacity-10 translate-y-1"
                      }`}
                    >
                      <p
                        className={`${lora.className} text-white text-sm md:text-base`}
                      >
                        {events[currentIndex].name}
                      </p>
                      <div className="h-1 w-1 min-h-1 min-w-1 rounded-full bg-white"></div>
                      <p
                        className={`${lora.className} text-white text-sm md:text-base`}
                      >
                        {moment(events[currentIndex].date).format(
                          "DD / MMMM / YYYY"
                        )}
                      </p>
                    </div>
                  </div>
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
            <div className="relative xl:max-w-[40vw] 2xl:max-w-[30vw] overflow-auto ml-auto">
              <HeroComponent state={state} />
              <ParticipantsComponent state={state} />
              <EventsComponent actions={actions} state={state} />
              <GalleryComponent state={state} />
              <RSVPWishes actions={actions} state={state} />
              <GiftComponent actions={actions} state={state} />
              <ThankyouComponent state={state} />
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Aruna;
