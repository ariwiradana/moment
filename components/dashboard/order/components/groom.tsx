import Input from "@/components/admin/elements/input";
import InputSelect from "@/components/admin/elements/select";
import InputTextarea from "@/components/admin/elements/textarea";
import { ChildOrderOptions } from "@/constants/childOrder";
import { Participant } from "@/lib/types";
import useOrderStore from "@/store/useOrderStore";
import React, { useEffect } from "react";

const OrderGroom = () => {
  const store = useOrderStore();

  const handleChangeGroom = (name: string, value: string) => {
    const participants = [...store.form.participants];

    const existingGroom = participants[0] ?? {};

    participants[0] = {
      ...(existingGroom as Partial<Participant>),
      role: "groom",
      gender: 'male',
      child: existingGroom.child ?? "pertama",
      [name]: value,
    } as Participant;

    store.setForm("participants", participants);
  };

  const groomData = store.form.participants[0];

  useEffect(() => {
    if (!store.pkg) return;

    const socialAvailable = store.pkg.contact_social_media;

    if (!socialAvailable) {
      const participants = [...store.form.participants];
      const existingGroom = participants[0] ?? {};

      participants[0] = {
        ...(existingGroom as Partial<Participant>),
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
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          value={groomData?.name as string}
          onChange={(e) => handleChangeGroom("name", e.target.value)}
          inputSize="medium"
          placeholder="Contoh: I Putu Rama Putra"
          label="Nama Lengkap"
        />
        <Input
          value={groomData?.nickname as string}
          onChange={(e) => handleChangeGroom("nickname", e.target.value)}
          inputSize="medium"
          placeholder="Contoh: Rama"
          label="Nama Panggilan"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          value={groomData?.parents_male as string}
          onChange={(e) => handleChangeGroom("parents_male", e.target.value)}
          placeholder="Contoh: I Wayan Putrawan"
          inputSize="medium"
          label="Nama Ayah"
        />
        <Input
          value={groomData?.parents_female as string}
          onChange={(e) => handleChangeGroom("parents_female", e.target.value)}
          placeholder="Contoh: Ni Made Putri"
          inputSize="medium"
          label="Nama Ibu"
        />
      </div>
      <InputSelect
        inputSize="medium"
        value={groomData?.child as string}
        options={ChildOrderOptions}
        label="Anak Ke"
        onChange={(e) => handleChangeGroom("child", e.target.value)}
      />
      <InputTextarea
        inputSize="medium"
        value={groomData?.address as string}
        onChange={(e) => handleChangeGroom("address", e.target.value)}
        placeholder="Contoh: JL. Raya Kerobokan, Kuta Utara, Badung"
        rows={6}
        label="Alamat"
      />
      {store.pkg?.contact_social_media && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              optional
              value={groomData?.instagram as string}
              onChange={(e) => handleChangeGroom("instagram", e.target.value)}
              placeholder="Contoh: instagram.com/ramaputra"
              className="w-full"
              label="Instagram"
            />
            <Input
              optional
              value={groomData?.tiktok as string}
              onChange={(e) => handleChangeGroom("tiktok", e.target.value)}
              placeholder="Contoh: tiktok.com/@ramaputra"
              className="w-full"
              label="TikTok"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              optional
              value={groomData?.facebook as string}
              onChange={(e) => handleChangeGroom("facebook", e.target.value)}
              placeholder="Contoh: facebook.com/ramaputra"
              className="w-full"
              label="Facebook"
            />
            <Input
              optional
              value={groomData?.twitter as string}
              onChange={(e) => handleChangeGroom("twitter", e.target.value)}
              placeholder="Contoh: x.com/ramaputra"
              className="w-full"
              label="Twitter/X"
            />
          </div>
        </>
      )}
    </>
  );
};

export default OrderGroom;
