import useClientStore from "@/store/useClientStore";
import Image from "next/image";
import React from "react";

const Photos = () => {
  const { client } = useClientStore();
  const images: string[] =
    client?.gallery && (client?.gallery as string[]).length > 0
      ? (client.gallery as string[])
      : [];

  return (
    <section className="flex flex-col w-full bg-nirvaya-dark">
      {images.map((image, index) => (
        <div className="relative w-full overflow-hidden" key={index}>
          <Image
            alt={`Photo ${index + 1}`}
            src={image}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto transform hover:scale-110 transition-transform ease-in-out duration-500"
          />
        </div>
      ))}
    </section>
  );
};

export default Photos;
