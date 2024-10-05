import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import HeroComponent from "./layouts/hero";
import BridesComponent from "./layouts/brides";
import LocationTimeComponent from "./layouts/location.time";
import { Client } from "@/lib/types";
import useEarthlyEleganceTheme from "@/hooks/themes/useEarthlyEleganceTheme";
import GalleryComponent from "./layouts/gallery";
import ThankyouComponent from "./layouts/thankyou";
import CountdownComponent from "./layouts/countdown";
import ReviewsComponent from "./layouts/reviews";
import FooterComponent from "../footer";
interface Props {
  to: string;
  client: Client;
}

const ThemeComponent: FC<Props> = (props) => {
  const { state, actions } = useEarthlyEleganceTheme(props.client);

  return (
    <Layout
      pageTitle={
        props.client
          ? `${state.groom?.nickname} & ${state.bride?.nickname}`
          : "Meundang"
      }
    >
      <>
        <Cover actions={actions} state={state} to={props.to} />
        {state.open && (
          <div className="relative">
            <HeroComponent state={state} />
            <BridesComponent state={state} />
            <LocationTimeComponent state={state} />
            <CountdownComponent state={state} />
            <ThankyouComponent state={state} />
            <GalleryComponent state={state} />
            <ReviewsComponent actions={actions} state={state} />
            <FooterComponent className="text-theme1-gold" />
          </div>
        )}
      </>
    </Layout>
  );
};

export default ThemeComponent;
