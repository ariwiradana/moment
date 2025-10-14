import React, { Suspense } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import Hero from "./layouts/hero";
import MusicComponent from "./layouts/music";
import useMusic from "@/hooks/themes/useMusic";
import useCoverStore from "@/store/useCoverStore";
import Participants from "./layouts/participants";
import Events from "./layouts/events";
import LoadingDark from "../loading.dark";

const Photos = React.lazy(() => import("./layouts/photos"));
const Video = React.lazy(() => import("./layouts/video"));
const Gift = React.lazy(() => import("./layouts/gift"));
const RsvpWishes = React.lazy(() => import("./layouts/rsvp.wishes"));
const Thankyou = React.lazy(() => import("./layouts/thankyou"));

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
      {isOpen && (
        <Suspense fallback={<LoadingDark />}>
          <Hero />
          <Participants />
          <Events />
          <Photos />
          <Video />
          <Gift />
          <RsvpWishes />
          <Thankyou />
        </Suspense>
      )}
    </Layout>
  );
};

export default React.memo(Nirvaya);
