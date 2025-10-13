import Loader from "@/components/admin/elements/loader";
import Seo from "@/components/dashboard/elements/seo";
import ThemeNotFound from "@/components/dashboard/order/theme.notfound";
import { fetcher } from "@/lib/fetcher";
import { Client } from "@/lib/types";
import useOrderStore from "@/store/useOrderStore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import OrderPage from "@/components/dashboard/order/order.page";
import { usePreventLeave } from "@/hooks/dashboard/usePreventLeave";
import { useCheckFullfilledSteps } from "@/hooks/dashboard/order/useCheckFullfilledSteps";

const Order = () => {
  const store = useOrderStore();
  const router = useRouter();
  const { slug } = router.query as { slug?: string };
  const [isLoading, setIsLoading] = useState(true);

  const { mutate } = useSWR<{ data: Client }>(
    slug ? `/api/guest/order/${slug}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data.data) {
          const client = data.data;

          const clientData = {
            id: client.id,
            slug: client.slug,
            phone: client.phone,
            opening_title: client.opening_title,
            opening_description: client.opening_description,
            closing_title: client.closing_title,
            closing_description: client.closing_description,
            gift_account_name: client.gift_account_name,
            gift_account_number: client.gift_account_number,
            gift_bank_name: client.gift_bank_name,
            name: client.name,
            package_id: client.package_id,
            events: client.events,
            participants: client.participants,
            theme_category_id: client.theme_category_id,
            theme_id: client.theme_id,
            videos: client.videos,
            music: client.music_title,
            status: client.status,
            media: client.media,
          };

          store.setFullForm(clientData);

          if (client.theme) {
            console.log(client.theme);
            store.setTheme(client.theme);
          }

          if (client.package) {
            store.setPackage(client.package);
          }

          store.setWithPayment(false);
          setIsLoading(false);
        }
      },
      onError() {
        setIsLoading(false);
      },
    }
  );

  usePreventLeave();
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
        <>{store.theme ? <OrderPage mutate={mutate} /> : <ThemeNotFound />}</>
      )}
    </>
  );
};

export default Order;
