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

interface Props {
  slug: string;
  untuk: string;
  client: Client | null;
}

const MainPage: FC<Props> = ({ untuk, client }) => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 0,
      once: true,
    });
  }, []);

  if (!client) return <ClientNotFound />;

  const themeName = client.theme?.name || "";

  const ThemeComponent = themes[themeName];
  const participantNames = getParticipantNames(client.participants || []);

  const pageTitle = client
    ? client.status === "unpaid"
      ? `Preview ${participantNames} | Undangan ${client.theme_category?.name}`
      : client.is_preview
      ? `Preview Undangan Tema ${client.theme?.name} | Moment`
      : `${participantNames} | Undangan ${client.theme_category?.name}`
    : "Moment";

  return ThemeComponent ? (
    <>
      <Seo
        title={pageTitle}
        description={`${client?.opening_title}, ${client?.opening_description}`}
        keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah, undangan digital bali, undangan bali, undangan digital, platform undangan online, Moment Invitation, template undangan digital, undangan pernikahan digital, undangan online, undangan digital dengan RSVP, undangan dengan Google Maps, undangan digital premium, buat undangan digital, undangan digital minimalis"
        image={client?.cover ?? "/images/logo-bg.jpg"}
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
  const response = await fetcher(`${baseUrl}/api/_pb/_c/_u?slug=${slug}`);

  const client: Client | null = response?.data ?? null;

  return {
    props: {
      untuk: untuk ?? "Tamu Undangan",
      slug,
      client,
    },
  };
};

export default MainPage;
