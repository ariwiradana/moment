import useClientStore from "@/store/useClientStore";
import { useState, useMemo, useCallback, useRef } from "react";

interface Image {
  src: string;
}

const useLightbox = () => {
  const { client } = useClientStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const zoomRef = useRef<HTMLDivElement | null>(null);

  // Memoized images array
  const images: Image[] = useMemo(
    () =>
      (client?.gallery as string[])
        ?.filter((src) => src !== client?.cover) // filter cover
        .map((src) => ({ src })) ?? [],
    [client?.gallery, client?.cover]
  );

  // Toggle lightbox and set index
  const handleToggleLightbox = useCallback(
    (src: string) => {
      const index = images.findIndex((img) => img.src === src);
      if (index !== -1) setImageIndex(index);
      setIsOpen((prev) => !prev); // toggle tetap aman
    },
    [images]
  );

  return {
    ref: { zoomRef },
    state: { images, isOpen, imageIndex },
    actions: { handleToggleLightbox, setIsOpen }, // tetap bisa dipanggil setIsOpen(false)
  };
};

export default useLightbox;
