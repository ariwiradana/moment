// import useGift from "@/hooks/themes/useGift";
import { rubik } from "@/lib/fonts";
import { NextPage } from "next";
// import { BiGift } from "react-icons/bi";

const Gift: NextPage = () => {  return (
    <section className="h-dvh snap-start w-full relative">
      <div className="absolute z-20 inset-0 bg-gradient-to-b from-luma-dark/80 to-luma-primary/95 flex flex-col justify-center items-center py-10">
        <h2
          className="font-butler leading-[40px] text-white text-[40px] md:text-5xl lg:text-7xl"
          aria-label="Judul galeri foto kami"
        >
          Hadiah <span className="font-italic">Digital</span>
        </h2>

        <div className="w-full px-6 pt-6 max-w-md mx-auto">
          <p
            className={`${rubik.className} text-[10px] md:text-xs lg:text-sm font-light lg:text-center text-justify text-white`}
          >
            <span className="inline-block w-5 h-[1px] bg-white/50 mr-2 mb-1 lg:hidden"></span>
            Setiap kisah cinta layak diabadikan, bukan hanya dalam ingatan, tapi
            juga dalam gambar yang tak pernah pudar.
          </p>
          <p
            className={`text-white/70 mt-4 text-[10px] md:text-xs lg:text-sm lg:text-center uppercase tracking-[3px] ${rubik.className}`}
          >
            Rayhan Malik
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gift;
