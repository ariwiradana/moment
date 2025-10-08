"use client";

import dynamic from "next/dynamic";
import Seo from "@/components/dashboard/elements/seo";
import ButtonFloating from "@/components/dashboard/elements/button.floating";
import { sosmedURLs } from "@/constants/sosmed";
import useDisableInspect from "@/hooks/useDisableInspect";
import useDashboardStore from "@/store/useDashboardStore";
import { BiLogoWhatsapp } from "react-icons/bi";
import React, { useEffect, useCallback, startTransition } from "react";

// Dynamic import semua komponen client-heavy
const HeroComponent = dynamic(() => import("@/components/dashboard/hero"), {
  ssr: false,
});
const ClientComponent = dynamic(() => import("@/components/dashboard/client"), {
  ssr: false,
});
const FeaturesComponent = dynamic(
  () => import("@/components/dashboard/features"),
  { ssr: false }
);
const ThemeComponent = dynamic(() => import("@/components/dashboard/themes"), {
  ssr: false,
});
const PackageComponent = dynamic(
  () => import("@/components/dashboard/packages"),
  { ssr: false }
);
const TestimonialsComponent = dynamic(
  () => import("@/components/dashboard/testimonials"),
  { ssr: false }
);
const SharedThemeComponent = dynamic(
  () => import("@/components/dashboard/shared.theme"),
  { ssr: false }
);
const FaqComponent = dynamic(() => import("@/components/dashboard/faq"), {
  ssr: false,
});
const Layout = dynamic(() => import("@/components/dashboard/layout"), {
  ssr: false,
});

const Dashboard = () => {
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
    [setManualScroll]
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

  return (
    <Layout>
      <Seo
        url="https://momentinvitation.com"
        title="Undangan Digital Bali | Moment"
        description="Moment Invitation menawarkan solusi undangan digital di Bali dengan desain elegan, mudah digunakan, dan praktis..."
        keywords="undangan digital, undangan digital bali, undangan pernikahan digital bali, undangan minimalis, undangan mempandes digital..."
        image="https://res.cloudinary.com/dsbmvj2s3/image/upload/v1759919489/seo_cvsy5o.webp"
      />

      <ButtonFloating
        aria-label="Hubungi Kami melalui WhatsApp"
        onClick={() => window.open(sosmedURLs.whatsapp)}
        className="bg-green-500 text-white"
        icon={<BiLogoWhatsapp />}
      />

      {/* Semua komponen client-heavy */}
      <HeroComponent />
      <ClientComponent />
      <FeaturesComponent />
      <ThemeComponent />
      <PackageComponent />
      <TestimonialsComponent />
      <SharedThemeComponent />
      <FaqComponent />
    </Layout>
  );
};

export default Dashboard;
