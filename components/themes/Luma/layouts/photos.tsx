import Lightbox from "@/components/lightbox";
import useLightbox from "@/hooks/themes/useLightbox";
import { rubik } from "@/lib/fonts";
import { NextPage } from "next";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Slider, { Settings } from "react-slick";

const Photos: NextPage = () => {
  const {
    state: { images, isOpen, imageIndex },
    actions: { handleToggleLightbox, setIsOpen },
  } = useLightbox();

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
      <Lightbox
        imageIndex={imageIndex}
        images={images}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <section className="h-dvh snap-start w-full relative">
        <div className="absolute z-20 inset-0 bg-luma-dark/70 flex flex-col justify-center items-center">
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
                speed={200}
                {...settings}
              >
                {images.slice(divide).map((image, index) => (
                  <div
                    className="h-full w-full px-[2px]"
                    key={`Foto Galeri Primary ${index + 1}`}
                    onClick={() => handleToggleLightbox(image)}
                  >
                    <div className="aspect-square w-full h-full relative">
                      <Image
                        loading="lazy"
                        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                        fill
                        alt={`Foto Galeri Primary ${index + 1}`}
                        className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark object-center"
                        src={image}
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
                speed={400}
                {...settings}
              >
                {images.slice(0, divide).map((image, index) => (
                  <div
                    className="h-full w-full px-[2px]"
                    key={`Foto Galeri Secondary ${index + 1}`}
                    onClick={() => handleToggleLightbox(image)}
                  >
                    <div className="aspect-square w-full h-full relative">
                      <Image
                        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                        fill
                        quality={100}
                        alt={`Foto Galeri Secondary ${index + 1}`}
                        loading="lazy"
                        className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark object-center"
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
