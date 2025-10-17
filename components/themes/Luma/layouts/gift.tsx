// import useGift from "@/hooks/themes/useGift";
import { rubik } from "@/lib/fonts";
import useClientStore from "@/store/useClientStore";
import { NextPage } from "next";
// import { BiGift } from "react-icons/bi";

const Gift: NextPage = () => {
  // const { actions } = useGift(<BiGift />);
  const { client } = useClientStore();
  return (
    <section className="h-dvh snap-start w-full relative">
      <div className="absolute z-20 inset-0 bg-gradient-to-b from-luma-dark/50 via-luma-dark/30 to-luma-dark/60 flex flex-col justify-end items-center py-[60px] px-6">
        <h2 className="font-bigilla leading-[40px] text-white text-4xl mb-2">
          {client?.opening_title}
        </h2>
        <p
          className={`${rubik.className} text-[10px] md:text-xs font-light text-white text-center`}
        >
          {client?.opening_description}
        </p>
        <p
          className={`text-white/70 mt-6 text-[8px] md:text-[10px] uppercase text-center tracking-[3px] ${rubik.className}`}
        >
          Kado Digital
        </p>
      </div>
    </section>
  );
};

export default Gift;
