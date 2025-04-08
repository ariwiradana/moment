import usePhotos from "@/hooks/themes/usePhotos";
import { rubik } from "@/lib/fonts";
import { NextPage } from "next";
import Image from "next/image";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiChevronRight, HiOutlineXMark } from "react-icons/hi2";
import Slider, { Settings } from "react-slick";
import Lightbox from "react-spring-lightbox";

const Photos: NextPage = () => {
  const {
    state: { images, imageIndex, isOpen, lightboxImage },
    actions: {
      gotoNext,
      gotoPrevious,
      handleToggleLightbox,
      setIsOpen,
      setImageIndex,
    },
  } = usePhotos();
  const [dragging, setDragging] = useState(false);

  const divide = useMemo(() => Math.floor(images.length / 2), [images]);

  const settings: Settings = {
    dots: false,
    infinite: true,
    waitForAnimate: false,
    autoplay: true,
    arrows: false,
    cssEase: "ease-in-out",
    afterChange() {
      setDragging(false);
    },
    beforeChange() {
      setDragging(true);
    },
  };

  return (
    <>
      <Lightbox
        isOpen={isOpen}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={lightboxImage}
        currentIndex={imageIndex}
        onClose={() => setIsOpen(false)}
        className="bg-black/80"
        renderHeader={() => (
          <div className="flex justify-between items-center z-10 fixed top-0 inset-x-0">
            <p
              className={`text-white text-sm relative z-10 p-2 ${rubik.className}`}
            >
              {imageIndex + 1} / {lightboxImage.length}
            </p>
            <button
              onClick={() => {
                setIsOpen(false);
                setImageIndex(0);
              }}
              className="text-white/90 text-2xl p-2 relative z-10 disabled:opacity-30 bg-black/30 hover:bg-black/40 disabled:hover:bg-black/30 flex justify-center items-center md:ml-2 transition-colors ease-in-out"
            >
              <HiOutlineXMark />
            </button>
          </div>
        )}
        renderPrevButton={() => (
          <button
            disabled={imageIndex === 0}
            onClick={gotoPrevious}
            className="text-white text-2xl p-2 relative z-10 disabled:opacity-30 bg-black/30 hover:bg-black/40 disabled:hover:bg-black/30 flex justify-center items-center md:ml-2 transition-colors ease-in-out"
          >
            <HiChevronLeft />
          </button>
        )}
        renderNextButton={() => (
          <button
            disabled={imageIndex === lightboxImage.length - 1}
            onClick={gotoNext}
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
      <section className="h-dvh snap-start w-full relative">
        <div className="absolute z-20 inset-0 bg-luma-dark/60 flex flex-col justify-center items-center">
          <div className="w-full px-8">
            <h2 className="font-bigilla leading-[40px] text-white text-4xl mb-6">
              Galeri <span className="font-italic">Kami</span>
            </h2>
          </div>
          <div className="w-full px-[2px]">
            <div className="relative">
              <Slider
                autoplaySpeed={3000}
                slidesToScroll={4}
                slidesToShow={4}
                {...settings}
              >
                {images.slice(divide).map((image, index) => (
                  <div
                    className="h-full w-full px-[2px]"
                    key={`Foto Galeri Primary ${index + 1}`}
                    onClick={() => {
                      if (!dragging) {
                        handleToggleLightbox(image);
                      }
                    }}
                  >
                    <div className="aspect-square w-full h-full relative">
                      <Image
                        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                        fill
                        quality={100}
                        alt={`Foto Galeri Primary ${index + 1}`}
                        priority
                        className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer object-center"
                        src={image}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="relative -mt-[2px]">
              <Slider
                autoplaySpeed={4000}
                slidesToScroll={2}
                slidesToShow={2}
                {...settings}
              >
                {images.slice(0, divide).map((image, index) => (
                  <div
                    className="h-full w-full px-[2px]"
                    key={`Foto Galeri Secondary ${index + 1}`}
                    onClick={() => {
                      if (!dragging) {
                        handleToggleLightbox(image);
                      }
                    }}
                  >
                    <div className="aspect-square w-full h-full relative">
                      <Image
                        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                        fill
                        quality={100}
                        alt={`Foto Galeri Secondary ${index + 1}`}
                        priority
                        className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer object-center"
                        src={image}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-full px-8 pt-6">
            <p
              className={`${rubik.className} text-[10px] md:text-xs font-light text-justify text-white`}
            >
              <span>
                <div className="w-5 h-[1px] bg-white/50 mb-1 inline-block mr-2"></div>
              </span>
              Setiap kisah cinta layak diabadikan, bukan hanya dalam ingatan,
              tapi juga dalam gambar yang tak pernah pudar.
            </p>
            <p
              className={`text-white/70 mt-4 text-[8px] md:text-[10px] uppercase tracking-[3px] ${rubik.className}`}
            >
              Rayhan Malik
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Photos;
