import React, { FC } from "react";
import { playfair } from "@/lib/fonts";
import Image from "next/image";
import { UseEarthlyEleganceTheme } from "@/hooks/themes/useEarthlyEleganceTheme";
import Title from "../elements/title";

interface Props {
  state: UseEarthlyEleganceTheme["state"];
}

const ThankyouComponent: FC<Props> = (props) => {
  return (
    <section
      className="px-6 py-8 bg-theme1-primary bg-opacity-5 relative"
      data-aos="fade-in"
    >
      <div className="flex justify-center mb-16 mt-8" data-aos="zoom-in-up">
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
          className={`${playfair.className} text-xl md:text-2xl text-center mt-3 leading-7 font-italic text-admin-dark`}
        >
          Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak /
          Ibu / Saudara / i berkenan hadir dan memberikan doa restu.
        </p>
        <p
          data-aos="fade-up"
          className={`${playfair.className} text-xl md:text-2xl text-center mt-3 leading-7 font-italic text-admin-dark`}
        >
          Atas kehadiran dan doa restunya kami ucapkan terimakasih.
        </p>
        <div data-aos="fade-up">
          <Title className="text-2xl mt-8 mb-16" title="Om Shanti Shanti Shanti Om" />
        </div>
        <p
          data-aos="fade-up"
          className={`${playfair.className} text-xl md:text-2xl text-center leading-7 font-italic text-admin-dark`}
        >
          Kami yang berbahagia
        </p>
        <p
          data-aos="fade-up"
          className={`${playfair.className} text-xl md:text-2xl text-center mt-4 leading-7 text-admin-dark font-bold mb-8`}
        >
          Kel. Bapak {props.state.groom?.parents_male} <br /> & <br /> Kel.
          Bapak {props.state.bride?.parents_male}
        </p>
      </div>
    </section>
  );
};

export default ThankyouComponent;
