import Input from "@/components/admin/elements/input";
import { redhat } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import { formatToRupiah } from "@/utils/formatToRupiah";
import Image from "next/image";
import React, { useState } from "react";
import { BiCheck, BiDetail } from "react-icons/bi";
import ButtonPrimary from "../elements/button.primary";
import { IoArrowForward } from "react-icons/io5";
import toast from "react-hot-toast";
import ButtonSecondary from "../elements/button.secondary";
import { Modal } from "@mui/material";
import { Package } from "@/lib/types";
import { getClient } from "@/lib/client";

const PackageThemeLinkForm = () => {
  const { setForm, form, packages, themes, activeStep, setActiveStep } =
    useClientFormStore();

  const [activeModal, setActiveModal] = useState(false);
  const [detailPackage, setDetailPackage] = useState<Package | null>(null);

  const handleCheckSlug = async () => {
    const toastId = toast.loading("Cek link undangan...");
    try {
      const response = await getClient("/api/_pb/_f/_cs", {
        method: "POST",
        body: JSON.stringify({ slug: form.slug }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }
      await response.json();
      setActiveStep(activeStep + 1);
      toast.success("Link undangan dapat digunakan.", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengecek link undangan.", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <Modal
        onClose={() => setActiveModal((state) => !state)}
        open={activeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className={`absolute ${
            activeModal ? "bottom-0" : "-bottom-full"
          } lg:bottom-auto lg:top-1/2 transform left-1/2 -translate-x-1/2 lg:-translate-y-1/2 w-full md:w-[80vw] lg:w-auto lg:min-w-[20vw]`}
        >
          <div
            className={`text-dashboard-dark bg-white border border-dashboard-dark/10 p-8 lg:p-10`}
          >
            <h2 className={`${redhat.className} text-2xl font-semibold`}>
              Paket {detailPackage?.name}
            </h2>

            <div className="flex items-center gap-2 my-2">
              {detailPackage?.discount && detailPackage?.discount > 0 ? (
                <h2
                  className={`${redhat.className} text-base md:text-lg leading-4 text-dashboard-dark/50 line-through`}
                >
                  {formatToRupiah(detailPackage?.price)}
                </h2>
              ) : null}
              {detailPackage?.price && (
                <h2
                  className={`${redhat.className} font-medium text-lg md:text-xl`}
                >
                  {formatToRupiah(
                    detailPackage?.price - detailPackage?.discount
                  )}
                </h2>
              )}
            </div>
            <ul
              className={`${redhat.className} mt-4 list-inside text-sm capitalize leading-7 marker:text-xs`}
            >
              <li
                className={`list-disc ${
                  !detailPackage?.unlimited_revisions &&
                  "line-through text-gray-300"
                }`}
              >
                Revisi tidak terbatas
              </li>
              <li
                className={`list-disc ${
                  !detailPackage?.unlimited_guest_names &&
                  "line-through text-gray-300"
                }`}
              >
                Nama tamu tidak terbatas
              </li>
              <li
                className={`list-disc ${
                  !detailPackage?.custom_opening_closing &&
                  "line-through text-gray-300"
                }`}
              >
                Kustomisasi kalimat pembuka & penutup
              </li>
              <li
                className={`list-disc ${
                  !detailPackage?.countdown && "line-through text-gray-300"
                }`}
              >
                Hitung Mundur Waktu
              </li>
              <li className="list-disc">
                {Number(detailPackage?.max_events) === 0
                  ? "Acara tak terbatas per undangan"
                  : `Maksimal ${detailPackage?.max_events} acara per undangan`}
              </li>
              <li
                className={`list-disc ${
                  Number(detailPackage?.max_gallery_photos) === 0 &&
                  "line-through text-gray-300"
                }`}
              >
                {Number(detailPackage?.max_gallery_photos) !== 0
                  ? `Galeri Foto (maksimal ${detailPackage?.max_gallery_photos} foto)`
                  : "Galeri Foto"}
              </li>
              {/* <li
                className={`list-disc ${
                  Number(detailPackage?.max_videos) === 0 &&
                  "line-through text-gray-300"
                }`}
              >
                {Number(detailPackage?.max_videos) !== 0
                  ? `Rekaman video (maksimal ${detailPackage?.max_videos} video)`
                  : "Rekaman video"}
              </li> */}
              <li
                className={`list-disc ${
                  !detailPackage?.contact_social_media &&
                  "line-through text-gray-300"
                }`}
              >
                Kontak Media Sosial
              </li>
              <li
                className={`list-disc ${
                  !detailPackage?.background_sound &&
                  "line-through text-gray-300"
                }`}
              >
                Musik Latar
              </li>
              <li
                className={`list-disc ${
                  !detailPackage?.rsvp_and_greetings &&
                  "line-through text-gray-300"
                }`}
              >
                RSVP & Ucapan
              </li>
              <li
                className={`list-disc ${
                  !detailPackage?.google_maps_integration &&
                  "line-through text-gray-300"
                }`}
              >
                Lokasi terintegrasi dengan Google Maps
              </li>
              <li
                className={`list-disc ${
                  !detailPackage?.add_to_calendar &&
                  "line-through text-gray-300"
                }`}
              >
                Fitur Tambahkan ke Kalender
              </li>
              <li
                className={`list-disc ${
                  !detailPackage?.custom_cover && "line-through text-gray-300"
                }`}
              >
                Pilih cover foto / video cover
              </li>
              <li
                className={`list-disc ${
                  !detailPackage?.digital_envelope &&
                  "line-through text-gray-300"
                }`}
              >
                Amplop digital
              </li>
            </ul>
          </div>
        </div>
      </Modal>
      <div className={`${redhat.className} flex flex-col gap-6`}>
        <Input
          value={form.slug}
          onChange={(e) => setForm("slug", e.target.value)}
          label="Link Undangan"
          placeholder="Contoh: rama-shinta"
        />

        <div>
          <label className="block text-dashboard-dark/60 mb-1 text-xs">
            Pilih Paket
          </label>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {packages.map((p) => {
              const selected = p.id === form?.package_id;
              return (
                <div
                  onClick={() => setForm("package_id", p.id as number)}
                  className={`${
                    selected
                      ? "border-2 border-dashboard-primary"
                      : "bg-white border"
                  } cursor-pointer relative text-dashboard-dark justify-between items-center p-6 md:p-8`}
                  key={p.id}
                >
                  {selected && (
                    <div className="absolute text-dashboard-dark -top-2 lg:-top-3 -right-2 lg:-right-3 rounded-full aspect-square flex justify-center items-center bg-dashboard-primary p-[2px] lg:p-1 text-lg lg:text-xl">
                      <BiCheck />
                    </div>
                  )}
                  <div>
                    <h2
                      className={`${redhat.className} text-2xl font-semibold`}
                    >
                      Paket {p?.name}
                    </h2>

                    <div className="flex items-center gap-2 my-2">
                      {p?.discount && p?.discount > 0 ? (
                        <h2
                          className={`${redhat.className} text-base md:text-lg leading-4 text-dashboard-dark/50 line-through`}
                        >
                          {formatToRupiah(p?.price)}
                        </h2>
                      ) : null}
                      {p?.price && (
                        <h2
                          className={`${redhat.className} font-medium text-lg md:text-xl`}
                        >
                          {formatToRupiah(p?.price - p?.discount)}
                        </h2>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <ButtonSecondary
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModal((state) => !state);
                        setDetailPackage(p);
                      }}
                      size="small"
                      title="Detail"
                      icon={<BiDetail />}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {themes.length > 0 && (
          <div>
            <label className="block text-dashboard-dark/60 mb-1 text-xs">
              Pilih Tema
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
              {themes.map((theme) => {
                const selected = theme.id === form.theme_id;
                return (
                  <div className="relative" key={`Form Tema ${theme.name}`}>
                    {selected && (
                      <div className="z-10 absolute text-dashboard-dark -top-2 lg:-top-3 -right-2 lg:-right-3 rounded-full aspect-square flex justify-center items-center bg-dashboard-primary p-[2px] lg:p-1 text-lg lg:text-xl">
                        <BiCheck />
                      </div>
                    )}
                    <div
                      onClick={() => setForm("theme_id", theme.id as number)}
                      className={`aspect-square w-full h-full relative border-2 cursor-pointer overflow-hidden ${
                        selected
                          ? "border-dashboard-primary"
                          : "border-transparent"
                      }`}
                    >
                      <div className="absolute inset-0 flex flex-col justify-end px-4 lg:px-6 py-4 lg:py-6 bg-gradient-to-b from-transparent via-dashboard-dark/30 to-dashboard-dark/70 via-[70%] z-10">
                        <p
                          className={`text-sm lg:text-base text-white/70 lg:mb-0 ${redhat.className}`}
                        >
                          Tema
                        </p>
                        <h1
                          className={`${redhat.className} leading-4 text-lg lg:text-xl lg:leading-6 text-white font-medium`}
                        >
                          {theme.name}
                        </h1>
                      </div>
                      <div className="relative aspect-square overflow-hidden w-full h-full">
                        <Image
                          fill
                          className="object-cover w-full h-full"
                          alt={`Tema Form ${theme.name}`}
                          src={
                            (theme.thumbnail as string) ||
                            `https://placehold.co/600/png?font=afacad`
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex justify-end p-6 bg-zinc-50 mt-4 rounded-lg">
          <ButtonPrimary
            size="medium"
            type="button"
            icon={<IoArrowForward />}
            title="Selanjutnya"
            onClick={() => {
              if (!form.slug) {
                toast.error("Link undangan wajib diisi.");
                return;
              }
              if (!form.theme_category_id) {
                toast.error("Pilih kategori undangan.");
                return;
              }
              if (!form.package_id) {
                toast.error("Pilih paket undangan.");
                return;
              }
              if (!form.theme_id) {
                toast.error("Pilih tema undangan.");
                return;
              }
              handleCheckSlug();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PackageThemeLinkForm;
