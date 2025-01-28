import { montserrat } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import React from "react";
import ButtonPrimary from "../elements/button.primary";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Input from "@/components/admin/elements/input";

const GiftForm = () => {
  const { activeStep, setActiveStep, form, setForm } = useClientFormStore();

  return (
    <div className={`${montserrat.className}`}>
      <div className="max-w-screen-md flex flex-col gap-3 border p-4 rounded-lg">
        <Input
          optional
          onChange={(e) => setForm("gift_bank_name", e.target.value)}
          value={form.gift_bank_name}
          placeholder="Contoh: BCA"
          className="w-full"
          label="Nama Bank / E-Wallet"
        />
        <Input
          optional
          onChange={(e) => setForm("gift_account_name", e.target.value)}
          value={form.gift_account_name}
          placeholder="Contoh: I Putu Rama Putra"
          className="w-full"
          label="Nama Akun"
        />
        <Input
          optional
          onChange={(e) => setForm("gift_account_number", e.target.value)}
          value={form.gift_account_number}
          placeholder="Contoh: 71625262521"
          className="w-full"
          label="Nomor Rekening / Platform"
        />
      </div>
      <div className="flex justify-between p-6 bg-zinc-50 mt-5 rounded-lg">
        <ButtonPrimary
          size="medium"
          type="button"
          icon={<IoArrowBack />}
          title="Sebelumnya"
          onClick={() => {
            setActiveStep(activeStep - 1);
          }}
        />
        <ButtonPrimary
          size="medium"
          type="button"
          icon={<IoArrowForward />}
          iconPosition="right"
          title="Berikutnya"
          onClick={() => {
            setActiveStep(activeStep + 1);
          }}
        />
      </div>
    </div>
  );
};

export default GiftForm;
