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
        <div className="py-[60px] px-1 md:px-4 md:py-[100px]">
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

          <div className="mt-8 md:mt-16 max-w-screen-xl mx-auto">
            <div className="columns-2 md:columns-2 lg:columns-4 gap-2 md:gap-4 space-y-2 md:space-y-4">
              {images.map((img, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={`${50 + index * 50}`}
                  onClick={() => handleToggleLightbox(img.src)}
                  key={`Foto Galeri ${index + 1} Tema Samaya`}
                  className="relative overflow-hidden group cursor-pointer"
                >
                  <Image
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={80}
                    priority={index < 3}
                    loading={index < 3 ? "eager" : "lazy"}
                    alt={`Foto Galeri ${index + 1} Tema Samaya`}
                    src={img.src}
                    width={500}
                    height={700}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105 bg-white/5"
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
