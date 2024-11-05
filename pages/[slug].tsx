import ThemeNotFound from "@/components/themes/theme.notfound";
import { fetcher } from "@/lib/fetcher";
import { Client } from "@/lib/types";
import { GetServerSideProps } from "next";
import React, { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { themes } from "@/components/themes/themes";
import ClientNotFound from "@/components/themes/client.notfound";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingComponent from "@/components/themes/loading";
import Head from "next/head";

interface Props {
  slug: string;
  untuk: string;
}

const MainPage: FC<Props> = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 0,
    });
  }, []);

  const { data, error } = useSWR(
    props.slug ? `/api/_pb/_c?slug=${props.slug}` : null,
    fetcher
  );

  const [url, setUrl] = useState<string>("");
  console.log(url);

  useEffect(() => {
    setUrl(
      `${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ""
      }`
    );
  }, []);

  const client: Client | null = data?.data?.length ? data.data[0] : null;

  if (!data && !error) return <LoadingComponent />;
  if (!client) return <ClientNotFound />;

  const themeName = client.theme?.name || "";

  const ThemeComponent = themes[themeName];

  return (
    <>
      <Head>
        <title>Your Page Title | Your Brand Name</title>
        <meta
          name="description"
          content="A brief description of your page that includes relevant keywords."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.yourwebsite.com/your-page" />

        <meta property="og:title" content="Your Page Title" />
        <meta
          property="og:description"
          content="A brief description of your page that includes relevant keywords."
        />
        <meta
          property="og:image"
          content="https://www.yourwebsite.com/image.jpg"
        />
        <meta
          property="og:url"
          content="https://www.yourwebsite.com/your-page"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Page Title" />
        <meta
          name="twitter:description"
          content="A brief description of your page that includes relevant keywords."
        />
        <meta
          name="twitter:image"
          content="https://www.yourwebsite.com/image.jpg"
        />
      </Head>
      {ThemeComponent ? ThemeComponent(client, props.untuk) : <ThemeNotFound />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { untuk } = context.query;
  const { slug } = context.params as { slug: string };

  return {
    props: {
      untuk: untuk ?? "Tamu Undangan",
      slug,
    },
  };
};

export default MainPage;
