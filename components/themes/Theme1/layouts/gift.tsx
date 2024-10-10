import React, { FC } from "react";
import Title from "../elements/title";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import Image from "next/image";
import "yet-another-react-lightbox/styles.css";
import { afacad } from "@/lib/fonts";
import { BiSolidCopy } from "react-icons/bi";

interface Props {
  state: useTheme1["state"];
  actions: useTheme1["actions"];
}

const GiftComponent: FC<Props> = (props) => {
  return (
    <section className="relative bg-white">
      <div className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-[0.02]"></div>
      <div
        className="relative z-10 h-full w-full px-6 pb-16"
        data-aos="fade-up"
      >
        <div className="w-full h-full relative z-40">
          <div
            data-aos="zoom-in-up"
            className="relative h-12 lg:h-16 w-full mb-8"
          >
            <Image
              alt="leaf-datetime"
              src="/images/theme1/leaf-white.svg"
              fill
              className="object-contain"
            />
          </div>
          <div data-aos="fade-up" className="mb-12">
            <Title
              className="text-theme1-primary"
              title="Kado Digital"
              caption={`Kirim kado digital`}
            />
          </div>
        </div>
        <div className="flex justify-center" data-aos="zoom-out-up">
          <div
            className={`h-52 lg:h-56 lg:w-96 w-full bg-theme1-primary bg-opacity-15 p-8 rounded-2xl flex flex-col justify-between shadow-lg relative ${afacad.className}`}
          >
            <span className="absolute inset-0 bg-[url('/images/theme1/pattern-line.svg')] bg-cover bg-no-repeat"></span>
            <div className="flex justify-end relative z-10">
              <h1
                className={`text-3xl uppercase font-bold text-theme1-primary`}
              >
                BCA
              </h1>
            </div>
            <div className="relative z-10">
              <div>
                <p className="text-base leading-5 text-theme1-primary">
                  I Made Ari Wiradana
                </p>
                <p className="text-xl font-medium text-gray-800">
                  124-526-272-632
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  props.actions.handleCopyRekening("124-526-272-632")
                }
                className="bg-theme1-primary outline-none text-white px-2 rounded-lg text-sm flex items-center gap-x-1 mt-3 relative z-10"
              >
                <span>Salin No Rekening</span>
                <BiSolidCopy className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftComponent;
