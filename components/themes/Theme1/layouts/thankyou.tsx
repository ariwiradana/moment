import React, { FC } from "react";
import { comforta } from "@/lib/fonts";
import Image from "next/image";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import Title from "../elements/title";

interface Props {
  state: useTheme1["state"];
}

const ThankyouComponent: FC<Props> = (props) => {
  return (
    <section
      className="px-6 py-8 bg-theme1-primary bg-opacity-5 relative"
      data-aos="fade-in"
    >
      <div className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-repeat bg-contain opacity-5"></div>
      <div className="flex justify-center mb-12 mt-8" data-aos="zoom-in-up">
        <Image
          alt="leaf-datetime"
          src="/images/theme1/leaf5-gold.svg"
          width={110}
          height={50}
        />
      </div>
      <div className="max-w-screen-lg mx-auto">
        <p
          data-aos="fade-up"
          className={`${comforta.className} text-base md:text-xl text-center mt-3 leading-5 text-admin-dark`}
        >
          Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <p
          data-aos="fade-up"
          className={`${comforta.className} text-base md:text-xl text-center mt-3 leading-5 text-admin-dark`}
        >
          Atas kehadiran dan doa restunya kami ucapkan terimakasih.
        </p>
        <div data-aos="fade-up">
          <Title
            className="text-2xl mt-8 mb-16"
            title="Om Shanti Shanti Shanti Om"
          />
        </div>
        <p
          data-aos="fade-up"
          className={`${comforta.className} text-base md:text-xl text-center leading-6 text-gray-500`}
        >
          Kami yang berbahagia
        </p>
        <p
          data-aos="fade-up"
          className={`${comforta.className} text-base md:text-xl text-center mt-3 leading-6 text-admin-dark font-bold mb-12`}
        >
          Kel. Bapak {props.state.groom?.parents_male} <br /> & <br /> Kel.
          Bapak {props.state.bride?.parents_male}
        </p>
      </div>
    </section>
  );
};

export default ThankyouComponent;
