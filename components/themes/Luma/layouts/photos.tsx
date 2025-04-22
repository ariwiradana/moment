import useLightbox from "@/hooks/themes/useLightbox";
import { rubik } from "@/lib/fonts";
import { NextPage } from "next";
import Image from "next/image";
import { useRef } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Slider, { Settings } from "react-slick";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";

const Photos: NextPage = () => {
  const {
    state: { images, isOpen, imageIndex },
    actions: { handleToggleLightbox, setIsOpen },
  } = useLightbox();

  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    draggable: false,
    dots: false,
    waitForAnimate: false,
    arrows: false,
  };

  if (images.length > 0)
    return (
      <>
        {isOpen && (
          <Lightbox
            index={imageIndex}
            plugins={[Zoom]}
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={images}
          />
        )}
        <section className="h-dvh snap-start w-full relative">
          <div className="absolute z-20 inset-0 bg-luma-dark flex flex-col justify-center items-center">
            <div className="w-full px-8 flex items-center justify-between mb-6">
              <h2 className="font-bigilla leading-[40px] text-white text-4xl">
                Galeri <span className="font-italic">Kami</span>
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sliderRef.current?.slickPrev();
                  }}
                  className="p-2 rounded-full border border-white/50 text-white aspect-square"
                >
                  <HiArrowLeft />
                </button>
                <button
                  onClick={() => {
                    sliderRef.current?.slickNext();
                  }}
                  className="p-2 rounded-full border border-white/50 text-white aspect-square"
                >
                  <HiArrowRight />
                </button>
              </div>
            </div>
            <div className="w-full overflow-x-hidden">
              <div className="relative px-1">
                <Slider
                  ref={sliderRef}
                  slidesToScroll={3}
                  slidesToShow={3}
                  rows={3}
                  speed={500}
                  {...settings}
                >
                  {images.map((image, index) => (
                    <div
                      className="h-full w-full px-1"
                      key={`Foto Galeri ${index + 1}`}
                      onClick={() => handleToggleLightbox(image.src)}
                    >
                      <div className="aspect-square w-full h-full relative">
                        <Image
                          priority
                          sizes="(max-width: 600px) 480px"
                          fill
                          alt={`Foto Galeri ${index + 1}`}
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
