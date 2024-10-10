import React from "react";
import { afacad, dm, marcellus } from "@/lib/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Review } from "@/lib/types";
import { getInitial } from "@/utils/getInitial";
import { Autoplay, Pagination } from "swiper/modules";

const TestimonialsComponent = () => {
  const { data } = useSWR("/api/reviews", fetcher);

  const testimonials: Review[] = data?.data || [];

  if (testimonials.length > 0)
    return (
      <section
        data-aos="fade-up"
        className="py-16 lg:py-24 relative"
        id="section5"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 relative ">
          <div data-aos="fade-up">
            <h1 className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold`}>
              Bagaimana <br /> Pengalaman Klien?
            </h1>
            <p className={`${afacad.className} text-lg md:text-xl mt-3`}>
              Kami berterima kasih kepada klien kami yang telah berbagi
              pengalaman mereka.
            </p>
          </div>
          <div className="my-6 w-full" data-aos="fade-up">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 4000,
              }}
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
              speed={1000}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={16}
            >
              {testimonials.map((t) => (
                <SwiperSlide
                  key={`testimoni-${t.id}`}
                  className="bg-dashboard-dark p-8 rounded text-white mb-12"
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="w-14 h-14 min-w-14 min-h-14 text-xl rounded-full bg-zinc-100 flex justify-center items-center text-dashboard-dark">
                      <span className={marcellus.className}>
                        {getInitial(t.name)}
                      </span>
                    </div>
                    <div>
                      <h1
                        className={`${marcellus.className} text-xl lg:text-2xl capitalize line-clamp-1`}
                      >
                        {t.name}
                      </h1>
                      <p className={`${afacad.className} text-lg line-clamp-1`}>
                        Summer Daylight - Undangan Pernikahan
                      </p>
                    </div>
                  </div>
                  <p className={`${afacad.className} mt-4 font-light text-lg`}>
                    {t.wishes}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    );
};

export default TestimonialsComponent;
