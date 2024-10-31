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
interface Props {
  untuk: string;
  client: Client;
}

const Aruna: FC<Props> = (props) => {
  const { state, actions, refs } = useAruna(props.client);

  return (
    <Layout
      pageTitle={
        state.client
          ? state.client.status === "unpaid"
            ? `Preview Undangan ${state.client.theme?.category} ${state.groom?.nickname} & ${state.bride?.nickname} | Moment`
            : state.client.is_preview
            ? `Preview Undangan Tema ${state.client.theme?.name} | Moment`
            : `Undangan ${state.client.theme?.category} ${state.groom?.nickname} & ${state.bride?.nickname} | Moment`
          : "Moment"
      }
    >
      <>
        {state.client?.status === "unpaid" && <PreviewNav state={state} />}
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

export default Aruna;
