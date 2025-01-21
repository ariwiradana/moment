import React from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import Hero from "./layouts/hero";
import Participants from "./layouts/participants";

interface Props {
  untuk: string;
}

const Nirvaya = ({ untuk }: Props) => {
  return (
    <Layout>
      <Cover to={untuk} />
      <Hero />
      <Participants />
    </Layout>
  );
};

export default Nirvaya;
