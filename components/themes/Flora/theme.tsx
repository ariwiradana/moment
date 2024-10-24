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
// import PreviewNav from "../preview.nav";
import useFlora from "@/hooks/themes/useFlora";
interface Props {
  untuk: string;
  client: Client;
}

const Flora: FC<Props> = (props) => {
  const { state, actions, refs } = useFlora(props.client);

  return (
    <Layout
      pageTitle={
        state.client
          ? state.client.is_preview
            ? `Preview Tema ${state.client.theme?.name} | Moment`
            : `${state.groom?.nickname} & ${state.bride?.nickname}`
          : "Moment"
      }
    >
      <>
        {/* {state.client?.is_preview && <PreviewNav state={state} />} */}
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

export default Flora;
