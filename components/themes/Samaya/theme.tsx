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
import Seo from "@/components/dashboard/elements/seo";
import { getEventNames } from "@/utils/getEventNames";
interface Props {
  untuk: string;
  client: Client;
}

const Samaya: FC<Props> = (props) => {
  const { state, actions, refs } = useSamaya(props.client);
  const events = state.client?.events || [];
  const eventName = getEventNames(events);

  const pageTitle = state.client
    ? state.client.status === "unpaid"
      ? `Preview ${state.groom?.nickname} & ${state.bride?.nickname} | Undangan ${eventName}`
      : state.client.is_preview
      ? `Preview Undangan Tema ${state.client.theme?.name} | Moment`
      : `${state.groom?.nickname} & ${state.bride?.nickname} | Undangan ${eventName}`
    : "Moment";

  return (
    <Layout>
      <>
        <Seo
          title={pageTitle}
          description={`${state.client?.opening_title}, ${state.client?.opening_description}`}
          keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah, undangan digital bali, undangan bali, undangan digital, platform undangan online, Moment Invitation, template undangan digital, undangan pernikahan digital, undangan online, undangan digital dengan RSVP, undangan dengan Google Maps, undangan digital premium, buat undangan digital, undangan digital minimalis"
          image={state.client?.cover ?? "/images/logo-bg.jpg"}
        />
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
