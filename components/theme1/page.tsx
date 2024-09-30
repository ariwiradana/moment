import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import { Brides, Informations } from "@/lib/types";
import HeroComponent from "./layouts/hero";
import BridesComponent from "./layouts/brides";
import LocationTimeComponent from "./layouts/location.time";
import useTheme1 from "@/hooks/useTheme1";

interface Props {
  recipient: string;
  informations: Informations;
  brides: Brides;
}

const Page: FC<Props> = (props) => {
  const bridesNickname = `${props.brides.male.nickname} & ${props.brides.female.nickname}`;

  const { open } = useTheme1(props.informations);

  return (
    <Layout pageTitle={bridesNickname}>
      <Cover
        informations={props.informations}
        brides={bridesNickname}
        recipient={props.recipient}
      />
      {open && (
        <>
          <HeroComponent
            brides={props.brides}
            informations={props.informations}
          />
          <BridesComponent
            brides={props.brides}
            informations={props.informations}
          />
          <LocationTimeComponent
            brides={props.brides}
            informations={props.informations}
          />
        </>
      )}
    </Layout>
  );
};

export default Page;
