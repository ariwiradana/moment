import React, { useCallback, useEffect, useMemo, useState } from "react";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import { BiChevronLeft, BiCheck, BiCreditCard, BiSave } from "react-icons/bi";
import toast from "react-hot-toast";
import useOrderStore from "@/store/useOrderStore";
import { getClient } from "@/lib/client";
import { useRouter } from "next/router";
import useSteps from "./order.steps";
import { KeyedMutator } from "swr";
import { Client, Order } from "@/lib/types";
import { generateInvoiceId } from "@/utils/generateInvoiceId";
import moment from "moment";

interface Props {
  mutate?: KeyedMutator<{ data: Client }>;
}

const OrderForm = ({ mutate }: Props) => {
  const store = useOrderStore();
  const router = useRouter();
  const steps = useSteps();

  const [isLoading, setIsLoading] = useState(false);

  const isUpdate = router.pathname === "/order/[slug]";
  const isLastStep = store.activeStep === steps.length - 1;
  const isAllFulfilled = useMemo(() => {
    return store.fullfilledSteps?.[store.activeStep];
  }, [store.activeStep, store.fullfilledSteps]);

  const handleSaveClient = async () => {
    try {
      const payload = { ...store.form, status: "paid" };
      const response = await getClient(
        `/api/guest/order/client/${isUpdate ? "update" : "create"}`,
        {
          method: isUpdate ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();

      if (result.success) {
        if (mutate) mutate();
        return result.data;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  useEffect(() => {
    handleSetOrder();
  }, [store.pkg, store.form]);

  const handleSetOrder = () => {
    const newOrder: Omit<Order, "client_id"> = {
      order_id: generateInvoiceId(),
      name: store.form.name,
      phone: store.form.phone as string,
      package_id: store.pkg?.id as number,
      price: store.pkg?.price as number,
      discount: store.pkg?.discount || 0,
      theme_id: store.theme?.id as number,
      admin_fee: 2000,
      created_at: moment().format("DD MMMM YYYY"),
    };
    store.setNewOrder(newOrder);
  };

  const handleSubmitOrder = async (client: Omit<Client, "cover" | "seo">) => {
    if (!client.id) return;

    const id = toast.loading("Memproses order...");

    try {
      const payload: Order = { ...store.order, client_id: client.id };

      const response = await getClient(`/api/guest/order/create`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.success) {
        store.setNewOrder({ ...store.order, order_id: result.data.order_id });
        router.push(`/${store.theme?.slug}/order/berhasil`);
        toast.success(result.message, { id });
        return result.data;
      } else {
        toast.error(result.message, { id });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan",
        { id }
      );
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
        setIsLoading(true);
        const newClient = await handleSaveClient();
        if (!isUpdate) await handleSubmitOrder(newClient);
        setIsLoading(false);
      }
    },
    [store]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-6 max-w-screen-md sticky top-40"
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
            className="flex items-center text-sm gap-x-2 print:hidden"
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
