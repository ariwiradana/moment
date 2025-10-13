import { redhat } from "@/lib/fonts";
import { Package, Theme } from "@/lib/types";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { Modal } from "@mui/material";
import React from "react";

interface Props {
  pkg: Package;
  isOpen: boolean;
  setOpenModal: () => void;
  theme: Theme;
}
const ModalPackages = ({ pkg, isOpen, setOpenModal, theme }: Props) => {
  return (
    <Modal
      onClose={setOpenModal}
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className={`absolute ${
          isOpen ? "bottom-0" : "-bottom-full"
        } lg:bottom-auto lg:top-1/2 transform left-1/2 -translate-x-1/2 lg:-translate-y-1/2 w-full md:w-[80vw] lg:w-auto lg:min-w-[20vw]`}
      >
        <div
          className={`text-dashboard-dark bg-white border border-dashboard-dark/10 p-8 lg:p-10`}
        >
          <h2 className={`${redhat.className} text-2xl font-semibold`}>
            {pkg?.name}
          </h2>

          <div className="flex items-center gap-2 my-2">
            {pkg?.discount && pkg?.discount > 0 ? (
              <h2
                className={`${redhat.className} text-base md:text-lg leading-4 text-dashboard-dark/50 line-through`}
              >
                {formatToRupiah(pkg?.price)}
              </h2>
            ) : null}
            {pkg?.price && (
              <h2
                className={`${redhat.className} font-medium text-lg md:text-xl`}
              >
                {formatToRupiah(pkg?.price - pkg?.discount)}
              </h2>
            )}
          </div>
          <ul
            className={`${redhat.className} mt-4 list-inside text-sm capitalize leading-7 marker:text-xs`}
          >
            <li
              className={`list-disc ${
                !pkg?.unlimited_revisions && "line-through text-gray-300"
              }`}
            >
              Revisi tidak terbatas
            </li>
            <li
              className={`list-disc ${
                !pkg?.unlimited_guest_names && "line-through text-gray-300"
              }`}
            >
              Nama tamu tidak terbatas
            </li>
            <li
              className={`list-disc ${
                !pkg?.custom_opening_closing && "line-through text-gray-300"
              }`}
            >
              Kustomisasi kalimat pembuka & penutup
            </li>
            <li
              className={`list-disc ${
                !pkg?.countdown && "line-through text-gray-300"
              }`}
            >
              Hitung Mundur Waktu
            </li>
            <li className="list-disc">
              {Number(pkg?.max_events) === 0
                ? "Acara tak terbatas per undangan"
                : `Maksimal ${pkg?.max_events} acara per undangan`}
            </li>
            <li
              className={`list-disc ${
                Number(pkg?.max_gallery_photos) === 0 &&
                "line-through text-gray-300"
              }`}
            >
              {Number(pkg?.max_gallery_photos) !== 0
                ? `Galeri Foto (maksimal ${pkg?.max_gallery_photos} foto)`
                : "Galeri Foto"}
            </li>
            <li
              className={`list-disc ${
                Number(pkg?.max_videos) === 0 && "line-through text-gray-300"
              }`}
            >
              {Number(pkg?.max_videos) !== 0
                ? `Rekaman video (maksimal ${pkg?.max_videos} video)`
                : "Rekaman video"}
            </li>
            <li
              className={`list-disc ${
                !pkg?.contact_social_media && "line-through text-gray-300"
              }`}
            >
              Kontak Media Sosial
            </li>
            <li
              className={`list-disc ${
                !pkg?.background_sound && "line-through text-gray-300"
              }`}
            >
              Musik Latar
            </li>
            <li
              className={`list-disc ${
                !pkg?.rsvp_and_greetings && "line-through text-gray-300"
              }`}
            >
              RSVP & Ucapan
            </li>
            <li
              className={`list-disc ${
                !pkg?.google_maps_integration && "line-through text-gray-300"
              }`}
            >
              Lokasi terintegrasi dengan Google Maps
            </li>
            <li
              className={`list-disc ${
                !pkg?.add_to_calendar && "line-through text-gray-300"
              }`}
            >
              Fitur Tambahkan ke Kalender
            </li>
            <li
              className={`list-disc ${
                !pkg?.digital_envelope && "line-through text-gray-300"
              }`}
            >
              Amplop digital
            </li>
          </ul>
          {pkg.name === "Exclusive" && theme.features?.length > 0 ? (
            <>
              <p className="mt-4 text-dashboard-dark font-medium">
                Fitur Tambahan Tema
              </p>
              <ul
                className={`${redhat.className} list-inside text-sm capitalize leading-7 marker:text-xs`}
              >
                {theme.features?.map((feature) => (
                  <li
                    key={`Fitur Tambahan Tema ${theme.name}`}
                    className={`list-disc`}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default ModalPackages;
