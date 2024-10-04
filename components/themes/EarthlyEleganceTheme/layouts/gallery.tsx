import React, { FC } from "react";
import ImageShimmer from "../../../image.shimmer";
import Title from "../elements/title";
import { UseEarthlyEleganceTheme } from "@/hooks/themes/useEarthlyEleganceTheme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";

interface Props {
  state: UseEarthlyEleganceTheme["state"];
}

const GalleryComponent: FC<Props> = (props) => {
  return (
    <section>
      <div className="relative z-10 h-full py-20 max-w-screen-xl mx-auto">
        <div className="absolute inset-0 bg-repeat bg-contain opacity-10"></div>
        <div className="w-full h-full px-6 md:px-12 relative z-40">
          <div data-aos="fade-up" className="flex flex-col items-center mb-8">
            <Title title="Momen Bahagia" />
          </div>
          <div className="flex justify-center mt-8 mb-16" data-aos="zoom-in-up">
            <Image
              alt="leaf-datetime"
              src="/images/theme1/leaf5-gold.svg"
              width={110}
              height={50}
            />
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
            {Array.isArray(props.state.client?.gallery) &&
            props.state.client?.gallery.length > 0
              ? props.state.client?.gallery.map((image, index) => (
                  <SwiperSlide
                    key={`cerita-kami-${index}`}
                    className="relative flex justify-center items-center max-w-[75vw] h-full py-4"
                  >
                    <div className="relative h-full">
                      <ImageShimmer
                        priority
                        sizes="70vw"
                        src={image}
                        alt={`cerita-kami-${index}`}
                        fill
                        className={`h-full object-cover transform transition-all ease-in-out duration-1000 delay-300`}
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
