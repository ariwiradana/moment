import Cover from "./layouts/cover";
import Layout from "../layout";
import useMusic from "@/hooks/themes/useMusic";
import Music from "./layouts/music";
import Hero from "./layouts/hero";
import Image from "next/image";
import usePhotos from "@/hooks/themes/usePhotos";
import Opening from "./layouts/opening";
import Participants from "./layouts/participants";
import Events from "./layouts/events";
import Videos from "./layouts/video";
import Photos from "./layouts/photos";
import RsvpWishes from "./layouts/rsvp.wishes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Thankyou from "./layouts/thankyou";

interface Props {
  untuk: string;
}

const Luma = ({ untuk }: Props) => {
  const { state, actions, refs } = useMusic();

  const {
    state: { images },
  } = usePhotos();

  return (
    <Layout>
      <main className="bg-luma-dark relative">
        <Music actions={actions} refs={refs} state={state} />
        <div
          className="fixed inset-0 lg:max-w-[30vw] mx-auto"
          data-aos="fade-up"
        >
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            speed={1500}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className="h-lvh w-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`hero-slide-${index}`}>
                <Image
                  sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                  fill
                  quality={90}
                  alt={`hero-img-${index}`}
                  priority={index === 0}
                  className="object-cover shimmer-dark"
                  src={image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="snap-y snap-mandatory h-dvh overflow-y-auto overflow-x-hidden relative z-20 lg:max-w-[30vw] mx-auto no-scrollbar">
          <Cover actions={actions} untuk={untuk} />
          <Hero />
          <Opening />
          <Participants />
          <Events />
          <Videos />
          <Photos />
          {/* <Gift /> */}
          <RsvpWishes />
          <Thankyou />
        </div>
      </main>
    </Layout>
  );
};

export default Luma;
