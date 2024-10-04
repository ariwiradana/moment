import React, { FC } from "react";
import { comforta } from "@/lib/fonts";
import moment from "moment";
import Title from "../elements/title";
import Image from "next/image";
import Button from "../elements/button";
import { BiSolidMap } from "react-icons/bi";
import Link from "next/link";
import { UseEarthlyEleganceTheme } from "@/hooks/themes/useEarthlyEleganceTheme";

interface Props {
  state: UseEarthlyEleganceTheme["state"];
}

const LocationTimeComponent: FC<Props> = (props) => {
  return (
    <section>
      <div className="relative pt-8 pb-16 w-full flex flex-col justify-center items-center max-w-screen-sm mx-auto">
        <div data-aos="zoom-in-up">
          <Image
            alt="leaf-datetime"
            src="/images/theme1/leaf5-gold.svg"
            width={110}
            height={50}
            className="mb-16"
          />
        </div>
        <div data-aos="fade-up">
          <Title className="text-theme1-gold" title="Waktu & Tempat" />
        </div>
        <div
          data-aos="fade-up"
          className="text-center w-full flex flex-col items-center"
        >
          <h1
            className={`${comforta.className} text-2xl mt-10 font-bold text-admin-dark`}
          >
            {moment(props.state.client?.date).format("dddd")}
          </h1>
          <h1
            className={`${comforta.className} text-base md:text-xl font-bold text-admin-dark mt-2`}
          >
            {moment(props.state.client?.date).format("DD MMMM YYYY")}
          </h1>
          <div className="h-[0.4px] w-2/3 bg-admin-dark my-2"></div>
          <h1
            className={`${comforta.className} text-base md:text-xl font-bold text-admin-dark`}
          >
            {props.state.client?.start_time} - {props.state.client?.end_time}
          </h1>
          <div className="h-[0.4px] w-2/3 bg-admin-dark my-2"></div>
        </div>
        <div data-aos="fade-up" className="text-center">
          <h1 className={`${comforta.className} text-base mt-6 text-gray-500`}>
            Bertempat di
          </h1>
          <h1
            className={`${comforta.className} font-bold text-base md:text-xl mt-1 text-center text-admin-dark leading-5`}
          >
            {props.state.client?.address_full}
          </h1>
        </div>
        <div data-aos="fade-up" className="flex justify-center mt-6">
          <Link href={props.state.client?.address_url ?? ""} target="_blank">
            <Button title="Map Lokasi Acara" icon={<BiSolidMap />} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationTimeComponent;
