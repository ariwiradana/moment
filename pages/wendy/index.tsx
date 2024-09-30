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
  const images = [
    "https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/digital-invitation/wendy/pexels-reneterp-5837408-R8eUDebD2uM7wzHtphATdL3QCCjKzQ.jpg",
    "https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/digital-invitation/wendy/pexels-trungnguyenphotog-2959192-e9X5heORr1Gf9xcYSVk0jQDuBqC68G.jpg",
  ];

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Layout pageTitle={props.recipient}>
      <Cover
        images={images}
        open={open}
        setOpen={setOpen}
        brides={brides}
        recipient={props.recipient}
      />
      {open && (
        <>
          <Hero
            images={images}
            location={location}
            brides={brides}
            dateEvent={dateEvent}
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
