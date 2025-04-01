import React, { ReactNode, useState } from "react";
import toast from "react-hot-toast";

const useGift = (icon: ReactNode) => {
  const [isGiftShown, setIsGiftShown] = useState<boolean>(false);
  const [isRekeniigShown, setIsRekeningShown] = useState<boolean>(false);

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
      isRekeniigShown,
    },
    actions: {
      setIsGiftShown,
      handleCopyRekening,
      setIsRekeningShown,
    },
  };
};

export default useGift;
