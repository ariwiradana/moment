import React, { FC } from "react";
import { useNirvaya } from "@/hooks/themes/useNirvaya";
import "yet-another-react-lightbox/styles.css";
import { afacad, balthazar, italiana } from "@/lib/fonts";
import { BiChevronRightCircle, BiCopy } from "react-icons/bi";
import Image from "next/image";
import Button from "../elements/button";

interface Props {
  state: useNirvaya["state"];
  actions: useNirvaya["actions"];
}

const GiftComponent: FC<Props> = (props) => {
  if (
    props.state.client?.gift_bank_name &&
    props.state.client?.gift_account_name &&
    props.state.client?.gift_account_number
  )
    return (
      <section className="relative bg-nirvaya-dark-dark overflow-hidden px-8 py-[60px] md:py-[100px] bg-nirvaya-dark">
        <h1
          data-aos="fade-up"
          className={`${italiana.className} text-4xl md:text-5xl text-center text-white`}
        >
          Kado Digital
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className={`${balthazar.className} text-sm md:text-base text-white/80 mt-1 mb-4 text-center max-w-screen-sm mx-auto`}
        >
          Tanpa mengurangi rasa hormat kami bagi tamu yang ingin mengirimkan
          hadiah kepada kedua mempelai dapat mengirimkannya melalui :
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="flex justify-center"
        >
          <Button
            onClick={() =>
              props.actions.setIsGiftShown(!props.state.isGiftShown)
            }
            type="button"
            title="Klik Disini"
            white
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
            className="flex justify-center relative z-20 mt-12"
          >
            <div
              className={`max-w-96 w-full aspect-[1.5/1] p-8 rounded-2xl flex flex-col justify-between shadow-lg relative bg-gradient-to-tr from-white/50 via-white via-[20%] to-[90%] to-white/70 overflow-hidden ${afacad.className}`}
            >
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
                  className={`text-3xl md:text-4xl font-bold text-nirvaya-dark ${balthazar.className}`}
                >
                  {props.state.client?.gift_bank_name}
                </h1>
              </div>
              <div className="relative z-10">
                <div>
                  <p
                    className={`text-xl leading-5 text-nirvaya-dark ${balthazar.className}`}
                  >
                    {props.state.client?.gift_account_name}
                  </p>
                  <p
                    className={`text-xl text-nirvaya-dark ${balthazar.className}`}
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
                  className="bg-nirvaya-dark outline-none text-nirvaya-primary px-2 rounded text-sm md:text-base flex items-center gap-x-1 mt-3 relative z-10 text-white"
                >
                  <span>Salin No Rekening</span>
                  <BiCopy className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
};

export default GiftComponent;
