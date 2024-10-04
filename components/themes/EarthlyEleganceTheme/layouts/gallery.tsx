import React, { FC } from "react";
import ImageShimmer from "../../../image.shimmer";
import Title from "../elements/title";
import { UseEarthlyEleganceTheme } from "@/hooks/themes/useEarthlyEleganceTheme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

interface Props {
  state: UseEarthlyEleganceTheme["state"];
}

const GalleryComponent: FC<Props> = (props) => {
  return (
    <section>
      <div className="bg-white relative z-10 h-full py-10 max-w-screen-xl mx-auto">
        <div className="w-full h-full p-6 md:px-12 relative z-40">
          <div data-aos="fade-up">
            <Title title="Cerita Kami" />
          </div>
          <Swiper
            data-aos="fade-up"
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
                    className="relative flex justify-center items-center max-w-[75vw] h-full"
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
