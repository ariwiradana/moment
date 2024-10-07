import React, { FC, useState } from "react";
import ImageShimmer from "../../../image.shimmer";
import Title from "../elements/title";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Props {
  state: useTheme1["state"];
}

const GalleryComponent: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images =
    Array.isArray(props.state.client?.gallery) &&
    props.state.client?.gallery.length > 0
      ? props.state.client?.gallery
      : [];

  const lightboxImage = images.map((img) => ({ src: img }));

  return (
    <section className="relative bg-white">
      <Lightbox
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .9)" } }}
        close={() => setOpen(false)}
        slides={lightboxImage}
        index={imageIndex}
        open={open}
        on={{
          view(props: { index: number }) {
            setImageIndex(props.index);
          },
        }}
      />

      <div
        className="relative z-10 h-full w-full bg-theme1-primary bg-opacity-5 pt-16"
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-repeat bg-contain opacity-10"></div>
        <div className="w-full h-full relative z-40">
          <div
            data-aos="zoom-in-up"
            className="relative h-12 lg:h-16 w-full mb-8"
          >
            <Image
              alt="leaf-datetime"
              src="/images/theme1/leaf.svg"
              fill
              className="object-contain"
            />
          </div>
          <div data-aos="fade-up" className="mb-12">
            <Title
              className="text-theme1-primary"
              title="Galeri Foto"
              caption={`${props.state.groom?.nickname} & ${props.state.bride?.nickname}`}
            />
          </div>

          <div>
            <Swiper
              data-aos="fade-up"
              loop
              autoplay={{
                delay: 4000,
              }}
              speed={2000}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              spaceBetween={2}
              modules={[Autoplay]}
              className="w-full h-[60vh] lg:h-screen mt-6"
            >
              {images?.length > 0
                ? images.map((image, index) => (
                    <SwiperSlide
                      key={`cerita-kami-${index}`}
                      className="relative flex justify-center items-center h-full"
                    >
                      <div
                        onClick={() => {
                          setOpen(() => true);
                          setImageIndex(() => index);
                        }}
                        className="relative h-full w-full"
                      >
                        <ImageShimmer
                          priority
                          sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
                          src={image}
                          alt={`cerita-kami-${index}`}
                          fill
                          className="object-cover transform transition-all ease-in-out duration-1000 delay-300"
                        />
                      </div>
                    </SwiperSlide>
                  ))
                : null}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryComponent;
