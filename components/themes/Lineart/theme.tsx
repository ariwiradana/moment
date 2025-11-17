import Layout from "../layout";
import { memo } from "react";
import useClientStore from "@/store/useClientStore";
import { montserrat } from "@/lib/fonts";
import ButtonOutlinedPrimary from "./elements/button.outlined.primary";
import moment from "moment";
import Link from "next/link";

interface Props {
  untuk: string;
}

const Lineart = ({ untuk }: Props) => {
  const { client } = useClientStore();

  if (!client) return;

  return (
    <Layout>
      <main className="w-full h-full flex justify-center min-h-screen items-center bg-lineart-light">
        <div
          className={`bg-lineart-light relative w-full max-w-lg p-5 shadow-lg h-screen md:max-h-[95vh] flex flex-col items-center justify-center ${montserrat.className}`}
        >
          <p className="text-center text-lineart-primary text-xs md:text-sm">
            {client.opening_title} <span className="capitalize">{untuk}</span>!
            <br />
            {client?.opening_description}
          </p>
          <div className="max-w-10 flex flex-col items-center mt-6 mb-4 md:mt-8 md:mb-6 transform rotate-[-10deg]">
            <h1
              className={`font-holiday leading-[64px] text-[40px] md:text-5xl md:leading-[80px] text-center text-lineart-primary`}
            >
              {client?.participants[0].nickname}&lsquo;s Birthday Party
            </h1>
          </div>
          <p className="text-center text-lineart-primary text-xs max-w-60 md:text-sm">
            {client?.closing_description}
          </p>
          <h6
            className={`font-holiday mt-5 md:mt-8 text-lg md:text-2xl text-center text-lineart-primary`}
          >
            {moment(client?.events[0].date).locale("en").format("D MMMM")} at{" "}
            {moment(client?.events[0].start_time, "HH:mm")
              .locale("en")
              .format("hA")
              .toLocaleLowerCase()}
          </h6>
          <p className="text-center text-lineart-primary text-xs max-w-40 md:max-w-60 mt-11 mb-5 md:text-sm md:mb-7">
            {client?.events[0].address}
          </p>
          <Link
            target="_blank"
            href={client?.events[0].address_url || ""}
            aria-label={`Button Location for ${client?.events[0].name}`}
          >
            <ButtonOutlinedPrimary title="Google Maps" />
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default memo(Lineart);
