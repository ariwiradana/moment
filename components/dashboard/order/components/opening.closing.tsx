import Input from "@/components/admin/elements/input";
import useOrderStore from "@/store/useOrderStore";
import React from "react";
import { BiCheck } from "react-icons/bi";
import ButtonSecondary from "../../elements/button.secondary";
import InputTextarea from "@/components/admin/elements/textarea";

export const defaultOpeningClosing = {
  opening_title: "Om Swastiastu",
  opening_description:
    "Dengan Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada Upacara Manusa Yadnya Pawiwahan (Pernikahan) Putra dan Putri kami.",
  closing_title: "Om Shanti Shanti Shanti Om",
  closing_description:
    "Merupakan suatu kebahagiaan dan kehormatan bagi kami jika Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu. Atas kehadiran dan doa restunya, kami sampaikan terima kasih.",
};

const OrderOpeningClosing = () => {
  const store = useOrderStore();

  const handleUseTemplate = () => {
    const currentForm = { ...store.form, ...defaultOpeningClosing };
    store.setFullForm(currentForm);
  };

  return (
    <>
      <div className="border border-dashboard-dark/10 p-4 mb-6">
        <div className="w-3 h-3 rounded-full aspect-square absolute z-10 -top-1 -right-1 animate-ping bg-red-500"></div>
        <p className="text-dashboard-dark/80 text-sm">
          <span className="font-semibold text-dashboard-dark">
            Contoh Kalimat Pembuka:
          </span>
          <br />
          <br /> Om Swastiastu, <br /> Dengan Asung Kertha Wara Nugraha Ida Sang
          Hyang Widhi Wasa/Tuhan Yang Maha Esa, kami bermaksud mengundang
          Bapak/Ibu/Saudara/i untuk hadir pada Upacara Manusa Yadnya Pawiwahan
          (Pernikahan) Putra dan Putri kami. <br />
          <br />
          <span className="font-semibold text-dashboard-dark">
            Contoh Kalimat Penutup:
          </span>
          <br />
          <br />
          Om Shanti Shanti Shanti Om, <br />
          Merupakan suatu kebahagiaan dan kehormatan bagi kami jika
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu. Atas
          kehadiran dan doa restunya, kami sampaikan terima kasih.
        </p>
        <ButtonSecondary
          className="mt-4"
          icon={<BiCheck />}
          size="small"
          title="Gunakan ini"
          type="button"
          onClick={handleUseTemplate}
        />
      </div>
      <Input
        inputSize="medium"
        onChange={(e) => store.setForm("opening_title", e.target.value)}
        value={store.form.opening_title}
        placeholder={`Contoh: ${defaultOpeningClosing.opening_title}`}
        className="w-full"
        label="Judul Pembuka Undangan"
      />
      <InputTextarea
        rows={8}
        inputSize="medium"
        onChange={(e) => store.setForm("opening_description", e.target.value)}
        value={store.form.opening_description}
        placeholder={`Contoh: ${defaultOpeningClosing.opening_description}`}
        className="w-full"
        label="Kalimat Pembuka Undangan"
      />
      <Input
        inputSize="medium"
        onChange={(e) => store.setForm("closing_title", e.target.value)}
        value={store.form.closing_title}
        placeholder={`Contoh: ${defaultOpeningClosing.closing_title}`}
        className="w-full"
        label="Judul Penutup Undangan"
      />
      <InputTextarea
        inputSize="medium"
        rows={8}
        onChange={(e) => store.setForm("closing_description", e.target.value)}
        value={store.form.closing_description}
        placeholder={`Contoh: ${defaultOpeningClosing.closing_description}`}
        className="w-full"
        label="Kalimat Penutup Undangan"
      />
    </>
  );
};

export default OrderOpeningClosing;
