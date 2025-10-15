import Loader from "@/components/admin/elements/loader";
import Seo from "@/components/dashboard/elements/seo";
import ThemeNotFound from "@/components/dashboard/order/theme.notfound";
import { fetcher } from "@/lib/fetcher";
import { Event, Order, Package, Participant, Theme } from "@/lib/types";
import useOrderStore from "@/store/useOrderStore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import OrderPage from "@/components/dashboard/order/order.page";
import { useCheckFullfilledSteps } from "@/hooks/dashboard/order/useCheckFullfilledSteps";
import toast from "react-hot-toast";

const OrderTheme = () => {
  const store = useOrderStore();
  const router = useRouter();
  const { orderId } = router.query as { orderId?: string };

  const [isLoading, setIsLoading] = useState(true);

  useSWR<{ data: Order }>(
    orderId ? `/api/guest/order?order_id=${orderId}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data.data) {
          const order: Order = data.data;

          const { client } = order;

          store.setFullForm({
            id: client?.id,
            slug: client?.slug,
            phone: client?.phone,
            opening_title: client?.opening_title as string,
            opening_description: client?.opening_description as string,
            closing_title: client?.closing_title as string,
            closing_description: client?.closing_description as string,
            gift_account_name: client?.gift_account_name as string,
            gift_account_number: client?.gift_account_number as string,
            gift_bank_name: client?.gift_bank_name as string,
            name: client?.name as string,
            package_id: client?.package_id as number,
            events: client?.events as Event[],
            participants: client?.participants as Participant[],
            theme_category_id: client?.theme_category_id as number,
            theme_id: client?.theme_id as number,
            email: client?.email,
            media: {
              image_link: client?.media?.image_link,
              video_link: client?.media?.video_link,
              music_title: client?.media?.music_title,
            },
          });

          store.setNewOrder({ ...order });
          store.setTheme(order.client?.theme as Theme);
          store.setPackage(order.client?.package as Package);
        }
        setIsLoading(false);
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Terjadi kesalahan"
        );
        setIsLoading(false);
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useCheckFullfilledSteps();

  return (
    <>
      <Seo
        url={`https://momentinvitation.com/order/${orderId}`}
        title={`Detail Pesanan ${orderId || ""} | Moment Invitation`}
        description="Lanjutkan pemesanan undangan digitalmu di Moment Invitation. Pilih tema dan paket terbaik, isi detail acara, dan selesaikan pembayaran untuk mengaktifkan undanganmu."
        keywords={`order undangan digital, pemesanan undangan online, order undangan pernikahan Bali, order undangan mempandes, paket undangan Moment, beli undangan digital Bali, buat undangan online, aktifkan undangan Moment`}
        image="https://res.cloudinary.com/dsbmvj2s3/image/upload/v1759919489/seo_cvsy5o.webp"
        noIndex
      />

      {isLoading ? (
        <div className="w-full h-dvh flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>{store.order.order_id ? <OrderPage /> : <ThemeNotFound />}</>
      )}
    </>
  );
};

export default OrderTheme;
