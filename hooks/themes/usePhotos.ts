import { Event } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const usePhotos = () => {
  const { client } = useClientStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images: string[] =
    client?.gallery && (client?.gallery as string[]).length > 0
      ? (client.gallery as string[]).filter(
          (g) => g !== client?.cover && g !== client?.seo
        )
      : [];

  const lightboxImage = useMemo(
    () =>
      images.map((img, index) => ({ src: img, alt: `gallery-${index + 1}` })),
    [images]
  );
  const gridImages = useMemo(() => images.slice(0, 11), [images]);
  const slideImages = useMemo(() => images.slice(11), [images]);

  const gotoPrevious = useCallback(() => {
    if (imageIndex > 0) setImageIndex((prev) => prev - 1);
  }, [imageIndex]);

  const gotoNext = useCallback(() => {
    if (imageIndex < images.length - 1) setImageIndex((prev) => prev + 1);
  }, [imageIndex, images.length]);

  const handleToggleLightbox = useCallback(
    (url: string) => {
      const idx = images.findIndex((image) => image === url);

      if (idx >= 0 && images.length > 0) {
        setImageIndex(idx);
        setIsOpen((prev) => !prev);
      }
    },
    [images]
  );

  return {
    state: {
      isOpen,
      images,
      lightboxImage,
      gridImages,
      slideImages,
      imageIndex,
    },
    actions: {
      gotoNext,
      gotoPrevious,
      setImageIndex,
      setIsOpen,
      handleToggleLightbox,
    },
  };
};

export default usePhotos;
