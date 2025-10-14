import Input from "@/components/admin/elements/input";
import { redhat } from "@/lib/fonts";
import useOrderStore from "@/store/useOrderStore";
import { formatToRupiah } from "@/utils/formatToRupiah";
import React, { useEffect, useState } from "react";
import { BiCheck, BiChevronRight } from "react-icons/bi";
import ModalPackages from "../modal.packages";
import { Package, Theme } from "@/lib/types";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/router";

const OrderInformation = () => {
  const router = useRouter();
  const store = useOrderStore();
  const exclusivePackage = store.theme?.packages?.find(
    (pkg) => pkg.name === "Exclusive"
  );

  type ModalPackage = {
    isOpen: boolean;
    component: Package;
  };

  const [modalPackage, setModalPackage] = useState<ModalPackage>({
    isOpen: false,
    component: exclusivePackage as Package,
  });

  const [slugForm, setSlugForm] = useState(store.form.slug || "");
  const [slugQuery] = useDebounce(slugForm, 500);

  useEffect(() => {
    if (slugQuery.length === 0) {
      store.setForm("slug", "");
    }
  }, [slugQuery]);

  useSWR(
    slugQuery.length > 3 && router.pathname === "/[slug]/order"
      ? `/api/guest/order/${slugQuery}/check`
      : null,
    fetcher,
    {
      onSuccess(data) {
        if (data) {
          toast.success(data.message);
          store.setForm("slug", slugQuery.replaceAll("/", ""));
        }
      },
      onError(error) {
        toast.error(
          error instanceof Error ? error.message : "Terjadi kesalahan"
        );
        store.setForm("slug", "");
      },
      revalidateOnFocus: false,
    }
  );

  const isUpdate = router.pathname !== "/[slug]/order";

  return (
    <>
      <ModalPackages
        theme={store.theme as Theme}
        pkg={modalPackage.component as Package}
        isOpen={modalPackage.isOpen}
        setOpenModal={() =>
          setModalPackage((state) => ({ ...state, isOpen: !state.isOpen }))
        }
      />

      {!isUpdate && (
        <Input
          value={slugForm}
          onChange={(e) => setSlugForm(e.target.value)}
          inputSize="medium"
          name="slug"
          placeholder="contoh: rama-shinta"
          label="Link Undangan"
        />
      )}

      <Input
        value={store.form.name}
        onChange={(e) => store.setForm("name", e.target.value)}
        inputSize="medium"
        name="name"
        placeholder="contoh: Rama Putra"
        label="Nama"
      />

      <Input
        value={store.form.email}
        onChange={(e) => store.setForm("email", e.target.value)}
        inputSize="medium"
        name="email"
        placeholder="contoh: rama@gmail.com"
        label="Email"
        type="email"
        description="Email diperlukan untuk menerima notifikasi dan bukti pembayaran dari sistem."
      />

      <Input
        type="number"
        value={store.form.phone}
        onChange={(e) => store.setForm("phone", e.target.value)}
        inputSize="medium"
        name="phone"
        placeholder="contoh: 081627522612"
        label="No Hp / WhatsApp"
        description="Nomor HP / WhatsApp diperlukan agar kami bisa menghubungimu."
      />

      {!isUpdate && (
        <div className={redhat.className}>
          <label className="block text-dashboard-dark/60 mb-1 text-sm">
            Pilih Paket
          </label>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {store.theme?.packages?.map((pkg) => {
              const selected = pkg.id === store.form?.package_id;
              return (
                <div
                  onClick={() => {
                    store.setForm("package_id", pkg.id as number);
                    store.setPackage(pkg);
                  }}
                  className={`${
                    selected
                      ? "border border-dashboard-primary"
                      : "bg-white border"
                  } relative text-dashboard-dark justify-between items-center p-4`}
                  key={`Paket Undangan ${pkg.name} ${store.theme?.name}`}
                >
                  {selected && (
                    <div className="absolute text-dashboard-dark top-2 lg:-top-2 right-2 lg:-right-2 rounded-full aspect-square flex justify-center items-center bg-dashboard-primary p-0.5 text-lg lg:text-xl">
                      <BiCheck />
                    </div>
                  )}
                  <div>
                    <h2 className={`text-xl font-semibold`}>{pkg?.name}</h2>

                    <div className="flex items-center flex-wrap gap-x-1">
                      {pkg?.discount && pkg?.discount > 0 ? (
                        <h2
                          className={`text-sm text-dashboard-dark/30 line-through`}
                        >
                          {formatToRupiah(pkg?.price)}
                        </h2>
                      ) : null}
                      {pkg?.price && (
                        <h2 className={`font-medium text-dashboard-dark`}>
                          {formatToRupiah(pkg?.price - pkg?.discount)}
                        </h2>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalPackage({
                        isOpen: true,
                        component: pkg,
                      });
                    }}
                    className="mt-4 flex items-center gap-x-1 text-sm font-medium"
                  >
                    Detail Paket
                    <span>
                      <BiChevronRight className="text-base" />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderInformation;
