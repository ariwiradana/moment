import React, { FC } from "react";
import ButtonPrimary from "../dashboard/elements/button.primary";
import { dm } from "@/lib/fonts";
import { BiCalendarEvent } from "react-icons/bi";
import { useSamaya } from "@/hooks/themes/useSamaya";
import { sosmedURLs } from "@/constants/sosmed";

interface Props {
  state: useSamaya["state"];
}

const PreviewNav: FC<Props> = ({ state }) => {
  const handleChooseTheme = (name: string, category: string) => {
    const message = `Halo, saya tertarik untuk memilih tema undangan ini:\n\n- Kategori: ${category}\n- Tema: ${name}`;
    const whatsappLink = `${sosmedURLs.whatsapp}?text=${encodeURIComponent(
      message
    )}`;

    if (typeof window !== "undefined") {
      window.open(whatsappLink);
    }
  };

  if (state.client)
    return (
      <>
        <nav className="fixed inset-x-0 z-[999]">
          <ul className="px-6 md:px-12 lg:px-24 flex items-center justify-between gap-8 h-16 md:h-20 lg:h-24 bg-dashboard-dark bg-opacity-30 backdrop-blur-md">
            <li>
              <h1
                className={`${dm.className} text-xl lg:text-2xl font-bold text-white`}
              >
                Preview Tema
              </h1>
            </li>
            <li>
              <div className="md:hidden">
                <ButtonPrimary
                  onClick={() =>
                    handleChooseTheme(
                      state.client?.theme?.name as string,
                      state.client?.theme?.category as string
                    )
                  }
                  icon={<BiCalendarEvent />}
                  size="small"
                  title="Pilih Tema"
                />
              </div>
              <div className="hidden md:block lg:hidden">
                <ButtonPrimary
                  onClick={() =>
                    handleChooseTheme(
                      state.client?.theme?.name as string,
                      state.client?.theme?.category as string
                    )
                  }
                  icon={<BiCalendarEvent />}
                  size="medium"
                  title="Pilih Tema"
                />
              </div>
              <div className="hidden lg:block">
                <ButtonPrimary
                  onClick={() =>
                    handleChooseTheme(
                      state.client?.theme?.name as string,
                      state.client?.theme?.category as string
                    )
                  }
                  icon={<BiCalendarEvent />}
                  size="large"
                  title="Pilih Tema"
                />
              </div>
            </li>
          </ul>
        </nav>
      </>
    );
};

export default PreviewNav;
