import React, { FC } from "react";
import { afacad } from "@/lib/fonts";
import ImageShimmer from "../../../image.shimmer";
import Title from "../elements/title";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import { Participant } from "@/lib/types";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";

interface Props {
  state: useTheme1["state"];
}

const BridesComponent: FC<Props> = (props) => {
  return (
    <section className="relative bg-white z-10 pt-16 pb-4 md:py-16">
      <div className="w-full h-full px-4 md:px-12 relative z-40 max-w-screen-md mx-auto">
        <div>
          <div data-aos="fade-up">
            <Title title="Om Swastiastu" />
          </div>
          <div className="flex justify-center my-4" data-aos="fade-up">
            <div className="w-[0.5px] h-8 bg-theme1-gold"></div>
          </div>

          <p
            data-aos="fade-up"
            className={`${afacad.className} text-base md:text-xl text-center leading-5 text-theme1-primary mb-12`}
          >
            Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang
            Maha Esa kami bermaksud mengundang Bapak/Ibu/Saudara/i pada Upacara
            Manusa Yadnya Pawiwahan (Pernikahan) Putra dan Putri kami.
          </p>
        </div>

        <div className="grid grid-cols-1 w-full" data-aos="fade-up">
          {props.state.groom && (
            <ParticipantComponent
              mode="odd"
              data={props.state?.groom as Participant}
            />
          )}
          {props.state.bride && (
            <ParticipantComponent
              mode="even"
              data={props.state?.bride as Participant}
            />
          )}
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
      <div className="relative h-[55vh] 2xl:h-[35vh] w-full md:w-1/2 flex-grow bg-theme1-primary bg-opacity-5">
        {props.data.image && (
          <ImageShimmer
            sizes="(max-width: 600px) 360px, (max-width: 1024px) 480px, (max-width: 1440px) 720px, 1080px"
            priority
            src={props.data.image as string}
            alt={props.data.name}
            fill
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div
        data-aos="fade-up"
        className="relative h-full w-full md:w-1/2 bg-theme1-primary bg-opacity-5 flex flex-col items-center justify-center text-center px-6 py-12 flex-grow"
      >
        <h1 className="text-2xl font-semibold text-gray-700 relative">
          {props.data.name}
        </h1>
        <p className="text-theme1-gold mt-4">
          {props.data.gender === "female" ? "Putri" : "Putra"}{" "}
          {props.data.child} dari pasangan
        </p>
        <h2 className="font-medium text-theme1-primary mt-1 leading-5">
          Bapak {props.data.parents_male} & Ibu {props.data.parents_female}
        </h2>
        <p className="text-theme1-gold mt-8 leading-5">{props.data.address}</p>
        <div className="flex mt-4 gap-x-2">
          {props.data.facebook && (
            <Link target="_blank" href={props.data.facebook}>
              <div className="w-9 h-9 bg-theme1-primary flex justify-center items-center text-white text-xl relative">
                <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
                <BiLogoFacebook />
              </div>
            </Link>
          )}
          {props.data.twitter && (
            <Link target="_blank" href={props.data.twitter}>
              <div className="w-9 h-9 bg-theme1-primary flex justify-center items-center text-white text-xl relative">
                <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
                <BiLogoTwitter />
              </div>
            </Link>
          )}
          {props.data.instagram && (
            <Link target="_blank" href={props.data.instagram}>
              <div className="w-9 h-9 bg-theme1-primary flex justify-center items-center text-white text-xl relative">
                <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
                <BiLogoInstagram />
              </div>
            </Link>
          )}
          {props.data.tiktok && (
            <Link target="_blank" href={props.data.tiktok}>
              <div className="w-9 h-9 bg-theme1-primary flex justify-center items-center text-white text-xl relative">
                <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
                <BiLogoTiktok />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BridesComponent;
