import Input from "@/components/admin/elements/input";
import InputSelect from "@/components/admin/elements/select";
import InputTextarea from "@/components/admin/elements/textarea";
import { ChildOrderOptions } from "@/constants/childOrder";
import { Participant } from "@/lib/types";
import useOrderStore from "@/store/useOrderStore";
import React, { useEffect } from "react";

const OrderBride = () => {
  const store = useOrderStore();

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
