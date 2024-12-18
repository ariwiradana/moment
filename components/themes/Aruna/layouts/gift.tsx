import React, { FC } from "react";
import { useAruna } from "@/hooks/themes/useAruna";
import "yet-another-react-lightbox/styles.css";
import { roboto } from "@/lib/fonts";
import { BiChevronRightCircle, BiCopy } from "react-icons/bi";
import Image from "next/image";
import Button from "../elements/button";
import ButtonDark from "../elements/button.dark";
import { formatBankNumber } from "@/utils/formatBankNumber";

interface Props {
  state: useAruna["state"];
  actions: useAruna["actions"];
}

const GiftComponent: FC<Props> = (props) => {
  if (
    props.state.client?.gift_bank_name &&
    props.state.client?.gift_account_name &&
    props.state.client?.gift_account_number
  )
    return (
      <section className="relative bg-aruna-dark overflow-hidden py-[60px] md:py-[100px]">
        <div className="px-8">
          <h2
            data-aos="fade-up"
            className="font-high-summit text-4xl md:text-5xl text-white text-center whitespace-nowrap"
          >
            Kado Digital
          </h2>
          <p
            data-aos="fade-up"
            className={`${roboto.className} text-xs md:text-sm text-center mx-auto text-white/80 max-w-screen-sm my-8`}
          >
            Tanpa mengurangi rasa hormat kami bagi tamu yang ingin mengirimkan
            hadiah kepada kedua mempelai dapat mengirimkannya melalui :
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="flex justify-center my-8"
        >
          <Button
            onClick={() =>
              props.actions.setIsGiftShown(!props.state.isGiftShown)
            }
            type="button"
            title="Klik Disini"
            icon={
              <BiChevronRightCircle
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
            className="flex justify-center relative z-20 px-8 pt-4"
          >
            <div
              className={`w-full max-w-sm aspect-[1.5/1] p-6 flex flex-col justify-between rounded-2xl bg-white`}
            >
              <div className="flex justify-between">
                <div className="relative w-14">
                  <Image
                    fill
                    alt="card-chip"
                    src="/images/card-chip.svg"
                    className="object-contain"
                  />
                </div>
                <h1
                  className={`text-xl md:text-2xl font-semibold text-aruna-dark ${roboto.className}`}
                >
                  {props.state.client?.gift_bank_name}
                </h1>
              </div>

              <h3
                className={`text-lg tracking-[2px] text-aruna-dark ${roboto.className}`}
              >
                {formatBankNumber(
                  props.state.client?.gift_account_number as number
                )}
              </h3>

              <div className="flex justify-between items-end gap-x-3">
                <p
                  className={`text-sm leading-5 text-aruna-dark/60 ${roboto.className}`}
                >
                  {props.state.client?.gift_account_name}
                </p>
                <ButtonDark
                  title="Salin"
                  icon={<BiCopy />}
                  type="button"
                  onClick={() =>
                    props.actions.handleCopyRekening(
                      props.state.client?.gift_account_number as string
                    )
                  }
                ></ButtonDark>
              </div>
            </div>
          </div>
        )}
      </section>
    );
};

export default GiftComponent;
