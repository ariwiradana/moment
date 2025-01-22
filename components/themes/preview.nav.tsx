import React from "react";
import { dm } from "@/lib/fonts";
import ButtonPrimary from "../dashboard/elements/button.primary";
import { BiMobile } from "react-icons/bi";
import { sosmedURLs } from "@/constants/sosmed";
import useClientStore from "@/store/useClientStore";

const PreviewNav = () => {
  const { client } = useClientStore();
  const handleChooseTheme = (name: string, category: string) => {
    const message = `Halo, saya tertarik untuk memilih tema undangan ini:\n\n- Kategori: ${category}\n- Tema: ${name}`;
    const whatsappLink = `${sosmedURLs.whatsapp}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink);
  };

  if (client?.status === "unpaid" || client?.is_preview)
    return (
      <>
        <nav className="fixed inset-x-0 z-[999]" data-aos="fade-down">
          <ul className="px-6 md:px-12 lg:px-24 flex items-center justify-between gap-8 py-4 bg-dashboard-dark/50 backdrop-blur-sm">
            <li>
              <h1
                className={`${dm.className} text-base md:text-xl lg:text-2xl text-white`}
              >
                {client.is_preview
                  ? `Preview Tema ${client.theme?.name}`
                  : `Preview Undangan ${client.theme_category?.name}`}
              </h1>
            </li>
            {client.is_preview && (
              <li>
                <div className="md:hidden">
                  <ButtonPrimary
                    size="extrasmall"
                    onClick={() =>
                      handleChooseTheme(
                        client?.theme?.name as string,
                        client?.theme?.category as string
                      )
                    }
                    icon={<BiMobile />}
                    title="Pilih Tema"
                  />
                </div>
                <div className="hidden md:block lg:hidden">
                  <ButtonPrimary
                    size="medium"
                    onClick={() =>
                      handleChooseTheme(
                        client?.theme?.name as string,
                        client?.theme?.category as string
                      )
                    }
                    icon={<BiMobile />}
                    title="Pilih Tema"
                  />
                </div>
                <div className="hidden lg:block">
                  <ButtonPrimary
                    size="medium"
                    onClick={() =>
                      handleChooseTheme(
                        client?.theme?.name as string,
                        client?.theme?.category as string
                      )
                    }
                    icon={<BiMobile />}
                    title="Pilih Tema"
                  />
                </div>
              </li>
            )}
          </ul>
        </nav>
      </>
    );
};

export default PreviewNav;
