import React, { FC, ReactNode } from "react";
import Seo from "../dashboard/elements/seo";
import { sosmedURLs } from "@/constants/sosmed";

interface Props {
  children: ReactNode;
  pageTitle?: string;
}

const Layout: FC<Props> = (props) => {
  return (
    <>
      <Seo
        title={props.pageTitle ?? ""}
        description="Buat undangan digital dengan mudah menggunakan Moment. Dapatkan undangan dengan harga yang terjangkau, cepat, responsif, dan mudah dibagikan"
        keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah"
        ogImage="/images/logo-white.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Moment Invitations",
          sameAs: [
            sosmedURLs.email,
            sosmedURLs.instagram,
            sosmedURLs.whatsapp,
            sosmedURLs.youtube,
          ],
        }}
        author="Moment"
      />
      <div className="w-full h-full select-none">
        <div className="overflow-hidden">
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
