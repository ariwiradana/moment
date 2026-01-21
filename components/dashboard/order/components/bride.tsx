import Input from "@/components/admin/elements/input";
import InputSelect from "@/components/admin/elements/select";
import InputTextarea from "@/components/admin/elements/textarea";
import { ChildOrderOptions } from "@/constants/childOrder";
import { Participant } from "@/lib/types";
import useOrderStore from "@/store/useOrderStore";
import React, { useEffect, useRef, useState } from "react";
import { ModalCropImage } from "../modal.crop.image";
import { BiImageAdd, BiX } from "react-icons/bi";
import Image from "next/image";

const OrderBride = () => {
  const store = useOrderStore();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setOpen(true);
    };
  };

  const handleChangeBride = (name: string, value: string) => {
    const participants = [...store.form.participants];

    const existingBride = participants[1] ?? {};

    participants[1] = {
      ...(existingBride as Partial<Participant>),
      role: "bride",
      gender: "female",
      child: existingBride.child ?? "pertama",
      [name]: value,
    } as Participant;

    store.setForm("participants", participants);
  };

  const brideData = store.form.participants[1];

  useEffect(() => {
    if (!store.pkg) return;

    const socialAvailable = store.pkg.contact_social_media;

    if (!socialAvailable) {
      const participants = [...store.form.participants];
      const existingBride = participants[1] ?? {};

      participants[1] = {
        ...(existingBride as Partial<Participant>),
        instagram: "",
        tiktok: "",
        facebook: "",
        twitter: "",
      } as Participant;

      store.setForm("participants", participants);
    }
  }, [store.pkg]);

  return (
    <>
      <div>
        <label
          htmlFor="input-image"
          className="block text-dashboard-dark/60 mb-1 text-sm"
        >
          Foto Mempelai
        </label>
        <div className="flex items-center gap-x-2">
          {brideData?.image && (
            <div
              role="button"
              onClick={() => fileRef.current?.click()}
              className="size-32 object-cover border border-zinc-200 border-dashed relative"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleChangeBride("image", "");
                }}
                className="absolute z-10 text-white -top-1.5 -right-1.5 size-5 flex items-center justify-center aspect-square rounded-full bg-admin-danger"
              >
                <BiX />
              </button>
              <Image
                src={brideData?.image as string}
                className="object-cover"
                fill
                alt="Preview foto mempelai wanita"
              />
            </div>
          )}
          {!brideData?.image && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="size-32 bg-zinc-100 flex items-center justify-center border border-zinc-200 border-dashed"
            >
              <BiImageAdd className="size-6 text-dashboard-dark" />
            </button>
          )}
        </div>
      </div>
      <ModalCropImage
        open={open}
        imageSrc={imageSrc}
        onClose={() => setOpen(false)}
        onSave={(result) => {
          handleChangeBride("image", result);
        }}
      />

      <input
        id="input-image"
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        ref={fileRef}
        hidden
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          value={brideData?.name as string}
          onChange={(e) => handleChangeBride("name", e.target.value)}
          inputSize="medium"
          placeholder="Contoh: Ni Made Shinta Dewi"
          label="Nama Lengkap"
        />
        <Input
          value={brideData?.nickname as string}
          onChange={(e) => handleChangeBride("nickname", e.target.value)}
          inputSize="medium"
          placeholder="Contoh: Shinta"
          label="Nama Panggilan"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          value={brideData?.parents_male as string}
          onChange={(e) => handleChangeBride("parents_male", e.target.value)}
          placeholder="Contoh: I Wayan Putrawan"
          inputSize="medium"
          label="Nama Ayah"
        />
        <Input
          value={brideData?.parents_female as string}
          onChange={(e) => handleChangeBride("parents_female", e.target.value)}
          placeholder="Contoh: Ni Made Putri"
          inputSize="medium"
          label="Nama Ibu"
        />
      </div>
      <InputSelect
        inputSize="medium"
        value={brideData?.child as string}
        options={ChildOrderOptions}
        label="Anak Ke"
        onChange={(e) => handleChangeBride("child", e.target.value)}
      />
      <InputTextarea
        inputSize="medium"
        value={brideData?.address as string}
        onChange={(e) => handleChangeBride("address", e.target.value)}
        placeholder="Contoh: JL. Raya Kerobokan, Kuta Utara, Badung"
        rows={6}
        label="Alamat"
      />
      {store.pkg?.contact_social_media && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              optional
              value={brideData?.instagram as string}
              onChange={(e) => handleChangeBride("instagram", e.target.value)}
              placeholder="Contoh: instagram.com/shintadewi"
              className="w-full"
              label="Instagram"
            />
            <Input
              optional
              value={brideData?.tiktok as string}
              onChange={(e) => handleChangeBride("tiktok", e.target.value)}
              placeholder="Contoh: tiktok.com/@shintadewi"
              className="w-full"
              label="TikTok"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              optional
              value={brideData?.facebook as string}
              onChange={(e) => handleChangeBride("facebook", e.target.value)}
              placeholder="Contoh: facebook.com/shintadewi"
              className="w-full"
              label="Facebook"
            />
            <Input
              optional
              value={brideData?.twitter as string}
              onChange={(e) => handleChangeBride("twitter", e.target.value)}
              placeholder="Contoh: x.com/shintadewi"
              className="w-full"
              label="Twitter/X"
            />
          </div>
        </>
      )}
    </>
  );
};

export default OrderBride;
