import Input from "@/components/admin/elements/input";
import { montserrat } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import React from "react";
import ButtonPrimary from "../elements/button.primary";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import toast from "react-hot-toast";
import InputTextarea from "@/components/admin/elements/textarea";
import InputSelect from "@/components/admin/elements/select";
import { ChildOrderOptions } from "@/constants/childOrder";

const GroomForm = () => {
  const { setForm, form, activeStep, setActiveStep } = useClientFormStore();

  const handleChangeGroom = (name: string, value: string) => {
    const participants = [...form.participants];
    participants[0] = {
      ...participants[0],
      [name]: value,
    };
    setForm("participants", participants);
  };

  if (form.participants.length > 0)
    return (
      <div className={`${montserrat.className}`}>
        <div className="max-w-screen-md flex flex-col gap-3 border p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              value={form.participants[0].name}
              onChange={(e) => handleChangeGroom("name", e.target.value)}
              placeholder="Contoh: I Putu Rama Putra"
              className="w-full"
              label="Nama Lengkap"
            />
            <Input
              value={form.participants[0].nickname}
              onChange={(e) => handleChangeGroom("nickname", e.target.value)}
              placeholder="Contoh: Rama"
              className="w-full"
              label="Nama Panggilan"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              value={form.participants[0].parents_male as string}
              onChange={(e) =>
                handleChangeGroom("parents_male", e.target.value)
              }
              placeholder="Contoh: I Wayan Putrawan"
              className="w-full"
              label="Nama Ayah"
            />
            <Input
              value={form.participants[0].parents_female as string}
              onChange={(e) =>
                handleChangeGroom("parents_female", e.target.value)
              }
              placeholder="Contoh: Ni Made Putri"
              className="w-full"
              label="Nama Ibu"
            />
          </div>
          <InputSelect
            value={form.participants[0].child as string}
            options={ChildOrderOptions}
            label="Anak Ke"
            onChange={(e) => handleChangeGroom("child", e.target.value)}
          />
          <InputTextarea
            value={form.participants[0].address}
            onChange={(e) => handleChangeGroom("address", e.target.value)}
            placeholder="Contoh: JL. Raya Kerobokan, Kuta Utara, Badung"
            rows={6}
            label="Alamat"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              optional
              value={form.participants[0].facebook as string}
              onChange={(e) => handleChangeGroom("facebook", e.target.value)}
              placeholder="Contoh: facebook.com/ramaputra"
              className="w-full"
              label="Facebook"
            />
            <Input
              optional
              value={form.participants[0].twitter as string}
              onChange={(e) => handleChangeGroom("twitter", e.target.value)}
              placeholder="Contoh: x.com/ramaputra"
              className="w-full"
              label="Twitter/X"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              optional
              value={form.participants[0].instagram as string}
              onChange={(e) => handleChangeGroom("instagram", e.target.value)}
              placeholder="Contoh: instagram.com/ramaputra"
              className="w-full"
              label="Instagram"
            />
            <Input
              optional
              value={form.participants[0].tiktok as string}
              onChange={(e) => handleChangeGroom("tiktok", e.target.value)}
              placeholder="Contoh: tiktok.com/@ramaputra"
              className="w-full"
              label="TikTok"
            />
          </div>
        </div>

        <div className="flex justify-between p-6 bg-zinc-50 mt-5">
          <ButtonPrimary
            type="button"
            size="medium"
            icon={<IoArrowBack />}
            title="Sebelumnya"
            iconPosition="left"
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
          />
          <ButtonPrimary
            type="button"
            size="medium"
            icon={<IoArrowForward />}
            iconPosition="right"
            title="Selanjutnya"
            onClick={() => {
              const groom = form.participants[0];

              if (!groom.name) {
                toast.error("Nama mempelai wajib diisi.");
                return;
              }

              if (!groom.nickname) {
                toast.error("Nama panggilan mempelai wajib diisi.");
                return;
              }

              if (!groom.parents_male) {
                toast.error("Nama ayah mempelai wajib diisi.");
                return;
              }

              if (!groom.parents_female) {
                toast.error("Nama ibu mempelai wajib diisi.");
                return;
              }

              if (!groom.address) {
                toast.error("Alamat mempelai wajib diisi.");
                return;
              }

              setActiveStep(activeStep + 1);
            }}
          />
        </div>
      </div>
    );
};

export default GroomForm;
