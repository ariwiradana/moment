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
      <div className="w-full h-full select-none">
        <div className="overflow-hidden">
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
