import dynamic from "next/dynamic";
import Seo from "@/components/dashboard/elements/seo";
import React from "react";
import Layout from "@/components/dashboard/layout";
import DashboardPage from "@/components/dashboard/page";

const Dashboard = () => {
  return (
    <Layout>
      <Seo
        url="https://momentinvitation.com"
        title="Undangan Digital Bali | Moment"
        description="Moment Invitation menawarkan solusi undangan digital di Bali dengan desain elegan, mudah digunakan, dan praktis..."
        keywords="undangan digital, undangan digital bali, undangan pernikahan digital bali, undangan minimalis, undangan mempandes digital..."
        image="https://res.cloudinary.com/dsbmvj2s3/image/upload/v1759919489/seo_cvsy5o.webp"
      />
      <DashboardPage />
    </Layout>
  );
};

export default Dashboard;
