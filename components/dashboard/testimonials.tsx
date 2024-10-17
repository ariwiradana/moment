import React from "react";
import { afacad, dm, marcellus } from "@/lib/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Testimonials } from "@/lib/types";
import { getInitial } from "@/utils/getInitial";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import moment from "moment";
import { BiTime } from "react-icons/bi";

const TestimonialsComponent = () => {
  const { data } = useSWR("/api/_pb/_ts", fetcher);

  const testimonials: Testimonials[] = data?.data || [];

  if (testimonials.length > 0)
    return (
      <section
        data-aos="fade-up"
        className="py-16 lg:py-24 relative bg-zinc-50 select-none"
        id="section5"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 relative ">
          <div data-aos="fade-up">
            <h1
              className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold`}
            >
              Bagaimana <br /> Pengalaman Klien?
            </h1>
            <p
              className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3`}
            >
              Kami berterima kasih kepada klien kami yang telah berbagi
              pengalaman mereka.
            </p>
          </div>
          <div className="w-full my-6" data-aos="fade-up">
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
                  className="bg-dashboard-dark p-8 rounded text-white mb-6"
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="w-14 h-14 min-w-14 min-h-14 text-xl rounded-full bg-zinc-100 flex justify-center items-center text-dashboard-dark relative">
                      {t.client_cover ? (
                        <Image
                          sizes="100px"
                          src={t.client_cover}
                          alt={`testimonial-${t.id}`}
                          fill
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <span className={marcellus.className}>
                          {getInitial(t.name)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h1
                        className={`${marcellus.className} text-xl lg:text-2xl capitalize`}
                      >
                        {t.name}
                      </h1>
                      <p
                        className={`${afacad.className} text-zinc-300 flex items-center gap-x-2 md:text-lg`}
                      >
                        Undangan {t.theme_category}
                      </p>
                    </div>
                  </div>

                  <p className={`${afacad.className} font-light text-lg my-3`}>
                    {t.comments}
                  </p>
                  <div className="flex items-center gap-x-2 text-zinc-300 md:text-lg">
                    <BiTime className="text-sm" />
                    <p className={`${afacad.className} `}>
                      {moment(t.created_at).fromNow()}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    );
};

export default TestimonialsComponent;
