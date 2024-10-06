import React, { FC } from "react";
import { afacad} from "@/lib/fonts";
import moment from "moment";
import Title from "../elements/title";
import Image from "next/image";
import Button from "../elements/button";
import { BiSolidMap } from "react-icons/bi";
import Link from "next/link";
import { useTheme1 } from "@/hooks/themes/useTheme1";

interface Props {
  state: useTheme1["state"];
}

const LocationTimeComponent: FC<Props> = (props) => {
  return (
    <section className="relative">
      <div className="relative px-6 pt-8 pb-16 w-full flex flex-col justify-center items-center max-w-screen-sm mx-auto">
        <div
          data-aos="zoom-in-up"
          className="relative h-12 lg:h-16 w-full mb-8"
        >
          <Image
            alt="leaf-datetime"
            src="/images/theme1/leaf.svg"
            fill
            className="object-contain"
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
            className={`${afacad.className} text-4xl lg:text-5xl text-theme1-primary md:text-3xl mt-10`}
          >
            {moment(props.state.client?.date).format("dddd")}
          </h1>
          <h1
            className={`${afacad.className} text-base md:text-xl text-theme1-primary mt-2`}
          >
            {moment(props.state.client?.date).format("DD MMMM YYYY")}
          </h1>
          <div className="h-[0.4px] w-2/3 bg-admin-dark my-2"></div>
          <h1
            className={`${afacad.className} text-base md:text-xl text-theme1-primary`}
          >
            {props.state.client?.start_time} - {props.state.client?.end_time}
          </h1>
          <div className="h-[0.4px] w-2/3 bg-admin-dark my-2"></div>
        </div>
        <div data-aos="fade-up" className="text-center">
          <h1
            className={`${afacad.className} text-base md:text-lg mt-6 text-gray-500`}
          >
            Bertempat di
          </h1>
          <h1
            className={`${afacad.className} text-base md:text-xl mt-1 text-center text-theme1-primary leading-5`}
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
