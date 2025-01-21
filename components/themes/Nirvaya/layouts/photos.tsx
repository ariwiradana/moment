import useClientStore from "@/store/useClientStore";
import Image from "next/image";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Photos = () => {
  const { client } = useClientStore();
  const images: string[] =
    client?.gallery && (client?.gallery as string[]).length > 0
      ? (client.gallery as string[])
      : [];

  return (
    <section className="p-1 bg-nirvaya-light-brown">
      <Swiper
        autoplay
        speed={3000}
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={4}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
          1440: {
            slidesPerView: 5,
          },
        }}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={`Photo ${index + 1}`}>
            <div className="w-full aspect-[4/6] relative">
              <Image
                sizes="50vw"
                src={image}
                alt={`Photo ${index + 1}`}
                fill
                className="object-cover bg-nirvaya-dark/5"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Photos;
