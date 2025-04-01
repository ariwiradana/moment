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
        <div className="max-w-screen-lg mx-auto pt-16 md:px-8">
          <div
            data-aos="fade-up"
            className="flex flex-col md:flex-row items-center gap-x-6 pl-8 md:pl-0"
          >
            <div className="flex justify-between items-center gap-x-6 md:gap-x-12 w-full">
              <h2 className="text-nirvaya-dark text-4xl md:text-5xl font-edensor whitespace-nowrap leading-8">
                Galeri <span className="italic">Kami</span>
              </h2>
              <div className="h-[1px] bg-nirvaya-dark/10 w-full"></div>
            </div>
            <p className="text-nirvaya-dark/50 md:text-right tracking-[2px] md:text-xs text-[10px] pr-8 md:pr-0 mt-2 max-w-[400px]">
              Momen menjadi awal kisah yang akan dikenang selamanya
            </p>
          </div>
          <div className="grid grid-cols-4 row-span-3 gap-1 md:gap-6 mt-8 md:mt-16">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="col-span-4 md:col-span-2 row-span-4 aspect-square md:aspect-auto"
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
                      className="object-cover bg-nirvaya-dark/5"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="col-span-4 row-span-4 md:col-span-2 md:row-span-2 aspect-square md:aspect-[2/1]"
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
                      className="object-cover bg-nirvaya-dark/5"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="col-span-4 md:col-span-2 row-span-2 aspect-[4/2] md:aspect-[2/1]"
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
                      className="object-cover bg-nirvaya-dark/5"
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
