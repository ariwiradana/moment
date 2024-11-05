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
import { sosmedURLs } from "@/constants/sosmed";
import Seo from "@/components/dashboard/elements/seo";

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
      <Seo
        title="Undangan | Moment"
        description="Buat undangan digital dengan mudah menggunakan Moment. Dapatkan undangan dengan harga yang terjangkau, cepat, responsif, dan mudah dibagikan"
        keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah"
        ogImage="/images/logo-white.png"
        ogUrl={url}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Moment Invitations",
          url,
          sameAs: [
            sosmedURLs.email,
            sosmedURLs.instagram,
            sosmedURLs.whatsapp,
            sosmedURLs.youtube,
          ],
        }}
        author="Moment"
      />
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
