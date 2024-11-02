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
import useNirvaya from "@/hooks/themes/useNirvaya";
import Seo from "@/components/dashboard/elements/seo";
import { sosmedURLs } from "@/constants/sosmed";
interface Props {
  untuk: string;
  client: Client;
}

const Nirvaya: FC<Props> = (props) => {
  const { state, actions, refs } = useNirvaya(props.client);
  const pageTitle = state.client
    ? state.client.status === "unpaid"
      ? `Preview Undangan ${state.client.theme?.category} ${state.groom?.nickname} & ${state.bride?.nickname} | Moment`
      : state.client.is_preview
      ? `Preview Undangan Tema ${state.client.theme?.name} | Moment`
      : `Undangan ${state.client.theme?.category} ${state.groom?.nickname} & ${state.bride?.nickname} | Moment`
    : "Moment";

  return (
    <Layout pageTitle={pageTitle}>
      <>
        <Seo
          title={pageTitle}
          description={`${state.client?.opening_title}, ${state.client?.opening_description}`}
          keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah"
          ogImage={state.client?.cover ?? "/images/logo-white.png"}
          ogUrl={state.url}
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Moment Invitations",
            url: state.url,
            sameAs: [
              sosmedURLs.email,
              sosmedURLs.instagram,
              sosmedURLs.whatsapp,
              sosmedURLs.youtube,
            ],
          }}
          author="Moment"
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

export default Nirvaya;
