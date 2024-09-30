import Page from "@/components/theme1/page";
import useTheme1 from "@/hooks/useTheme1";
import { Brides, Informations } from "@/lib/types";
import { GetServerSideProps } from "next";
import React, { FC } from "react";

interface Props {
  recipient: string;
}

const MainPage: FC<Props> = (props) => {
  const informations: Informations = {
    date: "2024-10-04",
    time: "14:00 - Selesai",
    location: "Sukawati",
    locationFull: "Ds. Kelusa, Kec. Payangan, Kab. Gianyar, Bali",
    locationLink: "https://maps.app.goo.gl/mhMRZGPTmJmFyEmG8",
    prefix: "wendy",
  };
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

  const { state, actions } = useTheme1(informations.date, informations.prefix);

  return (
    <Page
      actions={actions}
      brides={brides}
      informations={informations}
      recipient={props.recipient}
      state={state}
    />
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
