import React from "react";
import { redhat } from "@/lib/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Testimonials } from "@/lib/types";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

const TestimonialsComponent = () => {
  const { data } = useSWR("/api/_pb/_ts", fetcher);

  const testimonials: Testimonials[] = data?.data || [];

  if (testimonials.length > 0)
    return (
      <section
        data-aos="fade-up"
        className="py-8 md:py-10 lg:py-16 relative bg-zinc-50"
        id="section5"
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-6 md:gap-12 md:grid-cols-2 px-4 md:px-12 lg:px-4">
          <div>
            <h2
              className={`${redhat.className} text-2xl md:text-3xl lg:text-4xl whitespace-nowrap font-semibold text-dashboard-dark`}
            >
              Apa Yang <br />
              Mereka Katakan?
            </h2>
            <p
              className={`${redhat.className} text-sm text-dashboard-dark/70 mt-2`}
            >
              Kami Berterima kasih kepada klien kami yang telah berbagi
              pengalaman mereka
            </p>
            <div className="flex gap-3 mt-6">
              <button className="w-10 h-10 review-prev aspect-square rounded-full border border-zinc-400 flex justify-center items-center">
                <HiOutlineArrowLongLeft />
              </button>
              <button className="w-10 h-10 review-next aspect-square rounded-full border border-zinc-400 flex justify-center items-center">
                <HiOutlineArrowLongRight />
              </button>
            </div>
          </div>
          <div>
            <Swiper
              loop
              autoplay={{
                delay: 6000,
              }}
              modules={[Navigation, Autoplay]}
              navigation={{ nextEl: ".review-next", prevEl: ".review-prev" }}
            >
              {testimonials?.map((t) => (
                <SwiperSlide key={`Testimoni Undangan ${t.name}`}>
                  <div className="flex flex-col justify-center">
                    <BiSolidQuoteAltLeft className="text-dashboard-dark text-xl" />
                    <p
                      className={`${redhat.className} text-xl font-medium text-dashboard-dark mt-1`}
                    >
                      {t.comments}
                    </p>
                    <div className="flex mt-4 gap-x-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-100 aspect-square relative">
                        <Image
                          src={t.client_cover}
                          fill
                          className="object-cover rounded-full"
                          alt={`Testimoni Undangan ${t.client_name}`}
                        />
                      </div>
                      <div>
                        <h4
                          className={`${redhat.className} text-lg font-semibold text-dashboard-dark`}
                        >
                          {t.name}
                        </h4>
                        <p
                          className={`${redhat.className} text-sm text-dashboard-dark/70 leading-none`}
                        >
                          Undangan {t.theme_name}
                        </p>
                      </div>
                    </div>
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
