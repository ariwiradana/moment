import Input from "@/components/admin/elements/input";
import Loader from "@/components/admin/elements/loader";
import { afacad, dm, marcellus, montserrat } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import { calculateDiscountPercentage } from "@/utils/calculateDiscount";
import { formatToRupiah } from "@/utils/formatToRupiah";
import Image from "next/image";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { RiDiscountPercentFill } from "react-icons/ri";
import ButtonPrimary from "../elements/button.primary";
import { IoArrowForward } from "react-icons/io5";
import toast from "react-hot-toast";
import useClientForm from "@/hooks/form/useClientForm";

interface Props {
  category: string;
}

const PackageThemeLinkForm = ({ category }: Props) => {
  const { setForm, form } = useClientFormStore();
  const { state, actions } = useClientForm(category);

  if (state.isLoadingThemes || state.isLoadingePackages) return <Loader />;

  return (
    <div className={`${montserrat.className} flex flex-col gap-6`}>
      <Input
        value={form.slug}
        onChange={(e) => setForm("slug", e.target.value)}
        label="Link Undangan"
        placeholder="Contoh: rama-shinta"
      />
      <div>
        <label className="block text-gray-700 mb-1 text-sm">Pilih Paket</label>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {state.pacakages.map((p) => {
            const selected = p.id === form?.package_id;
            return (
              <div
                onClick={() => setForm("package_id", p.id as number)}
                className={`${
                  selected
                    ? " border-2 border-dashboard-primary"
                    : "bg-white border"
                } p-6 rounded cursor-pointer relative text-dashboard-dark`}
                key={p.id}
              >
                {selected && (
                  <div className="absolute text-dashboard-dark -top-2 lg:-top-3 -right-2 lg:-right-3 rounded-full aspect-square flex justify-center items-center bg-dashboard-primary p-[2px] lg:p-1 text-lg lg:text-xl">
                    <BiCheck />
                  </div>
                )}
                <h2 className={`${dm.className} text-2xl font-bold`}>
                  Paket {p.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <h2 className={`${afacad.className} font-medium text-xl`}>
                    {formatToRupiah(p.price - p.discount)}
                  </h2>
                  {p.discount > 0 && (
                    <div
                      className={`${afacad.className} font-medium flex items-center gap-1 bg-dashboard-primary rounded-full px-2 py-1 text-sm text-dashboard-dark`}
                    >
                      <RiDiscountPercentFill className="text-lg" />-{" "}
                      {calculateDiscountPercentage(p.price, p.discount)}%
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-1 text-sm">Pilih Tema</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
          {state.themes.map((theme) => {
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
                  className={`aspect-square rounded-md w-full h-full relative border-2 cursor-pointer overflow-hidden ${
                    selected ? "border-dashboard-primary" : "border-transparent"
                  }`}
                >
                  <div className="absolute inset-0 flex flex-col justify-end px-4 lg:px-6 py-4 lg:py-6 bg-gradient-to-b from-transparent via-dashboard-dark/30 to-dashboard-dark/70 via-[70%] z-10">
                    <p
                      className={`text-sm lg:text-base text-white/70 lg:mb-0 ${afacad.className}`}
                    >
                      Tema Undangan
                    </p>
                    <h1
                      className={`${marcellus.className} leading-4 text-xl lg:text-2xl lg:leading-6 text-white font-medium`}
                    >
                      {theme.name}
                    </h1>
                  </div>
                  <div className="relative aspect-square rounded overflow-hidden w-full h-full">
                    <Image
                      fill
                      className="object-cover rounded w-full h-full"
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

      <div className="flex justify-end p-6 bg-zinc-50 mt-4 rounded-lg">
        <ButtonPrimary
          size="medium"
          type="button"
          icon={<IoArrowForward />}
          iconPosition="right"
          title="Selanjutnya"
          onClick={() => {
            if (!form.slug) {
              toast.error("Link undangan wajib diisi.");
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
            actions.handleCheckSlug();
          }}
        />
      </div>
    </div>
  );
};

export default PackageThemeLinkForm;
