import React, { FC } from "react";
import { afacad } from "@/lib/fonts";
import Image from "next/image";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import Title from "../elements/title";

interface Props {
  state: useTheme1["state"];
}

const ThankyouComponent: FC<Props> = (props) => {
  return (
    <section className="px-6 py-8 relative bg-white">
      <div
        data-aos="zoom-in-up"
        className="relative h-12 lg:h-16 w-full mb-12 mt-8"
      >
        <Image
          alt="leaf-datetime"
          src="/images/theme1/leaf.svg"
          fill
          className="object-contain"
        />
      </div>
      <div className="max-w-screen-md mx-auto">
        <p
          data-aos="fade-up"
          className={`${afacad.className} text-base md:text-xl text-center mt-8 leading-5 text-theme1-primary`}
        >
          Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <p
          data-aos="fade-up"
          className={`${afacad.className} text-base md:text-xl text-center mt-8 leading-5 text-theme1-primary`}
        >
          Atas kehadiran dan doa restunya kami ucapkan terimakasih.
        </p>
        <div data-aos="fade-up">
          <Title
            className="text-2xl mt-8"
            title="Om Shanti Shanti Shanti Om"
          />
        </div>
        <div className="flex justify-center my-4" data-aos="fade-up">
          <div className="w-[0.5px] h-8 bg-theme1-gold"></div>
        </div>
        <p
          data-aos="fade-up"
          className={`${afacad.className} text-base md:text-lg mt-6 text-theme1-gold text-center`}
        >
          Kami yang berbahagia
        </p>
        <p
          data-aos="fade-up"
          className={`${afacad.className} text-lg text-center mt-3 leading-6 text-theme1-primary font-medium mb-8`}
        >
          Kel. Bapak {props.state.groom?.parents_male} <br /> & <br /> Kel.
          Bapak {props.state.bride?.parents_male}
        </p>
      </div>
    </section>
  );
};

export default ThankyouComponent;
