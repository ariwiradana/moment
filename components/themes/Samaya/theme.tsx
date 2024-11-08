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
import PreviewNav from "../preview.nav";
interface Props {
  untuk: string;
  client: Client;
}

const Samaya: FC<Props> = (props) => {
  const { state, actions, refs } = useSamaya(props.client);
  return (
    <Layout>
      <>
        {state.open && <PreviewNav state={state} />}
        <Cover actions={actions} state={state} untuk={props.untuk} />
        <HeroComponent state={state} />
        <MusicComponent
          className={!state.open ? "invisible" : "visible"}
          actions={actions}
          refs={refs}
          state={state}
        />
        {state.open && (
          <div className="relative">
            <ParticipantsComponent state={state} />
            <EventsComponent actions={actions} state={state} />
            {/* {state.client?.package?.love_journey && (
              <LoveJourneyComponent actions={actions} state={state} />
            )} */}
            <GalleryComponent state={state} />
            {state.client?.package?.rsvp_and_greetings && (
              <RSVPWishes actions={actions} state={state} />
            )}
            {state.client?.package?.digital_envelope && (
              <GiftComponent actions={actions} state={state} />
            )}
            <ThankyouComponent state={state} />
          </div>
        )}
      </>
    </Layout>
  );
};

export default Samaya;
