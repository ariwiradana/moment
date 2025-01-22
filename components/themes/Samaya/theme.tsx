import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import HeroComponent from "./layouts/hero";
import GalleryComponent from "./layouts/foto.video";
import ThankyouComponent from "./layouts/thankyou";
import RSVPWishes from "./layouts/rsvp.wishes";
import MusicComponent from "./layouts/music";
import EventsComponent from "./layouts/events";
import ParticipantsComponent from "./layouts/participants";
import GiftComponent from "./layouts/gift";
import PreviewNav from "../preview.nav";
import useCoverStore from "@/store/useCoverStore";
import useClientStore from "@/store/useClientStore";
import useMusic from "@/hooks/themes/useMusic";
interface Props {
  untuk: string;
}

const Samaya: FC<Props> = (props) => {
  const { isOpen } = useCoverStore();
  const { client } = useClientStore();
  const { state, actions, refs } = useMusic();

  return (
    <Layout>
      <>
        {isOpen && <PreviewNav />}
        <MusicComponent actions={actions} refs={refs} state={state} />
        <Cover actions={actions} state={state} untuk={props.untuk} />
        <HeroComponent />
        {isOpen && (
          <div className="relative">
            <ParticipantsComponent />
            <EventsComponent />
            <GalleryComponent />
            {client?.package?.rsvp_and_greetings && <RSVPWishes />}
            {client?.package?.digital_envelope && <GiftComponent />}
            <ThankyouComponent />
          </div>
        )}
      </>
    </Layout>
  );
};

export default Samaya;
