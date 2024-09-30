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
      <div className="w-full h-full min-h-screen bg-theme1-dark-chocolate">
        <div className="max-w-screen-lg overflow-hidden mx-auto">
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
