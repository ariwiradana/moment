import Input from "@/components/admin/elements/input";
import useOrderStore from "@/store/useOrderStore";
import React from "react";

const OrderGift = () => {
  const store = useOrderStore();

  return (
    <>
      <Input
        optional
        inputSize="medium"
        onChange={(e) => store.setForm("gift_bank_name", e.target.value)}
        value={store.form.gift_bank_name}
        placeholder="Contoh: BCA"
        className="w-full"
        label="Nama Bank / E-Wallet"
      />
      <Input
        optional
        inputSize="medium"
        onChange={(e) => store.setForm("gift_account_name", e.target.value)}
        value={store.form.gift_account_name}
        placeholder="Contoh: I Putu Rama Putra"
        className="w-full"
        label="Nama Akun"
      />
      <Input
        optional
        inputSize="medium"
        onChange={(e) => store.setForm("gift_account_number", e.target.value)}
        value={store.form.gift_account_number}
        placeholder="Contoh: 71625262521"
        className="w-full"
        label="Nomor Rekening / Platform"
      />
    </>
  );
};

export default OrderGift;
