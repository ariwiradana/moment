import React, { FC } from "react";
import { useSamaya } from "@/hooks/themes/useSamaya";
import "yet-another-react-lightbox/styles.css";
import { afacad, marcellus } from "@/lib/fonts";
import { BiSolidChevronRightCircle, BiSolidCopy } from "react-icons/bi";
import Image from "next/image";
import Button from "../elements/button";

interface Props {
  state: useSamaya["state"];
  actions: useSamaya["actions"];
}

const GiftComponent: FC<Props> = (props) => {
  if (
    props.state.client?.gift_bank_name &&
    props.state.client?.gift_account_name &&
    props.state.client?.gift_account_number
  )
    return (
      <section className="relative bg-samaya-dark/80 overflow-hidden z-20">
        <div>
          <div className="relative h-full w-full px-4 py-16 lg:py-24 z-30">
            <h1
              data-aos="fade-up"
              className={`font-tan-pearl text-2xl md:text-3xl text-center text-samaya-primary`}
            >
              Kado Digital
            </h1>
            <p
              data-aos="fade-up"
              className={`${marcellus.className} text-sm md:text-base text-center leading-5 text-white mt-2 mb-8 max-w-screen-sm mx-auto`}
            >
              Tanpa mengurangi rasa hormat kami bagi tamu yang ingin mengirimkan
              hadiah kepada kedua mempelai dapat mengirimkannya melalui :
            </p>
            <div data-aos="fade-up" className="flex justify-center mt-6">
              <Button
                onClick={() =>
                  props.actions.setIsGiftShown(!props.state.isGiftShown)
                }
                type="button"
                title="Klik Disini"
                icon={
                  <BiSolidChevronRightCircle
                    className={`transition-transform duration-500 delay-100 ease-in-out ${
                      props.state.isGiftShown ? "rotate-90" : "rotate-0"
                    }`}
                  />
                }
              />
            </div>
            {props.state.isGiftShown && (
              <div
                data-aos="zoom-out-up"
                data-aos-delay="200"
                className="flex justify-center relative z-20 mt-12"
              >
                <div
                  className={`max-w-96 w-full aspect-[1.5/1] p-8 rounded-2xl flex flex-col justify-between shadow-lg relative bg-samaya-dark overflow-hidden ${afacad.className}`}
                >
                  <div className="w-44 h-44 rounded-full border border-white/10 absolute -right-20 -top-20"></div>
                  <div className="w-64 h-64 rounded-full border border-white/10 absolute -left-20 -bottom-20"></div>
                  <div className="w-64 h-64 rounded-full border border-white/10 absolute -left-10 -bottom-40"></div>
                  <div className="flex justify-between relative z-10">
                    <div className="relative w-14">
                      <Image
                        fill
                        alt="card-chip"
                        src="/images/nirvaya/card-chip.svg"
                        className="object-contain"
                      />
                    </div>
                    <h1
                      className={`text-3xl font-bold text-white ${afacad.className}`}
                    >
                      {props.state.client?.gift_bank_name}
                    </h1>
                  </div>
                  <div className="relative z-10">
                    <div>
                      <p
                        className={`text-lg md:text-xl leading-5 text-white ${marcellus.className}`}
                      >
                        {props.state.client?.gift_account_name}
                      </p>
                      <p
                        className={`text-lg md:text-xl font-medium text-white ${afacad.className}`}
                      >
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
                      className="bg-samaya-primary outline-none text-samaya-dark px-3 py-1 rounded-lg text-sm flex items-center gap-x-1 mt-3 relative z-10"
                    >
                      <span>Salin No Rekening</span>
                      <BiSolidCopy className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
};

export default GiftComponent;
