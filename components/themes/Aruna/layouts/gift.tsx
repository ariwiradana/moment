import React, { memo, useState, useMemo } from "react";
import { roboto } from "@/lib/fonts";
import { BiCheck, BiChevronRightCircle, BiCopy } from "react-icons/bi";
import Image from "next/image";
import Button from "../elements/button";
import ButtonDark from "../elements/button.dark";
import { formatBankNumber } from "@/utils/formatBankNumber";
import useGift from "@/hooks/themes/useGift";
import useClientStore from "@/store/useClientStore";

const GiftComponent = () => {
  const { actions } = useGift(
    <div className="p-1 text-sm bg-aruna-dark text-white">
      <BiCheck />
    </div>
  );
  const { client } = useClientStore();

  const [isGiftShown, setIsGiftShown] = useState(false);

  // Memoize icon untuk button agar tidak recreate tiap render
  const toggleIcon = useMemo(
    () => (
      <BiChevronRightCircle
        className={`transition-transform duration-500 delay-100 ease-in-out ${
          isGiftShown ? "rotate-90" : "rotate-0"
        }`}
      />
    ),
    [isGiftShown]
  );

  if (client?.status !== "paid") return;

  return (
    <section
      style={{ marginTop: 0 }}
      className="relative bg-aruna-dark overflow-hidden py-[60px] md:py-[100px]"
    >
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
          onClick={() => setIsGiftShown((prev) => !prev)}
          type="button"
          title="Klik Disini"
          icon={toggleIcon}
        />
      </div>

      {isGiftShown && (
        <div
          data-aos="zoom-out-up"
          data-aos-delay="200"
          className="flex justify-center relative z-20 px-8 pt-4"
        >
          <div className="w-full max-w-sm aspect-[1.5/1] p-6 flex flex-col justify-between rounded-2xl bg-white">
            <div className="flex justify-between">
              <div className="relative w-14 -ml-3">
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
                {client?.gift_bank_name}
              </h1>
            </div>

            <h3
              className={`text-lg tracking-[2px] text-aruna-dark ${roboto.className}`}
            >
              {formatBankNumber(client?.gift_account_number as number)}
            </h3>

            <div className="flex justify-between items-end gap-x-3">
              <p
                className={`text-sm leading-5 text-aruna-dark/60 ${roboto.className}`}
              >
                {client?.gift_account_name}
              </p>
              <ButtonDark
                title="Salin"
                icon={<BiCopy />}
                type="button"
                onClick={() =>
                  actions.handleCopyRekening(
                    client?.gift_account_number as string
                  )
                }
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(GiftComponent);
