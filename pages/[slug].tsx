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
import Seo from "@/components/dashboard/elements/seo";
import { sosmedURLs } from "@/constants/sosmed";

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
        title="Coba"
        description={`${client?.opening_title}, ${client?.opening_description}`}
        keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah, undangan digital bali, undangan bali, undangan digital, platform undangan online, Moment Invitation, template undangan digital, undangan pernikahan digital, undangan online, undangan digital dengan RSVP, undangan dengan Google Maps, undangan digital premium, buat undangan digital, undangan digital minimalis"
        ogImage={client?.cover ?? "/images/logo-white.png"}
        ogUrl={url}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Moment Invitations",
          url: url,
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
