import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Package } from "@/lib/types";
import { redhat } from "@/lib/fonts";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { calculateDiscountPercentage } from "@/utils/calculateDiscount";

import { RiDiscountPercentFill } from "react-icons/ri";

const PackageComponent = () => {
  const { data } = useSWR("/api/_pb/_p", fetcher);

  const pacakages: Package[] = data?.data || [];

  if (pacakages.length > 0)
    return (
      <section className="py-10 lg:py-16 select-none" id="section4">
        <div className="max-w-screen-xl mx-auto">
          <div
            className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center px-4 md:px-12 lg:px-0"
            data-aos="fade-up"
          >
            <div className="flex flex-col gap-1 lg:flex-row justify-between lg:items-center w-full gap-x-8">
              <h2
                className={`${redhat.className} min-w-[30vw] text-3xl md:text-4xl font-semibold text-dashboard-dark`}
              >
                Paket Undangan Yang Tersedia
              </h2>
              <div className="h-[1px] w-full bg-dashboard-dark/10 hidden lg:block"></div>
              <p
                className={`${redhat.className} text-sm text-dashbbg-dashboard-dark/70 md:max-w-[60vw] lg:max-w-[30vw] w-full lg:text-right`}
              >
                Pilih dari berbagai paket undangan yang sesuai dengan kebutuhan
                Anda.
              </p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 lg:mt-8 px-4 md:px-12 lg:px-0"
          >
            {pacakages.map((p, index) => {
              const isLast = index === pacakages.length - 1;
              return (
                <div
                  className={`${
                    isLast
                      ? "bg-dashboard-dark text-white"
                      : "text-dashboard-dark bg-white"
                  } border border-dashboard-dark/10 p-8 lg:p-10`}
                  key={p.id}
                >
                  <h2 className={`${redhat.className} text-2xl font-semibold`}>
                    Paket {p.name}
                  </h2>
                  {p.discount > 0 && (
                    <h2
                      className={`${
                        redhat.className
                      } text-base mt-2 leading-4 ${
                        isLast ? "text-white/50" : "text-dashboard-dark/50"
                      } line-through`}
                    >
                      {formatToRupiah(p.price)}
                    </h2>
                  )}
                  <div className="flex items-center gap-2 my-2">
                    <h2
                      className={`${redhat.className} font-medium text-lg md:text-xl`}
                    >
                      {formatToRupiah(p.price - p.discount)}
                    </h2>

                    {p.discount > 0 && (
                      <div
                        className={`${
                          redhat.className
                        } font-medium flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                          isLast
                            ? "text-dashboard-dark bg-white"
                            : "text-white bg-dashboard-dark"
                        }`}
                      >
                        <RiDiscountPercentFill className="text-base" />-{" "}
                        {calculateDiscountPercentage(p.price, p.discount)}%
                      </div>
                    )}
                  </div>
                  <ul
                    className={`${redhat.className} mt-4 list-inside text-sm capitalize leading-7 marker:text-xs`}
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
                        !p.unlimited_guest_names && "line-through text-gray-300"
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
                        !p.contact_social_media && "line-through text-gray-300"
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
              );
            })}
          </div>
        </div>
      </section>
    );
};

export default PackageComponent;
