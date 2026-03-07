import React, { useCallback, useMemo, useState } from "react";
import { BiChevronLeft, BiCheck, BiSave } from "react-icons/bi";
import toast from "react-hot-toast";
import useOrderStore from "@/store/useOrderStore";
import { getClient } from "@/lib/client";
import { useRouter } from "next/router";
import useSteps from "./order.steps";
import { KeyedMutator } from "swr";
import { Client } from "@/lib/types";
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

  const isLastStep = store.activeStep === steps.length - 1;

  const { slug } = router.query as { slug?: string };

  const isFullfilledStep = useMemo(() => {
    if (!store.fullfilledSteps) return false;

    if (isLastStep) {
      return store.fullfilledSteps.every(Boolean);
    } else {
      return Boolean(store.fullfilledSteps[store.activeStep]);
    }
  }, [store.activeStep, store.fullfilledSteps]);

  const handleSaveClient = async () => {
    try {
      const payload = { ...store.form };
      const response = await getClient(`/api/guest/order/client/create`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isLastStep) {
        store.setActiveStep(store.activeStep + 1);
        toast.success(
          `${steps[store.activeStep].stepTitle} berhasil ditambahkan!`,
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setIsLoading(true);
        const toastId = toast.loading("Menyimpan data pesanan");
        try {
          await handleSaveClient();

          toast.success("Undanganmu berhasil disimpan", { id: toastId });
          router.push(`/${slug}/order/berhasil`);
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Terjadi kesalahan",
            { id: toastId },
          );
        } finally {
          setIsLoading(false);
        }
      }
    },
    [store],
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
          disabled={!isFullfilledStep}
          type="submit"
          title={isLastStep ? "Simpan Data" : "Lanjut"}
          icon={isLastStep ? <BiSave /> : <BiCheck />}
        />
      </div>
    </form>
  );
};

export default OrderForm;
