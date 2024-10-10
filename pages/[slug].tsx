import ThemeNotFound from "@/components/themes/theme.notfound";
import { fetcher } from "@/lib/fetcher";
import { Client } from "@/lib/types";
import { GetServerSideProps } from "next";
import React, { FC, useEffect } from "react";
import useSWR from "swr";
import { themes } from "@/components/themes/themes";
import ClientNotFound from "@/components/themes/client.notfound";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingComponent from "@/components/themes/loading";

interface Props {
  slug: string;
  to: string;
}

const MainPage: FC<Props> = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 50,
    });
  }, []);

  const { data, error } = useSWR(
    props.slug ? `/api/client?slug=${props.slug}` : null,
    fetcher
  );

  const client: Client | null = data?.data?.length ? data.data[0] : null;

  if (!data && !error) return <LoadingComponent />;
  if (!client) return <ClientNotFound />;
  if (client.status === "unpaid") return <ClientNotFound />;

  const themeName = client.theme?.name || "";
  const ThemeComponent = themes[themeName];

  return ThemeComponent ? ThemeComponent(client, props.to) : <ThemeNotFound />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { to } = context.query;
  const { slug } = context.params as { slug: string };

  return {
    props: {
      to: to ?? "",
      slug,
    },
  };
};

export default MainPage;
