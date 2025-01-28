import BrideForm from "@/components/dashboard/form/bride";
import CustomOpeningClosingForm from "@/components/dashboard/form/custom.opening.closing";
import EventForm from "@/components/dashboard/form/events";
import FilesForm from "@/components/dashboard/form/files";
import GiftForm from "@/components/dashboard/form/gift";
import GroomForm from "@/components/dashboard/form/groom";
import PackageThemeLinkForm from "@/components/dashboard/form/package.theme.link";
import { getClient } from "@/lib/client";
import { fetcher } from "@/lib/fetcher";
import { Package, Theme } from "@/lib/types";
import useClientFormStore from "@/store/useClientFormStore";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { createSlug } from "@/utils/createSlug";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  BiGift,
  BiGroup,
  BiImages,
  BiNote,
  BiParty,
  BiText,
} from "react-icons/bi";
import useSWR from "swr";

const categoryIds: Record<string, number> = {
  pernikahan: 1,
  mepandes: 2,
};

const useClientForm = (category: string) => {
  const { activeStep, form, setIsLoading, setForm, setActiveStep, resetForm } =
    useClientFormStore();

  const [formComponents] = useState<Record<number, ReactNode>>({
    0: <PackageThemeLinkForm category={category} />,
    1: <EventForm />,
    2: <GroomForm />,
    3: <BrideForm />,
    4: <FilesForm />,
    5: <GiftForm />,
    6: <CustomOpeningClosingForm />,
  });

  const [steps] = useState<string[]>([
    "Paket, Tema & Link Undangan",
    "Acara Undangan",
    "Mempelai Pria",
    "Mempelai Wanita",
    "File Pendukung Undangan",
    "Hadiah Digital",
    "Kalimat Pembuka & Penutup Undangan",
  ]);

  const [stepIcons] = useState<ReactNode[]>([
    <BiNote key="Step Icon 1" />,
    <BiParty key="Step Icon 2" />,
    <BiGroup key="Step Icon 3" />,
    <BiGroup key="Step Icon 4" />,
    <BiImages key="Step Icon 5" />,
    <BiGift key="Step Icon 6" />,
    <BiText key="Step Icon 7" />,
  ]);

  const [isUnloadProtected, setIsUnloadProtected] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isUnloadProtected) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeStep]);

  useEffect(() => {
    const id = categoryIds[category];
    if (id) {
      setForm("theme_category_id", id);
    }
  }, []);

  const { data: packagesData, isLoading: isLoadingePackages } = useSWR(
    "/api/_pb/_p",
    fetcher
  );
  const { data: themeData, isLoading: isLoadingThemes } = useSWR(
    form.theme_category_id
      ? `/api/_pb/_th?order=DESC&theme_category_id=${form.theme_category_id}`
      : null,
    fetcher
  );

  const themes: Theme[] = themeData?.data || [];
  const pacakages: Package[] = packagesData?.data || [];

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeStep === 6) {
      try {
        const createClient = async () => {
          setIsLoading(true);

          const payload = form;
          payload["name"] = capitalizeWords(
            (form.slug as string).replaceAll("-", " ")
          );
          payload["opening_title"] = form.opening_title || "Om Swastiastu";
          payload["opening_description"] =
            form.opening_description ||
            "Dengan Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada Upacara Manusa Yadnya Pawiwahan (Pernikahan) Putra dan Putri kami.";
          payload["closing_title"] =
            form.closing_title || "Om Shanti Shanti Shanti Om";
          payload["closing_description"] =
            form.closing_description ||
            "Merupakan suatu kebahagiaan dan kehormatan bagi kami jika Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu. Atas kehadiran dan doa restunya, kami sampaikan terima kasih.";

          const response = await getClient("/api/_pb/_f/_cr", {
            method: "POST",
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message);
          }
          const result = await response.json();
          console.log(result);
          return result;
        };

        toast.promise(createClient(), {
          loading: "Membuat informasi undangan...",
          success: () => {
            setIsUnloadProtected(true);
            router.push("/");
            setIsLoading(false);
            resetForm();
            return "Berhasil membuat informasi undangan.";
          },
          error: (error: any) => {
            setIsLoading(false);
            return error.message || "Gagal membuat informasi undangan.";
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCheckSlug = async () => {
    const toastId = toast.loading("Cek link undangan...");
    try {
      const response = await getClient("/api/_pb/_f/_cs", {
        method: "POST",
        body: JSON.stringify({ slug: createSlug(form.slug as string) }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }
      await response.json();
      setActiveStep(activeStep + 1);
    } catch (error: any) {
      toast.error(error.message || "Gagal mengecek link undangan.", {
        id: toastId,
      });
    }
  };

  return {
    state: {
      steps,
      formComponents,
      stepIcons,
      themes,
      pacakages,
      isLoadingThemes,
      isLoadingePackages,
    },
    actions: {
      handleSubmit,
      handleCheckSlug,
    },
  };
};

export default useClientForm;
