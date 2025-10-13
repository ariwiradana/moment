import Loader from "@/components/admin/elements/loader";
import Seo from "@/components/dashboard/elements/seo";
import ThemeNotFound from "@/components/dashboard/order/theme.notfound";
import { fetcher } from "@/lib/fetcher";
import { Theme } from "@/lib/types";
import useOrderStore from "@/store/useOrderStore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import OrderPage from "@/components/dashboard/order/order.page";
import { usePreventLeave } from "@/hooks/dashboard/usePreventLeave";
import { useCheckFullfilledSteps } from "@/hooks/dashboard/order/useCheckFullfilledSteps";
import useSteps from "@/components/dashboard/order/order.steps";

const OrderTheme = () => {
  const store = useOrderStore();
  const router = useRouter();
  const { slug } = router.query as { slug?: string };
  const [isLoading, setIsLoading] = useState(true);
  const steps = useSteps();

  useSWR<{ data: Theme[] }>(
    slug ? `/api/guest/themes?slug=${slug}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data.data.length > 0) {
          const themeData = data.data[0];

          if (!store.theme) {
            store.setTheme(themeData);
            store.setForm("theme_id", themeData.id);
          }

          if (!store.form.theme_category_id) {
            const pernikahan = themeData.theme_categories?.find(
              (tc) => tc.slug === "pernikahan"
            );
            if (pernikahan) store.setForm("theme_category_id", pernikahan.id);
          }

          if (!store.pkg && !store.form.package_id) {
            const initialPkg = themeData.packages?.find(
              (pkg) => pkg.name === "Exclusive"
            );
            if (initialPkg) {
              store.setForm("package_id", initialPkg.id as number);
              store.setPackage(initialPkg);
            }
          }
        }
        setIsLoading(false);
      },
    }
  );

  const isLastStep = store.activeStep === steps.length - 1;
  usePreventLeave(!isLastStep);
  useCheckFullfilledSteps();

  return (
    <>
      <Seo
        url={`https://momentinvitation.com/${slug}/order`}
        title={`Order Tema ${store.theme?.name || ""} | Moment Invitation`}
        description="Lanjutkan pemesanan undangan digitalmu di Moment Invitation. Pilih tema dan paket terbaik, isi detail acara, dan selesaikan pembayaran untuk mengaktifkan undanganmu."
        keywords={`order undangan digital, pemesanan undangan online, order undangan pernikahan Bali, order undangan mempandes, tema ${
          store.theme?.name || ""
        }, paket undangan Moment, beli undangan digital Bali, buat undangan online, aktifkan undangan Moment`}
        image="https://res.cloudinary.com/dsbmvj2s3/image/upload/v1759919489/seo_cvsy5o.webp"
        noIndex
      />

      {isLoading ? (
        <div className="w-full h-dvh flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>{store.theme ? <OrderPage /> : <ThemeNotFound />}</>
      )}
    </>
  );
};

export default OrderTheme;
