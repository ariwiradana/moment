import React, { FC, Suspense } from "react";
import Layout from "../layout";
import Image from "next/image";
import { roboto } from "@/lib/fonts";
import { getEventNames } from "@/utils/getEventNames";
import useMusic from "@/hooks/themes/useMusic";
import useCoverStore from "@/store/useCoverStore";
import useClientStore from "@/store/useClientStore";
import useParticipants from "@/hooks/themes/useParticipants";
import dynamic from "next/dynamic";
import Cover from "./layouts/cover";
import MusicComponent from "./layouts/music";

// Dynamic import heavy components
const HeroComponent = dynamic(() => import("./layouts/hero"), { ssr: false });
const ParticipantsComponent = dynamic(() => import("./layouts/participants"), {
  ssr: false,
});
const EventsComponent = dynamic(() => import("./layouts/events"), {
  ssr: false,
});
const VideoComponent = dynamic(() => import("./layouts/video"), { ssr: false });
const FotoComponent = dynamic(() => import("./layouts/foto"), { ssr: false });
const GiftComponent = dynamic(() => import("./layouts/gift"), { ssr: false });
const RSVPWishes = dynamic(() => import("./layouts/rsvp.wishes"), {
  ssr: false,
});
const ThankyouComponent = dynamic(() => import("./layouts/thankyou"), {
  ssr: false,
});

interface Props {
  untuk: string;
}

const Aruna: FC<Props> = ({ untuk }) => {
  const { state, actions, refs } = useMusic();
  const { isOpen } = useCoverStore();
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();

  return (
    <Layout>
      {/* Music tetap selalu load */}
      <MusicComponent actions={actions} refs={refs} state={state} />

      {/* Cover tetap load priority */}
      <Cover actions={actions} untuk={untuk} />

      {isOpen && (
        <div className="flex justify-between">
          {/* Left side cover */}
          <div className="fixed inset-0 hidden xl:block">
            <div className="relative xl:w-[70vw] 2xl:w-[75vw] h-dvh">
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
                  className="font-high-summit text-white text-4xl md:text-5xl 2xl:text-6xl leading-10 mb-2"
                >
                  {participantState.groom?.nickname} &{" "}
                  {participantState.bride?.nickname}
                </h1>
              </div>

              {client?.cover && (
                <Image
                  quality={80}
                  src={client.cover as string}
                  fill
                  className="object-cover shimmer-dark"
                  alt="cover"
                  sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
                  priority
                />
              )}
            </div>
          </div>

          {/* Right side sections */}
          <div className="relative w-full xl:max-w-[30vw] 2xl:max-w-[25vw] ml-auto space-y-10">
            <Suspense
              fallback={<div className="h-20 w-full bg-aruna-dark"></div>}
            >
              <HeroComponent />
            </Suspense>

            <Suspense
              fallback={<div className="h-20 w-full bg-aruna-dark"></div>}
            >
              <ParticipantsComponent />
            </Suspense>

            <Suspense
              fallback={<div className="h-20 w-full bg-aruna-dark"></div>}
            >
              <EventsComponent />
            </Suspense>

            <Suspense
              fallback={<div className="h-20 w-full bg-aruna-dark"></div>}
            >
              <VideoComponent />
            </Suspense>

            <Suspense
              fallback={<div className="h-20 w-full bg-aruna-dark"></div>}
            >
              <FotoComponent />
            </Suspense>

            <Suspense
              fallback={<div className="h-20 w-full bg-aruna-dark"></div>}
            >
              <GiftComponent />
            </Suspense>

            <Suspense
              fallback={<div className="h-20 w-full bg-aruna-dark"></div>}
            >
              <RSVPWishes />
            </Suspense>

            <Suspense
              fallback={<div className="h-20 w-full bg-aruna-dark"></div>}
            >
              <ThankyouComponent />
            </Suspense>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Aruna;
