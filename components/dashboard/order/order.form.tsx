import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BiChevronLeft, BiCheck, BiCreditCard, BiSave } from "react-icons/bi";
import toast from "react-hot-toast";
import useOrderStore from "@/store/useOrderStore";
import { getClient } from "@/lib/client";
import { useRouter } from "next/router";
import useSteps from "./order.steps";
import useSWR, { KeyedMutator } from "swr";
import { Client, Order, OrderStatus, SnapTransactionResult } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import ButtonPrimary from "../elements/button.primary";
import { redhat } from "@/lib/fonts";

interface Props {
  mutate?: KeyedMutator<{ data: Client }>;
}

const OrderForm = ({ mutate }: Props) => {
  const store = useOrderStore();
  const router = useRouter();
  const steps = useSteps();

  const [isLoading, setIsLoading] = useState(false);

  const isUpdate = router.pathname === "/order/[slug]";
  const isClientSaved = store.form.id;
  const isLastStep = store.activeStep === steps.length - 1;
  const isAllFulfilled = useMemo(() => {
    return store.fullfilledSteps?.[store.activeStep];
  }, [store.activeStep, store.fullfilledSteps]);

  useSWR(
    store.order?.order_id
      ? `/api/guest/order/payment/status?order_id=${store.order.order_id}`
      : null,
    fetcher,
    {
      refreshInterval: 10000,
      onSuccess: (data) => {
        console.log("✅ Status Midtrans:", data.transaction_status);
      },
    }
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "Mid-client-apCAGTae78uYssQs");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSaveOrderStatus = async (id: number, status: OrderStatus) => {
    try {
      const res = await getClient("/api/guest/order/status", {
        method: "POST",
        body: JSON.stringify({
          status,
          id,
        }),
      });
      const result = await res.json();
      if (result.success) {
        store.setNewOrder({
          ...store.order,
          status,
        });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  console.log(store.order);

  const handleSaveOrderSnapToken = async (id: number, snap_token: string) => {
    try {
      const res = await getClient("/api/guest/order/snap-token", {
        method: "POST",
        body: JSON.stringify({ id, snap_token }),
      });
      const result = await res.json();
      if (result.success) {
        store.setNewOrder({
          ...store.order,
          snap_token,
        });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  // 🧠 Fungsi utama handlePay
  const handlePay = async (newOrder: Order) => {
    if (!newOrder || !store.theme?.slug) return;

    try {
      const payload: Order = { ...newOrder };

      // ✅ Jika token sudah ada (misalnya user close popup dan mau bayar lagi)
      if (store.order.snap_token) {
        handleMidtransSnapToken(store.order.snap_token, newOrder);
        return;
      }

      // ✅ Kalau belum ada token → buat transaksi baru
      const res = await getClient(
        `/api/guest/order/payment/${store.theme.slug}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      const result = await res.json();

      if (result.success && result.data.token) {
        await handleSaveOrderSnapToken(
          newOrder.id as number,
          result.data.token
        );
        handleMidtransSnapToken(result.data.token, newOrder);
      } else {
        toast.error("Gagal membuat transaksi pembayaran.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  // ✅ Fungsi pemanggil Midtrans Snap popup
  const handleMidtransSnapToken = (snapToken: string, order: Order) => {
    window.snap?.pay(snapToken, {
      onSuccess: async (result: SnapTransactionResult) => {
        await handleSaveOrderStatus(
          order.id as number,
          result.transaction_status
        );
        router.push(`/${store.theme?.slug}/order/berhasil`);
      },
      onPending: async (result: SnapTransactionResult) => {
        await handleSaveOrderStatus(
          order.id as number,
          result.transaction_status
        );
      },
      onError: async (result: SnapTransactionResult) => {
        await handleSaveOrderStatus(
          order.id as number,
          result.transaction_status
        );
      },
      onClose: () => console.log("Popup closed"),
    });
  };

  const handleSaveClient = async () => {
    try {
      const payload = { ...store.form, status: "paid" };
      const response = await getClient(
        `/api/guest/order/client/${
          isUpdate || isClientSaved ? "update" : "create"
        }`,
        {
          method: isUpdate || isClientSaved ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();

      if (result.success) {
        if (mutate) mutate();
        store.setForm("id", result.data.id);
        return result.data;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  const handleSaveOrder = async (client: Omit<Client, "cover" | "seo">) => {
    if (!client) return;

    try {
      const payload: Order = {
        ...store.order,
        client_id: client.id,
      };

      const response = await getClient(`/api/guest/order/create`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.success) {
        store.setNewOrder({ ...store.order, order_id: result.data.order_id });
        return result.data;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isLastStep) {
        store.setActiveStep(store.activeStep + 1);
        toast.success(
          `${steps[store.activeStep].stepTitle} berhasil ditambahkan!`
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const toastId = toast.loading("Memproses pembayaran");
        setIsLoading(true);
        const newClient = await handleSaveClient();
        const newOrder = await handleSaveOrder(newClient);
        await handlePay(newOrder);
        setIsLoading(false);
        toast.dismiss(toastId);
      }
    },
    [store]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 mt-6 max-w-screen-md sticky top-40 ${redhat.className}`}
    >
      {steps[store.activeStep].component}
      <div className="mt-4 flex items-center gap-x-6">
        {store.activeStep > 0 && (
          <button
            type="button"
            onClick={() => {
              store.setActiveStep(store.activeStep - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center text-base gap-x-2 print:hidden"
          >
            <BiChevronLeft className="text-lg" />
            Sebelumnya
          </button>
        )}
        <ButtonPrimary
          isloading={isLoading}
          className="print:hidden"
          disabled={!isAllFulfilled}
          type="submit"
          title={
            isLastStep && isUpdate
              ? "Simpan Perubahan"
              : isLastStep
              ? "Bayar Sekarang"
              : "Lanjut"
          }
          icon={
            isLastStep && isUpdate ? (
              <BiSave />
            ) : isLastStep ? (
              <BiCreditCard />
            ) : (
              <BiCheck />
            )
          }
        />
      </div>
    </form>
  );
};

export default OrderForm;
