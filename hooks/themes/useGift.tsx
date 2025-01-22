import React, { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { BiCheck } from "react-icons/bi";

const useGift = (icon: ReactNode) => {
  const [isGiftShown, setIsGiftShown] = useState<boolean>(false);

  const handleCopyRekening = (rekening: string) => {
    navigator.clipboard
      .writeText(rekening)
      .then(() => {
        toast.success("Berhasil disalin.", {
          icon: <div>{icon}</div>,
        });
      })
      .catch((err) => {
        toast.error("Gagal disalin");
      });
  };

  return {
    state: {
      isGiftShown,
    },
    actions: {
      setIsGiftShown,
      handleCopyRekening
    },
  };
};

export default useGift;
