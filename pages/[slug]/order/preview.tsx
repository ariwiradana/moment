// pages/[slug].tsx
import React, { FC, useEffect } from "react";
import ThemeNotFound from "@/components/themes/theme.notfound";
import ClientNotFound from "@/components/themes/client.notfound";
import { themes, ThemeName } from "@/components/themes/themes";
import Seo from "@/components/dashboard/elements/seo";
import AOS from "aos";
import "aos/dist/aos.css";

import useDisableInspect from "@/hooks/useDisableInspect";
import useClientStore from "@/store/useClientStore";
import useOrderStore from "@/store/useOrderStore";
import { useSearchParams } from "next/navigation";
import useCoverStore from "@/store/useCoverStore";
import { usePreventLeave } from "@/hooks/dashboard/usePreventLeave";

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

const MainPage: FC = () => {
  const { setClient } = useClientStore();
  const { form, theme } = useOrderStore();
  const { setIsOpen } = useCoverStore();

  const searchParams = useSearchParams();
  const untuk = searchParams.get("untuk") || "Tamu Undangan";

  useDisableInspect();
  usePreventLeave();

  useEffect(() => {
    AOS.init({ duration: 900, offset: 40, once: true });
    return () => AOS.refresh();
  }, []);

  useEffect(() => {
    if (!form) return;
    setClient(form);
  }, [form, setClient]);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  if (!form) return <ClientNotFound />;

  const ThemeComponent =
    theme?.name && themes[theme.name as ThemeName]
      ? themes[theme.name as ThemeName]
      : null;

  return (
    <>
      {/* SEO dari store */}
      <Seo
        url={`https://momentinvitation.com/${form.theme?.slug}/preview`}
        title={`Preview Undangan Tema ${form.theme?.name} | Moment Invitation`}
        description={`${form.opening_title || ""}, ${
          form.opening_description || ""
        }`}
        keywords="undangan digital, undangan online, Moment Invitation"
        image={form.gallery?.[0] as string}
        author="Moment Invitation"
        locale="id_ID"
        siteName="Moment Invitation"
        robots="noindex, nofollow"
      />

      {/* <div className="w-full h-dvh bg-dashboard-dark p-2 flex justify-center items-center">
        <div data-aos="fade-up">
          <SplitText
            text={form.name}
            className={`text-3xl md:text-4xl lg:text-5xl font-medium text-center text-white animate-pulse ${redhat.className}`}
            delay={30}
            animationFrom={{
              opacity: 0,
              transform: "translate3d(0,50px,0)",
            }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
      </div> */}

      {ThemeComponent ? (
        <>
          {/* <PreviewNav /> */}
          <ThemeErrorBoundary>
            <ThemeComponent untuk={untuk} />
          </ThemeErrorBoundary>
        </>
      ) : (
        <ThemeNotFound />
      )}
    </>
  );
};

export default MainPage;
