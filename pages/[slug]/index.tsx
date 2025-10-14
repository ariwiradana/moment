// pages/[slug].tsx
import ThemeNotFound from "@/components/themes/theme.notfound";
import ClientNotFound from "@/components/themes/client.notfound";
import { fetcher } from "@/lib/fetcher";
import { Client, SEO } from "@/lib/types";
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
import { GetStaticPaths, GetStaticProps } from "next";
import { getClient } from "@/lib/client";

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

interface PageProps {
  seo: SEO;
  slug: string;
  untuk: string;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { slug, untuk } = context.params as { slug: string; untuk: string };

  try {
    const baseUrl =
      process.env.API_BASE_URL || "https://momentinvitation.com/api";

    const res = await getClient(`${baseUrl}/guest/seo?slug=${slug}`);
    if (!res.ok) throw new Error("Failed to fetch SEO data");

    const { data } = await res.json();

    if (!data)
      return {
        notFound: true,
      };

    return {
      props: {
        seo: data ?? null,
        slug,
        untuk: untuk ?? "Tamu Undangan",
      },
      revalidate: 600,
    };
  } catch (error) {
    console.error("ISR SEO fetch error:", error);
    return { notFound: true };
  }
};
const MainPage: FC<PageProps> = ({ seo, slug, untuk }) => {
  const { setClient, client } = useClientStore();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data,
    error,
    isLoading: swrLoading,
  } = useSWR<{ data: Client }>(
    slug ? `/api/guest/invitation?slug=${slug}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        setClient(data.data || null);
        setTimeout(() => setIsLoading(false), 1300);
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      refreshInterval: 0,
    }
  );

  useDisableInspect();

  useEffect(() => {
    AOS.init({ duration: 900, offset: 60, once: true });
    return () => AOS.refresh();
  }, []);

  if (seo) {
    return (
      <>
        <Seo
          url={seo.url}
          title={seo.page_title}
          description={seo.description}
          keywords="undangan digital, undangan online, Moment Invitation"
          image={seo.seo_image}
          author="Moment Invitation"
          locale="id_ID"
          siteName="Moment Invitation"
          robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        {(isLoading || swrLoading) && (
          <div className="w-full h-dvh bg-dashboard-dark flex justify-center items-center">
            <div data-aos="fade-up">
              <SplitText
                text={seo.name}
                className={`text-3xl lg:text-5xl font-medium text-center text-white animate-pulse ${redhat.className}`}
                delay={50}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                threshold={0.2}
                rootMargin="-50px"
              />
            </div>
          </div>
        )}

        {!isLoading &&
          !swrLoading &&
          (() => {
            if (error || !data?.data) return <ClientNotFound />;

            const validGuest =
              client?.guests?.includes(untuk) || untuk === "Tamu Undangan";
            if (!validGuest) return <ClientNotFound />;

            const ThemeComponent: React.FC<{ untuk: string }> | null =
              seo.theme_name && themes[seo.theme_name as ThemeName]
                ? themes[seo.theme_name as ThemeName]
                : null;

            return ThemeComponent ? (
              <>
                <PreviewNav />
                <ThemeErrorBoundary>
                  <ThemeComponent untuk={untuk} />
                </ThemeErrorBoundary>
              </>
            ) : (
              <ThemeNotFound />
            );
          })()}
      </>
    );
  }

  return null;
};

export default MainPage;
