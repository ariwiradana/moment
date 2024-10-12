import React, { FC } from "react";
import { afacad, marcellus } from "@/lib/fonts";
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

const ParticipantsComponent: FC<Props> = (props) => {
  if (
    props.state.client?.participants &&
    props.state.client?.participants.length > 0
  )
    return (
      <section className="relative bg-white z-10 pt-16 pb-4 md:py-16">
        <div className="w-full h-full px-6 md:px-12 relative z-40 max-w-screen-xl mx-auto">
          <div>
            <div data-aos="fade-up">
              <Title title={props.state.client?.opening_title as string} />
            </div>
            <div className="flex justify-center my-4" data-aos="fade-up">
              <div className="w-[0.5px] h-8 bg-theme1-gold"></div>
            </div>

            <p
              data-aos="fade-up"
              className={`${afacad.className} text-base md:text-xl text-center leading-5 text-theme1-primary mb-12 max-w-screen-md mx-auto`}
            >
              {props.state.client?.opening_description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 w-full gap-8 py-8">
            {props.state.groom && (
              <ParticipantComponent data={props.state?.groom as Participant} />
            )}
            {props.state.bride && (
              <ParticipantComponent data={props.state?.bride as Participant} />
            )}
          </div>
        </div>
      </section>
    );
};

interface ComponentProps {
  data: Participant;
}
const ParticipantComponent: FC<ComponentProps> = (props) => {
  return (
    <div
      data-aos="zoom-in-up"
      className={`${afacad.className} flex flex-col md:flex-row even:md:flex-row-reverse rounded-[36px] lg:rounded-[100px] overflow-hidden relative`}
    >
      <div className="relative h-[55vh] md:h-[35vh] 2xl:h-[35vh] w-full md:w-1/2 flex-grow bg-theme1-primary bg-opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#604a3209] to-[#604a3248] z-20"></div>
        {props.data.image && (
          <ImageShimmer
            sizes="(max-width: 600px) 360px, (max-width: 1024px) 480px, (max-width: 1440px) 720px, 1080px"
            priority
            src={props.data.image as string}
            alt={props.data.name}
            fill
            className="object-cover w-full h-full grayscale-[5%]"
          />
        )}
      </div>
      <div className="relative w-full md:w-1/2 bg-theme1-primary bg-opacity-5 flex flex-col items-center justify-center text-center px-6 py-16 flex-grow">
        <div data-aos="fade-up" className="flex flex-col items-center">
          <h1
            className={`text-2xl font-semibold text-gray-700 relative ${marcellus.className}`}
          >
            {props.data.name}
          </h1>
          {props.data.role !== "participant" && (
            <>
              <p className="text-theme1-gold mt-4">
                {props.data.gender === "female" ? "Putri" : "Putra"}{" "}
                {props.data.child} dari pasangan
              </p>
              <h2 className="font-medium text-theme1-primary mt-1 leading-5">
                Bapak {props.data.parents_male} & Ibu{" "}
                {props.data.parents_female}
              </h2>
            </>
          )}
          <p className="text-theme1-gold mt-8 leading-5">
            {props.data.address}
          </p>
          <div className="flex mt-4 gap-x-2">
            {props.data.facebook && (
              <Link target="_blank" href={props.data.facebook}>
                <div className="w-9 h-9 rounded-full bg-theme1-primary flex justify-center items-center text-white text-xl relative">
                  <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
                  <BiLogoFacebook />
                </div>
              </Link>
            )}
            {props.data.twitter && (
              <Link target="_blank" href={props.data.twitter}>
                <div className="w-9 h-9 rounded-full bg-theme1-primary flex justify-center items-center text-white text-xl relative">
                  <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
                  <BiLogoTwitter />
                </div>
              </Link>
            )}
            {props.data.instagram && (
              <Link target="_blank" href={props.data.instagram}>
                <div className="w-9 h-9 rounded-full bg-theme1-primary flex justify-center items-center text-white text-xl relative">
                  <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
                  <BiLogoInstagram />
                </div>
              </Link>
            )}
            {props.data.tiktok && (
              <Link target="_blank" href={props.data.tiktok}>
                <div className="w-9 h-9 rounded-full bg-theme1-primary flex justify-center items-center text-white text-xl relative">
                  <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
                  <BiLogoTiktok />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsComponent;
