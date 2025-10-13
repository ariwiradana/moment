import React, { useCallback, useMemo } from "react";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import { BiChevronLeft, BiCheck, BiCreditCard, BiSave } from "react-icons/bi";
import toast from "react-hot-toast";
import useOrderStore from "@/store/useOrderStore";
import { getClient } from "@/lib/client";
import { useRouter } from "next/router";
import useSteps from "./order.steps";
import { KeyedMutator } from "swr";
import { Client } from "@/lib/types";

interface Props {
  mutate?: KeyedMutator<{ data: Client }>;
}

const OrderForm = ({ mutate }: Props) => {
  const store = useOrderStore();
  const router = useRouter();
  const steps = useSteps();

  const isUpdate = router.pathname === "/order/[slug]";
  const isLastStep = store.activeStep === steps.length - 1;

  const handleSaveClient = async () => {
    const id = toast.loading("Menyimpan undangan");
    try {
      const payload = { ...store.form, status: "paid" };
      const response = await getClient(
        `/api/guest/order/${isUpdate ? "update" : "create"}`,
        {
          method: isUpdate ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();

      if (result.success) {
        if (mutate) mutate();
        if (!isUpdate) router.push(`/${store.theme?.slug}/order/berhasil`);
        toast.success(result.message, { id });
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

      if (store.activeStep <= steps.length - 2) {
        store.setActiveStep(store.activeStep + 1);
        toast.success(
          `${steps[store.activeStep].stepTitle} berhasil ditambahkan!`
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        handleSaveClient();
      }
    },
    [store]
  );

  const isDisabledButton = useMemo(() => {
    return !store.fullfilledSteps?.[store.activeStep];
  }, [store.activeStep, store.fullfilledSteps]);

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
          className="print:hidden"
          disabled={isDisabledButton}
          type="submit"
          title={
            isLastStep && isUpdate
              ? "Simpan Perubahan"
              : isLastStep
              ? "Simapan & Lanjutkan ke Pembayaran"
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
