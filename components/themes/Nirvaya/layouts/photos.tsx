import Image from "next/image";
import React, { useMemo } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import useLightbox from "@/hooks/themes/useLightbox";

const Photos = () => {
  const { state, actions } = useLightbox();

  const divide = useMemo(
    () => Math.ceil(state.images.length / 3),
    [state.images]
  );

  if (!state.images.length) return null;

  return (
    <>
      {state.isOpen && (
        <Lightbox
          index={state.imageIndex}
          plugins={[Zoom]}
          open={state.isOpen}
          close={() => actions.setIsOpen(false)}
          slides={state.images}
        />
      )}
      <section className="bg-nirvaya-light-brown">
        <div className="max-w-screen-lg mx-auto py-16 md:px-8">
          <div
            data-aos="fade-up"
            className="flex flex-col md:flex-row items-center gap-x-6 pl-8 md:pl-0"
          >
            <div className="flex justify-between items-center gap-x-6 md:gap-x-12 w-full">
              <h2 className="text-nirvaya-dark text-4xl md:text-6xl font-edensor whitespace-nowrap leading-8">
                Galeri <span className="italic">Kami</span>
              </h2>
              <div className="h-[1px] bg-nirvaya-dark/10 w-full"></div>
            </div>
            <p className="text-nirvaya-dark/50 md:text-right tracking-[2px] md:text-xs lg:text-sm text-[10px] pr-8 md:pr-0 mt-2 max-w-[400px]">
              Momen menjadi awal kisah yang akan dikenang selamanya
            </p>
          </div>

          <div className="grid grid-cols-4 gap-1 md:gap-6 mt-8 md:mt-16">
            {[0, 1, 2].map((part, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={`${(idx + 1) * 100}`}
                className={
                  idx === 0
                    ? "col-span-4 md:col-span-2 row-span-4 aspect-square md:aspect-auto"
                    : idx === 1
                    ? "col-span-4 md:col-span-2 row-span-2 aspect-square md:aspect-[2/1]"
                    : "col-span-4 md:col-span-2 row-span-2 aspect-[4/2] md:aspect-[2/1]"
                }
              >
                <Swiper
                  speed={1000}
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 5000 + idx * 1000,
                    disableOnInteraction: true,
                    waitForTransition: false,
                  }}
                  className="w-full h-full"
                  slidesPerView={idx === 2 ? 2 : 1}
                >
                  {state.images
                    .slice(idx * divide, (idx + 1) * divide)
                    .map((img, i) => (
                      <SwiperSlide key={`Image Part ${idx + 1} ${img.src}`}>
                        <Image
                          onClick={() => actions.handleToggleLightbox(img.src)}
                          sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                          src={img.src}
                          alt={`Image Part ${idx + 1} ${i}`}
                          fill
                          className="object-cover bg-nirvaya-dark/5"
                          priority={i === 0 && idx === 0} // Hanya hero pertama prioritas
                          loading={i === 0 && idx === 0 ? "eager" : "lazy"}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(Photos);
