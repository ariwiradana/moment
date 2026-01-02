import { rubik } from "@/lib/fonts";
import useClientStore from "@/store/useClientStore";
import { formatBankNumber } from "@/utils/formatBankNumber";
import { NextPage } from "next";
import Image from "next/image";
import { BiCopy, BiGift } from "react-icons/bi";
import useGift from "@/hooks/themes/useGift";
import ButtonPrimary from "../elements/button.primary";

const Gift: NextPage = () => {
  const { client } = useClientStore();
  const { actions } = useGift(<BiGift />);
  return (
    <section className="h-dvh snap-start w-full relative">
      <div className="absolute z-20 inset-0 bg-gradient-to-b from-luma-dark/80 to-luma-primary/95 flex flex-col justify-center items-center py-10">
        <h2
          className="font-butler leading-[40px] text-white text-[40px] md:text-5xl lg:text-7xl"
          aria-label="Judul galeri foto kami"
        >
          Hadiah <span className="font-italic">Digital</span>
        </h2>
        <div className="flex justify-center relative z-20 mt-6 lg:mt-8">
          <div className="w-full min-w-72 aspect-[1.5/1] p-6 flex flex-col justify-between backdrop-blur-xl border border-white/5">
            <div className="flex justify-between gap-x-8 mb-6">
              <div className="relative w-14 -ml-3">
                <Image
                  fill
                  alt="card-chip"
                  src="/images/card-chip.svg"
                  className="object-contain"
                />
              </div>
              <h1
                className={`text-xl md:text-2xl font-mdedium text-white ${rubik.className}`}
              >
                {client?.status === "active"
                  ? client?.gift_bank_name
                  : "Bank Jago"}
              </h1>
            </div>

            <h3
              className={`text-lg tracking-[2px] text-white ${rubik.className}`}
            >
              {client?.status === "active"
                ? formatBankNumber(client?.gift_account_number as number)
                : formatBankNumber(123456789)}
            </h3>

            <div className="flex mt-4">
              <ButtonPrimary
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

        <div className="w-full max-w-md mx-auto mt-6 lg:mt-8 px-6 text-center">
          <p
            className={`text-white/70 mt-4 text-[10px] md:text-xs lg:text-sm lg:text-center tracking-[3px] mb-3 ${rubik.className}`}
          >
            <span className="lowercase font-light">a/n</span>{" "}
            <span className="uppercase">{client?.gift_account_name}</span>
          </p>
          <p
            className={`${rubik.className} text-[10px] md:text-xs lg:text-sm font-light text-center text-white`}
          >
            Kehadiranmu sudah menjadi hadiah, tapi jika ingin memberi sedikit
            kejutan, hadiah digital ini akan membuat momen kami lebih istimewa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gift;
