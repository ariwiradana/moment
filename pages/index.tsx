import HeroComponent from "@/components/dashboard/hero";
import Layout from "@/components/dashboard/layout";
import PackageComponent from "@/components/dashboard/packages";
import ThemeComponent from "@/components/dashboard/themes";
import Head from "next/head";
import React from "react";

const Dashboard = () => {
  return (
    <Layout>
      <Head>
        <title>Buat Undangan Digital Disini! | Moment Invitation</title>
      </Head>
      <HeroComponent />
      <ThemeComponent />
      <PackageComponent />
    </Layout>
  );
};

export default Dashboard;
