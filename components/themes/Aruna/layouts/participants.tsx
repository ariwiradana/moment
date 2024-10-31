import React, { FC } from "react";
import { balthazar, italiana } from "@/lib/fonts";
import ImageShimmer from "../../../image.shimmer";
import { Participant } from "@/lib/types";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import { useAruna } from "@/hooks/themes/useAruna";

interface Props {
  state: useAruna["state"];
}

const ParticipantsComponent: FC<Props> = (props) => {
  if (
    props.state.client?.participants &&
    props.state.client?.participants.length > 0
  )
    return (
      <section className="relative z-10 py-[60px] md:py-[100px] overflow-hidden px-8 bg-white">
        <div
          className="absolute inset-0 bg-repeat bg-center"
          style={{
            backgroundImage: "url('/images/nirvaya/texture.svg')",
          }}
        ></div>

        <div className="w-full h-full relative max-w-screen-xl mx-auto">
          <h1
            data-aos="fade-up"
            className={`${italiana.className} text-4xl md:text-5xl text-center text-nirvaya-dark`}
          >
            {props.state.client.opening_title}
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className={`${balthazar.className} text-sm md:text-base text-nirvaya-dark/80 mt-8 md:mt-12 text-center max-w-screen-sm mx-auto`}
          >
            {props.state.client?.opening_description}
          </p>

          <div className="flex justify-center my-8 md:my-10">
            {props.state.groom?.image && (
              <div
                data-aos="zoom-in"
                className="relative w-[173px] md:w-[193px] h-[226px] md:h-[256px] border-2 border-white rounded-t-[100px] rounded-b-[20px] overflow-hidden -mr-6"
              >
                <ImageShimmer
                  fill
                  priority
                  className="object-cover"
                  src={props.state.groom.image as string}
                  alt={props.state.groom.name}
                />
              </div>
            )}
            {props.state.bride?.image && (
              <div
                data-aos="zoom-in"
                className="relative w-[173px] md:w-[193px] h-[226px] md:h-[256px] border-2 border-white rounded-t-[100px] rounded-b-[20px] overflow-hidden mt-6 -ml-6"
              >
                <ImageShimmer
                  fill
                  priority
                  className="object-cover"
                  src={props.state.bride.image as string}
                  alt={props.state.bride.name}
                />
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 w-full gap-8 max-w-screen-md mx-auto">
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
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center" data-aos="fade-up">
        <p
          className={`text-nirvaya-dark/60 text-sm md:text-base uppercase ${balthazar.className}`}
        >
          {props.data.role === "groom"
            ? "Mempelai Pria"
            : props.data.role === "bride"
            ? "Mempelai Wanita"
            : ""}
        </p>
        <div className="h-[0.5px] w-6 md:w-8 bg-nirvaya-dark/50 mt-2 md:mt-4"></div>
      </div>
      <h1
        data-aos="fade-up"
        className={`text-3xl md:text-4xl font-semibold text-nirvaya-dark relative my-3 md:my-5 text-center ${italiana.className}`}
      >
        {props.data.name}
      </h1>
      <div data-aos="fade-up">
        {props.data.role !== "participant" && (
          <>
            <p
              className={`text-nirvaya-dark/60 text-sm md:text-base text-center ${balthazar.className}`}
            >
              {props.data.gender === "female" ? "Putri" : "Putra"}{" "}
              {props.data.child} dari pasangan
            </p>
            <h2
              className={`text-nirvaya-dark mt-3 md:mt-5 text-center text-lg md:text-xl ${balthazar.className}`}
            >
              Bapak {props.data.parents_male} & Ibu {props.data.parents_female}
            </h2>
          </>
        )}
      </div>
      <p
        className={`text-nirvaya-dark/60 text-base md:text-lg text-center mt-3 md:mt-5 ${balthazar.className}`}
        data-aos="fade-up"
      >
        {props.data.address}
      </p>
      <div
        className="flex justify-between items-center mt-5 md:mt-7 gap-x-5 text-nirvaya-dark text-xl md:text-2xl text-center"
        data-aos="fade-up"
      >
        <div className="h-[0.5px] bg-nirvaya-dark/50 w-16 md:w-20"></div>
        {props.data.facebook && (
          <Link
            aria-label="sosmed-facebook-link"
            target="_blank"
            href={props.data.facebook}
          >
            <BiLogoFacebook />
          </Link>
        )}
        {props.data.twitter && (
          <Link
            aria-label="sosmed-twitter-link"
            target="_blank"
            href={props.data.twitter}
          >
            <BiLogoTwitter />
          </Link>
        )}
        {props.data.instagram && (
          <Link
            aria-label="sosmed-instagram-link"
            target="_blank"
            href={props.data.instagram}
          >
            <BiLogoInstagram />
          </Link>
        )}
        {props.data.tiktok && (
          <Link
            aria-label="sosmed-tiktok-link"
            target="_blank"
            href={props.data.tiktok}
          >
            <BiLogoTiktok />
          </Link>
        )}
        <div className="h-[0.5px] bg-nirvaya-dark/50 w-20"></div>
      </div>
    </div>
  );
};

export default ParticipantsComponent;
