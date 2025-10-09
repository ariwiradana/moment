// pages/[slug].tsx
import ThemeNotFound from "@/components/themes/theme.notfound";
import ClientNotFound from "@/components/themes/client.notfound";
import { fetcher } from "@/lib/fetcher";
import { Client, Event, SEO } from "@/lib/types";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC, useEffect, useState } from "react";
import { themes, ThemeName } from "@/components/themes/themes";
import AOS from "aos";
import Seo from "@/components/dashboard/elements/seo";
import useDisableInspect from "@/hooks/useDisableInspect";
import useClientStore from "@/store/useClientStore";
import useSWR from "swr";
import SplitText from "@/components/themes/split.text";
import { redhat } from "@/lib/fonts";
import PreviewNav from "@/components/themes/preview.nav";
import "aos/dist/aos.css";
import sql from "@/lib/db";
import { useRouter } from "next/router";

// Optional: simple ErrorBoundary
class ThemeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    console.error("Theme render error");
  }
  render() {
    if (this.state.hasError) return <ThemeNotFound />;
    return this.props.children;
  }
}

interface Props {
  seo: SEO;
  slug: string;
}

const MainPage: FC<Props> = ({ seo, slug }) => {
  const { setClient, client } = useClientStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const untuk = (router.query.untuk as string) || "Tamu Undangan";

  // Fetch client data
  const { error } = useSWR<{ data: Client }>(
    slug ? `/api/_pb/_c/_u?slug=${slug}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        console.log({ data, slug });
        setClient(data.data || null);
        setTimeout(() => setIsLoading(false), 1500);
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      refreshInterval: 0,
    }
  );

  useDisableInspect();

  useEffect(() => {
    AOS.init({ duration: 1200, offset: 60, once: true });
    return () => AOS.refresh();
  }, []);

  if (isLoading && seo)
    return (
      <>
        <Seo
          url={seo.url}
          title={seo.page_title}
          description={seo.description}
          keywords="undangan digital, undangan online, undangan pernikahan, Moment Invitation"
          image={seo.seo_image}
          author="Moment Invitation"
          locale="id_ID"
          siteName="Moment Invitation"
          robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <div className="w-full h-dvh bg-dashboard-dark flex justify-center items-center">
          <div data-aos="fade-up">
            <SplitText
              text={seo.name}
              className={`text-3xl lg:text-5xl font-medium text-center text-white animate-pulse ${redhat.className}`}
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

  const ThemeComponent: React.FC<{ untuk: string }> | null = seo.theme_name
    ? themes[seo.theme_name as ThemeName] || null
    : null;

  return ThemeComponent ? (
    <>
      <PreviewNav />
      <Seo
        url={seo.url}
        title={seo.page_title}
        description={seo.description}
        keywords="undangan digital, undangan online, Moment Invitation"
        image={seo.seo_image}
      />
      <ThemeErrorBoundary>
        <ThemeComponent untuk={untuk} />
      </ThemeErrorBoundary>
    </>
  ) : (
    <ThemeNotFound />
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const { rows } = await sql.query(
      `
        SELECT
          c.id, c.name, c.status, c.is_preview, c.theme_id,
          c.opening_title, c.opening_description, c.seo,
          t.name as theme_name, tc.name as theme_category_name,
          COALESCE(
            json_agg(
              json_build_object(
                'id', e.id,
                'name', e.name,
                'date', e.date,
                'start_time', e.start_time,
                'end_time', e.end_time,
                'address', e.address,
                'address_url', e.address_url,
                'created_at', e.created_at,
                'updated_at', e.updated_at
              )
            ) FILTER (WHERE e.id IS NOT NULL),
            '[]'
          ) AS events
        FROM clients c
        JOIN themes t ON c.theme_id = t.id
        JOIN theme_categories tc ON c.theme_category_id = tc.id
        LEFT JOIN events e ON e.client_id = c.id
        WHERE c.slug = $1
        GROUP BY c.id, t.name, tc.name`,
      [slug]
    );

    if (rows.length === 0) return { notFound: true };

    const client = rows[0];

    const name = client.name || "";
    const theme_name = client.theme_name || "";
    const description = `${client.opening_title || ""}, ${
      client.opening_description || ""
    }`;
    const seo_image = client.seo || "";
    const url = `https://momentinvitation.com/${encodeURIComponent(slug)}`;
    const page_title = client
      ? client.status === "unpaid"
        ? `Preview ${client.name} | Undangan ${client.theme_name}`
        : client.is_preview
        ? `Preview Undangan Tema ${client.theme_name} | Moment`
        : `${client.name} | Undangan ${client.events
            .map((e: Event) => e.name)
            .join(", ")}`
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
