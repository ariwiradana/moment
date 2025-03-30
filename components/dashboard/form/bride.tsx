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

const BrideForm = () => {
  const { setForm, form, activeStep, setActiveStep } = useClientFormStore();

  const handleChangeBride = (name: string, value: string) => {
    const participants = [...form.participants];
    participants[1] = {
      ...participants[1],
      [name]: value,
    };
    setForm("participants", participants);
  };

  return (
    <div className={`${montserrat.className}`}>
      <div className="max-w-screen-md flex flex-col gap-3 border p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            value={form.participants[1].name}
            onChange={(e) => handleChangeBride("name", e.target.value)}
            placeholder="Contoh: Ni Made Shinta Dewi"
            className="w-full"
            label="Nama Lengkap"
          />
          <Input
            value={form.participants[1].nickname}
            onChange={(e) => handleChangeBride("nickname", e.target.value)}
            placeholder="Contoh: Shinta"
            className="w-full"
            label="Nama Panggilan"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            value={form.participants[1].parents_male as string}
            onChange={(e) => handleChangeBride("parents_male", e.target.value)}
            placeholder="Contoh: I Wayan Putrawan"
            className="w-full"
            label="Nama Ayah"
          />
          <Input
            value={form.participants[1].parents_female as string}
            onChange={(e) =>
              handleChangeBride("parents_female", e.target.value)
            }
            placeholder="Contoh: Ni Made Putri"
            className="w-full"
            label="Nama Ibu"
          />
        </div>
        <InputSelect
          value={form.participants[1].child as string}
          options={ChildOrderOptions}
          label="Anak Ke"
          onChange={(e) => handleChangeBride("child", e.target.value)}
        />
        <InputTextarea
          value={form.participants[1].address}
          onChange={(e) => handleChangeBride("address", e.target.value)}
          placeholder="Contoh: JL. Raya Petitenget, Kuta Utara, Badung"
          rows={6}
          label="Alamat"
        />
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            optional
            value={form.participants[1].facebook as string}
            onChange={(e) => handleChangeBride("facebook", e.target.value)}
            placeholder="Contoh: facebook.com/shintadewi"
            className="w-full"
            label="Facebook"
          />
          <Input
            optional
            value={form.participants[1].twitter as string}
            onChange={(e) => handleChangeBride("twitter", e.target.value)}
            placeholder="Contoh: x.com/shintadewi"
            className="w-full"
            label="Twitter/X"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            optional
            value={form.participants[1].instagram as string}
            onChange={(e) => handleChangeBride("instagram", e.target.value)}
            placeholder="Contoh: instagram.com/shintadewi"
            className="w-full"
            label="Instagram"
          />
          <Input
            optional
            value={form.participants[1].tiktok as string}
            onChange={(e) => handleChangeBride("tiktok", e.target.value)}
            placeholder="Contoh: tiktok.com/@shintadewi"
            className="w-full"
            label="TikTok"
          />
        </div>
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
          size="medium"
          type="button"
          icon={<IoArrowForward />}
          iconPosition="right"
          title="Selanjutnya"
          onClick={() => {
            const groom = form.participants[1];

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

            if (form.theme_category_id === 1) {
              setActiveStep(activeStep + 2);
            } else {
              setActiveStep(activeStep + 1);
            }
          }}
        />
      </div>
    </div>
  );
};

export default BrideForm;
