"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type LightboxProps = {
  images: string[];
  open: boolean;
  index: number;
  onClose: () => void;
};

export default function Lightbox({
  images,
  open,
  index,
  onClose,
}: LightboxProps) {
  const [current, setCurrent] = useState(index);
  const [startX, setStartX] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;

    setCurrent(index);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open, index]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowLeft") {
        setCurrent((prev) => Math.max(0, prev - 1));
      }

      if (e.key === "ArrowRight") {
        setCurrent((prev) => Math.min(images.length - 1, prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, images.length, onClose]);

  if (!open) return null;

  const hasPrev = current > 0;
  const hasNext = current < images.length - 1;

  const handlePointerDown = (e: React.PointerEvent) => {
    setStartX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startX === null) return;

    const diff = e.clientX - startX;

    if (Math.abs(diff) > 50) {
      if (diff < 0 && hasNext) {
        setCurrent((prev) => prev + 1);
      }

      if (diff > 0 && hasPrev) {
        setCurrent((prev) => prev - 1);
      }
    }

    setStartX(null);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95" onClick={onClose}>
      {/* Image */}
      <div
        className="absolute inset-0 touch-pan-y"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <Image
          src={images[current]}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-2xl text-white"
      >
        ×
      </button>

      {/* Previous */}
      {hasPrev && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => prev - 1);
          }}
          className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 text-4xl text-white md:block"
        >
          ‹
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => prev + 1);
          }}
          className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 text-4xl text-white md:block"
        >
          ›
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-white">
          {current + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
