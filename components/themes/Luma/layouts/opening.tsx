import { rubik } from "@/lib/fonts";
import useClientStore from "@/store/useClientStore";
import { NextPage } from "next";
import Image from "next/image";


const Opening: NextPage = () => {
  const { client } = useClientStore();
  return (
    <section className="h-dvh snap-start w-full bg-luma-dark relative">
      <div className="absolute inset-0 z-10 bg-luma-dark/70 flex flex-col justify-center items-center py-[60px] px-8">
        <h2 className="font-bigilla leading-[40px] text-white text-2xl mb-2">
          {client?.opening_title}
        </h2>
        <p
          className={`${rubik.className} text-[10px] md:text-xs font-light text-white text-center`}
        >
          {client?.opening_description}
        </p>
      </div>
      <Image
        key={`Opening Image`}
        sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
        fill
        quality={100}
        alt={`Opening Image`}
        priority
        className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark"
        src={client?.cover as string}
      />
    </section>
  );
};

export default Opening;
