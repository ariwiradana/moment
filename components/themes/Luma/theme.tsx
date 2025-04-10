import { NextPage } from "next";
import Cover from "./layouts/cover";
import Layout from "../layout";
import useMusic from "@/hooks/themes/useMusic";
import Music from "./layouts/music";
import Hero from "./layouts/hero";
import Opening from "./layouts/opening";
import Participants from "./layouts/participants";
import Events from "./layouts/events";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import usePhotos from "@/hooks/themes/usePhotos";
import Photos from "./layouts/photos";
import Videos from "./layouts/video";

interface Props {
  untuk: string;
}

const Luma: NextPage<Props> = ({ untuk }) => {
  const { state, actions, refs } = useMusic();

  const {
    state: { images },
  } = usePhotos();

  const settings: Settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    speed: 1500,
    cssEase: "ease-in-out",
  };

  return (
    <Layout>
      <main className="bg-luma-dark max-w-lg ml-auto relative">
        <div className="fixed max-w-lg ml-auto inset-0 z-10">
          <Slider {...settings} className="w-full h-full relative">
            {images.map((image, index) => (
              <Image
                key={`Main Slider ${index + 1}`}
                sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                fill
                quality={100}
                alt={`Main Slider ${index + 1}`}
                priority
                className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark"
                src={image as string}
              />
            ))}
          </Slider>
        </div>
        <Music actions={actions} refs={refs} state={state} />
        <Cover actions={actions} untuk={untuk} />
        <div className="snap-y snap-mandatory h-dvh overflow-auto relative z-20">
          <Hero />
          <Opening />
          <Participants />
          <Events />
          <Videos />
          <Photos />
        </div>
      </main>
    </Layout>
  );
};

export default Luma;
