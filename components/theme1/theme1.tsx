import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import { Client } from "@/lib/types";
import useTheme1 from "@/hooks/useTheme1";
import HeroComponent from "./layouts/hero";
import BridesComponent from "./layouts/brides";
import LocationTimeComponent from "./layouts/location.time";
interface Props {
  to: string;
  client: Client;
}

const Theme1: FC<Props> = (props) => {
  const bridesNickname = `${props.client.male_nickname} & ${props.client.female_nickname}`;

  const { open } = useTheme1(props.client);

  return (
    <Layout pageTitle={bridesNickname}>
      <Cover client={props.client} to={props.to} />
      {open && (
        <>
          <HeroComponent client={props.client} />
          <BridesComponent client={props.client} />
          <LocationTimeComponent client={props.client} />
        </>
      )}
    </Layout>
  );
};

export default Theme1;
