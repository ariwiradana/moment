import ThemeNotFound from "@/components/themes/theme.notfound";
import { fetcher } from "@/lib/fetcher";
import { Client, SEO } from "@/lib/types";
import { GetServerSideProps } from "next";
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

interface Props {
  untuk: string;
  seo: SEO;
  slug: string;
}

const MainPage: FC<Props> = ({ untuk, seo, slug }) => {
  const { setClient, client } = useClientStore();
  const [isLoading, setIsLoading] = useState(true);

  const { error } = useSWR<{ data: Client }>(
    slug ? `/api/_pb/_c/_u?slug=${slug}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        setClient(data.data || null);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { untuk } = context.query;
  const { slug } = context.params as { slug: string };

  const baseUrl = process.env.API_BASE_URL;
  const response = await fetcher(
    `${baseUrl}/api/client/seo?slug=${slug}`
  ).catch((error) => {
    console.error("API fetch error:", error);
    return null;
  });

  const seo = response || null;

  return {
    props: {
      untuk: untuk ?? "Tamu Undangan",
      slug,
      seo,
    },
  };
};

export default MainPage;
