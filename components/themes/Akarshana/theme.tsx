import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import HeroComponent from "./layouts/hero";
import { Client } from "@/lib/types";
import GalleryComponent from "./layouts/gallery";
import ThankyouComponent from "./layouts/thankyou";
import RSVPWishes from "./layouts/rsvp.wishes";
import FooterComponent from "./layouts/footer";
import VideoComponent from "./layouts/video";
import MusicComponent from "./layouts/music";
import EventsComponent from "./layouts/events";
import ParticipantsComponent from "./layouts/participants";
import GiftComponent from "./layouts/gift";
import useAakarshana from "@/hooks/themes/useAakarshana";
interface Props {
  untuk: string;
  client: Client;
}

const Aakarshana: FC<Props> = (props) => {
  const { state, actions, refs } = useAakarshana(props.client);

  return (
    <Layout>
      <>
        <Cover actions={actions} state={state} untuk={props.untuk} />
        {state.open && (
          <div className="relative">
            <MusicComponent actions={actions} refs={refs} state={state} />
            <HeroComponent state={state} />
            <ParticipantsComponent state={state} />
            <EventsComponent actions={actions} state={state} />
            <GalleryComponent state={state} />
            <VideoComponent actions={actions} state={state} />
            <RSVPWishes actions={actions} state={state} />
            <GiftComponent actions={actions} state={state} />
            <ThankyouComponent state={state} />
            <FooterComponent />
          </div>
        )}
      </>
    </Layout>
  );
};

export default Aakarshana;
