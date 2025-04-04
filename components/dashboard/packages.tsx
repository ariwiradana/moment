import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Package } from "@/lib/types";
import { redhat } from "@/lib/fonts";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import { Autoplay, Navigation } from "swiper/modules";

const PackageComponent = () => {
  const { data } = useSWR("/api/_pb/_p", fetcher);

  const pacakages: Package[] = data?.data || [];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [indicators, setIndicators] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIndicators(1);
      } else if (window.innerWidth > 768) {
        setIndicators(2);
      } else {
        setIndicators(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (pacakages.length > 0)
    return (
      <section className="py-8 md:py-10 lg:py-16 select-none relative" id="section4">
        <div className="max-w-screen-xl mx-auto">
          <div data-aos="fade-up" className="px-4 md:px-12 lg:px-4">
            <div className="flex justify-between items-center gap-4 mb-4 lg:hidden">
              <div className="flex gap-3">
                <button className="w-10 h-10 package-prev aspect-square rounded-full border border-zinc-400 flex justify-center items-center">
                  <HiOutlineArrowLongLeft />
                </button>
                <button className="w-10 h-10 package-next aspect-square rounded-full border border-zinc-400 flex justify-center items-center">
                  <HiOutlineArrowLongRight />
                </button>
              </div>
              <div className="flex">
                {Array(indicators)
                  .fill(indicators)
                  .map((p, index) => (
                    <div
                      key={`Indikator Paket Undangan ${p.name}`}
                      className={`h-1 w-3 ${
                        index === activeIndex
                          ? "bg-dashboard-dark"
                          : "bg-zinc-200"
                      }`}
                    ></div>
                  ))}
              </div>
            </div>
            <Swiper
              autoplay={{
                delay: 6000,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              spaceBetween={12}
              modules={[Navigation, Autoplay]}
              navigation={{ nextEl: ".package-next", prevEl: ".package-prev" }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {pacakages.map((p, index) => {
                const isLast = index === pacakages.length - 1;
                return (
                  <SwiperSlide
                    className="h-full"
                    key={`Paket Undangan ${p.name}`}
                  >
                    <div
                      className={`${
                        isLast
                          ? "bg-dashboard-dark text-white"
                          : "text-dashboard-dark bg-white"
                      } border border-dashboard-dark/10 p-8 lg:p-10`}
                      key={p.id}
                    >
                      <h2
                        className={`${redhat.className} text-2xl font-semibold`}
                      >
                        Paket {p.name}
                      </h2>

                      <div className="flex items-center gap-2 my-2">
                        {p.discount > 0 && (
                          <h2
                            className={`${
                              redhat.className
                            } text-base md:text-lg leading-4 ${
                              isLast
                                ? "text-white/50"
                                : "text-dashboard-dark/50"
                            } line-through`}
                          >
                            {formatToRupiah(p.price)}
                          </h2>
                        )}
                        <h2
                          className={`${redhat.className} font-medium text-lg md:text-xl`}
                        >
                          {formatToRupiah(p.price - p.discount)}
                        </h2>
                      </div>
                      <ul
                        className={`${redhat.className} mt-4 list-inside text-sm capitalize leading-7 marker:text-xs`}
                      >
                        <li
                          className={`list-disc ${
                            !p.unlimited_revisions &&
                            "line-through text-gray-300"
                          }`}
                        >
                          Revisi tidak terbatas
                        </li>
                        <li
                          className={`list-disc ${
                            !p.unlimited_guest_names &&
                            "line-through text-gray-300"
                          }`}
                        >
                          Nama tamu tidak terbatas
                        </li>
                        <li
                          className={`list-disc ${
                            !p.custom_opening_closing &&
                            "line-through text-gray-300"
                          }`}
                        >
                          Kustomisasi kalimat pembuka & penutup
                        </li>
                        <li
                          className={`list-disc ${
                            !p.countdown && "line-through text-gray-300"
                          }`}
                        >
                          Hitung Mundur Waktu
                        </li>
                        <li className="list-disc">
                          {Number(p.max_events) === 0
                            ? "Acara tak terbatas per undangan"
                            : `Maksimal ${p.max_events} acara per undangan`}
                        </li>
                        <li
                          className={`list-disc ${
                            Number(p.max_gallery_photos) === 0 &&
                            "line-through text-gray-300"
                          }`}
                        >
                          {Number(p.max_gallery_photos) !== 0
                            ? `Galeri Foto (maksimal ${p.max_gallery_photos} foto)`
                            : "Galeri Foto"}
                        </li>
                        {/* <li
                          className={`list-disc ${
                            Number(p.max_videos) === 0 &&
                            "line-through text-gray-300"
                          }`}
                        >
                          {Number(p.max_videos) !== 0
                            ? `Rekaman video (maksimal ${p.max_videos} video)`
                            : "Rekaman video"}
                        </li> */}
                        <li
                          className={`list-disc ${
                            !p.contact_social_media &&
                            "line-through text-gray-300"
                          }`}
                        >
                          Kontak Media Sosial
                        </li>
                        <li
                          className={`list-disc ${
                            !p.background_sound && "line-through text-gray-300"
                          }`}
                        >
                          Musik Latar
                        </li>
                        <li
                          className={`list-disc ${
                            !p.rsvp_and_greetings &&
                            "line-through text-gray-300"
                          }`}
                        >
                          RSVP & Ucapan
                        </li>
                        <li
                          className={`list-disc ${
                            !p.google_maps_integration &&
                            "line-through text-gray-300"
                          }`}
                        >
                          Lokasi terintegrasi dengan Google Maps
                        </li>
                        <li
                          className={`list-disc ${
                            !p.add_to_calendar && "line-through text-gray-300"
                          }`}
                        >
                          Fitur Tambahkan ke Kalender
                        </li>
                        <li
                          className={`list-disc ${
                            !p.custom_cover && "line-through text-gray-300"
                          }`}
                        >
                          Pilih cover foto / video cover
                        </li>
                        <li
                          className={`list-disc ${
                            !p.digital_envelope && "line-through text-gray-300"
                          }`}
                        >
                          Amplop digital
                        </li>
                      </ul>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    );
};

export default PackageComponent;
