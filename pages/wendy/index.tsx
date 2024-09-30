import Layout from "@/components/layout";
import Cover from "@/components/theme1/cover";
import Hero from "@/components/theme1/hero";
import { GetServerSideProps } from "next";
import React, { FC } from "react";

interface Props {
  recipient: string;
}

const MainPage: FC<Props> = (props) => {
  const brides = "Ari & Juli";
  const location = "Sukawati";

  return (
    <Layout pageTitle={props.recipient}>
      <Cover brides={brides} recipient={props.recipient} />
      <Hero location={location} brides={brides} dateEvent="2024-11-06" />
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
