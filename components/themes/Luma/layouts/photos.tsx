import useLightbox from "@/hooks/themes/useLightbox";
import { rubik } from "@/lib/fonts";
import { NextPage } from "next";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { HiArrowLeft, HiArrowRight, HiXMark } from "react-icons/hi2";
import Slider, { Settings } from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

const Photos: NextPage = () => {
  const {
    state: { images, isOpen, imageIndex },
    actions: { handleToggleLightbox, setIsOpen },
  } = useLightbox();

  const zoomRef = useRef(null);
  const sliderRef = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);
  const divide = useMemo(() => Math.floor(images.length / 2), [images]);

  const settings: Settings = {
    draggable: false,
    dots: false,
    waitForAnimate: false,
    arrows: false,
    cssEase: "ease-in-out",
  };

  return (
    <>
      {isOpen && (
        <Lightbox
          index={imageIndex}
          plugins={[Counter, Zoom]}
          zoom={{ ref: zoomRef }}
          counter={{ container: { style: { top: 0, left: 0, padding: 0 } } }}
          controller={{
            closeOnPullDown: true,
            closeOnBackdropClick: true,
          }}
          styles={{
            container: {
              zIndex: 100,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: 0,
              filter: "none",
            },
            slide: {
              padding: 0,
              filter: "none",
            },
            button: {
              filter: "none",
            },
            icon: {
              filter: "none",
            },
            toolbar: {
              padding: 0,
              filter: "none",
            },
            navigationNext: { padding: 0 },
            navigationPrev: { padding: 0 },
          }}
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={images}
          render={{
            iconZoomIn: () => <FiZoomIn className="text-white" />,
            iconZoomOut: () => <FiZoomOut className="text-white" />,
            buttonClose: () => {
              return (
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-luma-dark/50 aspect-square text-lg shadow-none"
                >
                  <HiXMark className="text-white" />
                </button>
              );
            },
            iconPrev: () => (
              <div className="p-3 bg-luma-dark/50 aspect-square">
                <HiArrowLeft className="text-white" />
              </div>
            ),
            iconNext: () => (
              <div className="p-3 bg-luma-dark/50 aspect-square">
                <HiArrowRight className="text-white" />
              </div>
            ),
          }}
        />
      )}
      <section className="h-dvh snap-start w-full relative">
        <div className="absolute z-20 inset-0 bg-luma-dark/60 flex flex-col justify-center items-center">
          <div className="w-full px-8 flex items-center justify-between mb-6">
            <h2 className="font-bigilla leading-[40px] text-white text-4xl">
              Galeri <span className="font-italic">Kami</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sliderRef.current?.slickPrev();
                  sliderRef2.current?.slickPrev();
                }}
                className="p-2 rounded-full border border-white/50 text-white aspect-square"
              >
                <HiArrowLeft />
              </button>
              <button
                onClick={() => {
                  sliderRef.current?.slickNext();
                  sliderRef2.current?.slickNext();
                }}
                className="p-2 rounded-full border border-white/50 text-white aspect-square"
              >
                <HiArrowRight />
              </button>
            </div>
          </div>
          <div className="w-full px-[2px]">
            <div className="relative">
              <Slider
                ref={sliderRef}
                slidesToScroll={4}
                slidesToShow={4}
                {...settings}
              >
                {images.slice(divide).map((image, index) => (
                  <div
                    className="h-full w-full px-[2px]"
                    key={`Foto Galeri Primary ${index + 1}`}
                    onClick={() => handleToggleLightbox(image.src)}
                  >
                    <div className="aspect-square w-full h-full relative">
                      <Image
                        loading="lazy"
                        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                        fill
                        alt={`Foto Galeri Primary ${index + 1}`}
                        className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark object-center"
                        src={image.src}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="relative -mt-[2px]">
              <Slider
                ref={sliderRef2}
                slidesToScroll={2}
                slidesToShow={2}
                speed={700}
                {...settings}
              >
                {images.slice(0, divide).map((image, index) => (
                  <div
                    className="h-full w-full px-[2px]"
                    key={`Foto Galeri Secondary ${index + 1}`}
                    onClick={() => handleToggleLightbox(image.src)}
                  >
                    <div className="aspect-square w-full h-full relative">
                      <Image
                        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                        fill
                        quality={100}
                        alt={`Foto Galeri Secondary ${index + 1}`}
                        loading="lazy"
                        className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark object-center"
                        src={image.src}
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
