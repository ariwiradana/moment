import useClientStore from "@/store/useClientStore";
import React, { useCallback, useMemo } from "react";

interface Image {
  src: string;
}

const useLightbox = () => {
  const { client } = useClientStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(0);

  const images: Image[] = useMemo(
    () => (client?.gallery as string[])?.map((image) => ({ src: image })) ?? [],
    [client?.gallery]
  );

  const handleToggleLightbox = useCallback(
    (image: string) => {
      setIsOpen((state) => !state);
      const index = images.findIndex((img) => img.src === image);
      setImageIndex(index);
    },
    [isOpen]
  );

  return {
    state: {
      images,
      isOpen,
      imageIndex,
    },
    actions: { handleToggleLightbox, setIsOpen },
  };
};

export default useLightbox;
