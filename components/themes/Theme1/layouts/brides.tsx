import React, { FC } from "react";
import { afacad } from "@/lib/fonts";
import ImageShimmer from "../../../image.shimmer";
import Title from "../elements/title";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import { Participant } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";

interface Props {
  state: useTheme1["state"];
}

const BridesComponent: FC<Props> = (props) => {
  return (
    <section className="relative">
      <div className="bg-white relative z-10 h-full">
        <div className="transform relative -translate-y-6 md:-translate-y-6 lg:-translate-y-24">
          <svg
            id="wave"
            viewBox="0 0 1440 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffff"
              d="M0,0L80,8.3C160,17,320,33,480,36.7C640,40,800,30,960,30C1120,30,1280,40,1440,40C1600,40,1760,30,1920,28.3C2080,27,2240,33,2400,41.7C2560,50,2720,60,2880,55C3040,50,3200,30,3360,25C3520,20,3680,30,3840,28.3C4000,27,4160,13,4320,11.7C4480,10,4640,20,4800,30C4960,40,5120,50,5280,56.7C5440,63,5600,67,5760,60C5920,53,6080,37,6240,38.3C6400,40,6560,60,6720,68.3C6880,77,7040,73,7200,68.3C7360,63,7520,57,7680,51.7C7840,47,8000,43,8160,48.3C8320,53,8480,67,8640,61.7C8800,57,8960,33,9120,23.3C9280,13,9440,17,9600,16.7C9760,17,9920,13,10080,11.7C10240,10,10400,10,10560,10C10720,10,10880,10,11040,13.3C11200,17,11360,23,11440,26.7L11520,30L11520,100L11440,100C11360,100,11200,100,11040,100C10880,100,10720,100,10560,100C10400,100,10240,100,10080,100C9920,100,9760,100,9600,100C9440,100,9280,100,9120,100C8960,100,8800,100,8640,100C8480,100,8320,100,8160,100C8000,100,7840,100,7680,100C7520,100,7360,100,7200,100C7040,100,6880,100,6720,100C6560,100,6400,100,6240,100C6080,100,5920,100,5760,100C5600,100,5440,100,5280,100C5120,100,4960,100,4800,100C4640,100,4480,100,4320,100C4160,100,4000,100,3840,100C3680,100,3520,100,3360,100C3200,100,3040,100,2880,100C2720,100,2560,100,2400,100C2240,100,2080,100,1920,100C1760,100,1600,100,1440,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            ></path>
          </svg>

          <svg
            className="absolute -top-3 md:-top-[2px] lg:top-8"
            id="wave"
            viewBox="0 0 1440 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffff"
              fillOpacity={0.8}
              d="M0,60L48,50C96,40,192,20,288,13.3C384,7,480,13,576,13.3C672,13,768,7,864,16.7C960,27,1056,53,1152,61.7C1248,70,1344,60,1440,50C1536,40,1632,30,1728,26.7C1824,23,1920,27,2016,36.7C2112,47,2208,63,2304,71.7C2400,80,2496,80,2592,75C2688,70,2784,60,2880,55C2976,50,3072,50,3168,50C3264,50,3360,50,3456,53.3C3552,57,3648,63,3744,58.3C3840,53,3936,37,4032,33.3C4128,30,4224,40,4320,48.3C4416,57,4512,63,4608,68.3C4704,73,4800,77,4896,70C4992,63,5088,47,5184,48.3C5280,50,5376,70,5472,71.7C5568,73,5664,57,5760,43.3C5856,30,5952,20,6048,16.7C6144,13,6240,17,6336,16.7C6432,17,6528,13,6624,21.7C6720,30,6816,50,6864,60L6912,70L6912,100L6864,100C6816,100,6720,100,6624,100C6528,100,6432,100,6336,100C6240,100,6144,100,6048,100C5952,100,5856,100,5760,100C5664,100,5568,100,5472,100C5376,100,5280,100,5184,100C5088,100,4992,100,4896,100C4800,100,4704,100,4608,100C4512,100,4416,100,4320,100C4224,100,4128,100,4032,100C3936,100,3840,100,3744,100C3648,100,3552,100,3456,100C3360,100,3264,100,3168,100C3072,100,2976,100,2880,100C2784,100,2688,100,2592,100C2496,100,2400,100,2304,100C2208,100,2112,100,2016,100C1920,100,1824,100,1728,100C1632,100,1536,100,1440,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
            ></path>
          </svg>

          <svg
            className="absolute -top-4 md:-top-[6px] lg:-top-2"
            id="wave"
            viewBox="0 0 1440 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillOpacity={0.7}
              fill="#ffff"
              d="M0,80L48,68.3C96,57,192,33,288,28.3C384,23,480,37,576,50C672,63,768,77,864,71.7C960,67,1056,43,1152,35C1248,27,1344,33,1440,30C1536,27,1632,13,1728,13.3C1824,13,1920,27,2016,26.7C2112,27,2208,13,2304,18.3C2400,23,2496,47,2592,56.7C2688,67,2784,63,2880,53.3C2976,43,3072,27,3168,21.7C3264,17,3360,23,3456,35C3552,47,3648,63,3744,71.7C3840,80,3936,80,4032,70C4128,60,4224,40,4320,28.3C4416,17,4512,13,4608,20C4704,27,4800,43,4896,45C4992,47,5088,33,5184,23.3C5280,13,5376,7,5472,13.3C5568,20,5664,40,5760,53.3C5856,67,5952,73,6048,75C6144,77,6240,73,6336,73.3C6432,73,6528,77,6624,71.7C6720,67,6816,53,6864,46.7L6912,40L6912,100L6864,100C6816,100,6720,100,6624,100C6528,100,6432,100,6336,100C6240,100,6144,100,6048,100C5952,100,5856,100,5760,100C5664,100,5568,100,5472,100C5376,100,5280,100,5184,100C5088,100,4992,100,4896,100C4800,100,4704,100,4608,100C4512,100,4416,100,4320,100C4224,100,4128,100,4032,100C3936,100,3840,100,3744,100C3648,100,3552,100,3456,100C3360,100,3264,100,3168,100C3072,100,2976,100,2880,100C2784,100,2688,100,2592,100C2496,100,2400,100,2304,100C2208,100,2112,100,2016,100C1920,100,1824,100,1728,100C1632,100,1536,100,1440,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
            ></path>
          </svg>
        </div>

        <div className="w-full h-full py-8 px-4 md:px-12 relative z-40 max-w-screen-md mx-auto">
          <div>
            <div data-aos="fade-up">
              <Title title="Om Swastiastu" />
            </div>

            <p
              data-aos="fade-up"
              className={`${afacad.className} text-base md:text-xl text-center mt-8 leading-5 text-theme1-primary`}
            >
              Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan
              Yang Maha Esa kami bermaksud mengundang Bapak/Ibu/Saudara/i pada
              Upacara Manusa Yadnya Pawiwahan (Pernikahan) Putra dan Putri kami.
            </p>
            <div
              data-aos="zoom-in-up"
              className="relative h-12 lg:h-16 w-full my-12"
            >
              <Image
                alt="leaf-datetime"
                src="/images/theme1/leaf.svg"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 w-full" data-aos="fade-up">
            <ParticipantComponent
              mode="odd"
              data={props.state?.groom as Participant}
            />
            <ParticipantComponent
              mode="even"
              data={props.state?.bride as Participant}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface ComponentProps {
  data: Participant;
  mode: "odd" | "even";
}
const ParticipantComponent: FC<ComponentProps> = (props) => {
  return (
    <div
      className={`${afacad.className} flex flex-col md:flex-row ${
        props.mode === "even" && "md:flex-row-reverse"
      }`}
    >
      <div className="relative h-[400px] w-full md:w-1/2 flex-grow">
        <ImageShimmer
          priority
          src={props.data.image as string}
          alt={props.data.name}
          fill
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative h-full w-full md:w-1/2 bg-theme1-primary bg-opacity-5 flex flex-col items-center justify-center text-center px-6 py-12 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-700 relative">
          {props.data.name}
        </h1>
        <p className="text-gray-500 mt-4">
          {props.data.gender === "female" ? "Putri" : "Putra"}{" "}
          {props.data.child} dari pasangan
        </p>
        <h2 className="font-medium text-theme1-primary mt-1 leading-5">
          Bapak {props.data.parents_male} & Ibu {props.data.parents_female}
        </h2>
        <p className="text-gray-500 mt-8 leading-5">{props.data.address}</p>
        <div className="flex mt-4 gap-x-2">
          <Link href="/">
            <div className="w-9 h-9 bg-theme1-primary flex justify-center items-center text-white text-xl relative">
               <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
              <BiLogoInstagram />
            </div>
          </Link>
          <Link href="/">
            <div className="w-9 h-9 bg-theme1-primary flex justify-center items-center text-white text-xl relative">
               <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
              <BiLogoTwitter />
            </div>
          </Link>
          <Link href="/">
            <div className="w-9 h-9 bg-theme1-primary flex justify-center items-center text-white text-xl relative">
               <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
              <BiLogoFacebook />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BridesComponent;
