import React, { FC } from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import Content from "./layouts/content";
import { UseTheme1 } from "@/hooks/useTheme1";
import { Brides } from "@/lib/types";

interface Props {
  recipient: string;
  location: string;
  dateEvent: string;
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
          <Content
            location={props.location}
            brides={props.brides}
            dateEvent={props.dateEvent}
            state={props.state}
            actions={props.actions}
          />
        </>
      )}
    </Layout>
  );
};

export default Page;
