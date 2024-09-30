import Layout from "@/components/layout";
import Content from "@/components/theme1/content";
import Cover from "@/components/theme1/cover";
import useApp from "@/hooks/theme1/useApp";
import { GetServerSideProps } from "next";
import React, { FC } from "react";

interface Props {
  recipient: string;
}

const MainPage: FC<Props> = (props) => {
  const { state, actions } = useApp();

  return (
    <Layout pageTitle={state.bridesNickname}>
      <Cover
        state={state}
        actions={actions}
        brides={state.bridesNickname}
        recipient={props.recipient}
      />
      {state.open && (
        <>
          <Content
            location={state.location}
            brides={state.brides}
            dateEvent={state.dateEvent}
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
