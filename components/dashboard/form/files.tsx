import { montserrat } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import React from "react";
import ButtonPrimary from "../elements/button.primary";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Input from "@/components/admin/elements/input";
import toast from "react-hot-toast";

const FilesForm = () => {
  const { activeStep, setActiveStep, form, setForm } = useClientFormStore();

  return (
    <div className={`${montserrat.className}`}>
      <div className="max-w-screen-md flex flex-col gap-3 border p-4">
        <Input
          onChange={(e) => setForm("gallery", [e.target.value])}
          value={(form.gallery as string[])[0]}
          placeholder="Link Google Drive / Media Fire / OneDrive / dll."
          className="w-full"
          label="Link Foto"
        />
        <Input
          optional
          placeholder="Link Youtube / Google Drive / Media Fire / OneDrive / dll."
          className="w-full"
          label="Link Video"
          value={(form.videos as string[])[0]}
          onChange={(e) => setForm("videos", [e.target.value])}
        />
        <Input
          optional
          onChange={(e) => setForm("music", e.target.value)}
          placeholder="Judul Lagu"
          className="w-full"
          label="Musik Latar"
          value={form.music as string}
        />
      </div>
      <div className="flex justify-between p-6 bg-zinc-50 mt-5">
        <ButtonPrimary
          size="medium"
          type="button"
          icon={<IoArrowBack />}
          title="Sebelumnya"
          iconPosition="left"
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
            if (!form.gallery?.[0]) {
              toast.error("Link foto wajib diisi");
              return;
            }
            setActiveStep(activeStep + 1);
          }}
        />
      </div>
    </div>
  );
};

export default FilesForm;
