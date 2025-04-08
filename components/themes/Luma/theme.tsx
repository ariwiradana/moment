import { NextPage } from "next";
import Cover from "./layouts/cover";
import Layout from "../layout";
import useMusic from "@/hooks/themes/useMusic";
import Music from "./layouts/music";
import Hero from "./layouts/hero";
import Opening from "./layouts/opening";
import Participants from "./layouts/participants";

interface Props {
  untuk: string;
}

const Luma: NextPage<Props> = ({ untuk }) => {
  const { state, actions, refs } = useMusic();
  return (
    <Layout>
      <Music actions={actions} refs={refs} state={state} />
      <Cover actions={actions} untuk={untuk} />
      <div className="snap-y snap-mandatory h-screen overflow-scroll">
        <Hero />
        <Opening />
        <Participants />
        <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-4xl font-bold">
          Screen 1 - Hero
        </section>

        <section className="h-screen snap-start flex items-center justify-center bg-white text-black text-4xl font-bold">
          Screen 2 - About
        </section>

        <section className="h-screen snap-start flex items-center justify-center bg-gray-100 text-black text-4xl font-bold">
          Screen 3 - Services
        </section>

        <section className="h-screen snap-start flex items-center justify-center bg-black text-white text-4xl font-bold">
          Screen 4 - Contact
        </section>
      </div>
    </Layout>
  );
};

export default Luma;
