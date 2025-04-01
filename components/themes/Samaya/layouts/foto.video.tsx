import React from "react";
import { afacad, raleway } from "@/lib/fonts";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import {
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import usePhotos from "@/hooks/themes/usePhotos";
import useParticipants from "@/hooks/themes/useParticipants";
import useClientStore from "@/store/useClientStore";
import Lightbox from "react-spring-lightbox";
import { HiChevronLeft, HiChevronRight, HiOutlineXMark } from "react-icons/hi2";

const GalleryComponent = () => {
  const { state: photoState, actions: photoActions } = usePhotos();
  const { state: participantState } = useParticipants();
  const { client } = useClientStore();

  const videos =
    Array.isArray(client?.videos) && client.videos.length > 0
      ? client.videos
      : [];

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getCols = () => {
    if (isDesktop) return 3;
    if (isTablet) return 3;
    if (isMobile) return 1;
  };

  const getGap = () => {
    if (isDesktop) return 32;
    if (isTablet) return 28;
    if (isMobile) return 12;
  };

  return (
    <section className="relative bg-gradient-to-b from-samaya-dark to-samaya-dark/80 overflow-hidden z-20">
      <Lightbox
        isOpen={photoState.isOpen}
        onPrev={photoActions.gotoPrevious}
        onNext={photoActions.gotoNext}
        images={photoState.lightboxImage}
        currentIndex={photoState.imageIndex}
        onClose={() => photoActions.setIsOpen(false)}
        className="bg-black/80"
        renderHeader={() => (
          <div className="flex justify-between items-center z-10 fixed top-0 inset-x-0">
            <p
              className={`text-white text-sm relative z-10 p-2 ${afacad.className}`}
            >
              {photoState.imageIndex + 1} / {photoState.lightboxImage.length}
            </p>
            <button
              onClick={() => {
                photoActions.setIsOpen(false);
                photoActions.setImageIndex(0);
              }}
              className="text-white/90 text-2xl p-2 relative z-10 disabled:opacity-30 bg-black/30 hover:bg-black/40 disabled:hover:bg-black/30 flex justify-center items-center md:ml-2 transition-colors ease-in-out"
            >
              <HiOutlineXMark />
            </button>
          </div>
        )}
        renderPrevButton={() => (
          <button
            disabled={photoState.imageIndex === 0}
            onClick={photoActions.gotoPrevious}
            className="text-white text-2xl p-2 relative z-10 disabled:opacity-30 bg-black/30 hover:bg-black/40 disabled:hover:bg-black/30 flex justify-center items-center md:ml-2 transition-colors ease-in-out"
          >
            <HiChevronLeft />
          </button>
        )}
        renderNextButton={() => (
          <button
            disabled={
              photoState.imageIndex === photoState.lightboxImage.length - 1
            }
            onClick={photoActions.gotoNext}
            className="text-white text-2xl p-2 relative z-10 disabled:opacity-30 bg-black/30 hover:bg-black/40 disabled:hover:bg-black/30 flex items-center justify-center md:mr-2 transition-colors ease-in-out"
          >
            <HiChevronRight />
          </button>
        )}
        pageTransitionConfig={{
          from: { opacity: 0 },
          enter: { opacity: 1 },
          leave: { opacity: 0 },
        }}
      />

      <div
        data-aos="fade-up"
        className="w-full h-full relative pt-16 lg:pt-24 pb-4 md:pb-8 px-4 md:px-8 z-20"
      >
        <h1
          data-aos="fade-up"
          className={`font-tan-pearl text-2xl md:text-3xl text-center text-samaya-primary`}
        >
          Momen Bahagia
        </h1>
        <p
          data-aos="fade-up"
          className={`${raleway.className} text-[10px] md:text-xs tracking-[2px] uppercase text-center leading-5 text-white/80 mt-2 mb-8 max-w-screen-md mx-auto`}
        >
          {participantState.groom?.nickname} &{" "}
          {participantState.bride?.nickname}
        </p>
        <div
          className="mt-10 flex flex-col gap-2 md:gap-4"
          data-aos="zoom-in-up"
        >
          <ImageList
            variant="masonry"
            cols={getCols()}
            gap={getGap()}
            className="overflow-hidden"
          >
            {photoState.images.map((img, index) => (
              <ImageListItem key={img}>
                <Image
                  onClick={() => {
                    photoActions.setIsOpen(true);
                    photoActions.setImageIndex(index);
                  }}
                  className=" hover:scale-[0.99] transition-transform ease-in-out duration-500"
                  src={img}
                  alt={`gallery-img-${index + 1}`}
                  width={360}
                  height={360}
                  layout="responsive"
                  objectFit="cover"
                  priority
                />
              </ImageListItem>
            ))}
          </ImageList>
          {videos.length > 0 && (
            <div className="grid gap-2 md:gap-4 -mt-4 md:mt-0" data-aos="zoom-in-up">
              {videos.map((v) => {
                const youtubeId = getYouTubeVideoId(v);
                const youtubeVideo = isYoutubeVideo(v);
                if (youtubeVideo)
                  return (
                    <div
                      key={youtubeId}
                      className="relative w-full aspect-video  overflow-hidden"
                    >
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&showinfo=0&rel=0&vq=hd1080`}
                        title={v}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryComponent;
