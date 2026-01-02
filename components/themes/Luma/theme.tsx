import Cover from "./layouts/cover";
import Layout from "../layout";
import useMusic from "@/hooks/themes/useMusic";
import Music from "./layouts/music";
import Hero from "./layouts/hero";
import Image from "next/image";
import usePhotos from "@/hooks/themes/usePhotos";
import { useMemo, useRef, useEffect, lazy, Suspense, memo } from "react";
import useCoverStore from "@/store/useCoverStore";
import useClientStore from "@/store/useClientStore";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import LoadingDark from "../loading.dark";
import Video from "./layouts/video";
import Gift from "./layouts/gift";

const Photos = lazy(() => import("./layouts/photos"));
const RsvpWishes = lazy(() => import("./layouts/rsvp.wishes"));
const Thankyou = lazy(() => import("./layouts/thankyou"));
const Participants = lazy(() => import("./layouts/participants"));
const Events = lazy(() => import("./layouts/events"));

interface Props {
  untuk: string;
}

const Luma = ({ untuk }: Props) => {
  const { state, actions, refs } = useMusic();
  const { isOpen } = useCoverStore();
  const { client } = useClientStore();
  const {
    state: { images },
  } = usePhotos();

  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const video = useMemo(
    () =>
      Array.isArray(client?.videos) && client.videos.length > 0
        ? client.videos.filter((v) => !isYoutubeVideo(v))
        : [],
    [client?.videos]
  );

  useEffect(() => {
    const vid = videoRef.current;
    const img = imageRef.current;
    if (!vid || !img) return;

    const handlePlay = () => {
      vid.classList.add("opacity-100");
      vid.classList.remove("opacity-0");

      // setelah fade-in, hilangkan poster
      setTimeout(() => {
        img.classList.add("opacity-0");
      }, 700);
    };

    if (!vid.paused) handlePlay();

    vid.addEventListener("playing", handlePlay, { passive: true });

    return () => {
      vid.removeEventListener("playing", handlePlay);
    };
  }, []);

  return (
    <Layout>
      <Music actions={actions} refs={refs} state={state} />
      <main className="bg-luma-dark relative overflow-x-hidden">
        {video.length > 0 ? (
          <div className="absolute inset-0">
            {/* Poster Image */}
            {client?.cover && (
              <Image
                ref={imageRef}
                src={client.cover}
                alt={`Poster undangan digital ${untuk}`}
                fill
                priority
                className="object-cover transition-opacity duration-700 opacity-100"
              />
            )}

            {/* Background Video */}
            <video
              ref={videoRef}
              src={video[0]}
              poster={client?.cover || ""}
              className="absolute w-full h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 opacity-0"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`Background video undangan digital ${untuk}`}
            />
          </div>
        ) : (
          <div
            className="fixed inset-0 mx-auto"
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
                    aria-label={`Background undangan digital ${untuk}, slide ${
                      index + 1
                    }`}
                    fill
                    sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="object-cover shimmer-dark"
                    quality={80}
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

          <Suspense fallback={<LoadingDark />}>
            <Participants />
            <Events />
            <Photos />
            <Video />
            <RsvpWishes />
            <Gift />
            <Thankyou />
          </Suspense>
        </div>
      </main>
    </Layout>
  );
};

export default memo(Luma);
