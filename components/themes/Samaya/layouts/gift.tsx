import React, { memo } from "react";
import { afacad, raleway } from "@/lib/fonts";
import { BiGift, BiSolidCopy } from "react-icons/bi";
import Image from "next/image";
import useClientStore from "@/store/useClientStore";
import useGift from "@/hooks/themes/useGift";

const GiftComponent = () => {
  const { actions } = useGift(<BiGift />);
  const { client } = useClientStore();

  return (
    <section className="relative bg-white overflow-hidden z-20">
      <div className="relative h-full w-full px-6 md:px-12 lg:px-4 py-[60px] md:py-[100px] z-30">
        <div className={raleway.className}>
          <h2
            data-aos="fade-up"
            className={`text-samaya-dark text-center leading-8 text-xl md:text-2xl 2xl:text-3xl font-tan-pearl`}
          >
            Mohon Doa Restu
          </h2>
          <p
            data-aos="fade-up"
            className="text-samaya-dark/50 text-center tracking-[1px] text-[10px] lg:text-xs mt-4 max-w-lg mx-auto"
          >
            Konfirmasi kehadiran melalui RSVP, sampaikan doa dan ucapan terbaik
            untuk pengantin, dan hadirkan kado digital sebagai ungkapan kasih di
            hari bahagia mereka.
          </p>
        </div>

        <div
          data-aos="zoom-out-up"
          data-aos-delay="200"
          className="flex justify-center relative z-20 mt-12"
        >
          <div
            className={`max-w-96 w-full p-8 flex gap-16 flex-col justify-between relative bg-samaya-dark overflow-hidden ${afacad.className}`}
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
              <h1 className={`text-2xl font-semibold text-white`}>
                {client?.gift_bank_name}
              </h1>
            </div>
            <div className="relative flex justify-between items-end z-10">
              <div>
                <p
                  className={`text-xs md:text-sm leading-5 text-white ${raleway.className}`}
                >
                  {client?.gift_account_name}
                </p>
                <p
                  className={`text-sm md:text-base font-medium text-white ${raleway.className}`}
                >
                  {client?.gift_account_number}
                </p>
              </div>

              <button
                onClick={() =>
                  actions.handleCopyRekening(
                    client?.gift_account_number as string
                  )
                }
                className="p-2 rounded-full aspect-square bg-white flex justify-center items-center text-samaya-dark text-xs md:text-sm"
              >
                <BiSolidCopy />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(GiftComponent);
