import React, { FC } from "react";
import { marcellus, raleway } from "@/lib/fonts";
import { Participant } from "@/lib/types";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import Image from "next/image";
import useParticipants from "@/hooks/themes/useParticipants";
import useClientStore from "@/store/useClientStore";

const ParticipantsComponent = () => {
  const { client } = useClientStore();
  const { state } = useParticipants();

  const bothHasImg = state.groom?.image && state.bride?.image ? true : false;

  if (client?.participants && client?.participants.length > 0)
    return (
      <section className="relative bg-samaya-dark z-20 py-16 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-repeat opacity-80 md:opacity-35 bg-center"
          style={{
            backgroundImage: "url('/images/samaya/texture.svg')",
          }}
        ></div>

        <div className="w-full h-full px-4 md:px-12 relative z-40 max-w-screen-xl mx-auto">
          <h1
            data-aos="fade-up"
            className={`font-tan-pearl text-2xl md:text-3xl text-center text-samaya-primary`}
          >
            {client?.opening_title}
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className={`${raleway.className} tracking-[1px] text-[10px] md:text-xs text-center leading-5 text-white mt-8 mb-12 md:mb-16 max-w-screen-md mx-auto`}
          >
            {client?.opening_description}
          </p>

          {!bothHasImg && (
            <div
              className={`w-full gap-20 place-items-center flex justify-center my-16`}
            >
              {state.groom?.image && (
                <div
                  data-aos="zoom-out-up"
                  className="w-[180px] md:w-[200px] relative aspect-square"
                >
                  <Image
                    sizes="400px"
                    priority
                    fill
                    className="object-cover rounded-full overflow-hidden bg-samaya-dark/40"
                    src={state.groom?.image as string}
                    alt={state.groom?.name}
                  />
                  <Image
                    sizes="400px"
                    fill
                    src="/images/samaya/frame-circle.svg"
                    alt="cover-frame"
                    className="object-contain w-full h-full transform scale-[1.4]"
                  />
                </div>
              )}
              {state.bride?.image && (
                <div
                  data-aos="zoom-out-up"
                  className="w-[180px] md:w-[200px] relative aspect-square"
                >
                  <Image
                    sizes="400px"
                    priority
                    fill
                    className="object-cover rounded-full overflow-hidden bg-samaya-dark/40"
                    src={state.bride?.image as string}
                    alt={state.bride?.name}
                  />
                  <Image
                    sizes="400px"
                    fill
                    src="/images/samaya/frame-circle.svg"
                    alt="cover-frame"
                    className="object-contain w-full h-full transform scale-[1.4]"
                  />
                </div>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 w-full gap-16">
            {state.groom && (
              <ParticipantComponent
                bothHasImg={bothHasImg}
                data={state?.groom as Participant}
              />
            )}
            {state.bride && (
              <ParticipantComponent
                bothHasImg={bothHasImg}
                data={state?.bride as Participant}
              />
            )}
          </div>
        </div>
      </section>
    );
};

interface ComponentProps {
  data: Participant;
  bothHasImg: boolean;
}
const ParticipantComponent: FC<ComponentProps> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {props.data.image && props.bothHasImg ? (
        <div
          data-aos="zoom-out-up"
          className="w-[180px] md:w-[200px] relative aspect-square mb-12 md:mb-16 mt-6"
        >
          <Image
            sizes="400px"
            priority
            fill
            className="object-cover rounded-full overflow-hidden bg-samaya-dark/40"
            src={props.data?.image as string}
            alt={props.data?.name}
          />
          <Image
            sizes="400px"
            fill
            src="/images/samaya/frame-circle.svg"
            alt="cover-frame"
            className="object-contain w-full h-full transform scale-[1.4]"
          />
        </div>
      ) : null}
      <div
        className="flex justify-center gap-2 items-center mb-4"
        data-aos="fade-up"
      >
        <div className="h-[0.5px] w-16 bg-samaya-primary"></div>
        <p
          className={`text-samaya-primary uppercase tracking-[1px] text-[10px] md:text-xs ${raleway.className}`}
        >
          {props.data.role === "groom"
            ? "Mempelai Pria"
            : props.data.role === "bride"
            ? "Mempelai Wanita"
            : ""}
        </p>
        <div className="h-[0.5px] w-16 bg-samaya-primary"></div>
      </div>
      <h1
        data-aos="fade-up"
        className={`text-xl font-semibold text-samaya-primary relative font-tan-pearl`}
      >
        {props.data.name}
      </h1>
      <div className={`${raleway.className} text-center`} data-aos="fade-up">
        {props.data.role !== "participant" && (
          <>
            <p className="text-gray-300 text-xs md:text-sm mt-4 capitalize font-italic">
              {props.data.gender === "female" ? "Putri" : "Putra"}{" "}
              {props.data.child} dari pasangan
            </p>
            <h2 className="text-xs md:text-sm text-white mt-2">
              Bapak {props.data.parents_male} & Ibu {props.data.parents_female}
            </h2>
          </>
        )}
      </div>
      <p
        className={`text-samaya-primary text-sm md:text-base text-center mt-4 ${marcellus.className}`}
        data-aos="fade-up"
      >
        {props.data.address}
      </p>
      <div
        className="flex mt-4 gap-x-6 text-samaya-primary text-xl md:text-2xl text-center"
        data-aos="fade-up"
      >
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
      </div>
    </div>
  );
};

export default ParticipantsComponent;
