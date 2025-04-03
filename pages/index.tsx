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
import { sosmedURLs } from "@/constants/sosmed";
import useDisableInspect from "@/hooks/useDisableInspect";
import useDashboardStore from "@/store/useDashboardStore";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useCallback, useEffect } from "react";
import { BiLogoWhatsapp } from "react-icons/bi";
import "swiper/css";
import "swiper/css/effect-fade";

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
  useDisableInspect();

  return (
    <Layout>
      <Seo
        url="https://momentinvitation.com"
        title="Buat Undangan Digital Disini! | Moment"
        description="Moment Invitation menawarkan solusi undangan digital di Bali dengan desain elegan, mudah digunakan, dan praktis. Pilih dari berbagai tema kustom yang dapat disesuaikan, nikmati fitur seperti revisi tak terbatas, dan bagikan momen spesial Anda dengan cepat. Dengan paket harga terjangkau, proses pembuatan undangan yang cepat, serta tampilan yang responsif, Moment memberikan pengalaman undangan digital yang sempurna untuk acara Anda."
        keywords="undangan digital, undangan digital bali, undangan pernikahan digital bali, undangan minimalis, undangan mempandes digital, undangan digital pernikahan, undangan bali, undangan online bali, undangan kustom bali, tema undangan pernikahan bali, tema mempandes digital bali, undangan digital untuk pernikahan, undangan pernikahan praktis, undangan pernikahan elegan Bali, undangan mempandes praktis, paket undangan Bali, undangan Bali harga terjangkau, undangan digital kustom Bali, undangan digital untuk mempandes, cara membuat undangan pernikahan bali, undangan cepat dan mudah, undangan digital yang responsif, layanan undangan Bali, Moment undangan digital, undangan pernikahan modern Bali, undangan digital, undangan digital murah, undangan digital terjangkau, undangan online murah, undangan online terjangkau"
        image="https://res.cloudinary.com/dwitznret/image/upload/v1734241503/seo_xftrjs.webp"
      />
      <ButtonFloating
        aria-label="Hubungi Kami melalui WhatsApp"
        onClick={() => window.open(sosmedURLs.whatsapp)}
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
    </Layout>
  );
};

export default Dashboard;
