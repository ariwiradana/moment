import React, { useEffect, useState } from "react";
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

const Photos = () => {
  const {
    state: { images, isOpen, imageIndex },
    actions: { handleToggleLightbox, setIsOpen },
  } = useLightbox();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [rowHeight, setRowHeight] = useState(300);

  useEffect(() => {
    let isCancelled = false;

    const loadImage = (src: string): Promise<Photo> =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          if (!isCancelled) {
            resolve({
              src,
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          }
        };
        img.src = src;
      });

    Promise.all(images.map((image) => loadImage(image.src))).then((loaded) => {
      if (!isCancelled) setPhotos(loaded);
    });

    return () => {
      isCancelled = true;
    };
  }, [images]);

  useEffect(() => {
    const handleResize = () => {
      setRowHeight(window.innerWidth < 768 ? 300 : 400);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <section className="bg-samaya-dark">
          <div className="pt-[60px] pb-1 md:pb-2 md:pt-[100px] px-1 md:px-2">
            <div className="px-6 md:px-0">
              <h2
                data-aos="fade-up"
                className={`text-white text-center leading-8 text-xl md:text-2xl 2xl:text-3xl font-tan-pearl`}
              >
                Galeri Kami
              </h2>
              <p
                data-aos="fade-up"
                className="text-white/50 text-center tracking-[1px] text-[10px] lg:text-xs mt-4 max-w-lg mx-auto"
              >
                Potret momen spesial dengan penuh makna dalam galeri kami,
              </p>
            </div>
            <div className="mt-8 md:mt-16">
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
                <div data-aos="fade-up">
                  <RowsPhotoAlbum
                    spacing={4}
                    targetRowHeight={rowHeight}
                    photos={photos}
                    onClick={({ photo }) => {
                      handleToggleLightbox(photo.src);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
};

export default Photos;
