import React, { FC } from "react";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Image from "next/image";
import "yet-another-react-lightbox/styles.css";
import { afacad, marcellus, windsong } from "@/lib/fonts";
import { BiSolidCopy } from "react-icons/bi";

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
      <section className="relative bg-samaya-dark">
        <div className="relative h-full w-full px-6 pt-12 pb-16 z-30">
          <div className="text-center" data-aos="fade-up">
            <h1
              className={`${marcellus.className} text-white text-4xl lg:text-5xl mr-8`}
            >
              Kado
            </h1>
            <h1
              className={`${windsong.className} text-samaya-primary text-5xl lg:text-6xl transform -translate-y-3`}
            >
              Digital
            </h1>
          </div>
          <div
            className="flex justify-center pt-12 relative z-20"
            data-aos="zoom-out-up"
          >
            <div
              className={`h-52 lg:h-56 md:w-96 w-full p-8 rounded-2xl flex flex-col justify-between shadow-lg relative border-[0.5px] border-samaya-primary ${afacad.className}`}
            >
              <Image
                sizes="100px"
                alt={`img-card`}
                src="/images/samaya/pattern-floral.svg"
                fill
                className="w-full h-full object-cover"
              />
              <div className="flex justify-end relative z-10">
                <h1
                  className={`text-3xl font-bold text-samaya-primary ${afacad.className}`}
                >
                  {props.state.client?.gift_bank_name}
                </h1>
              </div>
              <div className="relative z-10">
                <div>
                  <p
                    className={`text-xl leading-5 text-samaya-primary ${marcellus.className}`}
                  >
                    {props.state.client?.gift_account_name}
                  </p>
                  <p
                    className={`text-xl font-medium text-samaya-primary ${afacad.className}`}
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
                  className="bg-samaya-primary outline-none text-samaya-dark px-2 rounded-lg text-sm flex items-center gap-x-1 mt-3 relative z-10"
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
