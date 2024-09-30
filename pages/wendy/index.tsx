import Layout from "@/components/layout";
import Content from "@/components/theme1/content";
import Cover from "@/components/theme1/cover";
import useApp from "@/hooks/theme1/useApp";
import { Brides } from "@/lib/types";
import { GetServerSideProps } from "next";
import React, { FC } from "react";

interface Props {
  recipient: string;
}

const MainPage: FC<Props> = (props) => {
  const dateEvent = "2024-10-04";
  const location = "Sukawati";
  const brides: Brides = {
    male: {
      name: "I Gede Wahyu Wiradharma",
      nickname: "Wahyu",
      child: "pertama",
      address: "Br. Ayah, Ds. Kelusa, Kec. Payangan, Kab. Gianyar, Bali",
      imageURL:
        "https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/digital-invitation/wendy/brides/male-Pu1kBjACwhfo7GmUJGaDUM8blbyrjH.jpg",
      parents: {
        male: "I Wayan Darmayasa",
        female: "Ni Made Muliari",
      },
    },
    female: {
      name: "Ni Putu Eka Pradnyani",
      nickname: "Eka",
      child: "pertama",
      address: "Br. Ayah, Ds. Kelusa, Kec. Payangan, Kab. Gianyar, Bali",
      imageURL:
        "https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/digital-invitation/wendy/brides/female-bOYCZk5NlcjRdqXI20RPcVMbfWYZ9u.jpg",
      parents: {
        male: "I Wayan Darmayasa",
        female: "Ni Made Muliari",
      },
    },
  };
  const bridesNickname = `${brides.male.nickname} & ${brides.female.nickname}`;

  const { state, actions } = useApp(dateEvent, "wendy");

  return (
    <Layout pageTitle={bridesNickname}>
      <Cover
        state={state}
        actions={actions}
        brides={bridesNickname}
        recipient={props.recipient}
      />
      {state.open && (
        <>
          <Content
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
