"use client";
import React, { FC, Suspense, lazy } from "react";
import Layout from "../layout";
import useCoverStore from "@/store/useCoverStore";
import useMusic from "@/hooks/themes/useMusic";
import MusicComponent from "./layouts/music";
import Cover from "./layouts/cover";

const HeroComponent = lazy(() => import("./layouts/hero"));
const ParticipantsComponent = lazy(() => import("./layouts/participants"));
const EventsComponent = lazy(() => import("./layouts/events"));
const PhotosComponent = lazy(() => import("./layouts/photos"));
const GiftComponent = lazy(() => import("./layouts/gift"));
const RSVPWishes = lazy(() => import("./layouts/rsvp.wishes"));
const ThankyouComponent = lazy(() => import("./layouts/thankyou"));

interface Props {
  untuk: string;
}

const Samaya: FC<Props> = ({ untuk }) => {
  const { isOpen } = useCoverStore();
  const { state, actions, refs } = useMusic();

  return (
    <Layout>
      <>
        <MusicComponent actions={actions} refs={refs} state={state} />
        <Cover actions={actions} state={state} untuk={untuk} />
        <Suspense fallback={<div className="h-screen bg-samaya-dark" />}>
          {isOpen && (
            <>
              <HeroComponent />
              <ParticipantsComponent />
              <EventsComponent />
              <PhotosComponent />
              <GiftComponent />
              <RSVPWishes />
              <ThankyouComponent />
            </>
          )}
        </Suspense>
      </>
    </Layout>
  );
};

export default Samaya;
