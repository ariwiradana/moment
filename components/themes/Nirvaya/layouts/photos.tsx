import usePhotos from "@/hooks/themes/Nirvaya/usePhotos";
import { raleway } from "@/lib/fonts";
import Image from "next/image";
import React from "react";
import { HiChevronLeft, HiChevronRight, HiOutlineXMark } from "react-icons/hi2";
import Lightbox from "react-spring-lightbox";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Photos = () => {
  const { state, actions } = usePhotos();

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
      <section className="p-1 bg-nirvaya-light-brown">
        <div data-aos="fade-up">
          <Swiper
            autoplay
            speed={3000}
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={4}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1440: {
                slidesPerView: 4,
              },
            }}
          >
            {state.images?.map((image, index) => (
              <SwiperSlide key={`Photo ${index + 1}`}>
                <div
                  onClick={() => actions.handleToggleLightbox(image)}
                  className="w-full aspect-[3/5] relative"
                >
                  <Image
                    sizes="50vw"
                    src={image}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover bg-nirvaya-dark/5"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Photos;
