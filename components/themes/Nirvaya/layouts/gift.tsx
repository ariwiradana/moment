import useGift from "@/hooks/themes/useGift";
import useClientStore from "@/store/useClientStore";
import { formatBankNumber } from "@/utils/formatBankNumber";
import { NextPage } from "next";
import { BiGift, BiSolidCopy } from "react-icons/bi";


const Gift: NextPage= () => {
  const { actions } = useGift(<BiGift />);
  const { client } = useClientStore();
  return (
    <section className="bg-nirvaya-light-brown">
      <div className="max-w-screen-lg mx-auto py-16 pl-8 md:px-8">
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row items-center gap-x-6"
        >
          <div className="flex justify-between items-center gap-x-6 md:gap-x-12 w-full">
            <h2 className="text-nirvaya-dark text-4xl md:text-5xl font-edensor whitespace-nowrap leading-8">
              Hadiah <span className="italic">Digital</span>
            </h2>
            <div className="h-[1px] bg-nirvaya-dark/10 w-full"></div>
          </div>
          <p className="text-nirvaya-dark/50 md:text-right tracking-[2px] md:text-xs text-[10px] pr-8 md:pr-0 mt-2 max-w-[400px]">
            Tanpa mengurangi rasa hormat kami bagi tamu yang ingin mengirimkan
            hadiah kepada kedua mempelai dapat mengirimkannya melalui
          </p>
        </div>
        <div data-aos="fade-up" className="mt-8 pr-8 md:pr-0">
          <div className="bg-nirvaya-primary p-4 md:p-8">
            <h2 className="text-white w-full text-2xl md:text-3xl font-edensor whitespace-nowrap leading-8">
              {client?.gift_bank_name}
            </h2>
            <div className="flex justify-between items-end mt-6">
              <div>
                <p className="text-white/60 tracking-[2px] font-medium text-[10px] lg:text-xs uppercase">
                  {client?.gift_account_name}
                </p>
                <p className="uppercase font-edensor text-xs lg:text-sm tracking-[3px] mt-1 text-white">
                  {formatBankNumber(client?.gift_account_number as number)}
                </p>
              </div>
              <button
                onClick={() =>
                  actions.handleCopyRekening(
                    client?.gift_account_number as string
                  )
                }
                className="p-2 md:p-3 rounded-full aspect-square bg-nirvaya-light-brown flex justify-center items-center text-nirvaya-primary text-xs md:text-sm"
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

export default Gift;
