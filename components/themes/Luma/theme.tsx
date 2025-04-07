import { NextPage } from "next";
import Cover from "./layouts/cover";
import Layout from "../layout";
import MusicComponent from "../Samaya/layouts/music";
import useMusic from "@/hooks/themes/useMusic";
import useCoverStore from "@/store/useCoverStore";

interface Props {
  untuk: string;
}

const Luma: NextPage<Props> = ({ untuk }) => {
  const { state, actions, refs } = useMusic();
  const { isOpen } = useCoverStore();
  return (
    <Layout>
      <MusicComponent actions={actions} refs={refs} state={state} />
      <Cover actions={actions} untuk={untuk} />
      {isOpen && <div className="h-[200vh] w-full bg-white"></div>}
    </Layout>
  );
};

export default Luma;
