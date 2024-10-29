import React, { FC } from "react";
import { useSamaya } from "@/hooks/themes/useSamaya";
import "yet-another-react-lightbox/styles.css";
import { afacad, marcellus, windsong } from "@/lib/fonts";
import { BiSolidCopy } from "react-icons/bi";
import Image from "next/image";

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
      <section className="relative bg-samaya-dark overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-repeat bg-center bg-blend-lighten"
          style={{
            backgroundImage: "url('/images/samaya/texture.jpg')",
          }}
        ></div>
        <Image
          className="absolute -top-[250px] left-1/2 transform -translate-x-1/2 z-30 opacity-5"
          alt="mandala-top-gift"
          src="/images/samaya/mandala.svg"
          height={500}
          width={500}
        />
        <div className="">
          <div className="relative h-full w-full px-4 py-16 lg:py-24 z-30">
            <h1
              data-aos="fade-up"
              className={`${windsong.className} text-samaya-primary text-4xl lg:text-6xl transform -translate-y-3 text-center`}
            >
              Kado Digital
            </h1>
            <p
              data-aos="fade-up"
              className={`${marcellus.className} text-sm md:text-lg leading-5 text-white mt-8 mb-12 max-w-screen-md mx-auto text-center`}
            >
              Hadir dan memberi restu adalah hadiah yang sangat berharga bagi
              kami. Namun, bila berkeinginan untuk berbagi dalam bentuk lain,
              kado digital dapat diberikan melalui transfer.
            </p>
            <div className="flex justify-center relative z-20">
              <div
                data-aos="zoom-out-up"
                className={`max-w-96 w-full aspect-[1.5/1] p-8 rounded-2xl flex flex-col justify-between shadow-lg relative bg-gradient-to-tr from-samaya-primary/40 to-samaya-primary overflow-hidden ${afacad.className}`}
              >
                <div className="w-44 h-44 rounded-full border border-white/30 absolute -right-20 -top-20"></div>
                <div className="w-64 h-64 rounded-full border border-white/30 absolute -left-20 -bottom-20"></div>
                <div className="w-64 h-64 rounded-full border border-white/30 absolute -left-10 -bottom-40"></div>
                <div className="flex justify-end relative z-10">
                  <h1
                    className={`text-3xl font-bold text-samaya-dark ${afacad.className}`}
                  >
                    {props.state.client?.gift_bank_name}
                  </h1>
                </div>
                <div className="relative z-10">
                  <div>
                    <p
                      className={`text-xl leading-5 text-samaya-dark ${marcellus.className}`}
                    >
                      {props.state.client?.gift_account_name}
                    </p>
                    <p
                      className={`text-xl font-medium text-samaya-dark ${afacad.className}`}
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
                    className="bg-samaya-dark outline-none text-samaya-primary px-2 rounded-lg text-sm flex items-center gap-x-1 mt-3 relative z-10"
                  >
                    <span>Salin No Rekening</span>
                    <BiSolidCopy className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default GiftComponent;
