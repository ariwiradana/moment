import Layout from "../layout";
import { memo } from "react";
import useClientStore from "@/store/useClientStore";
import { montserrat } from "@/lib/fonts";
import ButtonOutlinedPrimary from "./elements/button.outlined.primary";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

interface Props {
  untuk: string;
}

const Lineart = ({ untuk }: Props) => {
  const { client } = useClientStore();

  if (!client) return;

  return (
    <Layout>
      <main className="w-full h-full flex bg-lineart-light justify-center min-h-screen items-center relative">
        <div
          data-aos="zoom-out"
          className={`bg-lineart-light max-w-2xl mx-auto relative w-full p-5 h-screen flex flex-col items-center justify-center ${montserrat.className}`}
        >
          <div className="absolute -top-20 z-10 w-[300px] aspect-video rotate-[18deg]">
            <Image
              fill
              src="/images/lineart/hiasan.svg"
              className="fill object-contain"
              alt="Top Hat"
            />
          </div>
          <div className="absolute bottom-0 left-0 z-10 w-[130px] aspect-square rotate-[18deg]">
            <Image
              fill
              src="/images/lineart/gift.svg"
              className="fill object-contain"
              alt="Gift"
            />
          </div>
          <div className="absolute bottom-32 -right-10 z-10 w-[130px] aspect-square rotate-[-18deg]">
            <Image
              fill
              src="/images/lineart/candy.svg"
              className="fill object-contain"
              alt="Candy"
            />
          </div>
          <div className="absolute bottom-60 left-10 z-10 w-[28px] md:w-[56px] aspect-square rotate-[-18deg]">
            <Image
              fill
              src="/images/lineart/peer.svg"
              className="fill object-contain"
              alt="Peer"
            />
          </div>
          <div className="absolute top-80 right-10 z-10 w-[20px] md:w-[36px] aspect-square rotate-[-18deg]">
            <Image
              fill
              src="/images/lineart/lingkaran 1.svg"
              className="fill object-contain"
              alt="Circle"
            />
          </div>
          <div className="absolute top-40 left-16 z-10 w-[32px] md:w-[64px] aspect-square rotate-[-18deg]">
            <Image
              fill
              src="/images/lineart/bintang.svg"
              className="fill object-contain"
              alt="Star"
            />
          </div>
          <p
            data-aos="zoom-out"
            data-aos-delay="200"
            className="text-center text-lineart-primary text-sm md:text-base"
          >
            {client.opening_title} <span className="capitalize">{untuk}</span>!
            <br />
            {client?.opening_description}
          </p>
          <div
            data-aos="zoom-out"
            data-aos-delay="400"
            className="max-w-10 flex flex-col items-center my-10 transform rotate-[-10deg]"
          >
            <h1
              className={`font-holiday leading-[64px] text-[42px] md:text-5xl md:leading-[80px] text-center text-lineart-primary`}
            >
              {client?.participants[0].nickname}&lsquo;s Birthday Party
            </h1>
          </div>
          <p
            data-aos="zoom-out"
            data-aos-delay="600"
            className="text-center text-lineart-primary text-sm max-w-60 md:text-base"
          >
            {client?.closing_description}
          </p>
          <h6
            data-aos="zoom-out"
            data-aos-delay="800"
            className={`font-holiday mt-6 text-xl md:text-2xl text-center text-lineart-primary`}
          >
            {moment(client?.events[0].date).locale("en").format("D MMMM")} at{" "}
            {moment(client?.events[0].start_time, "HH:mm")
              .locale("en")
              .format("hA")
              .toLocaleLowerCase()}
          </h6>
          <p
            data-aos="zoom-out"
            data-aos-delay="1000"
            className="text-center text-lineart-primary text-sm max-w-60 mt-16 mb-5 md:text-base"
          >
            {client?.events[0].address}
          </p>
          <div data-aos="zoom-out" data-aos-delay="1200">
            <Link
              target="_blank"
              href={client?.events[0].address_url || ""}
              aria-label={`Button Location for ${client?.events[0].name}`}
            >
              <ButtonOutlinedPrimary title="Google Maps" />
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default memo(Lineart);
