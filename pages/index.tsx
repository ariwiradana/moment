import Seo from "@/components/dashboard/elements/seo";
import React from "react";
import Layout from "@/components/dashboard/layout";
import DashboardPage from "@/components/dashboard/page";

const Dashboard = () => {
  return (
    <Layout>
      <Seo
        url="https://momentinvitation.com"
        title="Undangan Digital Bali | Minimalis & Elegan | Moment Invitation"
        description="Buat undangan digital Bali dengan desain minimalis dan elegan. Moment Invitation menyediakan undangan online yang praktis, cepat, dan mudah dibagikan untuk berbagai momen spesial."
        keywords="undangan digital bali, undangan online bali, undangan pernikahan digital bali, undangan mempandes digital, undangan digital elegan, pembuat undangan digital bali, desain undangan digital, undangan digital minimalis, undangan digital modern, undangan digital murah bali"
        image="https://res.cloudinary.com/dsbmvj2s3/image/upload/v1759919489/seo_cvsy5o.webp"
        author="Moment Invitation"
        locale="id_ID"
        siteName="Moment Invitation"
        robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <DashboardPage />
    </Layout>
  );
};

export default Dashboard;
