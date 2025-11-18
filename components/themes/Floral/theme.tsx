import Layout from "../layout";
import { memo, useEffect } from "react";
import useClientStore from "@/store/useClientStore";
import { montserrat } from "@/lib/fonts";
import ButtonOutlinedPrimary from "./elements/button.outlined.primary";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import useCoverStore from "@/store/useCoverStore";

interface Props {
  untuk: string;
}

const Floral = ({ untuk }: Props) => {
  const { client } = useClientStore();
  const { toggleIsOpen } = useCoverStore();

  useEffect(() => {
    if (client) toggleIsOpen();
  }, [client]);

  if (!client) return;

  return (
    <Layout>
      <main className="w-full h-full flex bg-dashboard-dark justify-center min-h-dvh items-center relative">
        <div
          data-aos="zoom-out"
          className={`bg-floral-light relative w-full p-5 h-dvh flex flex-col items-center justify-center ${montserrat.className}`}
        >
          <div className="absolute top-0 -left-10 md:-left-14 transform z-10 w-[110vw] md:w-[600px] lg:w-[400px] aspect-square">
            <Image
              sizes="120vw"
              quality={75}
              fill
              src="/images/floral/flower-top.png"
              className="fill object-contain opacity-20 md:opacity-100"
              alt="Flower Top"
            />
          </div>
          <div className="absolute top-0 -right-10 md:-right-14 -scale-x-100 transform z-10 w-[110vw] md:w-[600px] lg:w-[400px] aspect-square">
            <Image
              sizes="120vw"
              quality={75}
              fill
              src="/images/floral/flower-top.png"
              className="fill object-contain"
              alt="Flower Top"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 z-10 w-[100vw] md:w-[600px] lg:w-[400px] aspect-square">
            <Image
              quality={75}
              sizes="110vw"
              fill
              src="/images/floral/flower-bottom.png"
              className="fill object-contain"
              alt="Flower-Bottom-1"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 z-10 w-[100vw] md:w-[600px] lg:w-[400px] transform -scale-x-100 aspect-square">
            <Image
              quality={75}
              sizes="110vw"
              fill
              src="/images/floral/flower-bottom.png"
              className="fill object-contain opacity-20 md:opacity-100"
              alt="Flower-Bottom-2"
            />
          </div>
          <p
            data-aos="zoom-out"
            data-aos-delay="200"
            className="text-center text-floral-primary text-sm md:text-base"
          >
            {client.opening_title} <span className="capitalize">{untuk}</span>!
            <br />
            {client?.opening_description}
          </p>
          <div
            data-aos="zoom-out"
            data-aos-delay="400"
            className="max-w-xl flex flex-col items-center my-10"
          >
            <h1
              className={`font-holiday max-w-2xl text-3xl md:text-4xl my-4 leading-[48px] md:leading-[54px] transform rotate-[-9deg] text-center text-floral-primary`}
            >
              {client?.name} Birthday Party
            </h1>
          </div>
          <p
            data-aos="zoom-out"
            data-aos-delay="600"
            className="text-center text-floral-primary text-sm max-w-60 md:text-base"
          >
            {client?.closing_description}
          </p>
          <h6
            data-aos="zoom-out"
            data-aos-delay="800"
            className={`font-holiday mt-6 text-xl md:text-2xl text-center text-floral-primary`}
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
            className="text-center text-floral-primary text-sm max-w-60 mt-16 mb-5 md:text-base"
          >
            {client?.events[0].address}
          </p>
          <div
            data-aos="zoom-out"
            data-aos-delay="1200"
            className="relative z-20"
          >
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

export default memo(Floral);
