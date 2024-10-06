import React, { FC, useState } from "react";
import ImageShimmer from "../../../image.shimmer";
import Title from "../elements/title";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
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
    <section>
      <Lightbox
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .9)" } }}
        close={() => setOpen(false)}
        slides={lightboxImage}
        index={imageIndex}
        open={open}
        on={{
          view(props) {
            setImageIndex(props.index);
          },
        }}
      />
      <div className="relative z-10 h-full py-16 max-w-screen-xl mx-auto">
        <div className="absolute inset-0 bg-repeat bg-contain opacity-10"></div>
        <div className="w-full h-full px-6 md:px-12 relative z-40">
          <div data-aos="zoom-in-up" className="flex justify-center">
            <Image
              alt="leaf-datetime"
              src="/images/theme1/leaf5-gold.svg"
              width={110}
              height={50}
              className="mb-8"
            />
          </div>
          <div data-aos="fade-up">
            <Title className="text-theme1-gold" title="Momen Bahagia" />
          </div>
          <Swiper
            data-aos="zoom-in-up"
            loop
            autoplay={{
              delay: 4000,
            }}
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
              scale: 1.15,
            }}
            speed={2000}
            centeredSlides
            slidesPerView={"auto"}
            spaceBetween={0}
            modules={[Autoplay, EffectCoverflow]}
            className="w-full h-[65vh] mt-6"
          >
            {images?.length > 0
              ? images.map((image, index) => (
                  <SwiperSlide
                    key={`cerita-kami-${index}`}
                    className="relative flex justify-center items-center max-w-[75vw] h-full py-4"
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
                        sizes="70vw"
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
    </section>
  );
};

export default GalleryComponent;
