"use client";
import React from "react";
import useLightbox from "@/hooks/themes/useLightbox";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Image from "next/image";

const PhotosComponent = () => {
  const {
    state: { images, isOpen, imageIndex },
    actions: { handleToggleLightbox, setIsOpen },
  } = useLightbox();

  if (images.length === 0) return null;

  return (
    <>
      {/* --- Lightbox --- */}
      {isOpen && (
        <Lightbox
          index={imageIndex}
          plugins={[Zoom]}
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={images.map((p) => ({ src: p.src }))}
        />
      )}

      <section className="bg-samaya-dark">
        <div className="py-[60px] md:py-[100px] px-1 md:px-2">
          <div className="px-6 md:px-0 text-center">
            <h2
              data-aos="fade-up"
              className="text-white leading-8 text-xl md:text-2xl xl:text-3xl font-tan-pearl"
            >
              Galeri Kami
            </h2>
            <p
              data-aos="fade-up"
              className="text-white/50 tracking-[1px] text-[10px] lg:text-xs mt-4 max-w-lg mx-auto"
            >
              Potret momen spesial dengan penuh makna dalam galeri kami
            </p>
          </div>

          {/* --- Photo Album --- */}
          <div
            className="mt-8 md:mt-16 max-w-screen-xl mx-auto"
            data-aos="fade-up"
          >
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
              {images.map((image, index) => (
                <div
                  role="Button"
                  onClick={() => handleToggleLightbox(image.src)}
                  key={index}
                  className="w-full relative" // remove aspect-[4/5] and handle ratio with padding
                  style={{ paddingBottom: "125%" }} // 4/5 aspect ratio
                  data-aos="fade-up"
                  data-aos-delay={`${50 + index * 50}`}
                >
                  <Image
                    quality={80}
                    priority={index < 3} // reduce number of eager images
                    alt={`Foto Galeri ${index + 1} Tema Samaya`}
                    src={image.src}
                    fill
                    className="object-cover"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PhotosComponent;
