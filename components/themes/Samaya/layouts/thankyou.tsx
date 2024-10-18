import React, { FC } from "react";
import { marcellus } from "@/lib/fonts";
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
      <section className="px-4 py-8 relative">
        <div className="absolute inset-0 bg-samaya-dark bg-opacity-80 backdrop-blur-md"></div>
        <div className="flex justify-center">
          <div
            className="h-12 lg:h-16 aspect-video relative m-4"
            data-aos="zoom-in-up"
          >
            <Image
              fill
              alt="floral-top-corner"
              src="/images/samaya/leaf-primary.svg"
              className="object-contain"
            />
          </div>
        </div>
        <div className="max-w-screen-sm mx-auto">
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className={`${marcellus.className} text-base md:text-lg text-center leading-5 text-white mb-12 max-w-screen-md mx-auto`}
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
            className={`${marcellus.className} text-base md:text-lg mt-6 text-white text-center`}
          >
            Kami yang berbahagia
          </p>
          <p
            data-aos="fade-up"
            className={`${marcellus.className} text-lg md:text-xl text-center mt-3 leading-7 text-white font-medium mb-8`}
          >
            Kel. Bapak {props.state.groom?.parents_male} <br /> & <br /> Kel.
            Bapak {props.state.bride?.parents_male}
          </p>
        </div>
      </section>
    );
};

export default ThankyouComponent;
