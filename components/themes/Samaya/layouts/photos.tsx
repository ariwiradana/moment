import React, { useEffect, useRef, useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import useLightbox from "@/hooks/themes/useLightbox";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { HiArrowLeft, HiArrowRight, HiXMark } from "react-icons/hi2";

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

  const zoomRef = useRef(null);

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
                backgroundColor: "rgba(0, 0, 0, 0.7)",
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
            <div className="mt-8 md:mt-16" data-aos="fade-up">
              <RowsPhotoAlbum
                spacing={4}
                targetRowHeight={rowHeight}
                photos={photos}
                onClick={({ photo }) => {
                  handleToggleLightbox(photo.src);
                }}
              />
            </div>
          </div>
        </section>
      </>
    );
};

export default Photos;
