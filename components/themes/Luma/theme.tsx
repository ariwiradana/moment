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
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import useCoverStore from "@/store/useCoverStore";

const Videos = dynamic(() => import("./layouts/video"), {
  ssr: false,
  loading: () => <div className="text-white">Loading Videos...</div>,
});
const Photos = dynamic(() => import("./layouts/photos"), {
  ssr: false,
  loading: () => <div className="text-white">Loading Photos...</div>,
});
const RsvpWishes = dynamic(() => import("./layouts/rsvp.wishes"), {
  ssr: false,
  loading: () => <div className="text-white">Loading RSVP...</div>,
});
const Thankyou = dynamic(() => import("./layouts/thankyou"), {
  ssr: false,
  loading: () => <div className="text-white">Loading Thankyou...</div>,
});

interface Props {
  untuk: string;
}

const Luma = ({ untuk }: Props) => {
  const { state, actions, refs } = useMusic();
  const { state: photosState } = usePhotos();
  const { images } = photosState;
  const { isOpen } = useCoverStore();

  return (
    <Layout>
      <Music actions={actions} refs={refs} state={state} />
      <main className="bg-luma-dark relative overflow-x-hidden">
        <div
          className="fixed inset-0 lg:max-w-[30vw] mx-auto"
          aria-hidden="true"
          data-aos="fade-in"
        >
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            speed={1500}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className="h-lvh w-full"
          >
            {images.slice(0, 3).map((image, index) => (
              <SwiperSlide key={`hero-slide-${index}`}>
                <Image
                  src={image}
                  alt={`Hero background image ${
                    index + 1
                  } dari undangan digital ${untuk}`}
                  fill
                  sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
                  priority={true} // preload semua hero images pertama
                  loading="eager"
                  className="object-cover"
                  quality={80}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className="snap-y snap-mandatory h-dvh relative z-20 lg:max-w-[30vw] mx-auto no-scrollbar"
          style={{ overflowY: isOpen ? "auto" : "hidden" }}
        >
          <Cover actions={actions} untuk={untuk} />
          <Hero />
          <Opening />
          <Participants />
          <Events />

          <Videos />
          <Photos />
          <RsvpWishes />
          <Thankyou />
        </div>
      </main>
    </Layout>
  );
};

export default Luma;
