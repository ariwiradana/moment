import React from "react";
import Layout from "../layout";
import Cover from "./layouts/cover";
import Hero from "./layouts/hero";
import Participants from "./layouts/participants";
import useCoverStore from "@/store/Nirvaya/useCoverStore";
import Photos from "./layouts/photos";
import Events from "./layouts/events";

interface Props {
  untuk: string;
}

const Nirvaya = ({ untuk }: Props) => {
  const { isOpen } = useCoverStore();
  return (
    <Layout>
      <Cover to={untuk} />
      <Hero />
      {isOpen && (
        <>
          <Participants />
          <Events />
          <Photos />
        </>
      )}
    </Layout>
  );
};

export default Nirvaya;
