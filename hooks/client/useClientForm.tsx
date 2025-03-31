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
import { Package, Participant, Theme, ThemeCategory } from "@/lib/types";
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
    setForm,
    setThemeCategories,
    setCategory,
    setPackages,
    setThemes,
  } = useClientFormStore();

  const { isLoading: isLoadingThemeCategories } = useSWR<{
    data: ThemeCategory[];
  }>(`/api/_pb/_tc`, fetcher, {
    onSuccess: (data) => {
      if (data.data.length > 0) {
        const categoryData = data.data.find((tc) => tc.slug === category);

        if (categoryData) {
          setForm("theme_category_id", categoryData?.id as number);
          setCategory(categoryData.slug);
        } else {
          const allCategories = data.data.map((tc) => tc.slug);
          toast.error(
            `Kategori undangan tidak ditemukan. Kategori yang tersedia : ${allCategories.join(
              ", "
            )}`
          );
        }
        setThemeCategories(data.data);
      }
    },
  });

  const [formComponents] = useState<
    Record<
      string,
      {
        components: Record<number, ReactNode>;
        steps: string[];
        icons: ReactNode[];
      }
    >
  >({
    pernikahan: {
      components: {
        0: <PackageThemeLinkForm />,
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
    },
    mepandes: {
      components: {
        0: <PackageThemeLinkForm />,
        1: <EventForm />,
        2: <ParticipantForm />,
        3: <FilesForm />,
        4: <GiftForm />,
        5: <CustomOpeningClosingForm />,
      },
      steps: [
        "Link, Paket & Tema Undangan",
        "Acara Undangan",
        "Peserta Undangan Mepandes",
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
    },
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeStep]);

  const { isLoading: isLoadingePackages } = useSWR<{
    data: Package[];
  }>("/api/_pb/_p", fetcher, {
    onSuccess: (data) => {
      if (data.data) {
        setPackages(data.data);
      }
    },
  });

  const { isLoading: isLoadingThemes } = useSWR(
    form.theme_category_id
      ? `/api/_pb/_th?order=DESC&theme_category_id=${JSON.stringify([
          form.theme_category_id,
        ])}`
      : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data.data) {
          setThemes(data.data);
        }
      },
    }
  );

  useEffect(() => {
    if (category && form.participants.length === 0) {
      switch (category) {
        case "pernikahan":
          setForm("participants", initialGroomBride);
          break;
        case "mepandes":
          setForm("participants", initialParticipant);
          break;
        default:
          break;
      }
    }
  }, [category, form.participants]);

  return {
    state: {
      formComponents,
      isLoadingThemeCategories,
      isLoadingThemes,
      isLoadingePackages,
    },
  };
};

export default useClientForm;
