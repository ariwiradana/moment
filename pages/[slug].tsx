import ThemeNotFound from "@/components/themes/theme.notfound";
import { fetcher } from "@/lib/fetcher";
import { Client } from "@/lib/types";
import { GetServerSideProps } from "next";
import React, { FC, useEffect } from "react";
import { themes } from "@/components/themes/themes";
import ClientNotFound from "@/components/themes/client.notfound";
import AOS from "aos";
import "aos/dist/aos.css";
import Seo from "@/components/dashboard/elements/seo";
import { getParticipantNames } from "@/utils/getParticipantNames";
import useDisableInspect from "@/hooks/useDisableInspect";

interface Props {
  slug: string;
  untuk: string;
  client: Client | null;
}

const MainPage: FC<Props> = ({ untuk, client }) => {
  useDisableInspect();

  useEffect(() => {
    AOS.init({ duration: 1200, offset: 0, once: true });
  }, []);

  if (!client) return <ClientNotFound />;

  const themeName = client.theme?.name || "";
  const ThemeComponent = themes[themeName];
  const participantNames = getParticipantNames(client.participants || []);

  const pageTitle =
    client?.status === "unpaid"
      ? `Preview ${participantNames} | Undangan ${client.theme_category?.name}`
      : client?.is_preview
      ? `Preview Undangan Tema ${client.theme?.name} | Moment`
      : `${participantNames} | Undangan ${client.theme_category?.name}`;

  const seoDescription = `${client?.opening_title || ""}, ${
    client?.opening_description || ""
  }`;
  const seoImage = client?.seo as string;

  return ThemeComponent ? (
    <>
      <Seo
        url={`https://momentinvitations.com/${client?.slug}`}
        title={pageTitle || "Moment"}
        description={seoDescription}
        keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah, undangan digital bali, undangan bali, platform undangan online, Moment Invitation, undangan digital premium"
        image={seoImage}
      />
      {ThemeComponent(client, untuk)}
    </>
  ) : (
    <ThemeNotFound />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { untuk } = context.query;
  const { slug } = context.params as { slug: string };

  const baseUrl = process.env.API_BASE_URL;
  let client: Client | null = null;

  try {
    const response = await fetcher(`${baseUrl}/api/_pb/_c/_u?slug=${slug}`);
    client = response?.data ?? null;
  } catch (error) {
    console.error("API fetch error:", error);
  }

  return {
    props: {
      untuk: untuk ?? "Tamu Undangan",
      slug,
      client,
    },
  };
};

export default MainPage;
