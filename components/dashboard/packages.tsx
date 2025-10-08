import React, { useState, useEffect, memo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Package } from "@/lib/types";
import { redhat } from "@/lib/fonts";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import Head from "next/head";

const PackageComponent = () => {
  const { data } = useSWR<{ data: Package[] }>("/api/_pb/_p", fetcher);
  const packages = data?.data || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicators, setIndicators] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIndicators(1);
      else if (window.innerWidth > 768) setIndicators(2);
      else setIndicators(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!packages.length) return null;

  const jsonLdPackages = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: packages.map((p, index) => ({
      "@type": "Product",
      position: index + 1,
      name: `Undangan Digital Paket ${p.name}`,
      description: `Paket ${p.name} untuk undangan digital Bali. Fitur: ${
        p.custom_opening_closing ? "Custom opening & closing, " : ""
      }${p.unlimited_revisions ? "Unlimited revisi, " : ""}${
        p.unlimited_guest_names ? "Nama tamu tidak terbatas, " : ""
      }${p.countdown ? "Hitung mundur waktu, " : ""}${
        Number(p.max_events) !== 0 ? `Maksimal ${p.max_events} acara, ` : ""
      }${
        Number(p.max_gallery_photos) !== 0
          ? `Galeri foto ${p.max_gallery_photos} foto, `
          : ""
      }${Number(p.max_videos) !== 0 ? `Video ${p.max_videos}, ` : ""}${
        p.contact_social_media ? "Kontak media sosial, " : ""
      }${p.background_sound ? "Musik latar, " : ""}${
        p.rsvp_and_greetings ? "RSVP & ucapan, " : ""
      }${p.google_maps_integration ? "Lokasi Google Maps, " : ""}${
        p.add_to_calendar ? "Tambahkan ke kalender, " : ""
      }${p.custom_cover ? "Custom cover, " : ""}${
        p.digital_envelope ? "Amplop digital" : ""
      }`.toLowerCase(),
      image: `/logo-bg.jpg`,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "IDR",
        price: p.price - p.discount,
        url: `https://momentinvitation.com`,
      },
      brand: {
        "@type": "Organization",
        name: "Moment Invitation",
      },
    })),
  };


  return (
    <section
      className="py-8 md:py-10 lg:py-16 select-none relative"
      id="section4"
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPackages) }}
        />
      </Head>
      <div className="max-w-screen-xl mx-auto">
        <div className="px-4 md:px-12 lg:px-4">
          {/* Navigation Buttons & Indicators */}
          <div className="flex justify-between items-center gap-4 mb-4 lg:hidden">
            <div className="flex gap-3">
              <button
                aria-label="Previous Paket"
                className="w-10 h-10 package-prev aspect-square rounded-full border border-zinc-400 flex justify-center items-center"
              >
                <HiOutlineArrowLongLeft />
              </button>
              <button
                aria-label="Next Paket"
                className="w-10 h-10 package-next aspect-square rounded-full border border-zinc-400 flex justify-center items-center"
              >
                <HiOutlineArrowLongRight />
              </button>
            </div>
            <div className="flex">
              {Array(indicators)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-3 ${
                      i === activeIndex ? "bg-dashboard-dark" : "bg-zinc-200"
                    }`}
                  />
                ))}
            </div>
          </div>

          <Swiper
            autoplay={{ delay: 6000 }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            spaceBetween={12}
            modules={[Navigation, Autoplay]}
            navigation={{ nextEl: ".package-next", prevEl: ".package-prev" }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {packages.map((p, index) => {
              const isLast = index === packages.length - 1;
              const discountedPrice = p.price - p.discount;
              return (
                <SwiperSlide key={`Paket-${p.name}`}>
                  <div
                    className={`border p-8 lg:p-10 ${
                      isLast
                        ? "bg-dashboard-dark text-white"
                        : "bg-white text-dashboard-dark"
                    } border-dashboard-dark/10`}
                  >
                    <h5
                      className={`${redhat.className} text-2xl font-semibold`}
                    >
                      Paket {p.name}
                    </h5>
                    <div className="flex items-center gap-2 my-2">
                      {p.discount > 0 && (
                        <p
                          className={`${
                            redhat.className
                          } text-base md:text-lg leading-4 line-through ${
                            isLast ? "text-white/50" : "text-dashboard-dark/50"
                          }`}
                        >
                          {formatToRupiah(p.price)}
                        </p>
                      )}
                      <p
                        className={`${redhat.className} font-medium text-lg md:text-xl`}
                      >
                        {formatToRupiah(discountedPrice)}
                      </p>
                      {p.discount > 0 && (
                        <p
                          className={`${redhat.className} flex items-center gap-x-1 rounded-full bg-dashboard-primary font-medium text-dashboard-dark text-[10px] md:text-xs px-2 py-[2px]`}
                        >
                          <TbRosetteDiscountCheckFilled />
                          Diskon {Math.round((p.discount / p.price) * 100)}%
                        </p>
                      )}
                    </div>
                    <ul
                      className={`${redhat.className} mt-4 list-inside text-base capitalize leading-7 marker:text-xs`}
                    >
                      <li
                        className={`list-disc ${
                          !p.unlimited_revisions && "line-through text-gray-300"
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
                      <li
                        className={`list-disc ${
                          Number(p.max_videos) === 0 &&
                          "line-through text-gray-300"
                        }`}
                      >
                        {Number(p.max_videos) !== 0
                          ? `Rekaman video (maksimal ${p.max_videos} video)`
                          : "Rekaman video"}
                      </li>
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
                          !p.rsvp_and_greetings && "line-through text-gray-300"
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

export default memo(PackageComponent);
