import { redhat } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../elements/button.primary";
import { IoArrowBack } from "react-icons/io5";
import { BiSolidSave } from "react-icons/bi";
import Input from "@/components/admin/elements/input";
import InputTextarea from "@/components/admin/elements/textarea";
import Accordion from "@/components/admin/elements/accordion.button";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { getClient } from "@/lib/client";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const CustomOpeningClosingForm = () => {
  const {
    activeStep,
    setActiveStep,
    form,
    setForm,
    isLoading,
    setIsLoading,
    resetForm,
  } = useClientFormStore();

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

  const router = useRouter();

  const handleSubmit = async () => {
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
        error: (error) => {
          setIsLoading(false);
          return error.message || "Gagal membuat informasi undangan.";
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${redhat.className} flex flex-col gap-4`}>
      <div className="max-w-screen-md rounded-lg relative">
        <Accordion
          isExpanded
          title="Kalimat Pembuka dan Penutup"
          content={
            <div className={redhat.className}>
              <div className="w-3 h-3 rounded-full aspect-square absolute -top-1 -right-1 animate-ping bg-red-500"></div>
              <p className="text-dashboard-dark/80 text-sm">
                Anda dapat menyesuaikan kalimat pembuka dan penutup undangan
                sesuai keinginan Anda. Bagian ini memungkinkan Anda untuk
                menyampaikan pesan pribadi dengan ringkas dan jelas kepada para
                tamu. <br />
                <br />
                <span className="font-semibold text-dashboard-dark">
                  Contoh Kalimat Pembuka:
                </span>
                <br />
                <br /> Om Swastiastu, <br /> Dengan Asung Kertha Wara Nugraha
                Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa, kami bermaksud
                mengundang Bapak/Ibu/Saudara/i untuk hadir pada Upacara Manusa
                Yadnya Pawiwahan (Pernikahan) Putra dan Putri kami. <br />
                <br />
                <span className="font-semibold text-dashboard-dark">
                  Contoh Kalimat Penutup:
                </span>
                <br />
                <br />
                Om Shanti Shanti Shanti Om <br />
                Merupakan suatu kebahagiaan dan kehormatan bagi kami jika
                Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
                Atas kehadiran dan doa restunya, kami sampaikan terima kasih.
              </p>
              <br />
              <span className="font-semibold text-dashboard-dark text-sm italic">
                *Catatan: Jika Anda tidak menyesuaikan kalimat pembuka dan
                penutup, maka akan menggunakan kalimat pembuka dan penutup ini.
              </span>
            </div>
          }
        />
      </div>
      <div className="max-w-screen-md flex flex-col gap-3 border p-4">
        <Input
          optional
          onChange={(e) => setForm("opening_title", e.target.value)}
          value={form.opening_title}
          placeholder="Contoh: Om Swastiastu"
          className="w-full"
          label="Judul Pembuka Undangan"
        />
        <InputTextarea
          rows={8}
          optional
          onChange={(e) => setForm("opening_description", e.target.value)}
          value={form.opening_description}
          placeholder="Contoh: Dengan Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada Upacara Manusa Yadnya Pawiwahan (Pernikahan) Putra dan Putri kami."
          className="w-full"
          label="Kalimat Pembuka Undangan"
        />
        <Input
          optional
          onChange={(e) => setForm("closing_title", e.target.value)}
          value={form.closing_title}
          placeholder="Contoh: Om Shanti Shanti Shanti Om"
          className="w-full"
          label="Judul Penutup Undangan"
        />
        <InputTextarea
          optional
          rows={8}
          onChange={(e) => setForm("closing_description", e.target.value)}
          value={form.closing_description}
          placeholder="Contoh: Merupakan suatu kebahagiaan dan kehormatan bagi kami jika Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu. Atas kehadiran dan doa restunya, kami sampaikan terima kasih."
          className="w-full"
          label="Kalimat Penutup Undangan"
        />
      </div>
      <div className="flex justify-between p-6 bg-zinc-50 mt-5">
        <ButtonPrimary
          iconPosition="left"
          size="medium"
          type="button"
          icon={<IoArrowBack />}
          title="Sebelumnya"
          onClick={() => {
            setActiveStep(activeStep - 1);
          }}
        />
        <ButtonPrimary
          onClick={() => handleSubmit()}
          isloading={isLoading}
          size="medium"
          type="submit"
          icon={<BiSolidSave />}
          iconPosition="right"
          title="Simpan"
        />
      </div>
    </div>
  );
};

export default CustomOpeningClosingForm;
