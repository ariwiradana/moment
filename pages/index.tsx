import ClientComponent from "@/components/dashboard/client";
import ButtonFloating from "@/components/dashboard/elements/button.floating";
import Seo from "@/components/dashboard/elements/seo";
import FaqComponent from "@/components/dashboard/faq";
import FeaturesComponent from "@/components/dashboard/features";
import HeroComponent from "@/components/dashboard/hero";
import Layout from "@/components/dashboard/layout";
import PackageComponent from "@/components/dashboard/packages";
import SharedThemeComponent from "@/components/dashboard/shared.theme";
import TestimonialsComponent from "@/components/dashboard/testimonials";
import ThemeComponent from "@/components/dashboard/themes";
import WhyUsComponent from "@/components/dashboard/why.us";
import { sosmedURLs } from "@/constants/sosmed";
import useDashboardStore from "@/lib/dashboardStore";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useCallback, useEffect } from "react";
import { BiLogoWhatsapp } from "react-icons/bi";

const Dashboard = () => {
  const { activeSection, setActiveSection, manualScroll, setManualScroll } =
    useDashboardStore();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 0,
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (manualScroll) {
      const sections = [
        "section1",
        "section2",
        "section3",
        "section4",
        "section5",
        "section6",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    }
  }, [activeSection]);

  const scrollTo = useCallback((section: string) => {
    setManualScroll(false);
    const element = document.getElementById(section);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 50 : 100;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    setManualScroll(true);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (activeSection && !manualScroll) {
      scrollTo(activeSection);
    }
  }, [activeSection, manualScroll]);

  return (
    <Layout>
      <Seo
        title="Buat Undangan Digital Disini! | Moment"
        description="Buat undangan digital dengan mudah menggunakan Moment. Dapatkan undangan dengan harga yang terjangkau, cepat, responsif, dan mudah dibagikan"
        keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah, undangan digital bali, undangan bali, undangan digital, platform undangan online, Moment Invitation, template undangan digital, undangan pernikahan digital, undangan online, undangan digital dengan RSVP, undangan dengan Google Maps, undangan digital premium, buat undangan digital, undangan digital minimalis"
        image="/images/logo-bg.jpg"
      />
      <ButtonFloating
        aria-label="button-whatsapp"
        onClick={() => window.open(sosmedURLs.whatsapp)}
        className="bg-green-500 text-white"
        icon={<BiLogoWhatsapp />}
      />
      <HeroComponent />
      <WhyUsComponent />
      <FeaturesComponent />
      <ThemeComponent />
      <PackageComponent />
      <SharedThemeComponent />
      <ClientComponent />
      <TestimonialsComponent />
      <FaqComponent />
    </Layout>
  );
};

export default Dashboard;
