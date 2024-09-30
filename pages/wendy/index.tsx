import Layout from "@/components/layout";
import Cover from "@/components/theme1/cover";
import Hero from "@/components/theme1/hero";
import useApp from "@/hooks/theme1/useApp";
import { GetServerSideProps } from "next";
import React, { FC } from "react";

interface Props {
  recipient: string;
}

const MainPage: FC<Props> = (props) => {
  const brides = "Ari & Juli";
  const location = "Sukawati";
  const dateEvent = "2024-10-04";

  const { state, actions } = useApp(dateEvent, "digital-invitation/wendy");

  return (
    <Layout pageTitle={props.recipient}>
      <Cover
        state={state}
        actions={actions}
        brides={brides}
        recipient={props.recipient}
      />
      {state.open && (
        <>
          <Hero
            location={location}
            brides={brides}
            dateEvent={dateEvent}
            state={state}
            actions={actions}
          />
        </>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const recipient = query.to || null;

  return {
    props: {
      recipient,
    },
  };
};

export default MainPage;
