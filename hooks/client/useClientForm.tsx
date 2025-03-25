import BrideForm from "@/components/dashboard/form/bride";
import CustomOpeningClosingForm from "@/components/dashboard/form/custom.opening.closing";
import EventForm from "@/components/dashboard/form/events";
import FilesForm from "@/components/dashboard/form/files";
import GiftForm from "@/components/dashboard/form/gift";
import GroomForm from "@/components/dashboard/form/groom";
import PackageThemeLinkForm from "@/components/dashboard/form/package.theme.link";
import ParticipantForm from "@/components/dashboard/form/participants";
import { getClient } from "@/lib/client";
import { fetcher } from "@/lib/fetcher";
import { Package, Participant, Theme } from "@/lib/types";
import useClientFormStore from "@/store/useClientFormStore";
import { capitalizeWords } from "@/utils/capitalizeWords";
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

const categoryIds: Record<string, number | null> = {
  pernikahan: 1,
  mepandes: 2,
  "pernikahan-mepandes": 3,
};

export const initialGroomBride: Participant[] = [
  {
    name: "",
    nickname: "",
    gender: "male",
    child: "pertama",
    image: "",
    address: "",
    parents_female: "",
    parents_male: "",
    role: "groom",
    facebook: "",
    instagram: "",
    tiktok: "",
    twitter: "",
  },
  {
    name: "",
    nickname: "",
    gender: "female",
    child: "pertama",
    image: "",
    address: "",
    parents_female: "",
    parents_male: "",
    role: "bride",
    facebook: "",
    instagram: "",
    tiktok: "",
    twitter: "",
  },
];
export const initialParticipant: Participant[] = [
  {
    name: "",
    nickname: "",
    gender: "male",
    child: "pertama",
    image: "",
    address: "",
    parents_female: "",
    parents_male: "",
    role: "participant",
    facebook: "",
    instagram: "",
    tiktok: "",
    twitter: "",
  },
];

const useClientForm = (category: string) => {
  const {
    activeStep,
    form,
    setIsLoading,
    setForm,
    setActiveStep,
    resetForm,
    setCategory,
  } = useClientFormStore();

  const [formComponents] = useState<{
    components: Record<number, ReactNode>;
    steps: string[];
    icons: ReactNode[];
  } | null>(
    category === "pernikahan"
      ? {
          components: {
            0: <PackageThemeLinkForm category={category} />,
            1: <EventForm />,
            2: <GroomForm />,
            3: <BrideForm />,
            4: <FilesForm />,
            5: <GiftForm />,
            6: <CustomOpeningClosingForm />,
          },
          steps: [
            "Link, Paket & Tema Undangan",
            "Acara Undangan",
            "Mempelai Pria",
            "Mempelai Wanita",
            "File Pendukung Undangan",
            "Hadiah Digital",
            "Kalimat Pembuka & Penutup Undangan",
          ],
          icons: [
            <BiNote key="Step Icon 1" />,
            <BiParty key="Step Icon 2" />,
            <BiGroup key="Step Icon 3" />,
            <BiGroup key="Step Icon 4" />,
            <BiImages key="Step Icon 5" />,
            <BiGift key="Step Icon 6" />,
            <BiText key="Step Icon 7" />,
          ],
        }
      : category === "mepandes"
      ? {
          components: {
            0: <PackageThemeLinkForm category={category} />,
            1: <EventForm />,
            2: <ParticipantForm />,
            3: <FilesForm />,
            4: <GiftForm />,
            5: <CustomOpeningClosingForm />,
          },
          steps: [
            "Link, Paket & Tema Undangan",
            "Acara Undangan",
            `Peserta Undangan ${capitalizeWords(category)}`,
            "File Pendukung Undangan",
            "Hadiah Digital",
            "Kalimat Pembuka & Penutup Undangan",
          ],
          icons: [
            <BiNote key="Step Icon 1" />,
            <BiParty key="Step Icon 2" />,
            <BiGroup key="Step Icon 3" />,
            <BiImages key="Step Icon 4" />,
            <BiGift key="Step Icon 5" />,
            <BiText key="Step Icon 6" />,
          ],
        }
      : category === "pernikahan-mepandes"
      ? {
          components: {
            0: <PackageThemeLinkForm category={category} />,
            1: <EventForm />,
            2: <GroomForm />,
            3: <BrideForm />,
            4: <ParticipantForm />,
            5: <FilesForm />,
            6: <GiftForm />,
            7: <CustomOpeningClosingForm />,
          },
          steps: [
            "Link, Paket & Tema Undangan",
            "Acara Undangan",
            "Mempelai Pria",
            "Mempelai Wanita",
            `Peserta Undangan Mepandes`,
            "File Pendukung Undangan",
            "Hadiah Digital",
            "Kalimat Pembuka & Penutup Undangan",
          ],
          icons: [
            <BiNote key="Step Icon 1" />,
            <BiParty key="Step Icon 2" />,
            <BiGroup key="Step Icon 3" />,
            <BiGroup key="Step Icon 4" />,
            <BiGroup key="Step Icon 5" />,
            <BiImages key="Step Icon 6" />,
            <BiGift key="Step Icon 7" />,
            <BiText key="Step Icon 8" />,
          ],
        }
      : null
  );

  const [isUnloadProtected, setIsUnloadProtected] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isUnloadProtected) {
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

  console.log(form);

  useEffect(() => {
    const id = categoryIds[category];
    setForm("theme_category_id", id);
    switch (category) {
      case "pernikahan":
        setForm("participants", initialGroomBride);
        break;
      case "mepandes":
        setForm("participants", initialParticipant);
        break;
      case "pernikahan-mepandes":
        setForm("participants", [...initialGroomBride, ...initialParticipant]);
        break;
      default:
        break;
    }

    setCategory(category);
  }, []);

  const { data: packagesData, isLoading: isLoadingePackages } = useSWR(
    "/api/_pb/_p",
    fetcher
  );

  let url = `/api/_pb/_th?order=DESC`;
  if (form.theme_category_id)
    url += `&theme_category_id=${form.theme_category_id}`;
  const { data: themeData, isLoading: isLoadingThemes } = useSWR(url, fetcher);

  const themes: Theme[] = themeData?.data || [];
  const pacakages: Package[] = packagesData?.data || [];

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };

  const handleCheckSlug = async () => {
    const toastId = toast.loading("Cek link undangan...");
    try {
      const response = await getClient("/api/_pb/_f/_cs", {
        method: "POST",
        body: JSON.stringify({ slug: form.slug }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }
      await response.json();
      setActiveStep(activeStep + 1);
      toast.success("Link undangan dapat digunakan.", { id: toastId });
    } catch (error: any) {
      toast.error(error.message || "Gagal mengecek link undangan.", {
        id: toastId,
      });
    }
  };

  return {
    state: {
      formComponents,
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
