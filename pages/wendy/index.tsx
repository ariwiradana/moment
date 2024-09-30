import Layout from "@/components/layout";
import Cover from "@/components/theme1/cover";
import Hero from "@/components/theme1/hero";
import { GetServerSideProps } from "next";
import React, { FC, useState } from "react";

interface Props {
  recipient: string;
}

const MainPage: FC<Props> = (props) => {
  const brides = "Ari & Juli";
  const location = "Sukawati";
  const dateEvent = "2024-10-04";

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Layout pageTitle={props.recipient}>
      <Cover
        open={open}
        setOpen={setOpen}
        brides={brides}
        recipient={props.recipient}
      />
      {open && (
        <>
          <Hero location={location} brides={brides} dateEvent={dateEvent} />
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
