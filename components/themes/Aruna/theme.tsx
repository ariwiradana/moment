import React, { FC } from "react";
import Layout from "../layout";
import PreviewNav from "../preview.nav";
import Image from "next/image";
import { roboto } from "@/lib/fonts";
import { getEventNames } from "@/utils/getEventNames";
import dynamic from "next/dynamic";
import useMusic from "@/hooks/themes/useMusic";
import useCoverStore from "@/store/useCoverStore";
import useClientStore from "@/store/useClientStore";
import useParticipants from "@/hooks/themes/useParticipants";

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
// const ParticipantsComponent = dynamic(() => import("./layouts/participants"));
const GiftComponent = dynamic(() => import("./layouts/gift"));

interface Props {
  untuk: string;
}

const Aruna: FC<Props> = (props) => {
  const { state, actions, refs } = useMusic();
  const { isOpen } = useCoverStore();
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();

  return (
    <Layout>
      <>
        <MusicComponent actions={actions} refs={refs} state={state} />
        {isOpen && <PreviewNav />}
        <Cover actions={actions} untuk={props.untuk} />
        {isOpen && (
          <div className="flex justify-between">
            <div className="fixed inset-0 hidden xl:block">
              <div className="relative xl:w-[70vw] 2xl:w-[80vw] h-dvh">
                <div className="bg-gradient-to-b from-aruna-dark/40 from-[5%] via-aruna-dark/20 to-[95%] to-aruna-dark absolute inset-0 z-20 flex flex-col justify-end p-[100px]">
                  <p
                    data-aos="fade-up"
                    data-aos-delay="600"
                    className={`${roboto.className} text-white/80 md:text-xs text-[10px] tracking-[4px] mb-3 uppercase`}
                  >
                    Undangan {getEventNames(client?.events || [])}
                  </p>
                  <h1
                    data-aos="fade-up"
                    data-aos-delay="800"
                    className={`font-high-summit text-white text-4xl md:text-5xl 2xl:text-6xl leading-10 mb-2`}
                  >
                    {participantState.groom?.nickname} &{" "}
                    {participantState.bride?.nickname}
                  </h1>
                </div>
                {client?.cover && (
                  <Image
                    priority
                    quality={100}
                    sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                    src={client?.cover as string}
                    fill
                    className="object-cover shine-dark"
                    alt="cover"
                  />
                )}
              </div>
            </div>
            <div
              className={`relative w-full xl:max-w-[30vw] 2xl:max-w-[20vw] ml-auto`}
            >
              <HeroComponent />
              {/* <ParticipantsComponent /> */}
              <EventsComponent />
              <VideoComponent />
              <FotoComponent />
              <GiftComponent />
              <RSVPWishes />
              <ThankyouComponent />
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Aruna;
