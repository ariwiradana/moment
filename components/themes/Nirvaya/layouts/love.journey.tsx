import React, { FC } from "react";
import { useNirvaya } from "@/hooks/themes/useNirvaya";
import "yet-another-react-lightbox/styles.css";
import { balthazar, italiana } from "@/lib/fonts";
import Image from "next/image";
import moment from "moment";
import { LoveJourney } from "@/lib/types";

interface Props {
  state: useNirvaya["state"];
  actions: useNirvaya["actions"];
}

const LoveJourneyComponent: FC<Props> = (props) => {
  const journey: LoveJourney[] = props.state.client?.journey || [];
  if (journey.length > 0)
    return (
      <section className="relative bg-gradient-to-b from-nirvaya-dark/70 via-nirvaya-dark/90 to-nirvaya-dark/95 overflow-hidden px-8 py-[60px] md:py-[100px]">
        {props.state.client?.journey_image && (
          <div
            data-aos="zoom-out-up"
            className="relative w-full max-w-screen-md mx-auto aspect-[4/3] lg:aspect-video mb-16 rounded-3xl lg:rounded-[40px] overflow-hidden"
          >
            <Image
              src={props.state.client?.journey_image as string}
              fill
              alt="journey-img"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <h1
          data-aos="fade-up"
          className={`${italiana.className} text-4xl md:text-5xl text-center text-white`}
        >
          Perjalanan Cinta
        </h1>
        <p
          data-aos="fade-up"
          className={`${balthazar.className} text-sm md:text-base text-white/80 mt-1 mb-4 text-center max-w-screen-sm mx-auto`}
        >
          &rdquo;Setiap momen membawa kami lebih dekat ke hari istimewa. Inilah
          kisah cinta kami hingga memutuskan untuk bersama selamanya&rdquo;
        </p>

        <div
          className={`flex flex-col justify-center flex-wrap gap-8 mt-12 mx-auto items-center pb-16`}
        >
          {journey?.map((j) => (
            <div
              key={j.title}
              className="p-8 bg-white rounded w-full max-w-lg"
              data-aos="zoom-in-up"
            >
              <div className="flex items-center gap-x-2">
                <div className="w-6 h-[0.5px] bg-nirvaya-dark/70"></div>
                <p
                  className={`${balthazar.className} uppercase text-base md:text-lg text-nirvaya-dark/70`}
                >
                  {moment(j.date).format("DD / MMM / YYYY")}
                </p>
              </div>
              <h1
                className={`${balthazar.className} text-2xl md:text-3xl text-nirvaya-dark mb-1`}
              >
                {j.title}
              </h1>
              <p
                className={`${balthazar.className} text-sm md:text-base text-nirvaya-dark/70`}
              >
                {j.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
};

export default LoveJourneyComponent;
