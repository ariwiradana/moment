import Input from "@/components/admin/elements/input";
import { montserrat } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import React from "react";
import { BiSolidPlusCircle, BiTrash } from "react-icons/bi";
import ButtonPrimary from "../elements/button.primary";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import toast from "react-hot-toast";
import InputTextarea from "@/components/admin/elements/textarea";
import Accordion from "@/components/admin/elements/accordion.button";
import InputSelect from "@/components/admin/elements/select";
import { ChildOrderOptions } from "@/constants/childOrder";
import { initialParticipant } from "@/hooks/client/useClientForm";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { areValidParticipants } from "@/utils/areValidParticipants";
import ButtonSecondary from "../elements/button.secondary";

const ParticipantForm = () => {
  const { setForm, form, activeStep, setActiveStep, category } =
    useClientFormStore();

  const handleChangeParticipant = (
    index: number,
    name: string,
    value: string
  ) => {
    const newParticipant = [...form.participants];
    newParticipant[index] = {
      ...newParticipant[index],
      [name]: value,
    };
    setForm("participants", newParticipant);
  };

  return (
    <div className={`${montserrat.className}`}>
      <div className="max-w-screen-md flex flex-col gap-3">
        {form.participants.map((_, index) => {
          return (
            <Accordion
              isExpanded={index === 0}
              key={`Form Participant ${index + 1}`}
              title={`Peserta ${capitalizeWords(
                category === "pernikahan-mepandes" ? "Mepandes" : category
              )} ${index + 1}`}
              content={
                <div className="flex flex-col gap-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      value={form.participants[index].name}
                      onChange={(e) =>
                        handleChangeParticipant(index, "name", e.target.value)
                      }
                      placeholder="Contoh: I Made Adi Putra"
                      className="w-full"
                      label="Nama Lengkap"
                    />
                    <Input
                      value={form.participants[index].nickname}
                      onChange={(e) =>
                        handleChangeParticipant(
                          index,
                          "nickname",
                          e.target.value
                        )
                      }
                      placeholder="Contoh: Adi"
                      className="w-full"
                      label="Nama Panggilan"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      value={form.participants[index].parents_male as string}
                      onChange={(e) =>
                        handleChangeParticipant(
                          index,
                          "parents_male",
                          e.target.value
                        )
                      }
                      placeholder="Contoh: I Wayan Putrawan"
                      className="w-full"
                      label="Nama Ayah"
                    />
                    <Input
                      value={form.participants[index].parents_female as string}
                      onChange={(e) =>
                        handleChangeParticipant(
                          index,
                          "parents_female",
                          e.target.value
                        )
                      }
                      placeholder="Contoh: Ni Made Putri"
                      className="w-full"
                      label="Nama Ibu"
                    />
                  </div>
                  <InputSelect
                    value={form.participants[index].child as string}
                    options={ChildOrderOptions}
                    label="Anak Ke"
                    onChange={(e) =>
                      handleChangeParticipant(index, "child", e.target.value)
                    }
                  />
                  <InputTextarea
                    value={form.participants[index].address}
                    onChange={(e) =>
                      handleChangeParticipant(index, "address", e.target.value)
                    }
                    placeholder="Contoh: JL. Raya Petitenget, Kuta Utara, Badung"
                    rows={6}
                    label="Alamat"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      optional
                      value={form.participants[index].facebook as string}
                      onChange={(e) =>
                        handleChangeParticipant(
                          index,
                          "facebook",
                          e.target.value
                        )
                      }
                      placeholder="Contoh: facebook.com/adiputra"
                      className="w-full"
                      label="Facebook"
                    />
                    <Input
                      optional
                      value={form.participants[index].twitter as string}
                      onChange={(e) =>
                        handleChangeParticipant(
                          index,
                          "twitter",
                          e.target.value
                        )
                      }
                      placeholder="Contoh: x.com/adiputra"
                      className="w-full"
                      label="Twitter/X"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      optional
                      value={form.participants[index].instagram as string}
                      onChange={(e) =>
                        handleChangeParticipant(
                          index,
                          "instagram",
                          e.target.value
                        )
                      }
                      placeholder="Contoh: instagram.com/adiputra"
                      className="w-full"
                      label="Instagram"
                    />
                    <Input
                      optional
                      value={form.participants[index].tiktok as string}
                      onChange={(e) =>
                        handleChangeParticipant(index, "tiktok", e.target.value)
                      }
                      placeholder="Contoh: tiktok.com/@adiputra"
                      className="w-full"
                      label="TikTok"
                    />
                  </div>
                  {index > 0 && (
                    <div className="flex justify-end">
                      <ButtonSecondary
                        title="Hapus"
                        onClick={() => {
                          const newParticipant = [...form.participants];
                          newParticipant.splice(index, 1);
                          setForm("participants", newParticipant);
                        }}
                        icon={<BiTrash />}
                        type="button"
                        size="small"
                      />
                    </div>
                  )}
                </div>
              }
            />
          );
        })}
      </div>
      <div className="mt-4">
        <ButtonSecondary
          onClick={() => {
            const newParticipants = [
              ...form.participants,
              ...initialParticipant,
            ];
            setForm("participants", newParticipants);
          }}
          type="button"
          title="Tambah Peserta Lainnya"
          size="small"
          icon={<BiSolidPlusCircle />}
        />
      </div>
      <div className="flex justify-between p-6 bg-zinc-50 mt-5">
        <ButtonPrimary
          size="medium"
          type="button"
          icon={<IoArrowBack />}
          title="Sebelumnya"
          iconPosition="left"
          onClick={() => setActiveStep(activeStep - 1)}
        />
        <ButtonPrimary
          type="button"
          size="medium"
          icon={<IoArrowForward />}
          iconPosition="right"
          title="Selanjutnya"
          onClick={() => {
            const isValid: boolean =
              form.participants.every(areValidParticipants);
            if (!isValid) {
              toast.error("Lengkapi semua informasi peserta.");
              return;
            }
            setActiveStep(activeStep + 1);
          }}
        />
      </div>
    </div>
  );
};

export default ParticipantForm;
