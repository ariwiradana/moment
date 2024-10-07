import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import HeroComponent from "./layouts/hero";
import BridesComponent from "./layouts/brides";
import LocationTimeComponent from "./layouts/location.time";
import { Client } from "@/lib/types";
import useTheme1 from "@/hooks/themes/useTheme1";
import GalleryComponent from "./layouts/gallery";
import ThankyouComponent from "./layouts/thankyou";
import CountdownComponent from "./layouts/countdown";
import RSVPWishes from "./layouts/rsvp.wishes";
import FooterComponent from "../footer";
import VideoComponent from "./layouts/video";
interface Props {
  to: string;
  client: Client;
}

const Theme1: FC<Props> = (props) => {
  const { state, actions } = useTheme1(props.client);

  return (
    <Layout
      pageTitle={
        props.client
          ? `${state.groom?.nickname} & ${state.bride?.nickname}`
          : "Now"
      }
    >
      <>
        <Cover actions={actions} state={state} to={props.to} />
        {state.open && (
          <div className="relative">
            <HeroComponent state={state} />
            <BridesComponent state={state} />
            <LocationTimeComponent state={state} />
            <CountdownComponent actions={actions} state={state} />
            <ThankyouComponent state={state} />
            <GalleryComponent state={state} />
            <VideoComponent state={state} />
            <RSVPWishes actions={actions} state={state} />
            <FooterComponent />
          </div>
        )}
      </>
    </Layout>
  );
};

export default Theme1;
