import usePhotos from "@/hooks/themes/usePhotos";
import { raleway } from "@/lib/fonts";
import {
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { HiChevronLeft, HiChevronRight, HiOutlineXMark } from "react-icons/hi2";
import Lightbox from "react-spring-lightbox";

const Photos = () => {
  const { state, actions } = usePhotos();

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const isDesktop = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getCols = () => {
    if (isLargeScreen) return 5;
    if (isDesktop) return 4;
    if (isTablet) return 2;
    if (isMobile) return 2;
  };

  const getGap = () => {
    if (isLargeScreen) return 8;
    if (isDesktop) return 8;
    if (isTablet) return 8;
    if (isMobile) return 4;
  };

  if (state.images.length > 0)
    return (
      <>
        <Lightbox
          isOpen={state.isOpen}
          onPrev={actions.gotoPrevious}
          onNext={actions.gotoNext}
          images={state.lightboxImage}
          currentIndex={state.imageIndex}
          onClose={() => actions.setIsOpen(false)}
          className="bg-black/80"
          renderHeader={() => (
            <div className="flex justify-between items-center z-10 fixed top-0 inset-x-0">
              <p
                className={`text-white text-sm relative z-10 p-2 ${raleway.className}`}
              >
                {state.imageIndex + 1} / {state.lightboxImage.length}
              </p>
              <button
                onClick={() => {
                  actions.setIsOpen(false);
                  actions.setImageIndex(0);
                }}
                className="text-white/90 text-2xl p-2 relative z-10 disabled:opacity-30 bg-black/30 hover:bg-black/40 disabled:hover:bg-black/30 flex justify-center items-center md:ml-2 transition-colors ease-in-out"
              >
                <HiOutlineXMark />
              </button>
            </div>
          )}
          renderPrevButton={() => (
            <button
              disabled={state.imageIndex === 0}
              onClick={actions.gotoPrevious}
              className="text-white text-2xl p-2 relative z-10 disabled:opacity-30 bg-black/30 hover:bg-black/40 disabled:hover:bg-black/30 flex justify-center items-center md:ml-2 transition-colors ease-in-out"
            >
              <HiChevronLeft />
            </button>
          )}
          renderNextButton={() => (
            <button
              disabled={state.imageIndex === state.lightboxImage.length - 1}
              onClick={actions.gotoNext}
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
        <section className="bg-samaya-dark">
          <div className="pt-[60px] pb-1 md:pb-2 md:pt-[100px] px-1 md:px-2">
            <div className="px-6 md:px-0">
              <h2
                data-aos="fade-up"
                className={`text-white text-center leading-8 text-xl md:text-2xl 2xl:text-3xl font-tan-pearl`}
              >
                Galeri Kami
              </h2>
              <p
                data-aos="fade-up"
                className="text-white/50 text-center tracking-[1px] text-[10px] lg:text-xs mt-4 max-w-lg mx-auto"
              >
                Potret momen spesial dengan penuh makna dalam galeri kami,
              </p>
            </div>
            <div className="mt-8 md:mt-16" data-aos="fade-up">
              <ImageList variant="masonry" cols={getCols()} gap={getGap()}>
                {state.images.map((img, index) => (
                  <ImageListItem key={img}>
                    <div>
                      <Image
                        onClick={() => {
                          actions.setIsOpen(true);
                          actions.setImageIndex(index);
                        }}
                        className="hover:scale-[0.99] transition-transform ease-in-out duration-500"
                        src={img}
                        alt={`gallery-img-${index + 1}`}
                        width={360}
                        height={360}
                        layout="responsive"
                        objectFit="cover"
                        loading="lazy"
                      />
                    </div>
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
        </section>
      </>
    );
};

export default Photos;
