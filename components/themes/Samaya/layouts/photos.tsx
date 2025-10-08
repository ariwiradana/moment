"use client";
import React, { useEffect, useState, useCallback } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import useLightbox from "@/hooks/themes/useLightbox";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { RotatingLines } from "react-loader-spinner";

interface Photo {
  src: string;
  width: number;
  height: number;
}

const PhotosComponent = () => {
  const {
    state: { images, isOpen, imageIndex },
    actions: { handleToggleLightbox, setIsOpen },
  } = useLightbox();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [rowHeight, setRowHeight] = useState(300);

  // --- Load images dan hitung dimensi ---
  const loadPhotos = useCallback(async () => {
    const loadedPhotos: Photo[] = await Promise.all(
      images.map(
        (img) =>
          new Promise<Photo>((resolve) => {
            const image = new window.Image();
            image.src = img.src;
            image.onload = () => {
              resolve({
                src: img.src,
                width: image.naturalWidth,
                height: image.naturalHeight,
              });
            };
            image.onerror = () => {
              // fallback kalau gagal load
              resolve({ src: img.src, width: 400, height: 300 });
            };
          })
      )
    );
    setPhotos(loadedPhotos);
  }, [images]);

  useEffect(() => {
    if (images.length > 0) loadPhotos();
  }, [images, loadPhotos]);

  // --- Responsive row height ---
  useEffect(() => {
    const handleResize = () => {
      setRowHeight(window.innerWidth < 768 ? 250 : 350);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          slides={photos.map((p) => ({ src: p.src }))}
        />
      )}

      <section className="bg-samaya-dark">
        <div className="pt-[60px] pb-1 md:pb-2 md:pt-[100px] px-1 md:px-2">
          <div className="px-6 md:px-0 text-center">
            <h2
              data-aos="fade-up"
              className="text-white leading-8 text-xl md:text-2xl 2xl:text-3xl font-tan-pearl"
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
          <div className="mt-8 md:mt-16" data-aos="fade-up">
            {photos.length === 0 ? (
              <div className="flex justify-center pb-8">
                <RotatingLines
                  strokeColor="#D1CAA1"
                  width="24"
                  strokeWidth="3"
                  animationDuration="1"
                  ariaLabel="rotating-lines-loading"
                />
              </div>
            ) : (
              <div>
                <RowsPhotoAlbum
                  spacing={4}
                  targetRowHeight={rowHeight}
                  photos={photos}
                  onClick={({ photo }) => handleToggleLightbox(photo.src)}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PhotosComponent;
