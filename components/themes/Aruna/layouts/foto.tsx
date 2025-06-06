import React, { memo, useMemo, useState } from "react";
import { roboto } from "@/lib/fonts";
import { getParticipantNames } from "@/utils/getParticipantNames";
import Image from "next/image";
import useClientStore from "@/store/useClientStore";
import Slider, { Settings } from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import useLightbox from "@/hooks/themes/useLightbox";

const Component = () => {
  const { client } = useClientStore();
  const { participants = [] } = client || {};

  const {
    state: { images, imageIndex, isOpen },
    actions: { handleToggleLightbox, setIsOpen },
  } = useLightbox();

  const gridImages = useMemo(() => images.slice(0, 6), [images]);
  const slideImages = useMemo(() => images?.slice(6), [images]);

  const [dragging, setDragging] = useState(false);

  const gridSpan = (index: number) => {
    switch (index) {
      case 0:
        return "col-span-2 row-span-2 aspect-square";
      case 1:
        return "col-span-2 row-span-4";
      case 6:
        return "col-span-2 row-span-2 aspect-square";
      case 7:
        return "col-span-2 row-span-2 aspect-square";
      default:
        return "col-span-1 row-span-1 aspect-square";
    }
  };

  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    waitForAnimate: false,
    autoplay: true,
    arrows: false,
    cssEase: "ease-in-out",
    speed: 400,
    afterChange() {
      setDragging(false);
    },
    beforeChange() {
      setDragging(true);
    },
  };

  const participantNames = useMemo(
    () => getParticipantNames(participants),
    [participants]
  );

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
        <section className="relative bg-aruna-dark overflow-hidden">
          <div className="w-full h-full relative z-20 pt-[60px] md:pt-[100px] pb-2">
            <p
              data-aos="fade-up"
              className={`${roboto.className} text-[10px] md:text-xs tracking-[1px] text-center text-white/80 max-w-screen-sm mx-auto mb-8 px-6`}
            >
              Setiap langkah adalah kebahagiaan, setiap senyum adalah kenangan.
              Di sini, kami mengabadikan momen cinta dan janji yang akan
              dikenang selamanya.
            </p>
            {client?.theme_category?.slug === "pernikahan" && (
              <p
                data-aos="fade-up"
                className={`text-white/60 text-[8px] md:text-[10px] uppercase text-center tracking-[6px] ${roboto.className}`}
              >
                Galeri {participantNames}
              </p>
            )}
            <div data-aos="zoom-out-up">
              <div
                className={`mt-10 grid grid-cols-4 px-2 ${
                  slideImages?.length > 0 ? "grid-rows-4" : "grid-rows-4"
                } gap-2`}
              >
                {gridImages?.map((img, index) => (
                  <div
                    key={`gallery-${index + 1}`}
                    onClick={() => handleToggleLightbox(img.src)}
                    className={`${gridSpan(
                      index
                    )} w-full relative overflow-hidden`}
                  >
                    <Image
                      sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                      priority={index < 2}
                      src={img.src}
                      fill
                      alt={`gallery-${index + 1}`}
                      className="object-cover hover:scale-105 transition-transform ease-in-out duration-500 bg-white/5"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 px-2">
                <Slider {...settings}>
                  {Array.isArray(client?.gallery) && client?.gallery.length > 0
                    ? client.gallery
                        .filter(
                          (image) =>
                            image !== client?.cover && image !== client?.seo
                        )
                        .map((image, index) => (
                          <div
                            key={`Foto Galeri ${index + 1}`}
                            className="px-1"
                            onClick={() => {
                              if (!dragging) {
                                handleToggleLightbox(image);
                              }
                            }}
                          >
                            <div className="aspect-square w-full relative">
                              <Image
                                sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                                fill
                                quality={100}
                                alt={`hero-img-${index}`}
                                priority
                                className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark object-center"
                                src={image}
                              />
                            </div>
                          </div>
                        ))
                    : null}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </>
    );
};

export default memo(Component);
