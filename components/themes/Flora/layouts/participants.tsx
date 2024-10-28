import React, { FC } from "react";
import { italiana, marcellus } from "@/lib/fonts";
import { useFlora } from "@/hooks/themes/useFlora";
import { Participant } from "@/lib/types";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import ImageShimmer from "@/components/image.shimmer";

interface Props {
  state: useFlora["state"];
}

const ParticipantsComponent: FC<Props> = (props) => {
  if (
    props.state.client?.participants &&
    props.state.client?.participants.length > 0
  )
    return (
      <section
        className="relative bg-flora-dark z-10 gap-12 flex flex-col px-8 md:px-20 py-16 md:py-24"
        style={{
          backgroundImage: "url('/images/flora/pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <div className="flex flex-col items-center text-center max-w-screen-sm mx-auto">
          <p
            data-aos="fade-up"
            className={`${marcellus.className} uppercase text-sm md:text-base text-flora-primary/60`}
          >
            Undangan Pernikahan
          </p>
          <div
            data-aos="fade-up"
            className="w-[1px] h-8 bg-flora-primary/30 my-2"
          ></div>
          <h1
            data-aos="fade-up"
            className={`${italiana.className} uppercase text-[28px] md:text-4xl text-white mb-3`}
          >
            {props.state.client.opening_title}
          </h1>
          <p
            data-aos="fade-up"
            className={`${marcellus.className} text-flora-primary text-xs md:text-sm`}
          >
            {props.state.client.opening_description}
          </p>
        </div>
        <div>
          <div
            data-aos="zoom-in-up"
            className="relative w-full h-full flex justify-center"
          >
            {props.state.groom?.image && props.state.bride?.image ? (
              <>
                <div className="w-[188px] md:w-[230px] h-[282px] md:h-[320px] transform -rotate-3 translate-x-6 relative z-10 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[70%] to-flora-dark/80 z-20"></div>
                  <ImageShimmer
                    sizes="320px"
                    quality={90}
                    priority
                    src={props.state.groom?.image as string}
                    fill
                    className="object-cover"
                    alt="image-groom"
                  />
                </div>
                <div className="w-[188px] md:w-[230px] h-[282px] md:h-[320px] transform rotate-3 -translate-x-6 translate-y-5 relative shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[70%] to-flora-dark/80 z-20"></div>
                  <ImageShimmer
                    quality={90}
                    sizes="320px"
                    priority
                    src={props.state.bride?.image as string}
                    fill
                    className="object-cover"
                    alt="image-bride"
                  />
                </div>
              </>
            ) : null}
          </div>
          <div
            data-aos="zoom-in-up"
            className="w-[248px] h-[75px] relative mx-auto -mt-4 z-20"
          >
            <ImageShimmer
              sizes="248px"
              priority
              src="/images/flora/flower.svg"
              fill
              className="object-contain"
              alt="image-flower"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row max-w-screen-lg mx-auto gap-12 lg:gap-32">
          {props.state.groom && (
            <ParticipantComponent data={props.state.groom} />
          )}
          {props.state.bride && (
            <ParticipantComponent data={props.state.bride} />
          )}
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
      className={`flex flex-col justify-center items-center w-full text-center`}
    >
      <p
        data-aos="fade-up"
        className={`${marcellus.className} uppercase text-sm md:text-base text-flora-primary/60`}
      >
        {props.data.role === "bride"
          ? "Pengantin Wanita"
          : props.data.role === "groom"
          ? "Pengantin Pria"
          : ""}
      </p>
      <div
        data-aos="fade-up"
        className="mt-2 md:mt-4 w-6 h-[1px] bg-flora-primary/30"
      ></div>
      <h1
        data-aos="fade-up"
        className={`text-[28px] md:text-4xl text-white relative mt-3 md:mt-5 ${italiana.className}`}
      >
        {props.data.name}
      </h1>
      <div className={`${marcellus.className} mt-3 md:mt-5 mb-4 text-center`}>
        {props.data.role !== "participant" && (
          <>
            <p
              data-aos="fade-up"
              className="text-sm md:text-base text-flora-primary/60 mb-2 md:mb-4"
            >
              {props.data.gender === "female" ? "Putri" : "Putra"}{" "}
              {props.data.child} dari pasangan
            </p>
            <h2
              data-aos="fade-up"
              className="text-base md:text-lg text-flora-primary"
            >
              Bapak {props.data.parents_male} & Ibu {props.data.parents_female}
            </h2>
          </>
        )}
      </div>
      <div
        data-aos="fade-up"
        className="flex gap-x-5 text-flora-primary text-lg md:text-2xl w-full items-center"
      >
        <div className="w-full h-[1px] bg-flora-primary/30 mr-2"></div>
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
        <div className="w-full h-[1px] bg-flora-primary/30 ml-2"></div>
      </div>
    </div>
  );
};

export default ParticipantsComponent;
