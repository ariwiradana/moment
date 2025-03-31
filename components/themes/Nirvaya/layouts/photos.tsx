import usePhotos from "@/hooks/themes/usePhotos";
import { raleway } from "@/lib/fonts";
import Image from "next/image";
import React from "react";
import { HiChevronLeft, HiChevronRight, HiOutlineXMark } from "react-icons/hi2";
import Lightbox from "react-spring-lightbox";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Photos = () => {
  const { state, actions } = usePhotos();

  const divide = Math.floor(state.images.length / 3);

  console.log(0, divide, divide, divide * 2, divide * 2, state.images.length);

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
      <section className="bg-nirvaya-light-brown">
        <div className="max-w-screen-lg mx-auto py-16 md:px-8">
          <div
            data-aos="fade-up"
            className="flex flex-col md:flex-row justify-between md:items-center gap-y-4 gap-x-12 mb-8 md:mb-16 px-8 md:px-0"
          >
            <h2 className="text-nirvaya-dark md:text-center text-4xl md:text-6xl font-edensor whitespace-nowrap">
              Galeri <span className="italic">Kami</span>
            </h2>
            <div className="h-[1px] w-[25vw] md:min-w-[20vw] bg-nirvaya-dark/10"></div>
            <p className="text-nirvaya-dark/50 md:text-right tracking-[2px] md:text-xs text-[10px]">
              Momen menjadi awal dari kisah yang akan dikenang selamanya
            </p>
          </div>
          <div className="grid grid-cols-4 row-span-3 gap-2 md:gap-6">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="col-span-4 md:col-span-2 row-span-4 aspect-square md:aspect-auto bg-nirvaya-dark/5"
            >
              <Swiper
                speed={1000}
                modules={[Autoplay]}
                autoplay={{
                  delay: 5000,
                }}
                className="w-full h-full"
              >
                {state.images.slice(0, divide).map((img) => (
                  <SwiperSlide key={`Image Part 1 ${img}`}>
                    <Image
                      onClick={() => actions.handleToggleLightbox(img)}
                      sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                      src={img}
                      alt={`Image Part 1 ${img}`}
                      fill
                      className="object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="col-span-4 md:col-span-2 row-span-2 bg-nirvaya-dark/5 aspect-[4/2] md:aspect-[2/1]"
            >
              <Swiper
                speed={1000}
                modules={[Autoplay]}
                autoplay={{
                  delay: 6000,
                }}
                className="w-full h-full"
              >
                {state.images.slice(divide, divide * 2).map((img) => (
                  <SwiperSlide key={`Image Part 2 ${img}`}>
                    <Image
                      onClick={() => actions.handleToggleLightbox(img)}
                      sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                      alt={`Image Part 2 ${img}`}
                      src={img}
                      fill
                      className="object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="col-span-4 md:col-span-2 row-span-2 bg-nirvaya-dark/5 aspect-[4/2] md:aspect-[2/1]"
            >
              <Swiper
                speed={1000}
                modules={[Autoplay]}
                autoplay={{
                  delay: 7000,
                }}
                className="w-full h-full"
                slidesPerView={2}
              >
                {state.images.slice(divide * 2).map((img) => (
                  <SwiperSlide key={`Image Part 3 ${img}`}>
                    <Image
                      onClick={() => actions.handleToggleLightbox(img)}
                      sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                      src={img}
                      alt={`Image Part 3 ${img}`}
                      fill
                      className="object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Photos;
