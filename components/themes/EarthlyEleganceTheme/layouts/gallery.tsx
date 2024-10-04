import React, { FC, useState } from "react";
import ImageShimmer from "../../../image.shimmer";
import Title from "../elements/title";
import { UseEarthlyEleganceTheme } from "@/hooks/themes/useEarthlyEleganceTheme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

interface Props {
  state: UseEarthlyEleganceTheme["state"];
}

const GalleryComponent: FC<Props> = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section>
      <div className="bg-white relative z-10 h-full py-10">
        <div className="w-full h-full p-6 md:px-12 relative z-40 max-w-screen-md mx-auto">
          <Title title="Cerita Kami" />
          <Swiper
            autoplay={{
              delay: 4000,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            speed={3000}
            slidesPerView={"auto"}
            spaceBetween={12}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="w-full h-[70vh] mt-6"
          >
            {Array.isArray(props.state.client?.gallery) &&
            props.state.client?.gallery.length > 0
              ? props.state.client?.gallery.map((image, index) => (
                  <SwiperSlide
                    key={`cerita-kami-${index}`}
                    className="relative flex justify-center items-center max-w-[88%] h-full"
                  >
                    <div className="relative h-full">
                      <ImageShimmer
                        priority
                        src={image}
                        alt={`cerita-kami-${index}`}
                        fill
                        className={`h-full object-cover transform transition-all ease-in-out duration-1000 delay-300 ${
                          activeIndex === index ? "scale-110" : "scale-95"
                        }`}
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
