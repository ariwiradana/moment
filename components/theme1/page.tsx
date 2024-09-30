import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import { UseTheme1 } from "@/hooks/useTheme1";
import { Brides, Informations } from "@/lib/types";
import HeroComponent from "./layouts/hero";
import BridesComponent from "./layouts/brides";
import LocationTimeComponent from "./layouts/location.time";

interface Props {
  recipient: string;
  informations: Informations;
  state: UseTheme1["state"];
  actions: UseTheme1["actions"];
  brides: Brides;
}

const Page: FC<Props> = (props) => {
  const bridesNickname = `${props.brides.male.nickname} & ${props.brides.female.nickname}`;
  return (
    <Layout pageTitle={bridesNickname}>
      <Cover
        state={props.state}
        actions={props.actions}
        brides={bridesNickname}
        recipient={props.recipient}
      />
      {props.state.open && (
        <>
          <HeroComponent
            brides={props.brides}
            state={props.state}
            actions={props.actions}
            informations={props.informations}
          />
          <BridesComponent
            brides={props.brides}
            state={props.state}
            actions={props.actions}
            informations={props.informations}
          />
          <LocationTimeComponent
            brides={props.brides}
            state={props.state}
            actions={props.actions}
            informations={props.informations}
          />
        </>
      )}
    </Layout>
  );
};

export default Page;
