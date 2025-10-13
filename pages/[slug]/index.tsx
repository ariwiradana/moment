// pages/[slug].tsx
import ThemeNotFound from "@/components/themes/theme.notfound";
import ClientNotFound from "@/components/themes/client.notfound";
import { fetcher } from "@/lib/fetcher";
import { Client, Event, SEO } from "@/lib/types";
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
import { useRouter } from "next/router";

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
  slug: string;
}

const MainPage: FC<Props> = () => {
  const { setClient, client } = useClientStore();
  const [isLoading, setIsLoading] = useState(true);
  const [seo, setSeo] = useState<SEO | null>(null);
  const router = useRouter();

  const { slug, untuk = "Tamu Undangan" } = router.query as {
    slug?: string;
    untuk?: string;
  };

  // Fetch client data
  const {
    data,
    error,
    isLoading: swrLoading,
  } = useSWR<{ data: Client }>(
    slug ? `/api/guest/invitation?slug=${slug}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        const seoData = getSeo(data.data as Client);
        setSeo(seoData as SEO);
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
    AOS.init({ duration: 900, offset: 60, once: true });
    return () => AOS.refresh();
  }, []);

  const getSeo = (client: Client) => {
    if (!client) return;

    const name = client.name || "";
    const theme_name = client.theme?.name || "";
    const description = `${client.opening_title || ""}, ${
      client.opening_description || ""
    }`;
    const seo_image = client.seo || "";
    const url = `https://momentinvitation.com/${encodeURIComponent(
      slug as string
    )}`;
    const page_title = client
      ? client.status === "unpaid"
        ? `Preview ${client.name} | Undangan ${client.theme?.name}`
        : client.is_preview
        ? `Preview Undangan Tema ${client.theme?.name} | Moment`
        : `${client.name} | Undangan ${client.events
            .map((e: Event) => e.name)
            .join(", ")}`
      : "Moment";

    const seo: SEO = {
      name,
      description,
      page_title,
      seo_image,
      theme_name,
      url,
    };

    return seo;
  };

  if ((isLoading || swrLoading) && seo)
    return (
      <>
        <Seo
          url={seo?.url}
          title={seo?.page_title}
          description={seo?.description}
          keywords="undangan digital, undangan online, undangan pernikahan, Moment Invitation"
          image={seo?.seo_image}
          author="Moment Invitation"
          locale="id_ID"
          siteName="Moment Invitation"
          robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <div className="w-full h-dvh bg-dashboard-dark flex justify-center items-center">
          <div data-aos="fade-up">
            <SplitText
              text={seo?.name}
              className={`text-3xl lg:text-5xl font-medium text-center text-white animate-pulse ${redhat.className}`}
              delay={50}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              threshold={0.2}
              rootMargin="-50px"
            />
          </div>
        </div>
      </>
    );

  if (!isLoading && !swrLoading) {
    if (error || !data?.data) return <ClientNotFound />;

    const validGuest =
      client?.guests?.includes(untuk) || untuk === "Tamu Undangan";
    if (!validGuest) return <ClientNotFound />;

    const ThemeComponent: React.FC<{ untuk: string }> | null =
      seo?.theme_name && themes[seo.theme_name as ThemeName]
        ? themes[seo.theme_name as ThemeName]
        : null;

    return ThemeComponent && seo ? (
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
  }

  return null;
};

export default MainPage;
