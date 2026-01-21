import dynamic from "next/dynamic";
import ButtonFloating from "@/components/dashboard/elements/button.floating";
import { sosmedURLs } from "@/constants/sosmed";
import useDisableInspect from "@/hooks/useDisableInspect";
import useDashboardStore from "@/store/useDashboardStore";
import { BiLogoWhatsapp } from "react-icons/bi";
import React, { useEffect, useCallback, startTransition } from "react";
import Head from "next/head";

// Dynamic import semua komponen client-heavy
const HeroComponent = dynamic(() => import("@/components/dashboard/hero"));
const ClientComponent = dynamic(() => import("@/components/dashboard/client"));
const FeaturesComponent = dynamic(
  () => import("@/components/dashboard/features"),
);
const ThemeComponent = dynamic(() => import("@/components/dashboard/themes"));
const PackageComponent = dynamic(
  () => import("@/components/dashboard/packages"),
);
const TestimonialsComponent = dynamic(
  () => import("@/components/dashboard/testimonials"),
);
const SharedThemeComponent = dynamic(
  () => import("@/components/dashboard/shared.theme"),
);
const FaqComponent = dynamic(() => import("@/components/dashboard/faq"));

const DashboardPage = () => {
  const { activeSection, setActiveSection, manualScroll, setManualScroll } =
    useDashboardStore();

  // Scroll handler optimized
  const handleScroll = useCallback(() => {
    if (!manualScroll) return;
    const sections = [
      "section1",
      "section2",
      "section3",
      "section4",
      "section5",
      "section6",
    ];
    for (const section of sections) {
      const el = document.getElementById(section);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        if (activeSection !== section) {
          startTransition(() => {
            setActiveSection(section);
          });
        }
        break;
      }
    }
  }, [activeSection, manualScroll, setActiveSection]);

  // Scroll to section
  const scrollTo = useCallback(
    (section: string) => {
      setManualScroll(false);
      const el = document.getElementById(section);
      if (!el) return;
      const offset = window.innerWidth < 768 ? 50 : 100;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    },
    [setManualScroll],
  );

  // Mounting effects
  useEffect(() => {
    setManualScroll(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, setManualScroll]);

  useEffect(() => {
    if (activeSection && !manualScroll) scrollTo(activeSection);
  }, [activeSection, manualScroll, scrollTo]);

  useDisableInspect();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://momentinvitation.com/#organization",
    name: "Moment Invitation",
    url: "https://momentinvitation.com",
    logo: "https://momentinvitation.com/icon.png",
    sameAs: [
      sosmedURLs.instagram,
      sosmedURLs.tiktok,
      sosmedURLs.whatsapp,
      sosmedURLs.youtube,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["id"],
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Bali, Indonesia",
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main className="min-h-dvh">
        <ButtonFloating
          aria-label="Hubungi Kami melalui WhatsApp"
          onClick={() =>
            window.open(sosmedURLs.whatsapp, "_blank", "noopener,noreferrer")
          }
          className="bg-green-500 text-white"
          icon={<BiLogoWhatsapp />}
        />

        <HeroComponent />
        <ClientComponent />
        <FeaturesComponent />
        <ThemeComponent />
        <PackageComponent />
        <TestimonialsComponent />
        <SharedThemeComponent />
        <FaqComponent />
      </main>
    </>
  );
};

export default DashboardPage;
