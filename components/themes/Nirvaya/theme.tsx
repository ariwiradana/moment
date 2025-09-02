import React from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import Hero from "./layouts/hero";
import MusicComponent from "./layouts/music";
import useMusic from "@/hooks/themes/useMusic";
import useCoverStore from "@/store/useCoverStore";
import Participants from "./layouts/participants";
import Events from "./layouts/events";
import Photos from "./layouts/photos";
import Gift from "./layouts/gift";
import RsvpWishes from "./layouts/rsvp.wishes";
import Thankyou from "./layouts/thankyou";

interface Props {
  untuk: string;
}

const Nirvaya = ({ untuk }: Props) => {
  const { isOpen } = useCoverStore();
  const { state, actions, refs } = useMusic();
  return (
    <Layout>
      <MusicComponent actions={actions} refs={refs} state={state} />
      <Cover actions={actions} to={untuk} />
      <Hero />
      {isOpen && (
        <>
          <Participants />
          <Events />
          <Photos />
          <Gift />
          <RsvpWishes />
          <Thankyou />
        </>
      )}
    </Layout>
  );
};

export default Nirvaya;
