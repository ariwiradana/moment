import React, { FC, ReactNode } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Head from "next/head";

interface Props {
  children: ReactNode;
}

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <Head>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <Sidebar />
      <div className="w-full lg:ml-72 p-6 md:p-8 min-h-screen">
        <Navbar />
        <div className="mt-16 lg:mt-0">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
