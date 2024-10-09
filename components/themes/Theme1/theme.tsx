import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import HeroComponent from "./layouts/hero";
import { Client } from "@/lib/types";
import useTheme1 from "@/hooks/themes/useTheme1";
import GalleryComponent from "./layouts/gallery";
import ThankyouComponent from "./layouts/thankyou";
import RSVPWishes from "./layouts/rsvp.wishes";
import FooterComponent from "../footer";
import VideoComponent from "./layouts/video";
import MusicComponent from "./layouts/music";
import EventsComponent from "./layouts/events";
import ParticipantsComponent from "./layouts/participants";
interface Props {
  to: string;
  client: Client;
}

const Theme1: FC<Props> = (props) => {
  const { state, actions, refs } = useTheme1(props.client);

  return (
    <Layout
      pageTitle={
        props.client
          ? `${state.groom?.nickname} & ${state.bride?.nickname}`
          : "Now"
      }
    >
      <>
        <Cover actions={actions} state={state} to={props.to} />
        {state.open && (
          <div className="relative">
            <MusicComponent actions={actions} refs={refs} state={state} />
            <HeroComponent state={state} />
            <ParticipantsComponent state={state} />
            <EventsComponent actions={actions} state={state} />
            <GalleryComponent state={state} />
            <VideoComponent state={state} />
            <RSVPWishes actions={actions} state={state} />
            <ThankyouComponent state={state} />
            <FooterComponent />
          </div>
        )}
      </>
    </Layout>
  );
};

export default Theme1;
