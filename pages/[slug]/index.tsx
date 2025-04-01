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
import useClientStore from "@/store/useClientStore";
import { getEventNames } from "@/utils/getEventNames";

interface Props {
  url: string;
  untuk: string;
  client: Client | null;
  themeName: string;
  pageTitle: string;
  description: string;
  seoImage: string;
}

const MainPage: FC<Props> = ({
  untuk,
  client: clientData,
  themeName,
  pageTitle,
  description,
  seoImage,
  url,
}) => {
  const { setClient } = useClientStore();

  useDisableInspect();
  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 0,
      once: true,
    });
    setClient(clientData);
  }, []);

  if (!clientData) return <ClientNotFound />;
  if (!clientData.guests?.includes(untuk) && untuk !== "Tamu Undangan")
    return <ClientNotFound />;

  const ThemeComponent = themes[themeName];

  return ThemeComponent ? (
    <>
      <Seo
        url={url}
        title={pageTitle}
        description={description}
        keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah, undangan digital bali, undangan bali, undangan digital, platform undangan online, Moment Invitation, template undangan digital, undangan pernikahan digital, undangan online, undangan digital dengan RSVP, undangan dengan Google Maps, undangan digital premium, buat undangan digital, undangan digital minimalis, momentinvitations"
        image={seoImage}
      />
      {ThemeComponent(untuk)}
    </>
  ) : (
    <ThemeNotFound />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { untuk } = context.query;
  const { slug } = context.params as { slug: string };

  const baseUrl = process.env.API_BASE_URL;
  const response = await fetcher(`${baseUrl}/api/_pb/_c/_u?slug=${slug}`).catch(
    (error) => {
      console.error("API fetch error:", error);
      return null;
    }
  );

  const client: Client | null = response?.data ?? null;

  const themeName = client?.theme?.name || "";
  const participantNames =
    getParticipantNames(client?.participants || []) || "";
  const description = `${client?.opening_title || ""}, ${
    client?.opening_description || ""
  }`;
  const seoImage = client?.seo || "";
  const url = `https://momentinvitation.com/${encodeURIComponent(slug)}`;
  const pageTitle = client
    ? client.status === "unpaid"
      ? `Preview ${participantNames} | Undangan ${client.theme_category?.name}`
      : client.is_preview
      ? `Preview Undangan Tema ${client.theme?.name} | Moment`
      : `${participantNames} | Undangan ${getEventNames(client.events)}`
    : "Moment";

  return {
    props: {
      untuk: untuk ?? "Tamu Undangan",
      slug,
      client,
      themeName,
      pageTitle,
      description,
      seoImage,
      url,
    },
  };
};

export default MainPage;
