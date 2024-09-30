import Head from "next/head";
import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  pageTitle: string;
}

const Layout: FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <div className="w-full h-full min-h-screen bg-white">
        {props.children}
      </div>
    </>
  );
};

export default Layout;
