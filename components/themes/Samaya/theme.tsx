import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import HeroComponent from "./layouts/hero";
import ThankyouComponent from "./layouts/thankyou";
// import RSVPWishes from "./layouts/rsvp.wishes";
import MusicComponent from "./layouts/music";
import EventsComponent from "./layouts/events";
import ParticipantsComponent from "./layouts/participants";
import PreviewNav from "../preview.nav";
import useCoverStore from "@/store/useCoverStore";
import useMusic from "@/hooks/themes/useMusic";
import Photos from "./layouts/photos";
import Gift from "./layouts/gift";
interface Props {
  untuk: string;
}

const Samaya: FC<Props> = (props) => {
  const { isOpen } = useCoverStore();
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
            <Photos />
            <Gift />
            {/* <RSVPWishes /> */}
            <ThankyouComponent />
          </div>
        )}
      </>
    </Layout>
  );
};

export default Samaya;
