import React, { useCallback } from "react";
import { redhat } from "@/lib/fonts";
import { sosmedURLs } from "@/constants/sosmed";
import useClientStore from "@/store/useClientStore";
import { BsCart } from "react-icons/bs";
import Image from "next/image";
import useCoverStore from "@/store/useCoverStore";
import ButtonLight from "../dashboard/elements/button.light";
import { Theme } from "@/lib/types";

const PreviewNav = () => {
  const { client } = useClientStore();
  const { isOpen } = useCoverStore();

  const handleChooseTheme = useCallback((theme: Theme) => {
    const message = `Halo, saya tertarik untuk memilih tema undangan ${theme.name}`;
    const whatsappLink = `${sosmedURLs.whatsapp}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  }, []);

  if (!isOpen) return null;

  if (client?.status === "unpaid" || client?.is_preview)
    return (
      <>
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-8 z-50">
          <div className="relative group">
            <div className="w-3 h-3 group-hover:-right-1 transition-all ease-in-out rounded-full aspect-square bg-dashboard-primary animate-pulse absolute -top-1 right-0 z-20"></div>
            <ButtonLight
              onClick={() => handleChooseTheme(client.theme as Theme)}
              className="group-hover:scale-105"
              title="Pesan Sekarang"
              size="small"
              icon={<BsCart />}
            />
          </div>
        </div>
        <nav>
          <ul className="fixed inset-x-0 top-0 z-50 px-6 md:px-12 lg:px-24 flex items-center justify-center gap-8 py-2 bg-dashboard-dark">
            <li
              className={`${redhat.className} flex gap-x-3 items-center font-medium text-xs md:text-sm text-white`}
            >
              <div className="relative w-4 aspect-square">
                <Image
                  alt="logo"
                  fill
                  className="object-contain"
                  src="/favicon-180x180.png"
                  sizes="100px"
                />
              </div>
              {client.is_preview
                ? `Preview Tema ${client?.theme?.name}`
                : `Preview Undangan ${client?.theme?.name}`}
            </li>
          </ul>
        </nav>
      </>
    );
};

export default PreviewNav;
