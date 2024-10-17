import React, { FC } from "react";
import { afacad } from "@/lib/fonts";
import Image from "next/image";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Title from "../elements/title";

interface Props {
  state: useSamaya["state"];
}

const ThankyouComponent: FC<Props> = (props) => {
  if (
    props.state.client?.closing_title &&
    props.state.client.closing_description
  )
    return (
      <section className="px-6 py-8 relative">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div
          data-aos="zoom-in-up"
          className="relative h-12 lg:h-16 w-full mb-12 mt-8"
        >
          <Image
            alt="leaf-datetime"
            src="/images/theme1/leaf-white.svg"
            fill
            className="object-contain"
          />
        </div>
        <div className="max-w-screen-sm mx-auto">
          <p
            data-aos="fade-up"
            className={`${afacad.className} text-base md:text-xl text-center mt-8 leading-5 text-white`}
          >
            {props.state.client?.closing_description}
          </p>
          <div data-aos="fade-up">
            <Title
              className="text-2xl mt-8 text-white"
              title={props.state.client?.closing_title as string}
            />
          </div>
          <div className="flex justify-center my-4" data-aos="fade-up">
            <div className="w-[0.5px] h-8 bg-white"></div>
          </div>
          <p
            data-aos="fade-up"
            className={`${afacad.className} text-base md:text-lg mt-6 text-white text-center`}
          >
            Kami yang berbahagia
          </p>
          <p
            data-aos="fade-up"
            className={`${afacad.className} text-lg text-center mt-3 leading-6 text-white font-medium mb-8`}
          >
            Kel. Bapak {props.state.groom?.parents_male} <br /> & <br /> Kel.
            Bapak {props.state.bride?.parents_male}
          </p>
        </div>
      </section>
    );
};

export default ThankyouComponent;
