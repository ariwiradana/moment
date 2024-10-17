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
  if (
    props.state.client?.gift_bank_name &&
    props.state.client?.gift_account_name &&
    props.state.client?.gift_account_number
  )
    return (
      <section className="relative bg-white">
        <div
          className="relative z-10 h-full w-full px-6 py-16 bg-theme1-primary bg-opacity-5"
          data-aos="fade-up"
        >
          <div className="w-full h-full relative z-40">
            <div
              data-aos="zoom-in-up"
              className="relative h-12 lg:h-16 w-full mb-8"
            >
              <Image
                alt="leaf-datetime"
                src="/images/theme1/leaf.svg"
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
              className={`h-52 lg:h-56 md:w-96 w-full bg-theme1-primary bg-opacity-15 p-8 rounded-2xl flex flex-col justify-between shadow-lg relative ${afacad.className}`}
            >
              <Image
                sizes="100px"
                alt={`img-card`}
                src="/images/theme1/pattern-line.svg"
                fill
                className="w-full h-full object-cover"
              />
              <div className="flex justify-end relative z-10">
                <h1
                  className={`text-3xl uppercase font-bold text-theme1-primary`}
                >
                  {props.state.client?.gift_bank_name}
                </h1>
              </div>
              <div className="relative z-10">
                <div>
                  <p className="text-base leading-5 text-theme1-primary">
                    {props.state.client?.gift_account_name}
                  </p>
                  <p className="text-xl font-medium text-gray-800">
                    {props.state.client?.gift_account_number}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    props.actions.handleCopyRekening(
                      props.state.client?.gift_account_number as string
                    )
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
