import React, { useCallback } from "react";
import { redhat } from "@/lib/fonts";
import { sosmedURLs } from "@/constants/sosmed";
import useClientStore from "@/store/useClientStore";
import { BsCart } from "react-icons/bs";
import Image from "next/image";
import useCoverStore from "@/store/useCoverStore";

const PreviewNav = () => {
  const { client } = useClientStore();
  const { isOpen } = useCoverStore();

  const handleChooseTheme = useCallback((name: string) => {
    const message = `Halo, saya tertarik untuk memilih tema undangan ${name}`;
    const whatsappLink = `${sosmedURLs.whatsapp}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  }, []);

  if (!isOpen) return null;

  if (client?.status === "unpaid" || client?.is_preview)
    return (
      <>
        <nav
          className="fixed inset-x-0 top-0 z-[999]"
          data-aos="fade-down"
          data-aos-offset="80"
        >
          <ul className="px-6 md:px-12 lg:px-24 flex items-center justify-between gap-8 py-3 md:py-4 bg-dashboard-dark/80 backdrop-blur-sm">
            <li className="flex items-center gap-x-3">
              <div className="relative w-5 md:w-6 aspect-square">
                <Image
                  alt="logo"
                  fill
                  className="object-contain"
                  src="/favicon-180x180.png"
                  sizes="100px"
                />
              </div>
              <h1
                className={`${redhat.className} font-medium text-sm md:text-base text-white`}
              >
                {client.is_preview
                  ? `Tema ${client?.theme?.name}`
                  : `Preview Undangan ${client?.theme?.name}`}
              </h1>
            </li>
            {client.is_preview && (
              <li>
                <button
                  onClick={() =>
                    handleChooseTheme(client?.theme?.name as string)
                  }
                  className={`${redhat.className} justify-center text-[10px] md:text-xs hover:bg-white/5 transition-all ease-in-out duration-500 flex items-center gap-x-2 outline-none border whitespace-nowrap border-zinc-400 rounded-full px-4 text-white py-2`}
                >
                  Pesan Sekarang
                  <BsCart />
                </button>
              </li>
            )}
          </ul>
        </nav>
      </>
    );
};

export default PreviewNav;
