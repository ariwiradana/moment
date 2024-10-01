import React, { FC } from "react";
import { montserrat, playfair, satisfy } from "@/lib/fonts";
import moment from "moment";
import Title from "../elements/title";
import {  Client } from "@/lib/types";
import Image from "next/image";
import Button from "../elements/button";
import { BiSolidMap } from "react-icons/bi";
import Link from "next/link";

interface Props {
  client: Client;
}

const LocationTimeComponent: FC<Props> = (props) => {
  return (
    <section className="mt-12">
      <div className="relative w-full flex px-8 py-16">
        <div className="absolute inset-0 z-10 bg-opacity-40 bg-black"></div>
        <Image
          fill
          alt="datetime-image"
          src={props.client.images[0].url}
          className="object-cover"
        />
        <div className="bg-white px-6 py-14 relative z-20 w-full rounded-[48px] bg-opacity-10 backdrop-blur-lg flex flex-col justify-center items-center max-w-screen-sm mx-auto shadow-xl">
          <Image
            alt="leaf-datetime"
            src="/images/theme1/leaf5.svg"
            width={130}
            height={50}
            className="mb-8"
          />
          <Title className="text-white" title="Waktu & Tempat" />
          <h1
            className={`${satisfy.className} text-3xl mt-10 text-white font-italic`}
          >
            {moment(props.client.date).format("dddd")}
          </h1>
          <h1
            className={`${playfair.className} text-base md:text-xl text-white font-italic mt-1`}
          >
            {moment(props.client.date).format("DD MMMM YYYY")}
          </h1>
          <div className="h-[1px] w-2/3 bg-white my-4"></div>
          <h1
            className={`${playfair.className} text-base md:text-xl text-white font-italic`}
          >
            {props.client.time}
          </h1>
          <div className="h-[1px] w-2/3 bg-white my-4"></div>
          <h1
            className={`${montserrat.className} text-sm md:text-xl mt-6 font-italic text-white`}
          >
            Bertempat di
          </h1>
          <h1
            className={`${montserrat.className} text-base md:text-xl mt-1 text-center font-italic text-white`}
          >
            {props.client.location_full}
          </h1>
          <div className="flex justify-center mt-6">
            <Link href={props.client.location_link} target="_blank">
              <Button title="Map Lokasi Acara" icon={<BiSolidMap />} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationTimeComponent;
