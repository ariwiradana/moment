import React from "react";
import ButtonPrimary from "./elements/button.primary";
import { BiCalendarEvent, BiCheck } from "react-icons/bi";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Package } from "@/lib/types";
import { afacad, dm } from "@/lib/fonts";
import { formatToRupiah } from "@/utils/formatToRupiah";
import useDashboardStore from "@/lib/dashboardStore";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { MdDiscount } from "react-icons/md";
import { getDiscountPrice } from "@/utils/getDiscountPrice";

const PackageComponent = () => {
  const { data } = useSWR("/api/_pb/_p", fetcher);
  const { setSelectedPackageId } = useDashboardStore();
  const router = useRouter();

  const pacakages: Package[] = data?.data || [];

  if (pacakages.length > 0)
    return (
      <section
        data-aos="fade-up"
        className="py-16 lg:py-24 select-none"
        id="section4"
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pacakages.map((p, index) => {
            const isLast = index === pacakages.length - 1;
            return (
              <div
                className={`${
                  isLast
                    ? "bg-dashboard-dark text-white"
                    : "text-dashboard-dark bg-white"
                } border p-12 rounded`}
                key={p.id}
              >
                <h1
                  className={`${dm.className} text-3xl lg:text-[40px] font-bold`}
                >
                  Paket {p.name}
                </h1>
                <h2
                  className={`${afacad.className} text-xl mt-6 leading-4 ${
                    isLast ? "text-white/50" : "text-dashboard-dark/50"
                  } line-through`}
                >
                  {formatToRupiah(p.price)}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <h2
                    className={`${afacad.className} font-medium text-2xl md:text-3xl`}
                  >
                    {formatToRupiah(getDiscountPrice(p.price, 20))}
                  </h2>

                  <div
                    className={`${afacad.className} font-medium flex items-center gap-1 bg-dashboard-primary rounded-full px-2 py-1 text-sm text-dashboard-dark`}
                  >
                    <MdDiscount />
                    {20}%
                  </div>
                </div>
                <ul
                  className={`${afacad.className} mt-6 ml-4 text-lg capitalize leading-8`}
                >
                  <li className="list-disc">
                    {p.unlimited_revisions && "Revisi tidak terbatas"}
                  </li>
                  <li className="list-disc">
                    {p.unlimited_guest_names && "Nama tamu tidak terbatas"}
                  </li>
                  <li className="list-disc">
                    {p.custom_opening_closing &&
                      "Kustomisasi kalimat pembuka & penutup"}
                  </li>
                  <li className="list-disc">
                    {p.max_events === "unlimited"
                      ? "Acara tak terbatas per undangan"
                      : `${p.max_events} acara per undangan`}
                  </li>
                  <li className="list-disc">Hitung Mundur Waktu</li>
                  <li className="list-disc">
                    Galeri foto (maksimal {p.max_gallery_photos} foto)
                  </li>
                  <li
                    className={`list-disc ${
                      p.max_videos === "0" && "line-through text-gray-300"
                    }`}
                  >
                    {p.max_videos !== "0"
                      ? `Rekaman video (maksimal ${p.max_videos} video)`
                      : "Rekaman video"}
                  </li>
                  <li
                    className={`list-disc ${
                      !p.contact_social_media && "line-through text-gray-300"
                    }`}
                  >
                    Kontak media sosial
                  </li>
                  <li
                    className={`list-disc ${
                      !p.background_sound && "line-through text-gray-300"
                    }`}
                  >
                    Musik latar
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
                      !p.google_maps_integration && "line-through text-gray-300"
                    }`}
                  >
                    Lokasi terintegrasi dengan Google Maps
                  </li>
                  <li
                    className={`list-disc ${
                      !p.love_journey && "line-through text-gray-300"
                    }`}
                  >
                    Cerita Perjalanan Kisah Cinta
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
                    Pilih cover foto / Cover video
                  </li>
                  <li
                    className={`list-disc ${
                      !p.digital_envelope && "line-through text-gray-300"
                    }`}
                  >
                    Amplop digital
                  </li>
                </ul>
                <div className="mt-8">
                  <ButtonPrimary
                    onClick={() => {
                      setSelectedPackageId(p.id);
                      toast.success(
                        `Silahkan pilih tema dengan Paket ${p.name} yang tersedia.`,
                        {
                          icon: (
                            <div className="p-1 rounded bg-dashboard-primary">
                              <BiCalendarEvent />
                            </div>
                          ),
                        }
                      );
                      router.push("/tema");
                    }}
                    title="Pilih Kategori Paket"
                    icon={<BiCheck />}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
};

export default PackageComponent;
