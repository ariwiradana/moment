import { redhat } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import React from "react";
import ButtonPrimary from "../elements/button.primary";
import { IoArrowBack } from "react-icons/io5";
import { BiSolidSave } from "react-icons/bi";
import Input from "@/components/admin/elements/input";
import InputTextarea from "@/components/admin/elements/textarea";
import Accordion from "@/components/admin/elements/accordion.button";
import useClientForm from "@/hooks/client/useClientForm";

interface Props {
  category: string;
}

const CustomOpeningClosingForm = ({ category }: Props) => {
  const { activeStep, setActiveStep, form, setForm, isLoading } =
    useClientFormStore();

  const { actions } = useClientForm(category);

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
          onClick={() => actions.handleSubmit()}
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
