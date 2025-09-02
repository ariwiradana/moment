import ThemeNotFound from "@/components/themes/theme.notfound";
import { fetcher } from "@/lib/fetcher";
import { Client, SEO } from "@/lib/types";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC, useEffect, useState } from "react";
import { themes } from "@/components/themes/themes";
import ClientNotFound from "@/components/themes/client.notfound";
import AOS from "aos";
import "aos/dist/aos.css";
import Seo from "@/components/dashboard/elements/seo";
import useDisableInspect from "@/hooks/useDisableInspect";
import useClientStore from "@/store/useClientStore";
import useSWR from "swr";
import SplitText from "@/components/themes/split.text";
import { redhat } from "@/lib/fonts";
import PreviewNav from "@/components/themes/preview.nav";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import { getEventNames } from "@/utils/getEventNames";
import sql from "@/lib/db";
import { useRouter } from "next/router";

interface Props {
  seo: SEO;
  slug: string;
}

const MainPage: FC<Props> = ({ seo, slug }) => {
  const { setClient, client } = useClientStore();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const untuk = (router.query.untuk as string) || "Tamu Undangan";

  const { error } = useSWR<{ data: Client }>(
    slug ? `/api/_pb/_c/_u?slug=${slug}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        setClient(data.data || null);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      },
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      refreshInterval: 0,
    }
  );

  useDisableInspect();
  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 50,
      once: true,
    });

    return () => AOS.refresh();
  }, []);

  if (isLoading && seo)
    return (
      <>
        <Seo
          url={seo?.url}
          title={seo?.page_title}
          description={seo?.description}
          keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah, undangan digital bali, undangan bali, undangan digital, platform undangan online, Moment Invitation, template undangan digital, undangan pernikahan digital, undangan online, undangan digital dengan RSVP, undangan dengan Google Maps, undangan digital premium, buat undangan digital, undangan digital minimalis, momentinvitations"
          image={seo?.seo_image}
        />
        <div className="w-full h-dvh bg-dashboard-dark flex justify-center items-center">
          <div data-aos="fade-up">
            <SplitText
              text={seo?.name}
              className={`text-3xl tracking-[1px] lg:text-5xl font-medium text-center text-white animate-pulse ${redhat.className}`}
              delay={150}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              threshold={0.2}
              rootMargin="-50px"
            />
          </div>
        </div>
      </>
    );

  if (!client || error) return <ClientNotFound />;
  if (!client.guests?.includes(untuk) && untuk !== "Tamu Undangan")
    return <ClientNotFound />;

  const ThemeComponent = seo?.theme_name ? themes[seo.theme_name] : null;

  return ThemeComponent ? (
    <>
      <PreviewNav />
      <Seo
        url={seo.url}
        title={seo.page_title}
        description={seo.description}
        keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah, undangan digital bali, undangan bali, undangan digital, platform undangan online, Moment Invitation, template undangan digital, undangan pernikahan digital, undangan online, undangan digital dengan RSVP, undangan dengan Google Maps, undangan digital premium, buat undangan digital, undangan digital minimalis, momentinvitations"
        image={seo.seo_image}
      />
      {ThemeComponent(untuk)}
    </>
  ) : (
    <ThemeNotFound />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const { rows } = await sql.query(
      `SELECT
        c.id,
        c.name,
        c.status,
        c.is_preview,
        c.theme_id,
        c.opening_title,
        c.opening_description,
        c.seo,
        t.name as theme_name,
        tc.name as theme_category_name
      FROM clients c
      JOIN themes t ON c.theme_id = t.id
      JOIN theme_categories tc ON c.theme_category_id = tc.id
      WHERE c.slug = $1`,
      [slug]
    );

    if (rows.length === 0) {
      return { notFound: true };
    }

    const client = rows[0];

    const { rows: events } = await sql.query(
      `SELECT * FROM events WHERE client_id = $1`,
      [client.id]
    );

    const name = client?.name || "";
    const theme_name = client?.theme_name || "";
    const description = `${client?.opening_title || ""}, ${
      client?.opening_description || ""
    }`;
    const seo_image = client?.seo || "";
    const url = `https://momentinvitation.com/${encodeURIComponent(slug)}`;
    const page_title = client
      ? client.status === "unpaid"
        ? `Preview ${client.name} | Undangan ${client.theme_name}`
        : client.is_preview
        ? `Preview Undangan Tema ${client.theme_name} | Moment`
        : `${client.name} | Undangan ${getEventNames(events)}`
      : "Moment";

    return {
      props: {
        slug,
        seo: {
          success: true,
          name,
          url,
          seo_image,
          page_title,
          description,
          theme_name,
        },
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("ISR error:", error);
    return { notFound: true };
  }
};

export default MainPage;
