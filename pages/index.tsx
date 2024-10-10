import ClientComponent from "@/components/dashboard/client";
import FeaturesComponent from "@/components/dashboard/features";
import HeroComponent from "@/components/dashboard/hero";
import Layout from "@/components/dashboard/layout";
import PackageComponent from "@/components/dashboard/packages";
import SharedThemeComponent from "@/components/dashboard/shared.theme";
import TestimonialsComponent from "@/components/dashboard/testimonials";
import ThemeComponent from "@/components/dashboard/themes";
import WhyUsComponent from "@/components/dashboard/why.us";
import useDashboardStore from "@/lib/dashboardStore";
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { activeSection, setActiveSection } = useDashboardStore();
  const router = useRouter();

  useEffect(() => {
    if (router && router.pathname === "/") setActiveSection("section1");
  }, [router]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 0,
    });
  }, []);

  const scrollTo = (section: string) => {
    setActiveSection(section);
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
  };

  useEffect(() => {
    if (activeSection) scrollTo(activeSection as string);
  }, [activeSection]);

  return (
    <Layout>
      <Head>
        <title>Buat Undangan Digital Disini! | Moment Invitation</title>
      </Head>
      <HeroComponent />
      <WhyUsComponent />
      <FeaturesComponent />
      <ThemeComponent />
      <PackageComponent />
      <SharedThemeComponent />
      <ClientComponent />
      <TestimonialsComponent />
    </Layout>
  );
};

export default Dashboard;
