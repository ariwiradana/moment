import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { HiOutlineZoomIn, HiOutlineZoomOut, HiX } from "react-icons/hi";
import { redhat } from "@/lib/fonts";

interface Props {
  isOpen: boolean;
  images: string[];
  imageIndex?: number;
  onClose: () => void;
}

const Lightbox: NextPage<Props> = ({
  isOpen = false,
  images = [],
  imageIndex = 0,
  onClose,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const width = container.clientWidth;
      container.scrollTo({ left: width * index, behavior: "instant" });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
      if (currentIndex < images.length - 1)
        setCurrentIndex((state) => state + 1);
    }
  };
  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
      if (currentIndex > 0) setCurrentIndex((state) => state - 1);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 });
      scrollToIndex(imageIndex);
      setCurrentIndex(imageIndex);
    }
  }, [isOpen, imageIndex]);

  type Zoom = {
    index: number;
    zoomed: number;
  };
  const [zoomed, setZoomed] = useState<Zoom>({
    index: 0,
    zoomed: 0,
  });

  const handleDoubleTap = (index: number) => {
    setZoomed((state) => ({
      ...state,
      index,
      zoomed: state.zoomed === 2 ? 0 : state.zoomed + 1,
    }));
    setPosition({ x: 0, y: 0 });
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomed.zoomed !== 0) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-dashboard-dark/70 z-[999] duration-300 transition-all ease-in-out flex justify-center items-center ${
        isOpen
          ? "visible opacity-100"
          : "invisible opacity-0 delay-200 duration-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-w-5xl w-full ${
          isOpen
            ? "opacity-100 translate-y-0 delay-200 duration-100"
            : "opacity-0 translate-y-4 duration-300"
        } transition-all ease-in-out transform`}
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full h-[100vh] relative"
        >
          {images.map((src, i) => {
            const isZoomed = zoomed.index === i && zoomed.zoomed !== 0;
            const scale = isZoomed ? zoomed.zoomed * 1.5 : 1;
            const translate = isZoomed
              ? `translate(${position.x}px, ${position.y}px)`
              : "translate(0px, 0px)";

            return (
              <div
                key={i}
                onDoubleClick={() => handleDoubleTap(i)}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setIsDragging(false)}
                className={`snap-center min-w-full relative h-full transition-all ease-in-out cursor-${
                  isZoomed ? (isDragging ? "grabbing" : "grab") : "default"
                }`}
                onClick={onClose}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full h-full -translate-y-1/2 z-20"
                />
                <Image
                  sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                  quality={100}
                  fill
                  src={src}
                  alt={`image-${i}`}
                  className="h-full object-contain transition-transform"
                  style={{
                    transform: `${translate} scale(${scale})`,
                    transition: isDragging
                      ? "none"
                      : "transform 0.3s ease-in-out",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <p
        className={`fixed top-3 left-3 text-xs md:text-sm text-white ${redhat.className}`}
      >
        {currentIndex + 1} / {images.length}
      </p>
      <div
        className="fixed top-0 right-0 flex"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          disabled={zoomed.zoomed === 2}
          onClick={() => {
            setZoomed((state) => ({
              ...state,
              index: currentIndex,
              zoomed: state.zoomed < 2 ? state.zoomed + 1 : 2,
            }));
            setPosition({ x: 0, y: 0 });
          }}
          className="disabled:pointer-events-none disabled:opacity-50 w-10 md:w-12 flex justify-center items-center aspect-square bg-dashboard-dark/50 hover:bg-dashboard-dark/70 text-white md:text-lg"
        >
          <HiOutlineZoomIn />
        </button>
        <button
          disabled={zoomed.zoomed === 0}
          onClick={() => {
            setZoomed((state) => ({
              ...state,
              index: currentIndex,
              zoomed: state.zoomed > 0 ? state.zoomed - 1 : 0,
            }));
            setPosition({ x: 0, y: 0 });
          }}
          className="disabled:pointer-events-none disabled:opacity-50 w-10 md:w-12 flex justify-center items-center aspect-square bg-dashboard-dark/50 hover:bg-dashboard-dark/70 text-white md:text-lg"
        >
          <HiOutlineZoomOut />
        </button>
        <button
          onClick={onClose}
          className="w-10 md:w-12 flex justify-center items-center aspect-square bg-dashboard-dark/50 hover:bg-dashboard-dark/70 text-white md:text-lg"
        >
          <HiX />
        </button>
      </div>
      <button
        disabled={currentIndex === images.length - 1}
        onClick={(e) => {
          e.stopPropagation();
          scrollNext();
        }}
        className="absolute disabled:pointer-events-none disabled:opacity-50 top-1/2 right-0 md:right-2 transform -translate-y-1/2 bg-dashboard-dark/50 hover:bg-dashboard-dark/70 text-white w-10 md:w-12 flex justify-center items-center text-base md:text-lg aspect-square"
      >
        <HiArrowRight />
      </button>
      <button
        disabled={currentIndex === 0}
        onClick={(e) => {
          e.stopPropagation();
          scrollPrev();
        }}
        className="absolute disabled:pointer-events-none disabled:opacity-50 top-1/ left-0 md:left-2 transform -translate-y-1/2 bg-dashboard-dark/50 hover:bg-dashboard-dark/70 text-white w-10 md:w-12 flex justify-center items-center text-base md:text-lg aspect-square"
      >
        <HiArrowLeft />
      </button>
    </div>
  );
};

export default Lightbox;
