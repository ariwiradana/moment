"use client";

import Cover from "./layouts/cover";
import Layout from "../layout";
import useMusic from "@/hooks/themes/useMusic";
import Music from "./layouts/music";
import Hero from "./layouts/hero";
import Image from "next/image";
import usePhotos from "@/hooks/themes/usePhotos";
import { useMemo, lazy, Suspense, useEffect, useState } from "react";
import useCoverStore from "@/store/useCoverStore";
import useClientStore from "@/store/useClientStore";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import LoadingDark from "../loading.dark";
import YoutubeEmbedPortrait from "../youtube.embed.portrait";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";

// ✅ Lazy load section terpisah untuk efisiensi
const Photos = lazy(() => import("./layouts/photos"));
const RsvpWishes = lazy(() => import("./layouts/rsvp.wishes"));
const Thankyou = lazy(() => import("./layouts/thankyou"));
const Participants = lazy(() => import("./layouts/participants"));
const Events = lazy(() => import("./layouts/events"));
const Video = lazy(() => import("./layouts/video"));

interface Props {
  untuk: string;
}

const Luma = ({ untuk }: Props) => {
  const { state, actions, refs } = useMusic();
  const { isOpen } = useCoverStore();
  const { client } = useClientStore();
  const { videos = [] } = client || {};

  const {
    state: { images },
  } = usePhotos();

  const [shouldLoadSections, setShouldLoadSections] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const youtubeVideos = useMemo(() => {
    if (!videos?.length) return [];
    return (videos as string[]).filter(isYoutubeVideo).map((url) => ({
      url,
      youtubeId: getYouTubeVideoId(url),
    }));
  }, [videos]);

  useEffect(() => {
    const t = setTimeout(() => setShouldLoadSections(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (youtubeVideos.length > 0) {
      const timeout = setTimeout(() => setIsVideoReady(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [youtubeVideos]);

  return (
    <Layout>
      <Music actions={actions} refs={refs} state={state} />
      <main className="bg-luma-dark relative overflow-x-hidden">
        {/* ✅ BACKGROUND: pilih antara YouTube atau fallback Swiper */}
        {youtubeVideos.length > 0 ? (
          isVideoReady && (
            <YoutubeEmbedPortrait
              title={`Video Background ${client?.name}`}
              youtubeId={youtubeVideos[0].youtubeId as string}
            />
          )
        ) : (
          <div
            className="fixed inset-0 mx-auto"
            aria-hidden="true"
            data-aos="fade-in"
          >
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              speed={1200}
              autoplay={{ delay: 7000, disableOnInteraction: false }}
              className="h-lvh w-full"
            >
              {images.slice(0, 3).map((image, index) => (
                <SwiperSlide key={`hero-slide-${index}`}>
                  <Image
                    src={image}
                    alt={`Hero background image ${
                      index + 1
                    } dari undangan digital ${untuk}`}
                    aria-label={`Background undangan digital ${untuk}, slide ${
                      index + 1
                    }`}
                    fill
                    sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
                    priority={index < 1}
                    loading={index >= 1 ? "lazy" : "eager"}
                    quality={70} 
                    className="object-cover shimmer-dark"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div
          className="snap-y snap-mandatory h-dvh relative z-20 mx-auto no-scrollbar"
          style={{ overflowY: isOpen ? "auto" : "hidden" }}
        >
          <Cover actions={actions} untuk={untuk} />
          <Hero />

          {shouldLoadSections && (
            <Suspense fallback={<LoadingDark />}>
              <Participants />
              <Events />
              <Photos />
              <Video />
              <RsvpWishes />
              <Thankyou />
            </Suspense>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Luma;
