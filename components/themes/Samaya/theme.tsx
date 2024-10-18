import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import HeroComponent from "./layouts/hero";
import { Client } from "@/lib/types";
import useSamaya from "@/hooks/themes/useSamaya";
import GalleryComponent from "./layouts/foto.video";
import ThankyouComponent from "./layouts/thankyou";
import RSVPWishes from "./layouts/rsvp.wishes";
import MusicComponent from "./layouts/music";
import EventsComponent from "./layouts/events";
import ParticipantsComponent from "./layouts/participants";
import GiftComponent from "./layouts/gift";
interface Props {
  untuk: string;
  client: Client;
}

const Samaya: FC<Props> = (props) => {
  const { state, actions, refs } = useSamaya(props.client);

  return (
    <Layout
      pageTitle={
        props.client
          ? `${state.groom?.nickname} & ${state.bride?.nickname}`
          : "Moment"
      }
    >
      <>
        <Cover actions={actions} state={state} untuk={props.untuk} />
        {state.open && (
          <div className="relative">
            <MusicComponent actions={actions} refs={refs} state={state} />
            <HeroComponent state={state} />
            <ParticipantsComponent state={state} />
            <EventsComponent actions={actions} state={state} />
            <GalleryComponent state={state} />
            <RSVPWishes actions={actions} state={state} />
            <GiftComponent actions={actions} state={state} />
            <ThankyouComponent state={state} />
          </div>
        )}
      </>
    </Layout>
  );
};

export default Samaya;
