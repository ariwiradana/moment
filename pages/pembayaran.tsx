import Layout from "@/components/dashboard/layout";
import useDashboardStore from "@/lib/dashboardStore";
import { afacad, dm } from "@/lib/fonts";
import Head from "next/head";
import React, { FC, useEffect } from "react";

const DashboardPayment: FC = () => {
  const { setActiveSection } = useDashboardStore();

  useEffect(() => setActiveSection("section6"), []);

  return (
    <Layout>
      <Head>
        <title>Pembayaran</title>
      </Head>

      <div className="max-w-screen-xl mx-auto pt-16 md:pt-20 lg:pt-24 px-6 lg:px-24">
        <div className="py-16">
          <div>
            <h1
              className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold`}
            >
              Cara Melakukan <br />
              Pembayaran
            </h1>
            <p
              className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
            >
              Kami ingin mendengar pengalaman Anda! Isi form di bawah ini untuk
              berbagi pendapat dan membantu orang lain menemukan layanan
              undangan yang sempurna.
            </p>
            <p
              className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
            ></p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPayment;
