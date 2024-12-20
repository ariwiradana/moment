import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface CustomImageSlidesProps {
  images: string[];
  handleToggleLightbox: (index: number) => void;
}

const CustomImageSlides = ({
  images,
  handleToggleLightbox,
}: CustomImageSlidesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (images.length > 0 && autoplay) {
      interval = setInterval(() => {
        setFade(false);

        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          setFade(true);
        }, 300);
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [images, autoplay]);

  const gotoPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setFade(true);
      }, 300);
    }
  }, [currentIndex]);

  const gotoNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setFade(true);
      }, 300);
    }
  }, [currentIndex, images.length]);

  const handleMouseEnter = () => {
    setAutoplay(false);
  };
  const handleMouseLeave = () => {
    setAutoplay(true);
  };
  const handleTouchStart = () => {
    setAutoplay(false);
  };
  const handleTouchEnd = () => {
    setAutoplay(true);
  };

  return (
    <div
      className="h-full relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        disabled={currentIndex === images.length - 1}
        onClick={gotoNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white text-xl p-2 z-10 disabled:opacity-30 bg-black/40 hover:bg-black/60 disabled:hover:bg-black/40 flex items-center justify-center md:mr-1 transition-colors ease-in-out"
      >
        <HiChevronRight />
      </button>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        disabled={currentIndex === 0}
        onClick={gotoPrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white text-xl p-2 z-10 disabled:opacity-30 bg-black/40 hover:bg-black/60 disabled:hover:bg-black/40 flex items-center justify-center md:ml-1 transition-colors ease-in-out"
      >
        <HiChevronLeft />
      </button>

      {images.length > 0 ? (
        <Image
          onClick={() => handleToggleLightbox(currentIndex + 11)}
          sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
          src={images[currentIndex]}
          alt={`slides-image-${currentIndex}`}
          fill
          className={`object-cover hover:scale-105 transform bg-white/5 group ${
            fade ? "opacity-100" : "opacity-50"
          } transition-all ease-in-out duration-500`}
        />
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default CustomImageSlides;
