import React, { FC } from "react";
import {
  montserrat,
} from "@/lib/fonts";
import moment from "moment";
import Title from "../elements/title";
import { Brides, Informations } from "@/lib/types";
import { UseTheme1 } from "@/hooks/useTheme1";
import Image from "next/image";
import Button from "../elements/button";
import { BiSolidMap } from "react-icons/bi";
import Link from "next/link";

interface Props {
  brides: Brides;
  state: UseTheme1["state"];
  actions: UseTheme1["actions"];
  informations: Informations;
}

const LocationTimeComponent: FC<Props> = (props) => {
  if (props.state.blobs.length === 0) return <></>;
  return (
    <section className="mt-12">
      <div className="relative w-full flex px-8 py-24">
        <div className="absolute inset-0 bg-theme1-primary z-10 bg-opacity-40"></div>
        <Image
          fill
          alt="datetime-image"
          src={props.state.blobs[1].url}
          className="object-cover grayscale"
        />
        <div className="bg-white px-6 py-14 relative z-20 w-full rounded-[48px] bg-opacity-30 backdrop-blur-md flex flex-col justify-center items-center max-w-screen-sm mx-auto">
          <Title className="text-white" title="Waktu & Tempat" />
          <h1
            className={`${montserrat.className} text-base md:text-xl mt-6 font-medium font-italic`}
          >
            {moment(props.informations.date).format("ddd, DD MMM YYYY")}
          </h1>
          <h1
            className={`${montserrat.className} text-base md:text-xl mt-1 font-medium font-italic`}
          >
            {props.informations.time}
          </h1>
          <h1
            className={`${montserrat.className} text-sm md:text-xl mt-6 font-italic`}
          >
            Bertempat di
          </h1>
          <h1
            className={`${montserrat.className} text-base md:text-xl mt-1 text-center font-medium font-italic`}
          >
            {props.informations.locationFull}
          </h1>
          <div className="flex justify-center mt-6">
            <Link href={props.informations.locationLink} target="_blank">
              <Button title="Map Lokasi Acara" icon={<BiSolidMap />} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationTimeComponent;
